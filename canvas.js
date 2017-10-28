// Question 1
const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};
const colorArray=["#CC1C14", "#00FF48", "#00A7FF", "#C3CC14", "#A33AFF", "#CC4A14", "#FFB7A2", "#48CCA2", "#B2273C", "#2185C5", "#7ECEFD", "FFF6ES", "FF7F66"];

const createPoints=function(count, canvasWidth, canvasHeight){
  const arr=[]
  const loop=function(num, arr){
      if(num===0)
        return [];
      arr[num-1]={
        x: rand(canvasWidth-30),
        y: rand(canvasHeight-30),
        width: rand(50)+30,
        height: rand(50)+30,
        xDelta: 2*rand(2)-3,
        yDelta: 2*rand(2)-3,
        color: colorArray[rand(colorArray.length-1)]
  }
    return arr[num-1]+loop(num-1, arr)
}
  loop(count, arr);
  return arr;
}


// Question 2
 const canvas=document.getElementById('canvas');
 canvas.width=1000;
 canvas.height=500;
 const c=canvas.getContext('2d');
 const points=createPoints(rand(100)+150, canvas.width, canvas.height)

 const forEach = function(arr, func) {
     const helper = function(idx) {
         if(idx === arr.length)
             return;
         func(arr[idx]);
         helper(idx + 1);
     };
     helper(0);
 };

const draw=function(){
  c.clearRect(0,0,canvas.width,canvas.height)
  forEach(points, function(point){
    c.fillStyle=point.color;
    c.fillRect(point.x, point.y, point.width, point.height);
  });
}
const updateData=function(){
  forEach(points, function(point){
    if(point.x+point.width>=canvas.width || point.x<=0)
      point.xDelta*=-1;
    if(point.y+point.height>=canvas.height || point.y<=0)
      point.yDelta*=-1;
    point.x+=point.xDelta;
    point.y+=point.yDelta;
  });
}
const animate=function(){
  draw();
  updateData();
  requestAnimationFrame(animate);
}
//animate();
