let faceapi;
let video;
let detections;
let newDetections;

let videoReady;

let eyeSize; 

let eyebrow1;
let mouth1;
let eye1;

let eyebrow2;
let mouth2;
let eye2;
let hair2;

let eyebrow3;
let mouth3;
let eye3;
let nose3;

let background;

let activeFace=0;

function keyTyped() {
  if (key === '1') {
    activeFace = 0;
  } else if (key === '2') {
    activeFace = 1;
  } else if (key === '3') {
    activeFace = 2;
  }else if (key === '4') {
    activeFace = 3;
  }else if (key === '5') {
    activeFace = 4;
  }else if (key === '6') {
    activeFace = 5;
  }

}

function preload(){
  
  bg=loadImage("assets/bg.png");
  
  eyebrow1=loadImage('assets/eyebrow1.png');
  eye1=loadImage('assets/eye1.png');
  mouth1=loadImage('assets/mouth1.png')
  
  eyebrow2=loadImage('assets/eyebrow2.png');
  eye2=loadImage('assets/eye2.png');
  mouth2=loadImage('assets/mouth2.png')
  hair2=loadImage('assets/hair2.png')

  eyebrow3=loadImage('assets/eyebrow3.png');
  eye3=loadImage('assets/eye3.png');
  mouth3=loadImage('assets/mouth3.png')
  nose3=loadImage('assets/nose3.png')
  
  eye4L=loadImage('assets/eye4-l.png')
  altEye=loadImage('assets/eye4-r.png')
  mouth4=loadImage('assets/mouth4.png')

  
}

// by default all options are set to true
const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}


function setup() {
    createCanvas(1075, 752);

    // load up your video
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); // Hide the video element, and just show the canvas
    faceapi = ml5.faceApi(video, detection_options, modelReady)
    textAlign(RIGHT);
}

function draw(){
      image( bg, 0,0, )

  push()
    translate(width+width/4,0);
    scale(-1, 1);

  if (videoReady){
    //background(0);
    lerpDetections();
    
    
    switch(activeFace){
      case 0 :
          stroke('gray')
          stroke('white')
          drawSimplifiedFace();
          break;
        
      case 1 :
          drawAvatar(eyebrow1, eye1, mouth1);
          break;
        
      case 2 :
        drawAvatar(eyebrow2, eye2, mouth2 ,hair2);
        break;
        
      case 3 :
        drawAvatar(eyebrow3, eye3, mouth3, 0, nose3);
        break;
      
      case 4 :
        image(video, 0,0, width, height)
        drawFace()
        break;
      case 5 :
        drawAvatar(eyebrow3, eye4L, mouth4, 0, 0, altEye);
        break;
        
    }
    
   
    //drawSimplifiedFace();
    //drawAvatar(eyebrow1, eye1, mouth1);
    //drawAvatar(eyebrow2, eye2, mouth2 ,hair2);
    //drawAvatar(eyebrow3, eye3, mouth3, 0, nose3);
  }
  
  pop()
  

}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)
  
  videoReady=true;

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }
    // console.log(result)
    latestDetections = result;

    // background(220);
    if (latestDetections) {
        if (latestDetections.length > 0) {
          newDetections=latestDetections
        }

    }
    faceapi.detect(gotResults)
}

  
  
  function drawFace(){
    if (detections){
      drawLandmarks(detections)  
    }
  }
  
  
function drawAvatar(eyebrow, eye, mouth, hair, nose, altEye){
  
  
  imageMode(CENTER)
  if(detections){
          
    
      //draw the eyebrows
      //left
      let leftEyebrowLeft=createVector(detections[0].landmarks.getLeftEyeBrow()[0].x,detections[0].landmarks.getLeftEyeBrow()[0].y);
      let leftEyebrowRight=createVector(detections[0].landmarks.getLeftEyeBrow()[4].x,detections[0].landmarks.getLeftEyeBrow()[4].y);
      let leftEyebrowCenter=createVector(detections[0].landmarks.getLeftEyeBrow()[2].x,detections[0].landmarks.getLeftEyeBrow()[2].y);
      let leftEyeBrowSize=leftEyebrowLeft.dist(leftEyebrowRight) *0.004
      let leftEyeRotation= p5.Vector.sub(leftEyebrowLeft, leftEyebrowRight);

      push()
        translate(leftEyebrowCenter.x,leftEyebrowCenter.y)
        scale(leftEyeBrowSize)
        rotate(leftEyeRotation.heading()+PI)
        image(eyebrow, 0, 0);
      pop()

      //right
      let rightEyebrowLeft=createVector(detections[0].landmarks.getRightEyeBrow()[0].x,detections[0].landmarks.getRightEyeBrow()[0].y);
      let rightEyebrowRight=createVector(detections[0].landmarks.getRightEyeBrow()[4].x,detections[0].landmarks.getRightEyeBrow()[4].y);
      let rightEyebrowCenter=createVector(detections[0].landmarks.getRightEyeBrow()[2].x,detections[0].landmarks.getRightEyeBrow()[2].y);
      let rightEyeBrowSize=rightEyebrowLeft.dist(rightEyebrowRight) *0.004
      let rightEyeRotation= p5.Vector.sub(rightEyebrowLeft, rightEyebrowRight);

      push()
        translate(rightEyebrowCenter.x,rightEyebrowCenter.y)
        scale(rightEyeBrowSize)
        rotate(rightEyeRotation.heading()+PI)
        image(eyebrow, 0, 0);
      pop()
    
    
    
    
  //draw the eyes
  let rightEyeLeft= createVector(detections[0].landmarks.getRightEye()[0].x,detections[0].landmarks.getRightEye()[0].y);
  let rightEyeRight= createVector(detections[0].landmarks.getRightEye()[3].x,detections[0].landmarks.getRightEye()[3].y);
  let rightEyeDistance= rightEyeLeft.dist(rightEyeRight);
  let rightEyeCenter= p5.Vector.lerp(rightEyeLeft, rightEyeRight, 0.5);
  let rightEyeScale=rightEyeDistance*0.008
  

  push()
    translate(rightEyeCenter.x,rightEyeCenter.y)
    scale(rightEyeScale)
    rotate(rightEyeRotation.heading()+PI)
    image(eye, 0, 0);
  pop()
    
    
    
  let leftEyeLeft= createVector(detections[0].landmarks.getLeftEye()[0].x,detections[0].landmarks.getLeftEye()[0].y);
  let leftEyeRight= createVector(detections[0].landmarks.getLeftEye()[3].x,detections[0].landmarks.getLeftEye()[3].y);
  let leftyEyeDistance= leftEyeLeft.dist(leftEyeRight);
  let leftEyeCenter= p5.Vector.lerp(leftEyeLeft, leftEyeRight, 0.5);
  let leftEyeScale=leftyEyeDistance*0.008

  if (altEye){
    push()
      translate(leftEyeCenter.x,leftEyeCenter.y)
      scale(leftEyeScale)
      rotate(leftEyeRotation.heading()+PI)
      image(altEye, 0, 0);
    pop()  
  }else{
    push()
      translate(leftEyeCenter.x,leftEyeCenter.y)
      scale(leftEyeScale)
      rotate(leftEyeRotation.heading()+PI)
      image(eye, 0, 0);
    pop()  
  }
  
    
    
  //draw the hair
    
  if (hair){
    let centerEye= p5.Vector.lerp(leftEyeLeft, rightEyeRight, 0.5);
      imageMode(BOTTOM)
      push()
      translate(centerEye.x,centerEye.y-80)
      scale(leftEyeScale)
      rotate(leftEyeRotation.heading()+PI)
      image(hair, 0, 0);
    pop()

  }
    

  
    
  
  //draw the mouth

  let centerMouth=createVector(detections[0].landmarks.getMouth()[14].x,detections[0].landmarks.getMouth()[14].y);
  let bottomMouth=createVector(detections[0].landmarks.getMouth()[9].x,detections[0].landmarks.getMouth()[9].y);

  let faceAngle = p5.Vector.sub(centerMouth, bottomMouth);
  let mouthsize=centerMouth.dist(bottomMouth)*2
  
  push()
  noStroke()
  translate(centerMouth.x,centerMouth.y-30)
  scale(mouthsize*0.008)
  rotate (faceAngle.heading()+PI/2);
  image(mouth,0,0)
  pop()
    
      // draw the nose
    if (nose){
        let nosePosition=createVector(detections[0].landmarks.getNose()[1].x,detections[0].landmarks.getNose()[1].y);
       imageMode(BOTTOM)
      push()
      translate(nosePosition.x,nosePosition.y)
      scale(mouthsize*0.004)
      rotate(leftEyeRotation.heading()+PI)
      image(nose, 0, 0);
    pop()
    }
  }
 }
  

function drawSimplifiedFace(){
  if(detections){
    
  let leftEyeLeft= createVector(detections[0].landmarks.getLeftEye()[0].x,detections[0].landmarks.getLeftEye()[0].y);
  let leftEyeRight= createVector(detections[0].landmarks.getLeftEye()[3].x,detections[0].landmarks.getLeftEye()[3].y);
  
  let leftEyeDistance= leftEyeLeft.dist(leftEyeRight);
  let leftEyeCenter= p5.Vector.lerp(leftEyeLeft, leftEyeRight, 0.5);
    
  
  let rightEyeLeft= createVector(detections[0].landmarks.getRightEye()[0].x,detections[0].landmarks.getRightEye()[0].y);
  let rightEyeRight= createVector(detections[0].landmarks.getRightEye()[3].x,detections[0].landmarks.getRightEye()[3].y);
  
  let rightEyeDistance= rightEyeLeft.dist(rightEyeRight);
  let rightEyeCenter= p5.Vector.lerp(rightEyeLeft, rightEyeRight, 0.5);

    let leftEyebrowLeft=createVector(detections[0].landmarks.getLeftEyeBrow()[0].x,detections[0].landmarks.getLeftEyeBrow()[0].y);
  let leftEyebrowRight=createVector(detections[0].landmarks.getLeftEyeBrow()[4].x,detections[0].landmarks.getLeftEyeBrow()[4].y);
    

  let rightEyebrowLeft=createVector(detections[0].landmarks.getRightEyeBrow()[0].x,detections[0].landmarks.getRightEyeBrow()[0].y);
  let rightEyebrowRight=createVector(detections[0].landmarks.getRightEyeBrow()[4].x,detections[0].landmarks.getRightEyeBrow()[4].y);

    
  let centerMouth=createVector(detections[0].landmarks.getMouth()[14].x,detections[0].landmarks.getMouth()[14].y);
  let bottomMouth=createVector(detections[0].landmarks.getMouth()[9].x,detections[0].landmarks.getMouth()[9].y);
  
  let faceAngle = p5.Vector.sub(centerMouth, bottomMouth);1
    
  let distanceEyeEyebrowLeft=leftEyebrowRight.dist(leftEyeRight)
  let distanceEyeEyebrowRight=rightEyebrowRight.dist(rightEyeRight)
    
  let eyeSizeLeft= leftEyeDistance/2 *2 *distanceEyeEyebrowLeft/35
  let eyeSizeRight= rightEyeDistance/2 *2 *distanceEyeEyebrowRight/35

  
  //draw the eyes
  fill (255)
  ellipse(leftEyeCenter.x, leftEyeCenter.y, eyeSizeLeft)
  ellipse(rightEyeCenter.x, rightEyeCenter.y, eyeSizeRight)
    
  //draw the eyebrows
  strokeWeight (4)
  line(leftEyebrowLeft.x,leftEyebrowLeft.y, leftEyebrowRight.x, leftEyebrowRight.y)
  line(rightEyebrowLeft.x,rightEyebrowLeft.y, rightEyebrowRight.x, rightEyebrowRight.y)

  //draw the mouth
  let mouthsize=centerMouth.dist(bottomMouth)*2

  push()
  noStroke()
  translate(centerMouth.x,centerMouth.y-40)
  rotate (faceAngle.heading()+PI/2);
  arc(0, 0, mouthsize, mouthsize, 0, PI)  
  pop()
    
    
  }
 }
  
  
function drawBox(detections){
    for(let i = 0; i < detections.length; i++){
        const alignedRect = detections[i].alignedRect;
        const x = alignedRect._box._x
        const y = alignedRect._box._y
        const boxWidth = alignedRect._box._width
        const boxHeight  = alignedRect._box._height
        
        noFill();
        stroke(161, 95, 251);
        strokeWeight(2);
        rect(x, y, boxWidth, boxHeight);
    }
}
  
 
function lerpDetections(){
  lerpFeature('mouth');
  lerpFeature('nose');
  lerpFeature('leftEye');
  lerpFeature('rightEye');
  lerpFeature('rightEyeBrow');
  lerpFeature('leftEyeBrow');
  lerpFeature('jawOutline');

}  
  
function lerpFeature(featureName){
  
  if (newDetections && !detections){
    console.log("initializing", newDetections)
    detections=newDetections;
    console.log(detections)
  }
  
  if (newDetections){
    let newFeature=newDetections[0].parts[featureName]
    let currentFeature= detections[0].parts[featureName]  
  
  
  for(let i = 0; i < newFeature.length; i++){
    let newVector=createVector(newFeature[i]._x,newFeature[i]._y)
    let currentVector=createVector(currentFeature[i]._x,currentFeature[i]._y)
    currentVector.lerp(newVector,0.1);
    
    //console.log(currentVector.x, currentVector.y)
 
    detections[0].parts[featureName][i]._x=currentVector.x;
    detections[0].parts[featureName][i]._y=currentVector.y;
  }
  }
}  

function drawLandmarks(detections){
    noFill();
    stroke(161, 95, 251)
    strokeWeight(2)

    for(let i = 0; i < detections.length; i++){
        const mouth = detections[i].parts.mouth; 
        const nose = detections[i].parts.nose;
        const leftEye = detections[i].parts.leftEye;
        const rightEye = detections[i].parts.rightEye;
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;
        const jawOutline = detections[i].parts.jawOutline;

        drawPart(mouth, true);
        drawPart(nose, false);
        drawPart(leftEye, true);
        drawPart(leftEyeBrow, false);
        drawPart(rightEye, true);
        drawPart(rightEyeBrow, false);
        drawPart(jawOutline, false);
    }

}

function drawPart(feature, closed){
    
    beginShape();
    for(let i = 0; i < feature.length; i++){
        const x = feature[i]._x
        const y = feature[i]._y
        vertex(x, y)
    }
    
    if(closed === true){
        endShape(CLOSE);
    } else {
        endShape();
    }
    for(let i = 0; i < feature.length; i++){
      text(i,feature[i]._x,feature[i]._y )
    }
    
}