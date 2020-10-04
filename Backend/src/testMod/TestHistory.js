const fetch = require('node-fetch')
const fs = require('fs')
const Path = require('path')

async function postImg(username = "", fileStream, fileName = "", destLink){
    if (username == "") throw "Need username"
    if (fileName == "") throw "Need filename"
    return await fetch(destLink, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // send our base64 string as POST request
        body: JSON.stringify({
            username: username,
            imgsource: fileStream.toString("base64"),
            name: fileName
        }),
    }).then((res) => {
        return res.json()
    }).then((json) => {
        //console.log(json)
        return json
    })
}

async function getHistory(username = "", destLink) {
    return await fetch(destLink, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username
        }),
    }).then((res) => {
        return res.json()
    }).then((json) => {
        console.log(json)
        return json
    })
}

fs.readFile(Path.join(__dirname, 'testImg/girl_sit.jpg'), function(err, image) {
    if (err) throw err // Fail if the file can't be read.
    
    // postImg("kevin", image, "fromTestMod2.jpg", 'https://virtual-lip.herokuapp.com/')
    // getHistory("kevin", 'https://virtual-lip.herokuapp.com/history')

    postImg("kevin", image, "fromTestMod2.jpg", 'http://localhost:2020/')
    getHistory("kevin", 'http://localhost:2020/history')

    // 192.168.99.100 is the default IP of Docker Machine on Windows, the port of the container is depends on the Docker comment.
    // postImg(image, "fromTestMod2.jpg", 'http://192.168.99.100:2020')S
    // Port 80 is open on Heroku APP
    // postImg(image, "fromLocal.jpg", 'https://virtual-lip.herokuapp.com/')
})

exports.postImg = postImg
exports.getHistory = getHistory