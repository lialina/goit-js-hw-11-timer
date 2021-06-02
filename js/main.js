const bodyElement = document.querySelector('body');

let timerDiv = `<div class="timer" id="timer-1">
  <div class="field">
    <span class="value" data-value="days">11</span>
    <span class="label">Days</span>
  </div>

  <div class="field">
    <span class="value" data-value="hours">11</span>
    <span class="label">Hours</span>
  </div>

  <div class="field">
    <span class="value" data-value="mins">11</span>
    <span class="label">Minutes</span>
  </div>

  <div class="field">
    <span class="value" data-value="secs">11</span>
    <span class="label">Seconds</span>
  </div>
</div>`;

bodyElement.insertAdjacentHTML('beforeend', timerDiv);

const timerElement = document.querySelector('.timer');
console.log(timerElement);

const refs = {
  daysAmount: document.querySelector('span[data-value="days"]'),
  hoursAmount: document.querySelector('span[data-value="hours"]'),
  minsAmount: document.querySelector('span[data-value="mins"]'),
  secsAmount: document.querySelector('span[data-value="secs"]'),
};

class CountdownTimer {
  constructor({selector, targetDate, onTick} = {}) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
  }

  start() {
    const startTime = countdownTimer.targetDate.getTime();
    
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  };

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  };
}; 

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 31, 2021'),
  onTick: updatetextContentInterface,
});

countdownTimer.start();

function updatetextContentInterface({ days, hours, mins, secs }) {
  refs.daysAmount.textContent = `${days}`;
  refs.hoursAmount.textContent = `${hours}`;
  refs.minsAmount.textContent = `${mins}`;
  refs.secsAmount.textContent = `${secs}`;
};