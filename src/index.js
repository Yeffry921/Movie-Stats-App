import { autoComplete } from './autocomplete';
import './style.css';

// MOVIE CONTROLLER
const movieController = (() => {
  const key = '6d5ddc8d';
  const onMovieSearch = async (searchTerm) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`,
    )
      .then((data) => data.json())
      .then((data) => data)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    if (response.Error) {
      return [];
    }
    return response.Search;
  };

  const onMovieSelect = async (movieName) => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${key}&t=${movieName}`,
    )
      .then((data) => data.json())
      .then((movie) => movie)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });

    return response;
  };

  return {
    onMovieSearch,
    onMovieSelect,
  };
})();

// UI CONTROLLLER
const UIController = (() => {
  const DOMStrings = {
    dropdown: '.dropdown',
    results: '.results',
    search: '#search',
    dropdownContent: '.dropdown-content',
    autocompleteSection: '.autocomplete-section',
    movieStatSection: '.movie-stat-section',
  };

  const renderMovieStat = (data) => `
    <img src=${data.Poster}>
    <div>
      <h3 class="movie-data">Box Office: ${data.BoxOffice}</h3>
      <h3 class="movie-data">Genres: ${data.Genre}</h3>
      <h3 class="movie-data">Release Date: ${data.Released}</h3>
      <h3 class="movie-data">Rating: ${data.Rated}</h3>
      <h3 class="movie-data">Awards: ${data.Awards}</h3>
    </div>
    `;

  const renderDropdownMovies = (movies) => {
    movies.forEach((item) => {
      let imgPoster = item.Poster;
      if (imgPoster === 'N/A') {
        imgPoster = '';
      }
      document.querySelector(DOMStrings.results).innerHTML += `
      <a href="#" class="dropdown-item">
        <img src=${imgPoster}>
        ${item.Title}
      </a>
      `;
    });
  };

  return {
    DOMStrings,
    renderMovieStat,
    renderDropdownMovies,
  };
})();

// GLOBAL CONTROLLER
const globalAppController = ((movieCtrl, UICtrl) => {
  // eslint-disable-next-line prefer-destructuring
  const DOMStrings = UICtrl.DOMStrings;
  const clearAndHideDropdown = () => {
    const dropdown = document.querySelector(DOMStrings.dropdown);

    document.querySelector(DOMStrings.search).value = '';
    dropdown.style.display = 'none';
  };

  const clearAndRenderMovies = (movieData) => {
    const movieStatSection = document.querySelector(
      DOMStrings.movieStatSection,
    );

    movieStatSection.innerHTML = '';
    movieStatSection.innerHTML += UICtrl.renderMovieStat(movieData);
  };
  const getMovieStat = async (e) => {
    if (e.target.className === 'dropdown-item') {
      const movieData = await movieCtrl.onMovieSelect(e.target.textContent);
      clearAndHideDropdown();
      clearAndRenderMovies(movieData);
    }
  };

  const onInput = async (e) => {
    // Fetch Movie List
    const items = await movieCtrl.onMovieSearch(e.target.value).then((data) => data);

    const dropdown = document.querySelector(DOMStrings.dropdown);
    const results = document.querySelector(DOMStrings.results);
    // If there are no movies hide the dropdown and leave
    if (!items.length) {
      dropdown.style.display = 'none';
      // get out of function or the next line runs
      return;
    }
    dropdown.style.display = 'block';

    results.innerHTML = '';

    UICtrl.renderDropdownMovies(items);
  };

  const loadEventListeners = () => {
    document
      .querySelector(DOMStrings.search)
      .addEventListener('input', onInput);
    document
      .querySelector(DOMStrings.dropdownContent)
      .addEventListener('click', getMovieStat);
  };

  const init = () => {
    document.querySelector(
      DOMStrings.autocompleteSection,
    ).innerHTML = autoComplete();
    loadEventListeners();
  };

  return {
    init,
  };
})(movieController, UIController);

globalAppController.init();

// When user clicks on the movie, clear the autocomplete and the search
// Hide the autocomplete and then render the movie data
