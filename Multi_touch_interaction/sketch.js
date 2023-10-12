

let expansivaFont;

let touchTargets = [];


class touchTarget{  
  constructor (){
    this.isActive=false;
    this.x=0;
    this.y=0;
    this.startX=0;
    this.startY=0;
  }  
  draw(){
    
    this.distance=abs(this.startX-this.x)+abs(this.startY-this.y);
    
    
    stroke('white');
    noFill();
    //strokeWeight(distance/20);
    
    if (true){
      fill(0)
      ellipse(this.startX, this.startY, 12)
      noFill()
      ellipse(this.x, this.y, this.distance*1.5)  
      line(this.startX, this.startY, this.x,this.y);
      textAlign(CENTER);
      noStroke();
    
      
     //fill (0);
     //fllipse(this.x, this.y, 160)
      
      this.drawDial (this.x, this.y, 50, 160, this.distance);

      //ellipse(this.startX+((this.x-this.startX)/2), this.startY+((this.y-this.startY)/2), 50)
        
      fill ('white');
      textSize(24)
      //text(this.distance, this.startX+((this.x-this.startX)/2), this.startY+((this.y-this.startY)/2))
      textAlign(CENTER)

      text(this.distance, this.x, this.y)

    }
  }

  drawSliders(){
    
  let spacing = 50;
  let offsetX=10; 
  let offsetY=40;
  
    textSize(10)
    fill('white')
      
      for (let i=0; i<touchTargets.length; i++){
        rect( offsetX, i*50 + offsetY , touchTargets[i].distance+offsetY, 3)
        text(floor( touchTargets[i].distance), touchTargets[i].distance +offsetX +50 , i*50 + offsetY )
      }

  }

  
  drawDial(x, y, innerRadius, outerRadius, amount){
    
    for (let i=0; i<amount/5; i++){
      push()
      stroke('white');
      translate (x,y);
      rotate(i*3.3)

      line(innerRadius,0,outerRadius,0)
      
      pop()
    }  
  }
}

function preload(){
  expansivaFont=loadFont("Expansiva.otf");
  console.log('loaded');
}

function setup(){
 createCanvas(windowWidth,windowHeight);
  
   angleMode(DEGREES);
  
  for (let i=0; i<6; i++){
   touchTargets[i]= new touchTarget();
  }
  
      textFont(expansivaFont);
  textSize(36);
  
}

function draw() {
  background('black');
  
  updateTouchPosition();


  for (let i=0; i<touchTargets.length; i++){
    touchTargets[i].draw();
    touchTargets[i].drawSliders();
  }

}

function touchStarted() {  
  console.log(touches.length);
  
  //activate or deactivate the visualization of touchtargets
  if (touches.length == 0){
    touchTargets[0].isActive=true;
    touchTargets[0].startX=mouseX;
    touchTargets[0].startY=mouseY;
  }
  
  if (touches.length>0){
    for (let i=0; i< touches.length; i++){
    touchTargets[i+1].isActive=true;
    touchTargets[i+1].startX=touches[i].x;
    touchTargets[i+1].startY=touches[i].y;
    }
  }
}


function touchEnded(){
    for (let i=0; i<touchTargets.length; i++){
    touchTargets[i].isActive=false;
  }
}

function updateTouchPosition(){
    if (touches.length == 0){
      touchTargets[0].x=mouseX;
      touchTargets[0].y=mouseY;    
  }
  
  if (touches.length>0){
    for (let i=0; i< touches.length; i++){
    touchTargets[i+1].x=touches[i].x;
    touchTargets[i+1].y=touches[i].y;
    }
  }
}








document.addEventListener("gesturestart", function (e) {
	e.preventDefault();
    document.body.style.zoom = 0.99;
});

document.addEventListener("gesturechange", function (e) {
	e.preventDefault();

  document.body.style.zoom = 0.99;
});
document.addEventListener("gestureend", function (e) {
	  e.preventDefault();
    document.body.style.zoom = 1;
});

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}