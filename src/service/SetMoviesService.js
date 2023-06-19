import serviceConfig from "./config/service-config.json" assert{type: 'json'}
export default class SetMoviesService {
    #url;
    #pageNumber;
    #token;
    constructor(url){
        this.#url = url;
        this.#pageNumber = 1;
        this.#token = serviceConfig.token;
        this.#addListeners();
    }

    async getMovies() {
        const resp = await fetch(this.#url + this.#pageNumber + this.#token, {
            method: 'GET', headers: { accept: 'application/json' }
        });
        return await resp.json();
    }

    showMovies(data, selector) {
        const moviesELement = document.querySelector(`.movies-${selector}`);
        moviesELement.innerHTML = '';

        data.results.forEach(movie => {
            const movieELement = document.createElement("div");
            movieELement.classList.add("movie");
            movieELement.innerHTML =
                `<div class="movies__cover-inner">
                    <img src="${this.#imgUrl}${movie.poster_path}" class="movie-cover" alt="${movie.original_title}">
                </div>
                <div class="movies__info">
                    <div class="movie__average movie__average--${this.#getColor(movie.vote_average)}">${movie.vote_average}</div>
                    <div class="movie__title">${movie.original_title}</div>
                    <div class="movie__category">${movie.genre_ids.map(genres => `${genres}`)}</div>
                </div>`;

            moviesELement.appendChild(movieELement);
        });
    }

    #getColor(rate) {
        if (rate >= 7) {
            return "green";
        } else if (rate >= 5) {
            return "orange";
        } else {
            return "red";
        }
    }
    #addListeners() {
        this.#buttonPrev = document.getElementById("button-prev");
        this.#buttonPrev.addEventListener('click', this.#prevPage.bind());
        this.#buttonNext = document.getElementById("button-next");
        this.#buttonNext.addEventListener('click', this.#nextPage.bind());
    }

    #prevPage(){
        if (this.#pageNumber > 1) {
            this.#pageNumber = this.#pageNumber - 1;
        }
        this.#handler;
    }
    #nextPage(){
        if (this.#pageNumber < 50) {
            this.#pageNumber = this.#pageNumber + 1;
        }
        this.#handler;
    }

    async #handler() {
        const data = await this.getMovies(this.#pageNumber);
        this.showMovies(data)
    }
}