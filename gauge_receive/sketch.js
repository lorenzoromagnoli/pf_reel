let expansivaFont;

const broker = 'wss://pininfarinahmi.cloud.shiftr.io/';
let client;


let theme1={
  bgColor: '#000000',
  frontColor:'#999999',
  frontColorBright:'#ffffff',
  startGradient: '#000000',
  endGradient: '#ffffff',
  accentColor: '#ff0000'
}


let theme2={
  bgColor:'#ff0000',
  frontColor:'#fff',
  frontColorBright:'#ffffff',
  startGradient: '#8690A2',
  endGradient: '#ffffff',
  accentColor: '#ffffff'
}

let theme3={
  bgColor: '#CFCFCF',
  frontColor:'#999999',
  frontColorBright:'#ffffff',
  startGradient: '#000000',
  endGradient: '#ffffff',
  accentColor: '#ff0000'
}
let theme4={
  bgColor:'#FFF2DE',
  frontColor:'#2936FD',
  frontColorBright:'#ffffff',
  startGradient: '#8690A2',
  endGradient: '#004BD1',
  accentColor: '#003BFF'
}

let colors={
  bgColor:0,
  frontColor:0,
  frontColorBright:0,
  startGradient: 'black',
  endGradient: 'black',
  accentColor: 0
}


let options = {
  clean: true,
  connectTimeout: 10000,
  clientId: 'hmi_remote-' + Math.floor(Math.random()*1000000) ,
  username: 'pininfarinahmi',
  password: 'Nj8jDEZUZa4YvdZl'
}
// topic to subscribe to when you connect:
let topic = '/gauge';


let gaugeValue=0;

function preload(){ expansivaFont=loadFont("Expansiva.otf");
  console.log('loaded');
}

function setColors(colorTheme){
  colors.bgColor=color(colorTheme.bgColor)
  colors.frontColor=color(colorTheme.frontColor)
  colors.frontColorBright=color(colorTheme.frontColorBright)

  colors.startGradient=colorTheme.startGradient
  colors.endGradient=colorTheme.endGradient
  colors.accentColor=color(colorTheme.accentColor)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
   // set text of localDiv:
  console.log('trying to connect');
  // attempt to connect:
  client = mqtt.connect(broker, options);
  // set listeners:
  client.on('connect', onConnect);
  client.on('close', onDisconnect);
  client.on('message', onMessage);
  client.on('error', onError);
  
   textFont(expansivaFont);
}

function draw() {
  
  
  background(colors.bgColor)
  fill(colors.frontColor)
  
  
  push()
  translate(0,70)
  drawGrid(100);
  drawGauge()
  pop()
  

  push()
  translate(0,50)
  drawSpeed(gaugeValue, "MPH")
  drawTime()
  drawFixedTime('12:34:12')
  pop()
  if (gaugeValue>(350/100)*80){
    setColors(theme2)    
  }else{
    setColors(theme1)
  }

}

let screenPadding=100; 
let gaugeHeight=100;


function drawSpeed(value, unit){
  noStroke()
  fill(colors.frontColorBright)
  textSize(75)
  textAlign(LEFT)
  text(value, screenPadding, 300)  
  textSize(18)
  text(unit, screenPadding, 300+20)  
} 



function drawGauge(){
  strokeWeight(gaugeHeight)
  strokeCap(SQUARE)
  
  let gradientWidth=map (gaugeValue,0,350,0,width-(2*screenPadding),true)
                    
  //ellipse(screenPadding,screenPadding+gaugeHeight-gaugeHeight/2,1)
  
  gradientLine(screenPadding,
               screenPadding+gaugeHeight/2,
               screenPadding+gradientWidth,
               screenPadding+gaugeHeight-gaugeHeight/2, 
               colors.startGradient,
               colors.endGradient)
}

function drawGrid(segments){
  strokeWeight(1) 
  let spacing= (windowWidth-screenPadding*2)/segments
  
  for (let i=0; i<segments; i++ )
    {
      if (i > (segments/100)*80 ){
        stroke(colors.accentColor)
      }else{
        stroke(colors.frontColor)
      }
      line(screenPadding+i*spacing,
           screenPadding,
           screenPadding+i*spacing, 
           screenPadding+gaugeHeight)
    }
}

function drawFixedTime(timeString){
    
   let positionX=width-screenPadding;
  let positionY=300+20;
  let fontSpace=20;
  
  for (let i=0; i<timeString.length; i++ ){
    text(timeString[timeString.length-i-1],
         positionX -i*fontSpace,
         positionY  )
  }
}

function drawTime(){
  
  textAlign(CENTER)
  let time=millis();
  
  let milliseconds=nf(floor(time%1000,3))
  let seconds = nf(floor((time/1000)%60),2)  
  let minutes = nf(floor((time/60000)%60),2)

   noStroke()
  fill('white')
  textSize(25)
  textAlign(RIGHT)
  let timeString=minutes+":"+seconds+":"+milliseconds;
  let fontSpace=25;
  let positionX=width-screenPadding;
  let positionY=300;
  
  
  for (let i=0; i<timeString.length; i++ ){
    text(timeString[timeString.length-i-1],
         positionX -i*fontSpace,
         positionY  )
  }
  //text("0"+seconds+":"+milliseconds, width-screenPadding, height/2)  
  textSize(12)
  //text(unit, screenPadding, height/2+20) 
}

function touchMoved() {  
   
  if (touches.length>0){
    gaugeValue=touches[0].x;
  }
  else{
    gaugeValue=mouseX;
  }
}


function onConnect() {
  // update localDiv text:
  console.log('connected to broker. Subscribing...')
  // subscribe to the topic:
  client.subscribe(topic, onSubscribe);
}

// handler for mqtt disconnect event:
function onDisconnect() {
  // update localDiv text:
  console.log('disconnected from broker.')
}

// handler for mqtt error event:
function onError(error) {
  // update localDiv text:
  localDiv.innerHTML = error;
}

// handler for mqtt subscribe event:
function onSubscribe(response, error) {
  if (!error) {
    // update localDiv text:
    console.log('Subscribed to broker.');
  } else {
    // update localDiv text with the error:
    console.log(error);
  }
}

// handler for mqtt message received event:
function onMessage(topic, payload, packet) {
  let receivedGaugeValue=payload.toString();
    console.log("received", topic, receivedGaugeValue)
    gaugeValue=int(receivedGaugeValue)
  }

function gradientLine(x1, y1, x2, y2, color1, color2) {
  // linear gradient from start to end of line
  var grad = this.drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);

  this.drawingContext.strokeStyle = grad;

  line(x1, y1, x2, y2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}