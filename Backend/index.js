const express = require('express')
const helmet = require("helmet")
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const Path = require('path')
const FaceRecogApi = require('./src/faceRecogApi/api')
const history = require('./src/history/user')
const { resolve } = require('path')
const db = require('./models/index.js')
const exphbs = require('express-handlebars');

const port = process.env.PORT || 2020
// const port = process.env.PORT || 80

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '15MB' }))

app.get('/', (req, res)=>{
	res.send("Hello Here is Virtual Lip Backend")
})

// todo
app.post('/history', (req, res) => {
	history.getinfo(req.body.username).then(
		(resolve) => {
			console.log(`index: ${JSON.stringify(resolve)}`)
			//console.log(`index: ${resolve.rows}`)
			
			res.json(JSON.stringify(resolve))
		}
	)
})

app.post('/', async (req, res) => {
	let fileName = req.body.name? `src/imgs/${req.body.name}` : `src/imgs/upload.jpg`
	
	fs.writeFile(Path.join(__dirname, fileName), req.body.imgsource, 'base64', (err) => {
		if (err) throw err
		console.log("Writing File...")
	})

	console.log("Recognizing Color...")
	let canvas = FaceRecogApi.str2Canvas(req.body.imgsource, 'base64')
	let recogRes = await FaceRecogApi.recognizeLipstick(canvas)
	// todo
	let lipstickname = `${recogRes.lipstickColor.brand}${recogRes.lipstickColor.series}${recogRes.lipstickColor.name}`
	history.create(req.body.username, lipstickname, recogRes.lipstickColor.color)
	
	console.log(`Result: ${recogRes.lipstickColor.id} ${recogRes.lipstickColor.color} ${recogRes.lipstickColor.brand} ${recogRes.lipstickColor.series} ${recogRes.lipstickColor.name}`)
	
	res.json(recogRes)
})

app.get('/files', (req, res) => {
    fs.readdir(Path.join(__dirname, 'src/imgs'), (err, files) => {
        files.forEach(file => {
          console.log(file);
		});
		
		res.send(files)
    });	
})

app.post('/url', function(req, res) {
	const url = req.body.url

	urlShortener.short(url, function(err, shortUrl) {
	db.Url.findOrCreate({where: {url: url, shortUrl: shortUrl}})
	.then(([urlObj, created]) => {
		res.send(shortUrl)
		});
	});
});


app.listen(port, async () =>{
	await FaceRecogApi.initModel()
	console.log(`Server is Listening on port ${port}`)
})
