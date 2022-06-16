class Column {
    #id;
    #maxLength;
    #timerId;
    #isGameOn;
    #increaseScore;
    #gameOver;
    #factor;
    #currentLength;
  

    constructor(id, maxLength, isGameOn, increaseScore, gameOver) {
        this.#id = id;
        this.#maxLength = maxLength;
        this.#isGameOn = isGameOn;
        this.#increaseScore = increaseScore;
        this.#gameOver = gameOver;
        this.#timerId = undefined;

        this.#factor = Math.floor((Math.random() * 55) + 15);
        this.#currentLength = 0;

    }

    getView() {
        const div = document.createElement("div");
        div.style.height = this.#currentLength + "px";
        div.classList.add('column');
        div.id = this.#id;
        div.onclick = () => {
            let value = Math.round(this.#currentLength / 2);
            this.#currentLength = value
            this.#increaseScore(value);
            console.log(this.#currentLength);
            document.getElementById(this.#id).style.height = this.#currentLength + "px";
        };
        return div;
    }
    start = () => {
        if (this.#timerId === undefined) {
            this.#timerId = setInterval(this.updateLength, 1000);
            if (this.#currentLength !== 0){
                this.#currentLength = 0;
                document.getElementById(this.#id).style.height = this.#currentLength + "px";
                this.#factor = Math.floor((Math.random() * 55) + 15);
            }
        }
    }

    stop = () => {
        if (this.#timerId !== undefined) {
            clearInterval(this.#timerId);
            this.#timerId = undefined;
        }
    }

    updateLength = () => {

        if (this.#currentLength >= this.#maxLength || !this.#isGameOn()) {
            this.stop();
            this.#gameOver();
        }
        else {
            let newLength = this.#currentLength + this.#factor;
            if (newLength > this.#maxLength) {
                newLength = newLength - (newLength - this.#maxLength);
            }
            this.#currentLength = newLength;
            document.getElementById(this.#id).style.height = this.#currentLength + "px";
        }

    };

}