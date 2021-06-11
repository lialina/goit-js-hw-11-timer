const bodyElement = document.querySelector('body');

const timerElement = document.querySelector('.timer');

class CountdownTimer {
  constructor({selector, targetDate, onTick} = {}) {
    this.elements = this.getElements(selector);
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

  
  getElements(selector) {
    const refs = {
      daysAmount: document.querySelector(`${selector} span[data-value="days"]`),
      hoursAmount: document.querySelector(`${selector} span[data-value="hours"]`),
      minsAmount: document.querySelector(`${selector} span[data-value="mins"]`),
      secsAmount: document.querySelector(`${selector} span[data-value="secs"]`),
    };

    return refs;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  updateTextContentInterface({ days, hours, mins, secs }) {
    countdownTimer.elements.daysAmount.textContent = `${days}`;
    countdownTimer.elements.hoursAmount.textContent = `${hours}`;
    countdownTimer.elements.minsAmount.textContent = `${mins}`;
    countdownTimer.elements.secsAmount.textContent = `${secs}`;
  };

  pad(value) {
    return String(value).padStart(2, '0');
  };
}; 

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 31, 2021'),
  onTick: countdownTimer.updateTextContentInterface,
});

countdownTimer.start();