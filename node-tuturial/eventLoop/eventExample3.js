let i = 0

const timer = setInterval(() => {
    console.log("heyyy")
    if(i >= 3){
        clearInterval(timer)
    }
    i += 1
}, 2000)
timer
console.log("i am first")

