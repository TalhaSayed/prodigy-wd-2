let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesContainer = document.getElementById('lap-times');

// Update the stopwatch display
function updateDisplay() {
  const formatTime = (time) => time < 10 ? `0${time}` : time;
  display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

// Start or stop the stopwatch
function startStop() {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = 'Start';
  } else {
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 1000);
    startStopButton.textContent = 'Stop';
  }
  isRunning = !isRunning;
}

// Reset the stopwatch
function reset() {
  clearInterval(timer);
  isRunning = false;
  seconds = 0;
  minutes = 0;
  hours = 0;
  lapTimes = [];
  updateDisplay();
  updateLapTimes();
  startStopButton.textContent = 'Start';
}

// Record a lap
function recordLap() {
  const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  lapTimes.push(lapTime);
  updateLapTimes();
}

// Update lap times display
function updateLapTimes() {
  lapTimesContainer.innerHTML = '';
  lapTimes.forEach((lap, index) => {
    const lapDiv = document.createElement('div');
    lapDiv.classList.add('lap');
    lapDiv.textContent = `Lap ${index + 1}: ${lap}`;
    lapTimesContainer.appendChild(lapDiv);
  });
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);
