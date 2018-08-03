var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    xScreen = w.innerWidth || e.clientWidth || g.clientWidth,
    yScreen = w.innerHeight|| e.clientHeight|| g.clientHeight;

var viewWidth = xScreen; //window.innerWidth*0.75;
var viewHeight = yScreen; //window.innerHeight*0.75;
var drawingCanvas = document.getElementById("drawing_canvas");
var timeStep = 1/60;
var time = 0;
var context;

// Pendulum variables
var mass1 = (xScreen+yScreen)*0.004;
var mass2 = (xScreen+yScreen)*0.004;
var mu = 0;
var Theta1 = Math.PI * 0.5;
var Theta2 = Math.PI * 0.5;
var d2Theta1 = 0;
var d2Theta2 = 0;
var dTheta1 = 0;
var dTheta2 = 0;
var length1 = (xScreen+yScreen)*0.05;
var length2 = (xScreen+yScreen)*0.05;
var anchorX = viewWidth * 0.5;
var anchorY = viewHeight * 0.3;
var g = 9.8;

var mathTimeScale = 5.6;

// Graphics variables
var circ1, circ2, line1, line2, trail1;

function initDrawingCanvas() {
    drawingCanvas.width = viewWidth;
    drawingCanvas.height = viewHeight;
    context = drawingCanvas.getContext('2d');
}

function initGraphics() {
    circ1 = {x: anchorX + length1 * Math.sin(Theta1), y: anchorY+length1*Math.cos(Theta1), radius: mass1};
    circ2 = {x: anchorX + length1 * Math.sin(Theta1) + length2 * Math.sin(Theta2), y: anchorY + length1 * Math.cos(Theta1) + length2 * Math.cos(Theta2), radius: mass2};
    line1 = {x0: anchorX, y0: anchorY, x: 0, y: 0};
    line2 = {x0: 0, y0: 0, x: 0, y: 0};
    trail1 = [];
}

function update() {
    var dt = timeStep * mathTimeScale;
    mu = 1 + mass1/mass2;
    d2Theta1  =  (g*(Math.sin(Theta2)*Math.cos(Theta1-Theta2)-mu*Math.sin(Theta1))-
        (length2*dTheta2*dTheta2+length1*dTheta1*dTheta1*Math.cos(Theta1-Theta2))
        *Math.sin(Theta1-Theta2))/(length1*(mu-Math.cos(Theta1-Theta2)*Math.cos(Theta1-Theta2)));
    d2Theta2  =  (mu*g*(Math.sin(Theta1)*Math.cos(Theta1-Theta2)-Math.sin(Theta2))
        +(mu*length1*dTheta1*dTheta1+length2*dTheta2*dTheta2*Math.cos(Theta1-Theta2))*
        Math.sin(Theta1-Theta2))/(length2*(mu-Math.cos(Theta1-Theta2)*Math.cos(Theta1-Theta2)));

    dTheta1 += d2Theta1 * dt;
    dTheta2 += d2Theta2 * dt;
    Theta1 += dTheta1 * dt;
    Theta2 += dTheta2 * dt;

    circ1.x = anchorX+length1*Math.sin(Theta1);
    circ1.y = anchorY+length1*Math.cos(Theta1);
    circ2.x = anchorX+length1*Math.sin(Theta1)+length2*Math.sin(Theta2);
    circ2.y = anchorY+length1*Math.cos(Theta1)+length2*Math.cos(Theta2);

    line1.x = circ1.x;
    line1.y = circ1.y;
    line2.x0 = circ1.x;
    line2.y0 = circ1.y;
    line2.x = circ2.x;
    line2.y = circ2.y;

    trail1.unshift({x:circ2.x, y:circ2.y});
    if (trail1.length > 2048) trail1.pop();
}

function draw() { 
    context.clearRect(0,0,viewWidth,viewHeight);
    context.fillStyle = '#fff';
    context.beginPath();
    context.arc(anchorX, anchorY, 5, 0, Math.PI * 2);
    context.fill();

    context.globalCompositeOperation = 'destination-over';
    context.strokeStyle = '#fff';

    drawLine(line1);
    drawLine(line2);

    context.strokeStyle = '#fff';
    drawTrail(trail1);

    context.fillStyle = '#fff';
    context.globalCompositeOperation = 'source-over';

    drawCircle(circ1);
    drawCircle(circ2);
}

function drawCircle(c) {
    context.beginPath();
    context.arc(c.x, c.y, c.radius, 0, 2 * Math.PI, false);
    context.fill();
}

function drawLine(l) {
    context.beginPath();
    context.moveTo(l.x0, l.y0);
    context.lineTo(l.x, l.y);
    context.stroke();
}

function drawTrail(t) {
    context.beginPath();
    context.moveTo(t[0].x, t[0].y);

    for (var i = 1; i < t.length; i++) {
        context.lineTo(t[i].x, t[i].y);
    }

    context.stroke();
}

function loop() {
    update();
    draw();
    time += timeStep;
    requestAnimationFrame(loop);
}

window.onload = function() {
    initDrawingCanvas();
    initGraphics();
    requestAnimationFrame(loop);
};

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}