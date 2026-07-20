import express, { json } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

router.post('/register', (req, res) => {
    const {username, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)
    
    try {
        const getUserIfExist = db.prepare(`SELECT * FROM users WHERE username = ?`)
        const userExist = getUserIfExist.get(username)

        if(userExist){
            return res.status(409).json({message: "This user name already exists, select another."})
        }

        const insertData = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertData.run(username, hashedPassword)

        //adding a default todo to the user
        const defaultTodo = 'Hello :) Add your first todo!'
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        //create token
        const token = jwt.sign({id: result.lastInsertRowid }, process.env.JWT_SECRET, {expiresIn: '24h'})
   
        return res.json({token})
    } catch (error) {
        console.log(error)
        return res.sendStatus(404)
    }
    
})
router.post('/login', (req, res) => {
    const {username, password} = req.body
    
    try {
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`)
        const user = getUser.get(username)

        if(!user){
            return res.status(404).json({message: "User not found."})
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if(!passwordIsValid){
            return res.status(401).json({message: "Invalid password"})
        }

        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, {expiresIn: '24h'})
        return res.json({token})
    } catch (error) {
        console.log(error)
        res.sendStatus(503)
    }
})
export default router