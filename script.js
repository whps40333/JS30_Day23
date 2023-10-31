const msg = new SpeechSynthesisUtterance();
// const msg = new SpeechSynthesisUtterance();
let voices = [];
// let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
// const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
// const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
// const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector("#stop");
// const stopButton = document.querySelector('#stop');

// 語音內容為畫面文字
msg.text = document.querySelector('[name="text"]').value;
// msg.text = document.querySelector('[name="text"]').value;

// 填充下拉選單
function populateVoices() {
  // 取得目前支援的所有語音
  voices = this.getVoices();
  // voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter((voice) => voice.lang.includes("en"))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
  // voicesDropdown.innerHTML = voices
  // .filter(voice => voice.lang.includes("en"))
  // .map(
  //   voice=>
  //   `<option value="${voice.name}">${voice.name}(${voice.lang})</option>`
  // )
  // .join("")
}

// 設定語音
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  // msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
  // toggle();
}

// 設定播放速度、文字、聲道
function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  // msg[this.name] = this.value;
}

// 播放與停止
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// function toggle(startOver = true){
//   speechSynthesis.cancel();
//   if(startOver){
//     speechSynthesis.speak(msg);
//   }
// }

speechSynthesis.addEventListener("voiceschanged", populateVoices);
// speechSynthesis.addEventListener("voiceschanged", populateVoices);

// 語音下拉選單變更
voicesDropdown.addEventListener("change", setVoice);
// voicesDropdown.addEventListener("change",setVoice);

// 播放速度、文字、聲道
options.forEach((option) => option.addEventListener("change", setOption));
// options.forEach(option => option.addEventListener("change",setOption) );

// 播放
speakButton.addEventListener("click", toggle);
// speakButton.addEventListener("click", toggle);

// 停止播放
// method 1
stopButton.addEventListener("click", () => toggle(false));
// stopButton.addEventListener("click", ()=> toggle(false));
// // method 2
// stopButton.addEventListener("click", toggle.bind(null,false));
// // method 3
// stopButton.addEventListener("click", function () {
//   toggle(false);
// });
