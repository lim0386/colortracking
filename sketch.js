let c;
let img;
let r, g, b;
let osc, playing, midi;

function setup() {
  // createCanvas(640, 480);
  createCanvas(windowWidth, windowHeight);
  osc = new p5.Oscillator("sine");
  img = createCapture(VIDEO);
  img.hide();
  midi = 0;
}

function draw() {
  // 0=red, 60=yellow, 120=green, 180=cyan, 240=blue, 300=magenta
  image(img, 0, 0, 640, 480);

  colorTracking();
}
function playOscillator() {
  osc.start();
  playing = true;
}
function mousePressed() {
  playOscillator();
}
function mouseReleased() {
  osc.amp(0, 0.5);
  playing = false;
}

function colorTracking() {
  r = 0;
  g = 0;
  b = 0;
  // let realPic = get(width / 2 - 50, height / 2 - 50, 100, 100);
  noFill();
  // fill(255, 0, 127);
  noStroke();
  stroke(220);
  rect(width / 2 - 50, height / 2 - 50, 100, 100);
    let realPic = get(width / 2 - 50, height / 2 - 50, 100, 100);

  let allImage = realPic.width * realPic.height;
  // let allImage = width * height
  realPic.loadPixels();
  let i = 0;
  while (i < allImage * 4) {
    // for (let i = 0; i < allImage; i+=4) {
    r += realPic.pixels[i];
    g += realPic.pixels[i + 1];
    b += realPic.pixels[i + 2];
    i = i + 4;
  }
  // console.log(r/allImage, g/allImage, b/allImage);
  c = hue(color(r / allImage, g / allImage, b / allImage));
  console.log(c, midi);
  let x1 = map(c, 0, 360, 262, 523);
  midi = freqToMidi(x1);
  if (playing) {
    osc.freq(x1, 0.1);
    osc.amp(1, 0.1);
  }
}
