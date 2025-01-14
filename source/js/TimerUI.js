/**
 * @file TimerUI acts as the middle man between javascript and the html.
 * It creates a pomo timer that will update the html elements.
 * @author Justin Lee
 * @author Enrique Gan
 * @author Donald Wolfson
 * @author Andy Young
 * @author Liam Stone
 * @author Arman Mansourian
 */

import Timer from './Timer.js';

/**
 * Creates the Custom HTMLElement for the Timer class.
 * @extends HTMLElement
 */
class TimerUI extends HTMLElement {
  /**
   * constructor for the UI in the Timer Object.
   */
  constructor() {
    super();

    this.classList.add('w-100', 'h-100', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
    this.appendChild(document.querySelector('#timer-template').content.cloneNode(true));

    this.text = this.querySelector('.timer-text');
  }

  reset() {
    this.text.textContent = 'START';
    this.classList.remove('timer-active');
  }

  clear() {
    this.text.textContent = 'All Done!';
  }

  /**
   * Create an internal `Timer` object that sets its `callbackEverySecond`
   * callback function to a function that changes the timer html elements'
   * minute and second values for every second that it ticks down.
   * @param {number} minutes - minutes that will be stored in object.
   * @param {number} seconds - seconds that will be stored in object.
   */
  createTimer(minutes, seconds) {
    this.timer = new Timer(minutes, seconds, (newMinute, newSecond) => {
      // update html
      this.text.textContent = `${TimerUI.parseMinutes(newMinute)} : ${TimerUI.parseSeconds(newSecond)}`;
    });
  }

  /**
   * Start the internal `Timer` object by returning the Promise from startTimer()
   * in the Timer class. Call this function by using await, the caller will be
   * blocked until the timer is done counting down.
   * @returns {Promise} Countdown of timer
   */
  startTimer() {
    // immediately update html
    this.text.textContent = `${TimerUI.parseMinutes(this.timer.minutes)} : ${TimerUI.parseSeconds(this.timer.seconds)}`;
    this.classList.add('timer-active');
    return this.timer.startTimer();
  }

  /**
   * Returns a string representing the minutes left with the format "MM".
   * ie: If 25 minuts are left, "25". If 9 minutes are left "09"
   * @param {number} minute - Number of minutes that will be formatted.
   * @returns {string} Minutes Left
   */
  static parseMinutes(minute) {
    if (minute < 10) { return `0${String(minute)}`; }
    return String(minute);
  }

  /**
   * Returns a string representing the seconds left with the format "SS".
   * ie: If 25 seconds are left, "25". If 9 seconds are left "09".
   * @param {number} second - Number of seconds that will be formatted.
   * @returns {string} Seconds Left
   */
  static parseSeconds(second) {
    if (second === 60 || second >= 60) return '00';
    if (second < 10) return `0${String(second)}`;
    return String(second);
  }

  /**
   * Sets the Tomato image to a Green Tomato.
   */
  setColorGreen() {
    this.querySelector('.timer-image').classList.remove('red-tomato');
    this.querySelector('.timer-image').classList.add('green-tomato');
  }

  /**
   * Sets the Tomato image to a Red Tomato.
   */
  setColorRed() {
    this.querySelector('.timer-image').classList.remove('green-tomato');
    this.querySelector('.timer-image').classList.add('red-tomato');
  }

  /**
   * Sets the Tomato image to a Gold Tomato.
   */
  setColorGold() {
    this.querySelector('.timer-image').classList.add('gold-tomato');
  }
}

customElements.define('pomo-timer', TimerUI);
export default TimerUI;
