export default class BackTimer {
  constructor(elementHTML) {
    this.elementHTML = elementHTML;
  }

  settingsButton = "";
  settingsBlock = "";
  finalDate = "";

  showTimer() {
    this.elementHTML.insertAdjacentHTML("afterbegin", this.#setMarkup());
    this.#initObjDate();

    this.settingsButton = document.querySelector(".settingsButton button");
    this.settingsButton.addEventListener("click", this.#settings);
    this.settingsBlock = document.querySelector(".settings");
    this.startButton = document.querySelector(".start");
    this.startButton.addEventListener("click", () => {
      this.#startTimer();
    });
    this.stopButton = document.querySelector(".stop");
    this.stopButton.addEventListener("click", this.#stop);

    this.finalDate = document.querySelector(".settings input");
  }

  #objDate = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  #settings = () => {
    this.settingsBlock.classList.toggle("hide");
  };

  #stop = () => {
    this.startButton.classList.toggle("hide");
    this.stopButton.classList.toggle("hide");
    this.finalDate.valueAsNumber = NaN;
  };

  #setMarkup() {
    return `<div class="container" id="timer-1">
              <div class="settingsButton">
                <button>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyHktJlrpTNbOI81BzgvoWE4jL8-XeIHesgniMck5j6YFAScp-FD6IOl8jt1Vlc7-OZzU&usqp=CAU"/>
                </button>
              </div>
              
              <div class="settings hide">
                <hr/>
                <input type="date"></input>
                <div class="start_stop">
                  <button class="start">
                    Start
                  </button>
                  <button class="stop hide">
                    Stop
                  </button>
                </div>
                <hr/>
              </div>

              <div class="timer">${Object.keys(this.#objDate)
                .map((item) => {
                  return `<div class="field">
                            <span class="value" data-value="${item}">0</span>
                            <span class="label">${item}</span>
                        </div>`;
                })
                .join("")}
              </div>
              
            </div>`;
  }

  #initObjDate() {
    Object.keys(this.#objDate).map(
      (item) =>
        (this.#objDate[item] = document.querySelector(`[data-value="${item}"]`))
    );
  }

  #testData = () => {
    if (isNaN(this.finalDate.valueAsNumber)) {
      alert("Не указана дата!");
      return false;
    } else if (this.finalDate.valueAsNumber - Date.now() < 0) {
      alert("Не верно увказана дата!");
      return false;
    }
    this.startButton.classList.toggle("hide");
    this.stopButton.classList.toggle("hide");

    return true;
  };

  #startTimer() {
    if (!this.#testData()) return;

    let timer = setInterval(() => {
      let timeNow = Date.now();
      console.log("1");

      let distance = this.finalDate.valueAsNumber - timeNow;
      if (distance < 0 || isNaN(distance)) {
        Object.keys(this.#objDate).map((item) => {
          this.#objDate[item].innerText = 0;
        });

        clearInterval(timer);
        return;
      }

      this.#objDate.days.innerText = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );
      this.#objDate.hours.innerText = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.#objDate.minutes.innerText = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.#objDate.seconds.innerText = Math.floor(
        (distance % (1000 * 60)) / 1000
      );
    }, 1000);
  }
}
