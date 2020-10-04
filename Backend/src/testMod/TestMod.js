const fetch = require('node-fetch')
const fs = require('fs')
const Path = require('path')

async function postImg(fileStream, fileName = "", destLink){
    if (fileName == "") throw "Need filename"
    return await fetch(destLink, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        // send our base64 string as POST request
        body: JSON.stringify({
            imgsource: fileStream.toString("base64"),
            name: fileName
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
    
    postImg(image, "fromTestMod2.jpg", 'http://localhost:2020')
    // 192.168.99.100 is the default IP of Docker Machine on Windows, the port of the container is depends on the Docker comment.
    // postImg(image, "fromTestMod2.jpg", 'http://192.168.99.100:2020')
    // Port 80 is open on Heroku APP
    // postImg(image, "fromLocal.jpg", 'https://virtual-lip.herokuapp.com/')
})

exports.postImg = postImg