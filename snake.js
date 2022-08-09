console.log("Snake Game");
let speed = 5;
let count = 0;
let lastPaintTime = 0;
score = 0;
inputDir = {x:0 , y:0};
let snakeArr = [
    {x: 13,y: 15}
];
let food = {x: 6,y: 7};
main();
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    // console.log(ctime);
    lastPaintTime = ctime;
    gameEngine();
}
// Function to detect Collision .....
function isCollide(snake) {
   
    for(let i = 1;i < snake.length;i++){
        if((snake[i].x === snake[0].x) && (snake[i].y === snake[0].y)){
            return true;
        }
    }
    if(snake[0].x > 18 || snake[0].y > 18 || snake[0].x <= 0 || snake[0].y <= 0) return true;
    return false;
}

function gameEngine(){
    // updating snake and food .

    // what to do when collided
    if(isCollide(snakeArr)){
        inputDir = {x:0 , y:0};
        snakeArr = [
            {x: 13,y: 15}
        ];
        food = {x: 6,y: 7};
        alert(`Game Over, Your Score is ${score} .
        Press any Key to start Again`);
        let score_update = document.getElementById('score');
        score_update.innerText = `Score : 0`;
        let speed_up = document.getElementById('speed');
        speed_up.innerText = `Speed : 0`;
        speed = 5;
        score = 0;
        count = 0;
    }
    
    //what to do when snake is collided itself.....
    
    // After eating edit the score and update the snake .....
    if(count == 1){
        speed += 0.5;
        count = 0;
    }
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        score++;
        count++;
        let score_update = document.getElementById('score');
        score_update.innerText = `Score : ${score}`;
        let speed_up = document.getElementById('speed');
        speed_up.innerText = `Speed : ${speed}`;
        let start = 2;
        let end = 16;
        food.x = Math.floor(Math.random() * (end - start + 1) + start);
        food.y = Math.floor(Math.random() * (end - start + 1) + start);
    }

    //Moving the Snake .....
    for (let index = snakeArr.length-2; index >= 0; index--){
        snakeArr[index+1] = {...snakeArr[index]};
    }
    snakeArr[0].x += inputDir.x; 
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    // Displaying Snake ....    
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0)
        snakeElement.className = 'head';
        else{
            snakeElement.className = 'snake';
        }
        board.appendChild(snakeElement);
    });

    // Displaying food ..... 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x: 0,y: 1}; // start the game;
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
        break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
        break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
        break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
        break;
    
        default:
        break;
    }

})





/*
499.973
516.35
533.01
549.824
599.684
632.912
649.534
683.121
699.541
732.989
749.735
*/ 