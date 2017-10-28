const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};

const isPaused=false;

const array=[];
//images
const stone1=new Image();
stone1.src="stone1.png"
const stone2=new Image();
stone2.src="stone2.png"
const stone3=new Image();
stone3.src="stone3.png"
const stone4=new Image();
stone4.src="stone4.png"
const spaceshipImg=new Image();
spaceshipImg.src="spaceship.png"
const backImg=new Image();
backImg.src="bg.png"
const gameOver=new Image();
gameOver.src="gameover.jpg"

//canvas
const canvas=document.getElementById('canvas');
const c=canvas.getContext("2d");
canvas.width=1250;
canvas.height=500;
canvas.style="position: absolute; top: 15%; left: 4%";
const hero={
  x: 0,
  y: canvas.height/2,
  width: 45,
  height: 45
}

const images=[stone1,stone2,stone3,stone4]
const createPoints=function(count){
  const arr=[];
  const loop=function(num, arr){
      if(num===0)
        return [];
      arr[num-1]={
        x: canvas.width,
        y: rand(6)*80-60,
        width: 60,
        height: 60,
        xDelta: rand(2)+0.5,
        distance: 150,
        img: images[rand(4)-1]
  }
    return arr[num-1]+loop(num-1, arr);
}
  loop(count, arr);
  return arr;
}
const fillArray=function(array){
	array.length+=1;
	array[array.length-1]=createPoints(rand(5))
	return array;
}

 const forEach = function(arr, func) {
     const helper = function(idx) {
         if(idx === arr.length)
             return;
         func(arr[idx]);
         helper(idx + 1);
     };
     helper(0);
 };
 fillArray(array);

const draw=function(){
  c.clearRect(0,0,canvas.width, canvas.height)
  c.drawImage(backImg, 0,0,canvas.width, canvas.height)
  forEach(array, function(point){
    forEach(point, function(place){
      c.drawImage(place.img, place.x, place.y, place.width, place.height)
    })
  });
  c.drawImage(spaceshipImg, hero.x, hero.y, hero.width, hero.height)
}

const update=function(){
  if(array[0][0].x<=canvas.width-array[0][0].distance){
    fillArray(array);
    array[0][0].distance+=150;
  }
	forEach(array, function(point){
			forEach(point, function(place){
        place.x-=place.xDelta;
        if (hero.x < place.x + place.width  && hero.x + hero.width  > place.x &&
  		hero.y < place.y + place.height && hero.y + hero.height > place.y) {
          c.clearRect(0,0,canvas.width, canvas.height)
          c.drawImage(gameOver,0,0,canvas.width, canvas.height)
          isPaused=!isPaused
              }

      });
});
  if(hero.x<=0)
    hero.x=0
  else if(hero.x+hero.width>=canvas.width)
    hero.x=canvas.width-hero.width
  else if(hero.y<=0)
    hero.y=0
  else if(hero.y+hero.height>=canvas.height)
    hero.y=canvas.height-hero.height
};

const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

document.addEventListener('keydown', function(event) {
	if(event.keyCode === upKey)
        hero.y-=25
  else if(event.keyCode===downKey)
        hero.y+=25
  else if(event.keyCode===rightKey)
        hero.x+=25
  else if(event.keyCode===leftKey)
        hero.x-=25
}, false);

const animate=function(){
  if(!isPaused){
  draw();
  update()
  requestAnimationFrame(animate);
}
}
animate();
