export default class RegistrationForm {
    #dataObj;
    #formElement;
    #loginElement;
    #passwordElement;
    #parentId;
    constructor(parentId) {
        this.#parentId = parentId;
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = `<form class="form-control" id="${this.#getId('form')}"></form>`;
        this.#formElement = document.getElementById(this.#getId('form'));
    }
    hideForm() {
        this.#formElement.innerHTML = '';
    }
    #getId(id) {
        return `${this.#parentId}-${id}-id`;
    }
    fillRegForm() {
        this.#formElement.innerHTML =
            `<form class="form-control" id="${this.#getId('form')}">
            <fieldset>
            <legend>Personalia:</legend>
                <div class="text-field">
                    <label class="text-field__label" for="login">Login:</label>
                    <input class="text-field__input" type="text" id="${this.#getId('login')}" name="login" minlength="3" placeholder="Enter your login">
                </div>
                <div class="text-field">
                    <label class="text-field__label" for="pass">Password:</label>
                    <input class="text-field__input" type="password" id="${this.#getId('password')}" name="password" minlength="4" placeholder="Enter your password" required>
                </div>
                <button type="submit" class="menu-button menu-button1">Registration</button>    
            </fieldset>
        </form>`;

        this.#setElements();
    }
    #setElements() {
        this.#formElement = document.getElementById(this.#getId('form'));
        this.#loginElement = document.getElementById(this.#getId('login'));
        this.#passwordElement = document.getElementById(this.#getId('password'));
    }
    addHandler(submitFn) {
        this.#formElement.onsubmit = async (event) => {
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObj = {};
            this.#dataObj.id = formData.get('login');
            this.#dataObj.password = formData.get('password');
            this.#dataObj.favoriteList = [];
            await submitFn(this.#dataObj);
            this.#formElement.reset();
        }
    }
}