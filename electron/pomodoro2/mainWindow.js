
const electron = require('electron');
const {ipcRenderer} = electron;
const timerText = document.querySelector('p.timer');
timerText.innerHTML = "Hello there";

let remainingTime = 10;
const intId = setInterval("doSomething()", 1000);

const crank = document.querySelector('audio#crank');
crank.play();
const bell = document.querySelector('audio#bell');


function doSomething() {
    console.log("Here");
    if (--remainingTime <= 0) {
        clearInterval(intId);
        bell.play();
    }
    timerText.innerHTML = Math.floor(remainingTime / 60) + ":" + (remainingTime % 60);
};
