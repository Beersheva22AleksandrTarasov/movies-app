import serviceConfig from "/src/config/service-config.json" assert{type: 'json'}
import genres from "/src/config/genres.json" assert{type: 'json'};
export default class Table {
    #pageNumber;
    #url;
    #selector;

    constructor(url, selector) {
        this.#selector = selector;
        this.#url = url;
        this.#pageNumber = 1;
        this.#addListeners();
    }

    async getMovies() {
        const resp = await fetch(this.#url + this.#pageNumber + serviceConfig.token, {
            method: 'GET', headers: { accept: 'application/json' }
        });
        return await resp.json();
    }

    showMovies(data) {
        const moviesELement = document.querySelector(`.movies-${this.#selector}`);
        moviesELement.innerHTML = '';
        
        const modalELement = document.querySelector(".modal");
        modalELement.innerHTML = '';

        data.results.forEach(movie => {
            const movieELement = document.createElement("div");
            movieELement.classList.add("movie");
            movieELement.innerHTML =
                `<div class="movies__cover-inner">
                    <img src="${serviceConfig.imgUrl}${movie.backdrop_path}" class="movie-cover" alt="${movie.original_title}">
                </div>
                <div class="movies__info">
                    <div class="movie__title">${movie.original_title}</div>
                    <div class="movie__category">${movie.genre_ids.map(genre => ` ${genres[genre]}`)}</div>
                </div>`;

            moviesELement.appendChild(movieELement);

        });
    }
    
    #addListeners() {
        const buttonPrev = document.getElementById(`prev-button-${this.#selector}`);
        buttonPrev.addEventListener('click', this.#prevPage.bind(this));
        const buttonNext = document.getElementById(`next-button-${this.#selector}`);
        buttonNext.addEventListener('click', this.#nextPage.bind(this));
    }

    #prevPage(){
        if (this.#pageNumber > 1) {
            this.#pageNumber = this.#pageNumber - 1;
        }
        this.#handler();
    }
    #nextPage(){
        if (this.#pageNumber < 50) {
            this.#pageNumber = this.#pageNumber + 1;
        }
        this.#handler();
    }

    async #handler() {
        const data = await this.getMovies(this.#pageNumber);
        this.showMovies(data)
    }
}