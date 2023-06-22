export default class MovieServiceRest {
    #baseUrl;
    #obj;
    constructor(baseUrl) {
        this.#baseUrl = baseUrl;
    }
    async addUser(user) {
        const response = await fetch(this.#baseUrl, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .catch(alert("Already exists"));
        return response;
    }
    #getUrl(id) {
        return `${this.#baseUrl}/${id}`;
    }
    async getUser(id) {
        const response = await fetch(this.#getUrl(id));
        this.#obj = await response.json();
        return this.#obj;
    }
}
