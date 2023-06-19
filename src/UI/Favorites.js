import serviceConfig from "/src/config/service-config.json" assert{type: 'json'}
import genres from "/src/config/genres.json" assert{type: 'json'}
import { getColor } from '../utils/GetColor.js';
export default class Favorites {
    showMovies(data) {
        const moviesELement = document.querySelector(`.movies-favorites`);
        moviesELement.innerHTML = '';

        data.forEach(movie => {
            const movieELement = document.createElement("div");
            movieELement.classList.add("movie");
            movieELement.innerHTML =
                `<div class="movies__cover-inner">
                <img src="${serviceConfig.imgUrl}${movie.backdrop_path}" class="movie-cover" alt="${movie.original_title}">
            </div>
            <div class="movies__info">
                <div class="movie__average movie__average--${getColor(movie.vote_average)}">${movie.vote_average}</div>
                <div class="movie__title">${movie.original_title}</div>
                <div class="movie__category">${movie.genre_ids.map(genre => `${genres[genre]}`)}</div>
            </div>`;

            moviesELement.appendChild(movieELement);
        });
    }
}