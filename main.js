var canvas=document.querySelector("canvas");
var ctx=canvas.getContext("2d");

var width=canvas.width=window.innerWidth;
var height=canvas.height=window.innerHeight;

var balls=[];

var para=document.querySelector("p");
var ballsCount=0;
// alert(para);

function random(min,max){
	var num=Math.floor(Math.random()*(max-min))+min;
	return num;
}

function Shape(x, y, velX, velY,exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists=exists;
}

function Ball(x,y,velX,velY,exists,color,size){
	Shape.call(this,x,y,velX,velY,exists);
	this.color=color;
	this.size=size;
}
Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle=this.color;
	ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
	ctx.fill();
	// body...
};
Ball.prototype.update=function(){
	if((this.x+this.size)>=width){
		this.velX=-(this.velX);
	}

	if((this.x-this.size)<=0){
		this.velX=-(this.velX);
	}

	if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
    }

    this.x=this.x+this.velX;
    this.y=this.y+this.velY;
}



Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}



//define EvilCircle()
function EvilCircle(x,y,exists){
	Shape.call(this,x,y,exists);
	this.velX=20;
	this.velY=20;
	this.size=10;
	this.color="white";
}

EvilCircle.prototype.draw=function(){
	ctx.beginPath();
    ctx.lineWidth=3;
	ctx.strokeStyle=this.color;
	ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
	ctx.stroke();

}
EvilCircle.prototype.checkBounds=function(){
    if((this.x+this.size)>=width){
    	this.x=this.x-this.size;
		// this.velX=-(this.velX);
	}

	if((this.x-this.size)<=0){
		this.x=this.x+this.size;
		// this.velX=-(this.velX);
	}

	if ((this.y + this.size) >= height) {
		this.y=this.y-this.size;
    // this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
    	this.y=this.y+this.size;
    // this.velY = -(this.velY);
    }
}

EvilCircle.prototype.setControls=function(){
	var _this=this;
	window.onkeydown=function(e){
		if(e.keyCode===65){        //a
			_this.x=_this.x-_this.velX;
		}else if(e.keyCode==68){   //d
			_this.x=_this.x+_this.velX;
		}else if(e.keyCode===87){  //s
			_this.y=_this.y-_this.velY;
		}else if(e.keyCode===83){  //w
			_this.y=_this.y+_this.velY;
		}

	}
}

EvilCircle.prototype.collisionDetect=function(){
	for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists===true) {
     var dx=this.x-balls[j].x;
     var dy=this.y-balls[j].y;
     var distance=Math.sqrt(dx*dx+dy*dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        balls[j].size=0;
        ballsCount--;
        para.textContent="Ball count: "+ballsCount;
      }

    }
  }
}

var evilCircle=new EvilCircle(random(0,width),random(0,height),true);
evilCircle.setControls();
function loop(){
	ctx.fillStyle="rgba(0,0,0,0.25)";
	ctx.fillRect(0,0,width,height);

	while(balls.length<25){
		var ball=new Ball(
			random(0,width),
			random(0,height),
			random(-7,7),
			random(-7,7),
			true,
			"rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")",
			random(10,20)
			);
		balls.push(ball);
		ballsCount++;
		para.textContent = "Ball count: "+ballsCount;
	}

	 for (var i = 0; i < balls.length; i++) {
	 	if(balls[i].exists===true){
             balls[i].draw();
             balls[i].update();
             balls[i].collisionDetect();
       }
  }
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
  
   requestAnimationFrame(loop);
}
loop();
// if(ballsCount===0){
// 	document.write("Game Over!");
// 	var button=document.createElement("button");
// 	button.textContent="Start a new game";
// 	document.body.appendChild(button);
// 	button.onclick=loop;
// }

 // var testBall = new EvilCircle(50, 100, true);
 // testBall.draw();