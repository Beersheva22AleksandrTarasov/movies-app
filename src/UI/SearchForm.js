import serviceConfig from "/src/config/service-config.json" assert{type: 'json'}
import genres from "/src/config/genres.json" assert{type: 'json'}
export default class SearchForm {
    #url;

    constructor() {
        this.#addListeners();
    }

    async getMovies() {
        const resp = await fetch(this.#url, {
            method: 'GET', headers: { accept: 'application/json' }
        });
        return await resp.json();
    }

    showMovies(data) {
        const moviesELement = document.querySelector(".movies-search");
        moviesELement.innerHTML = '';

        data.results.forEach(movie => {
            const movieELement = document.createElement("div");
            movieELement.classList.add("movie");
            movieELement.innerHTML =
                `<div class="movies__cover-inner">
                    <img src="${serviceConfig.imgUrl}${movie.poster_path}" class="movie-cover" alt="${movie.original_title}">
                </div>
                <div class="movies__info">
                    <div class="movie__title">${movie.original_title}</div>
                    <div class="movie__category">${movie.genre_ids.map(genre => ` ${genres[genre]}`)}</div>
                </div>`;
            moviesELement.appendChild(movieELement);
        });
    }

    #addListeners() {
        const search = document.querySelector(".text-field__input-search");
        const parentElement = document.querySelector("form");
        parentElement.addEventListener('submit', async (event) => {
            event.preventDefault();
            this.#url = `https://api.themoviedb.org/3/search/movie?query=${search.value}&include_adult=false&language=en-US&page=1${serviceConfig.token}`;
            if (search.value) {
                const data = await this.getMovies();
                this.showMovies(data);
                search.value = '';
            }
        })
    }
}