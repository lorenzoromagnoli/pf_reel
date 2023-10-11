const broker = 'wss://pininfarinahmi.cloud.shiftr.io/';
let client;

let options = {
  clean: true,
  connectTimeout: 10000,
  clientId: 'hmi_remote-' + Math.floor(Math.random()*1000000) ,
  username: 'pininfarinahmi',
  password: 'Nj8jDEZUZa4YvdZl'
}
// topic to subscribe to when you connect:
let topic = '/gauge';


let gaugeValue=0



function setup() {
  createCanvas(windowWidth, windowWidth);
  
  // set text of localDiv:
  console.log('trying to connect');
  // attempt to connect:
  client = mqtt.connect(broker, options);
  // set listeners:
  client.on('connect', onConnect);
  client.on('close', onDisconnect);
  client.on('message', onMessage);
  client.on('error', onError);
  
  
  
}

function draw() {
  background(0)
    rect(0,0, width, map(gaugeValue,0,350,0,height));

}


function touchMoved() {  
  
  let newValue; 
  if (touches.length>0){
    newValue=touches[0].y;
  }
  else{
    newValue=mouseY;
  }
  
  if (newValue!=gaugeValue){
    newValue=floor(map(newValue,0,height,0,350,true));
    gaugeValue=newValue;
    
    client.publish(topic, ""+gaugeValue);

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

}


