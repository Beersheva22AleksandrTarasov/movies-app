const ACTIVE = 'active';
export default class ApplicationBar {
    #buttons;
    #currentUser;
    #sectionElements;
    #activeIndex;
    #callbackFn;
    constructor(parentId, section, callbackFn) {
        this.#fillButtons(parentId, section.map(s => s));
        this.#setSectionElements(section.map(s => s.id));
        this.#callbackFn = callbackFn;
        this.#addListeners();
    }
    #fillButtons(parentId, sections) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = sections.map(s => `<button id="button-${s.id}" class="menu-button menu-button1" hidden="true">${s.title}</button>`).join('');
        this.#buttons = parentElement.childNodes;
        document.getElementById('button-log-out').style.display = "none";
        document.getElementById('button-favorite').style.display = "none";
    }
    #setSectionElements(sectionIds) {
        this.#sectionElements = sectionIds.map(id => document.getElementById(id));
    }
    #addListeners() {
        this.#buttons.forEach((b, index) => b.addEventListener('click', this.#handler.bind(this, index)));
    }
    async #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {

            if (this.#activeIndex != undefined && this.#activeIndex != 6) {
                this.#buttons[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElements[this.#activeIndex].hidden = true;
            }
            this.#buttons[index].classList.add(ACTIVE);
            await this.#callbackFn(index);
            if (index != 6) {
                this.#sectionElements[index].hidden = false;
            }

            this.#activeIndex = index;
        }
    }
    getActiveIndex() {
        return this.#activeIndex;
    }
}
