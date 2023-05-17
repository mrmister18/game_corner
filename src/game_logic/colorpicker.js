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
// SOME COLOR MATH I GOT ONLINE
export function hexToRGB(hex) {
    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}

export function hslToRGB ([h, s, l]) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  };