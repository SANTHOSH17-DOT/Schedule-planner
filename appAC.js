const AC = document.querySelector('.swap-aclock');
const DC = document.querySelector('.swap-dclock');

var canvasA = document.querySelector('#canvas1');
var ctxA = canvasA.getContext('2d');
var radius = canvasA.height/2;
ctxA.translate(radius,radius);
radius = radius*0.9;

setInterval(()=>{drawClock(ctxA,(new Date).getHours(),(new Date).getMinutes(),(new Date).getSeconds())},1000);
// or setInterval(drawClock,1000);
function drawClock(ctx,updHours,updMin,updSec){
    
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fillStyle =document.querySelector('#clockBG').value;
    ctx.fill();
    drawFace(ctx,radius);
    drawNum(ctx,radius);
    drawTime(ctx,radius,updHours,updMin,updSec);
}
function drawFace(ctx,radius){
    
    //center piece
    ctx.beginPath();
    ctx.arc(0,0,radius*0.1,0,2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}
function drawNum(ctx,radius){
    var num;
    ctx.font = radius*0.15 + 'px arial';
    ctx.textBaseline = "middle";//because default is alphabetic which keeps the letter above the base line.
    ctx.textAlign = 'center';
    for(num=1;num<13;num++){
    ang = num*Math.PI/6;
    ctx.rotate(ang);//anticlockwise
    ctx.translate(0,-radius*0.85);
    ctx.rotate(-ang)//aligning the number
    ctx.fillStyle = document.querySelector('#clockNum').value;
    ctx.fillText(num.toString(),0,0);
    ctx.rotate(ang);
    ctx.translate(0,radius*0.85);
    ctx.rotate(-ang);//clockwise
}
}

function drawTime(ctx,radius,hour,min,sec){
    
    
    //document.querySelector('.boss2').addEventListener('click',)
    //adjust the hour min sec based on the input given by the user(maintain the diff between current time and manual time)
    //use set methods of date object
    hour = hour %12;
    //change the time to angles
    hour = (hour*Math.PI/6)+(min*Math.PI/(6*60))+(sec*Math.PI/(360*60));
    min = (min*Math.PI/30)+(sec*Math.PI/(30*60));
    sec = sec*Math.PI/30;
    
    drawHands(ctx,min,radius*0.8,radius*0.07,document.querySelector('#min').value);
    drawHands(ctx,sec,radius*0.9,radius*0.02,document.querySelector('#sec').value);
    drawHands(ctx,hour,radius*0.5,radius*0.07,document.querySelector('#hour').value);

}
function drawHands(ctx,angle,length,width,color){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0,0);
    ctx.rotate(angle);
    ctx.lineTo(0,-length);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.rotate(-angle);

}
const custbtn = document.querySelector('#custH');
custbtn.addEventListener('click',function(){
    
    if(document.querySelector('#clockF').style.display == 'flex'){
        
        custbtn.style.opacity = 1;
        document.querySelector('#clockF').style.display = '';//none display
    }
    else if(document.querySelector('#clockF').style.display == ''){
        
        custbtn.style.opacity = 0.5;
        document.querySelector('#clockF').style.display = 'flex';
    }
})
AC.addEventListener('click',function(){
    if(AC.style.opacity!=1){
        document.querySelector('.clock').style.display = 'none';
        canvasA.style.display = 'block';
        
        DC.style.opacity = 0.4;
        AC.style.opacity = 1;
        custbtn.style.display = 'block';
    }
});


DC.addEventListener('click',function(){
    if(DC.style.opacity!=1){
        document.querySelector('.clock').style.display = 'block';
        if(canvasA.style.display = 'flex'){
            canvasA.style.display = 'none';
        }
        else if(canvasM.style.display = 'flex'){
            canvasM.style.display = 'none';
        }
        document.querySelector('#clockF').style.display = '';
        AC.style.opacity = 0.4;
        DC.style.opacity = 1;
        custbtn.style.display='';
        custbtn.style.opacity = 1;
    }
});