const Path = require('path')
const faceapi = require('face-api.js')
const NodeCanvas = require('canvas')
const SizeOf = require('buffer-image-size')
const readLipsticks = require('./readLipsticks')

const { Canvas, Image, ImageData } = NodeCanvas  
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
const MODEL_URL = Path.join(__dirname, 'weights')
const debug_mode = true

async function initModel() {
    console.log("Initing Model...")
    try{  
        await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
        console.log("Loaded faceLandmark68Net")
        await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL)
        console.log("Loaded TinyFaceDetectorModel")
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
        console.log("Loaded SsdMobilenetv1Model")
    }catch(err){
        console.log(err)
        console.log("Loaded Model Failed")
    }
}

async function recognizeLipstick(canvas){
    const landmarks = await faceapi.detectSingleFace(canvas).withFaceLandmarks(false)
    let mouthPoint = landmarks.landmarks.getMouth()
    let mouthColors = getMouthColor(canvas,mouthPoint)
    let avgColor = getAvgColor(mouthColors)
    let lipstickColor = await readLipsticks.compareLipstick(avgColor)
    
    // console.log(this.mouthColors)
    // console.log(this.avgColor(this.mouthColors))
    // console.log(readLipsticks.compareLipstick(this.avgColor(this.mouthColors)))
    // console.log(lipsticks)

    return {
        mouthColors: mouthColors,
        avgColor: avgColor,
        lipstickColor: lipstickColor
    }
}

function getMouthColor (canvans, mouthPoint) {
    let context = canvans.getContext("2d")
    let mouthColors = [];
    for (let i =0;i<mouthPoint.length;i++){
        let data = context.getImageData(mouthPoint[i]["_x"],mouthPoint[i]["_y"],1,1)
        mouthColors[i] = data.data
    }

    return mouthColors
}

function getAvgColor(mouthColors){
    let r = 0, g = 0, b = 0
    let len = mouthColors.length
    // console.log(mouthColors.length)
    for(let i = 0; i < mouthColors.length; i++){
        // console.log(mouthColors[0])
        r+=mouthColors[i][0]
        g+=mouthColors[i][1]
        b+=mouthColors[i][2]
    }

    return {
        r: Math.round(r / len),
        g: Math.round(g / len),
        b: Math.round(b / len),
    }
}

function buff2Canvas(buff){
    const dim = SizeOf(buff)
    const imgCanvas = NodeCanvas.createCanvas(dim.width, dim.height)
	const ctx = imgCanvas.getContext('2d')
    const img = new NodeCanvas.Image()
	img.onload = () => ctx.drawImage(img, 0, 0)
	img.onerror = err => { throw err }
    img.src = buff
    return imgCanvas
}

function str2Canvas(str, encode){
    let buff = Buffer.from(str, encode);
    return buff2Canvas(buff)
}

// initModel()

exports.initModel = initModel;
exports.recognizeLipstick = recognizeLipstick
exports.buff2Canvas = buff2Canvas
exports.str2Canvas = str2Canvas