import ApplicationBar from './UI/ApplicationBar.js';
import Spinner from './UI/Spinner.js';
import RegistrationForm from './UI/RegistrationForm.js';
import Favorites from './UI/Favorites.js';
import Table from './UI/Table.js';
import SearchForm from './UI/SearchForm.js';
import SignForm from './UI/SignForm.js';
import MovieServiceRest from './service/MovieServiceRest.js';
import serviceConfig from "./config/service-config.json" assert{type: 'json'}
let currentUser = {};
const section =
    [
        { title: 'Popular', id: 'popular' },
        { title: 'New Films', id: 'in-cinema' },
        { title: 'Search', id: 'search' },
        { title: 'Favorite', id: 'favorite' },
        { title: 'Registration', id: 'registration' },
        { title: 'Log In', id: 'log-in' },
        { title: 'Log Out', id: 'log-out' }
    ];
async function menuHandler(index) {
    switch (index) {
        case 0: {
            const movies = await action(popularTable.getMovies.bind(popularTable, 1));
            popularTable.showMovies(movies);
            break;
        }
        case 1: {
            const movies = await action(inCinemaTable.getMovies.bind(inCinemaTable, 1));
            inCinemaTable.showMovies(movies);
            break;
        }
        case 3: {
            favoritesTable.showMovies(currentUser.favoriteList);
            break;
        }
        case 6: {
            currentUser = {};
            signForm.resetUser();
            break;
        }
    }
}
async function action(serviceFn) {
    spinner.start();
    try {
        const res = await serviceFn();
        return res;
    } catch (error) {
        console.log(error.code);
    } finally {
        spinner.stop();
    }
}
const menu = new ApplicationBar('menu-place', section, menuHandler);
const spinner = new Spinner('spinner-place');
const companyService = new MovieServiceRest(serviceConfig.baseUrl);
const popularTable = new Table(serviceConfig.popularUrl, 'popular');
const inCinemaTable = new Table(serviceConfig.nowPlayingUrl, 'in-cinema');
const favoritesTable = new Favorites();
const searchForm = new SearchForm();
const registrationForm = new RegistrationForm('registration');
registrationForm.fillRegForm();
const signForm = new SignForm('log-in');
signForm.fillSignForm();
registrationForm.addHandler(async (user) => {
    await action(companyService.addUser.bind(companyService, user));
});
signForm.addHandler(async (user) => {
    currentUser = await action(companyService.getUser.bind(companyService, user));
    signForm.setUser(currentUser);
});