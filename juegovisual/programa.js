const playboard = document.querySelector(".playboard");
const scoreelement = document.querySelector(".score");
const highscoreelement = document.querySelector(".highscore");

let gameover = false;
let comidax  , comiday ; 
let snakex = 5; snakey =19;
let snakebody =[];
let velocityx = 0 ; velocityy= 0;
let setintervalid;
let score = 0;

let highscore = localStorage.getItem("highscore")|| 0;
highscoreelement.innerHTML = `highscore : ${highscore}`;


const changfoodposition = () =>{
comidax = Math.floor(Math.random()*30 )+1;
comiday = Math.floor(Math.random()*30 )+1;
console.log(comidax);
}

const handlegameover = () => {
    clearInterval(setintervalid);
    alert("game over");
    location.reload();
}



const changedirection =(e) =>{
    //console.log(e);
    if(e.key==="ArrowUp" && velocityy != 1){
        velocityx = 0;
        velocityy = -1;
    } else if(e.key==="ArrowDown" && velocityy != -1){
        velocityx = 0;
        velocityy = 1;
    }else if(e.key==="ArrowLeft" && velocityx != 1){
        velocityx = -1;
        velocityy = 0;
    }else if(e.key==="ArrowRight" && velocityx != -1){
        velocityx = 1;
        velocityy = 0;
    }
    //initgame();
}



const initgame = ()=>{
    if(gameover)return handlegameover();


    let htmlmarkup =  `<div class="comida" style= "grid-area: ${comiday}/ ${comidax}"></div> `;

    if(snakex=== comidax && snakey === comiday){
        changfoodposition ();
        snakebody.push([comidax,comiday]);
        //console.log(snakebody);
        score++;
        highscore = score >= highscore ? score  :   highscore; 
        localStorage.setItem("highscore",highscore);
        scoreelement.innerHTML = `score  : ${score} `;

        highscoreelement.innerHTML = `highscore : ${highscore}`;

    }

    for(let i = snakebody.length-1; i>0 ; i--){
        snakebody[i] =snakebody[i-1];
    }

    snakebody[0]= [snakex,snakey];

    snakex +=velocityx;
    snakey +=velocityy;
    
    if(snakex <= 0 || snakex > 30 || snakey<= 0 ||snakey > 30){
        gameover = true;
    }


    for(let i = 0 ;i<snakebody.length ; i++){
        htmlmarkup +=  `<div class="head" style= "grid-area: ${snakebody[i][1]}/ ${snakebody[i][0]}"></div> `;
        if( i !== 0 && snakebody[0][1]=== snakebody[i][1] && snakebody[0][0]=== snakebody[i][0] ){
        gameover = true;
        }
    }


    playboard.innerHTML = htmlmarkup;
}



changfoodposition();
//initgame();
setintervalid = setInterval(initgame,125);
 
document.addEventListener("keydown",changedirection);