const ogColor = ["green", "red", "yellow", "blue"]; // color for change
const arrColor = ["lightgreen", "pink", "lightyellow", "lightblue"]; // defualt color
const arrowKeys = ["ArrowUp", "ArrowRight", "ArrowLeft", "ArrowDown"]; // input key
const record = []; // record order of color popup
const scoreBoard = [] // data user from local storge
let stage = 1; // defualt stage
let delayTime = 1500
let lp = 0
let time =  0
const timer = document.querySelector('#timer')
userName(); // fn input username 

 


document.querySelector("#rng").addEventListener("click", rng); //start button
document.querySelector("#close").addEventListener("click", closeModal); //close modal button
document.querySelector("#next").addEventListener("click", nextStage); //go next stage
document.querySelector("body").addEventListener("keydown", keyEnter)
document.querySelector("#howTo").addEventListener("click", (e)=>{
  document.querySelector('#modal-howto').style.display = 'block'
})
document.querySelector("#close-howto").addEventListener("click", (e)=>{
  document.querySelector('#modal-howto').style.display = 'none'
})
document.querySelector("#scBoard").addEventListener("click",scBoard)
document.querySelector("#close-sc").addEventListener("click", (e)=>{
  document.querySelector('#modal-sc').style.display = 'none'
})

function rng() {
  // remove click rng ,click color, key arrow,key enter
  removeEvent();
  // random ,push,display color
  let i = -1;
  for (let i = 0; i < stage; i++) {
    let num = Math.floor(Math.random() * 4);
    record.push(num);
  }
  record.forEach((num) => {
    console.log(num);
    i += 1;
    setTimeout(() => {
      document.querySelector(`#${ogColor[num]}`).style.backgroundColor =
        arrColor[num];
    }, delayTime / 2 + delayTime * i);

    setTimeout(() => {
      document.querySelector(`#${ogColor[num]}`).style.backgroundColor =
        ogColor[num];
    }, delayTime + delayTime * i);
  });
  console.log(record);
// add event after show color finish click color,key arrow
  setTimeout(addEvent, 1.1 * delayTime + delayTime * i);
// add timecount
//   setTimeout(timeCount, 1.1 * delayTime + delayTime * i)
//   time = 5+3*stage
// timer.innerText = `Timer : ${time}`
}

function selectColor(e) {
  e.preventDefault();
  let color = parseInt(e.target.getAttribute("value"));

  if (color === record[0]) {
    record.shift();
    if (record.length === 0) {
      document.querySelector("#modal").style.display = "block";
      document.querySelector("body").addEventListener("keydown", keyEnter)
    }
  } else if(lp>0) {
    lifepoint(false)}else{alert(typeof color + " end game !!!!");
    
  }
}
function keySelectColor(event) {
  const key = event.key;
  const indexKey = arrowKeys.indexOf(key);
  if (indexKey >= 0) {
    // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if (indexKey === record[0]) {
      record.shift();
      if (record.length === 0) {
        document.querySelector("#modal").style.display = "block";
        document.querySelector("body").addEventListener("keydown", keyEnter)
      }
    } else {
      if(lp>0){ lifepoint(false)}else{alert(typeof indexKey + " end game !!!!");}
    }
  }
}
function keyEnter(e){
  if(e.key === 'Enter'){
    console.log();(document.querySelector("#modal").style.display)
    if(document.querySelector("#modal").style.display === "block"){nextStage()
    }else{rng()}}
}

function nextStage() {
  document.querySelector("#modal").style.display = "none";
  stage += 1;
  document.querySelector("#stage").innerText = `Stage : ${stage}`;
  if(stage%5 ===0 && stage <=15){lifepoint(true)} // every 5 stage lp +1
  delayTime = delayTime * 0.9;
  removeEvent();
  document.querySelector("#rng").addEventListener("click", rng);
  document.querySelector("body").addEventListener("keydown", keyEnter)
  let user = document.getElementById("username").innerText.slice(14)
  window.localStorage.setItem(user, JSON.stringify([stage,lp]));

//   const testST = JSON.parse(window.localStorage.getItem("stage"));

}

function closeModal() {
  document.querySelector("#modal").style.display = "none";
}

function addEvent() {
  document.querySelector("body").addEventListener("keydown", keySelectColor);
  ogColor.forEach((item) => {
    document.querySelector(`#${item}`).addEventListener("click", selectColor);
    document.querySelector(`#${item}`).style.cursor = "pointer";
  });
}

function removeEvent() {
  document.querySelector("body").removeEventListener("keydown", keyEnter)
  document.querySelector("#rng").removeEventListener("click", rng)
  document.querySelector("body").removeEventListener("keydown", keySelectColor);
  ogColor.forEach((item) => {
    document
      .querySelector(`#${item}`)
      .removeEventListener("click", selectColor);
    document.querySelector(`#${item}`).style.cursor = "no-drop";
  });
}

function userName() {
    // input username
  let text;
  let person = prompt("Please enter your name:");
  if (person == null || person == "") {
    text = "Guestlnwza@" + Math.floor(Math.random() * 10000);
  } else {
    text = person;
  }
  document.getElementById("username").innerHTML = "Player'name : " + text;
  
  // get data user from local storge
  for (var i = 0; i < window.localStorage.length; i++){
    let localStage = window.localStorage.getItem(window.localStorage.key(i))
    scoreBoard.push([window.localStorage.key(i),JSON.parse(localStage)])
    }

    // check user used to play?
    for(let i = 0; i<scoreBoard.length; i++){
        if( scoreBoard[i][0] === text){
            stage = scoreBoard[i][1][0]
            lp = scoreBoard[i][1][1]
            for(let i=1;i<=lp;i++){document.querySelector(`#lp${i}`).style.backgroundColor = 'green'}
            document.querySelector("#stage").innerText = `Stage : ${stage}`
            window.localStorage.setItem(text, JSON.stringify([stage,lp]))
            delayTime = 1500*Math.pow(0.9,stage) 
            break
        }else{window.localStorage.setItem(text, '[1,0]')}}
     
}

function lifepoint(bool){
  if(bool){
    lp +=1
    document.querySelector(`#lp${lp}`).style.backgroundColor = 'green'
  }else{
    lp -=1
    document.querySelector(`#lp${lp+1}`).style.backgroundColor = 'grey'
  }
}

let timeCount = ()=> {
 
  let count = setInterval(()=>{
    console.log(time);
    if(time>0){
      time -= 1
      timer.innerText = `Timer : ${time}`
    }else{clearInterval(count)
      endGame(timeCount)} 
  },1000)
  // clearInterval(timeCount)
  
}

function endGame(){
  document.querySelector('#modal-textbox h1').innerText ='End game'
  clearInterval(timeCount)
  alert(time)
  
}

function scBoard(){
  document.querySelector('#modal-sc').style.display = 'block'
  let high =['none',0]
  let sc = 0
  scoreBoard.forEach((item) =>{
    if(item[1]>sc){
      sc = item[1]
     high[0]=item[0]
     high[1]=item[1]

    }
    document.querySelector('#playerH').innerText = 'PLAYER : '+high[0]
    document.querySelector('#stageH').innerText = 'STAGE : '+high[1]
  })
}
