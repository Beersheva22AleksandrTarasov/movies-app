export default class Spinner {
    #spinner;
    constructor(parentID) {
        const parentElement = document.getElementById(parentID);
        parentElement.innerHTML = '<div id="spinner" hidden></div>';
        this.#spinner = parentElement.childNodes[0];
    }
    start() {
        this.#spinner.hidden = false;
    }
    stop() {
        this.#spinner.hidden = true;
    }
}
