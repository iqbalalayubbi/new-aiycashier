function formatTime(){
    const time = new Date()
    let date = [
        time.getDate(),
        time.getMonth(),
        time.getFullYear()
    ]
    let timeNow = [
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
    ]
    timeNow.forEach((tm,i) => {
        if (tm < 10) {
            const timeArr = tm.toString().split('')
            timeArr.splice(0,0,0)
            timeNow[i] = timeArr.join('')
        }
    })

    date.forEach((d,i) => {
        if (d < 10) {
            const dateArr = d.toString().split('')
            dateArr.splice(0,0,0)
            date[i] = dateArr.join('')
        }
    })

    return `${date.join('/')} ${timeNow.join(':')}`
}

export default formatTime