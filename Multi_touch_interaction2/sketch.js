

let expansivaFont;
let RobotoFont;

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
    
    if (this.isActive){
      fill(0)
      ellipse(this.startX, this.startY, 12)
      noFill()

      stroke('#555')
      ellipse(this.x, this.y, this.distance*0.5)  
      line(this.startX, this.startY, this.x,this.y);
      textAlign(CENTER);
      noStroke();
    
      
     //fill (0);
     //fllipse(this.x, this.y, 160)
      
      this.drawDial (this.x, this.y, 20, 50, this.distance);

      //ellipse(this.startX+((this.x-this.startX)/2), this.startY+((this.y-this.startY)/2), 50)
        
      fill ('white');
      textSize(32)
      //text(this.distance, this.startX+((this.x-this.startX)/2), this.startY+((this.y-this.startY)/2))
      textAlign(LEFT)

      text(Math.round(this.distance), this.startX+20, this.startY)

      textFont(robotoFont);

      textSize(10)
      fill('#555')
     
      text ('x: '+this.x ,this.startX+20, this.startY+20)
      text ('y: '+this.y ,this.startX+20, this.startY+40)
      text (millis(),this.startX+20, this.startY+60)

      textFont(expansivaFont);

    }
  }

  
  drawDial(x, y, innerRadius, outerRadius, amount){
    
    for (let i=0; i<amount/5; i++){
      stroke('white');
        push()
        translate (x,y);
        rotate(i*3.3-this.distance/4)

        if (i*3.3>360){
          strokeWeight(20)
          stroke('#999')
          strokeCap(SQUARE)
          line(innerRadius+this.distance/6,0,outerRadius+this.distance/6,0)
        }else{
          stroke('#999')
          strokeWeight(1)
          line(innerRadius+this.distance/6,0,outerRadius+this.distance/6,0)
        }
        
      pop()
    }  
  }
}

function preload(){
  expansivaFont=loadFont("Expansiva.otf");
  robotoFont=loadFont("RobotoMono-Light.ttf");

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
    //touchTargets[i].drawSliders();
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