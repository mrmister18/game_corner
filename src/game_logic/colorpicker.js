function randomHex() {
    let values = "0123456789ABCDEF"
    let result = ""
    for (let i = 0; i < 6; i++) {
        result += values[Math.floor(Math.random() * 16)]
    } return result
}

function randomRGB() {
    return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
}

function randomHSL() {
    return [Math.floor(Math.random() * 361), Math.floor(Math.random() * 101), Math.floor(Math.random() * 101)]
}

export function randomColor(model) {
    if (model === "hex") {return randomHex()}
    if (model === "rgb") {return randomRGB()}
    if (model === "hsl") {return randomHSL()}
}