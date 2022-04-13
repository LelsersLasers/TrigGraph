function average(lst) {
    if (lst.length == 0)
        return 20;
    var sum = 0;
    for (var i in lst)
        sum += lst[i];
    return sum / lst.length;
}
function setDelta() {
    t1 = performance.now();
    var lastDelta = t1 - t0;
    if (frame > 20 && lastDelta < 2 * average(deltas))
        deltas.push(lastDelta); // protect against alt-tab
    delta = average(deltas);
    t0 = performance.now();
    frame++;
}
function drawAll() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#ffffff";
    context.fillStyle = "#ff0000";
    context.beginPath();
    context.arc(1.5 * size, 1.5 * size, size, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.moveTo(1.5 * size, 0.5 * size);
    context.lineTo(1.5 * size, 2.5 * size);
    context.stroke();
    context.beginPath();
    context.moveTo(0.5 * size, 1.5 * size);
    context.lineTo(2.5 * size, 1.5 * size);
    context.stroke();
    pos += w * delta / 1000;
    x = 1.5 * size + size * Math.cos(pos * Math.PI / 180);
    y = 1.5 * size + size * Math.sin(-pos * Math.PI / 180);
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fill();
    setDelta();
    console.log(delta);
    window.requestAnimationFrame(drawAll);
}
function setUpContext() {
    // Get width/height of the browser window
    console.log("Window is %d by %d", window.innerWidth, window.innerHeight);
    // Get the canvas, set the width and height from the window
    canvas = document.getElementById("mainCanvas");
    canvas.width = window.innerWidth > window.innerHeight ? window.innerHeight - 20 : innerWidth - 20;
    canvas.height = window.innerWidth > window.innerHeight ? window.innerHeight - 20 : innerWidth - 20;
    // Set up the context for the animation
    context = canvas.getContext("2d");
    // disable anti-alising to make my pixel art look 'crisp'
    context.imageSmoothingEnabled = false; // standard
    context.mozImageSmoothingEnabled = false; // Firefox
    context.oImageSmoothingEnabled = false; // Opera
    context.webkitImageSmoothingEnabled = false; // Safari
    context.msImageSmoothingEnabled = false; // IE
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.lineWidth = 3;
    return context;
}
var t0 = performance.now();
var t1 = performance.now();
var delta = 1; // delta is relative to 60fps
var frame = 0;
var deltas = [];
var canvas;
var context = setUpContext();
var w = 36; // degrees/second
var pos = 0; // degrees
var x = 1; // units
var y = 0; // units
var size = canvas.width / 9;
window.requestAnimationFrame(drawAll);
