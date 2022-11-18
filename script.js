const ogColor = ["green", "red", "yellow", "blue"]; // defualt color
const arrColor = ["lightgreen", "pink", "lightyellow", "lightblue"]; // color for change
const arrowKeys = ["ArrowUp", "ArrowRight", "ArrowLeft", "ArrowDown"]; // input key
// array text to speech
const speech = [
  new SpeechSynthesisUtterance("Up"),
  new SpeechSynthesisUtterance("Right"),
  new SpeechSynthesisUtterance("Left"),
  new SpeechSynthesisUtterance("Down"),
  new SpeechSynthesisUtterance("Wrong"),
]; 
speech.forEach((item) => {
  item.rate = 4;
}); //set speed of speech (1-10) more to faster
let record = []; // record order of color popup
const scoreBoard = []; // data user from local storge
let high = ["none", 0, 0]; // keep user hight score [user,stage,time]
let stage = 1; // defualt stage

let delayTime = 900; // defualt delay time popup color
let lp = 0; // defualt lifepoint
let time = 0;// defualt timecount

const timer = document.querySelector("#timer"); // Dom timer
userName(); // fn input username
let user = document.getElementById("username").innerText.slice(14); // Dom user name
let stageH = 0; // defualt hight stage of player now

// if user ever play stageH = stage is recorded
if (JSON.parse(window.localStorage.getItem(user)) === null) {
  stageH = 1;
} else {
  stageH = JSON.parse(window.localStorage.getItem(user))[0];
}

let timecount; // define fn timecount

document.querySelector("#rng").addEventListener("click", rng); //start button (simon)
document.querySelector("#close").addEventListener("click", closeModal); //close modal button
document.querySelector("#next").addEventListener("click", nextStage); //go next stage button
document.querySelector("body").addEventListener("keydown", keyEnter);
document.querySelector("#howTo").addEventListener("click", (e) => { //open how to play button
  document.querySelector("#modal-howto").style.display = "block";
});
document.querySelector("#close-howto").addEventListener("click", (e) => { //close how to play button
  document.querySelector("#modal-howto").style.display = "none";
});
document.querySelector("#scBoard").addEventListener("click", () => {//open score board button
  document.querySelector("#modal-sc").style.display = "block";
});
document.querySelector("#close-sc").addEventListener("click", (e) => {//close score board button
  document.querySelector("#modal-sc").style.display = "none";
});
document.querySelector("#close-reset").addEventListener("click", (e) => {//close reset modal
  document.querySelector("#modal-reset").style.display = "none";
  nextStage();
});

// fn random color
function rng() {
  // remove click rng ,click color, key arrow,key enter
  removeEvent();
  // math random and push to record array
  let i = -1;
  for (let i = 0; i < stage; i++) {
    let num = Math.floor(Math.random() * 4);
    record.push(num);
  }
  // loop record array the show color and sound
  record.forEach((num) => {
    i += 1;
    speechSynthesis.speak(speech[num]); // voice speech
    // delay time for appear
    setTimeout(() => {
      document.querySelector(`#${ogColor[num]}`).style.backgroundColor =
        arrColor[num];
    }, delayTime / 2 + delayTime * i);
// delay time for disappear
    setTimeout(() => {
      document.querySelector(`#${ogColor[num]}`).style.backgroundColor =
        ogColor[num];
    }, delayTime + delayTime * i);
  });
  // console.log(record);
  // add event after show color finish click color,key arrow
  setTimeout(addEvent, 1.1 * delayTime + delayTime * i);
}
// fn for click color
function selectColor(e) {
  e.preventDefault();
  let color = parseInt(e.target.getAttribute("value"));// dom color 
//check color is clicked with record array
  if (color === record[0]) {
    record.shift();
    document.querySelector("#rng").innerText = record.length; // show length of array 
    if (record.length === 0) { // if record array =[] then go to next stage
      clearInterval(timecount);
      timer.innerText = `Timer : 0`;
      document.querySelector("#modal").style.display = "block";
      document.querySelector("body").addEventListener("keydown", keyEnter);
    }
  } else if (lp > 0) {// if selec worng but have lp
    speechSynthesis.speak(speech[4]); // voice speech
    lifepoint(false);
  } else { //if selec worng and  lp = 0
    speechSynthesis.speak(speech[4]); // voice speech
    endGame();
  }
}
// fn selectcolor by arrow key same like above
function keySelectColor(event) {
  const key = event.key;
  const indexKey = arrowKeys.indexOf(key); 
  if (indexKey >= 0) {
    // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    if (indexKey === record[0]) {
      record.shift();
      document.querySelector("#rng").innerText = record.length;
      if (record.length === 0) {
        clearInterval(timecount);
        timer.innerText = `Timer : 0`;
        document.querySelector("#modal").style.display = "block";
        document.querySelector("body").addEventListener("keydown", keyEnter);
      }
    } else {
      speechSynthesis.speak(speech[4]); // voice speech
      if (lp > 0) {
        lifepoint(false);
      } else {
        endGame();
      }
    }
  }
}
// enter key for play and skip modal next stage
function keyEnter(e) {
  if (e.key === "Enter") {
    if (document.querySelector("#modal").style.display === "block") {
      nextStage();
    } else if(document.querySelector("#modal-reset").style.display === "block"){
      document.querySelector("#modal-reset").style.display === "none"
    }else{
      rng();
    }
  }
}
// fn for update value for next stage
function nextStage() {
  document.querySelector("#modal").style.display = "none";
  stage += 1;
  if (stage > stageH) {
    stageH = stage;
  }
  document.querySelector("#stage").innerText = `Stage : ${stage}`;
  if (stage % 5 === 0 && stage <= 15) {
    lifepoint(true);
  } // every 5 stage lp +1
  // delayTime = delayTime * 0.98;  // increse speed 2% rempve because cant work with speech
  removeEvent();
  document.querySelector("#rng").addEventListener("click", rng);
  document.querySelector("body").addEventListener("keydown", keyEnter);
  window.localStorage.setItem(user, JSON.stringify([stageH, lp, time]));// update local data
  document.querySelector("#rng").innerText = "SIMON";
  if (stage > high[1]) {// update score board
    high[1] = stage;
    high[0] = user;
    high[2] = time;
    document.querySelector("#stageH").innerText = "STAGE : " + high[1];
    document.querySelector("#playerH").innerText = "PLAYER : " + high[0];
    document.querySelector("#timeH").innerText = "TIME : " + high[2];
  } else if (stage === high[1] && time > high[2]) {
    high[0] = user;
    high[2] = time;
    document.querySelector("#playerH").innerText = "PLAYER : " + high[0];
    document.querySelector("#timeH").innerText = "TIME : " + high[2];
  }
}
// fn close modal
function closeModal() {
  document.querySelector("#modal").style.display = "none";
}
// fn add event to button click
function addEvent() {
  document.querySelector("body").addEventListener("keydown", keySelectColor);
  ogColor.forEach((item) => {
    document.querySelector(`#${item}`).addEventListener("click", selectColor);
    document.querySelector(`#${item}`).style.cursor = "pointer";
  });
  document.querySelector("#rng").innerText = record.length;
  // add timecount
  time = 5 + 3 * stage;
  timecount = setInterval(() => {
    if (time > 0) {
      time -= 1;
      timer.innerText = `Timer : ${time}`;
    } else {
      clearInterval(timecount);
      endGame();
    }
  }, 1000);
  timer.innerText = `Timer : ${time}`;
}
// fn remove event to button click
function removeEvent() {
  document.querySelector("body").removeEventListener("keydown", keyEnter);
  document.querySelector("#rng").removeEventListener("click", rng);
  document.querySelector("body").removeEventListener("keydown", keySelectColor);
  ogColor.forEach((item) => {
    document
      .querySelector(`#${item}`)
      .removeEventListener("click", selectColor);
    document.querySelector(`#${item}`).style.cursor = "no-drop";
  });
}
// fn from login username
function userName() {
  // input username
  let text;
  let person = prompt("Please enter your name:");
  if (person == null || person == "") {
    text = "Guestlnwza@" + Math.floor(Math.random() * 100);
  } else {
    text = person;
  }
  document.getElementById("username").innerHTML = "Player'name : " + text;

  // get data user from local storge
  for (var i = 0; i < window.localStorage.length; i++) {
    let localStage = window.localStorage.getItem(window.localStorage.key(i));
    scoreBoard.push([window.localStorage.key(i), JSON.parse(localStage)]);
  }

  // check user used to play?
  for (let i = 0; i < scoreBoard.length; i++) {
    if (scoreBoard[i][0] === text) {
      stage = scoreBoard[i][1][0];
      lp = scoreBoard[i][1][1];
      for (let i = 1; i <= lp; i++) {
        document.querySelector(`#lp${i}`).style.backgroundColor = "green";
      }
      document.querySelector("#stage").innerText = `Stage : ${stage}`;
      window.localStorage.setItem(text, JSON.stringify([stage, lp, time]));
      // delayTime = 1500*Math.pow(0.9,stage)
      break;
    } else {
      window.localStorage.setItem(text, "[1,0,100]");
    }
  }

  scBoard();
}
// fn from +/- lifepoint
function lifepoint(bool) {
  if (bool) {
    lp += 1;
    document.querySelector(`#lp${lp}`).style.backgroundColor = "green";
  } else {
    lp -= 1;
    document.querySelector(`#lp${lp + 1}`).style.backgroundColor = "grey";
  }
}
// fn from end game and reset
function endGame() {
  document.querySelector("#modal-reset").style.display = "block";
  clearInterval(timecount);
  timer.innerText = `Timer : 0`;
  stage = 0;
  lp = 0;
  // delayTime = 1500
  record = [];
}
// fn from change scoreboard (only first run page)
function scBoard() {
  let sc = 0;
  let t = 100;
  scoreBoard.forEach((item) => {
    if (item[1][0] > sc || (item[1][0] === sc && item[1][2] < t)) {
      sc = item[1][0];
      high[0] = item[0];
      high[1] = item[1][0];
      high[2] = item[1][2];
    }
    document.querySelector("#playerH").innerText = "PLAYER : " + high[0];
    document.querySelector("#stageH").innerText = "STAGE : " + high[1];
    document.querySelector("#timeH").innerText = "TIME : " + high[2];
  });
}

// text to speech api
if ("speechSynthesis" in window) {
  // Speech Synthesis supported 🎉
} else {
  // Speech Synthesis Not Supported 😣
  alert("Sorry, your browser doesn't support text to speech!");
}
