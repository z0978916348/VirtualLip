// import Lipsticks from './lipstick.json'
const fs = require('fs');
const Path = require('path')

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getLipstickListJson(){
    // Read Local JSON
    return JSON.parse(fs.readFileSync(Path.join(__dirname, 'lipstick.json'), 'utf8'));
}

async function compareLipstick(targetColor){
    // Use absolute path from root directory
    var Lipsticks = getLipstickListJson()
    // var Lipsticks = JSON.parse(fs.readFileSync(Path.join(__dirname, 'lipstick.json'), 'utf8'))
    // console.log(Lipsticks)
    let selectedLipstick = {
        brand: "",
        series: "",
        color: "",
        id: "",
        name: "",
        dis: 999999999
    }

    for (let i = 0; i < Lipsticks.brands.length; i++) {
        let brandName = Lipsticks.brands[i].name
        
        // console.log(brandName)
        for (let j = 0; j < Lipsticks.brands[i].series.length; j++) {
            let seriesName = Lipsticks.brands[i].series[j].name
            for (let k = 0; k < Lipsticks.brands[i].series[j].lipsticks.length; k++) {
                let hexColor = Lipsticks.brands[i].series[j].lipsticks[k].color
                let color = hexToRgb(hexColor)
                let id = Lipsticks.brands[i].series[j].lipsticks[k].id
                let name = Lipsticks.brands[i].series[j].lipsticks[k].name
                let dis = (targetColor.r - color.r) * (targetColor.r - color.r) + (targetColor.g - color.g) * (targetColor.g - color.g) + (targetColor.b - color.b) * (targetColor.b - color.b)
                // console.log(name)
                if(selectedLipstick.dis > dis){
                    selectedLipstick.brand = brandName
                    selectedLipstick.series = seriesName
                    selectedLipstick.color = hexColor
                    selectedLipstick.id = id
                    selectedLipstick.name = name
                    selectedLipstick.dis = dis
                }
                
            }
        }
    }
    
    return selectedLipstick
}

// console.log(fs.readFileSync('faceRecogApi/lipstick.json', 'utf8'))

exports.hexToRgb = hexToRgb
exports.compareLipstick = compareLipstick