import { autoComplete } from './autocomplete';
import './style.css';

// MOVIE CONTROLLER
const movieController = (() => {
	const key = '6d5ddc8d';
	const onMovieSearch = async (searchTerm) => {
		const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`)
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				return data;
			})
			.catch((err) => {
				alert(err);
			});
		if (response.Error) {
			return [];
		}
		return response.Search;
	};

	const onMovieSelect = async (movieName) => {
		const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&t=${movieName}`)
			.then((data) => {
				return data.json();
			})
			.then((movie) => {
				return movie;
			})
			.catch((err) => {
				console.log('line 38 Error', err);
			});

		return response;
	};

	return {
		onMovieSearch,
		onMovieSelect
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

	return {
		DOMStrings
	};
})();

// GLOBAL CONTROLLER
const globalAppController = ((movieCtrl, UICtrl) => {
	const DOMStrings = UICtrl.DOMStrings;

	const init = () => {
		document.querySelector(DOMStrings.autocompleteSection).innerHTML = autoComplete();
		loadEventListeners();
	};

	const loadEventListeners = () => {
		document.querySelector(DOMStrings.search).addEventListener('input', onInput);
		document.querySelector(DOMStrings.dropdownContent).addEventListener('click', getMovieStat);
	};

	const onInput = async (e) => {
		const items = await movieCtrl.onMovieSearch(e.target.value).then((data) => {
			return data;
		});
		
    const dropdown = document.querySelector(DOMStrings.dropdown);
    const results = document.querySelector(DOMStrings.results);

		if (!items.length) {
			dropdown.style.display = 'none';
			// get out of function or the next line runs
			return;
		}
		dropdown.style.display = 'block';

		results.innerHTML = '';

		items.forEach((item) => {
			let imgPoster = item.Poster;
			if (imgPoster === 'N/A') {
				imgPoster = '';
			}
			results.innerHTML += `
      <a href="#" class="dropdown-item">
        <img src=${imgPoster}>
        ${item.Title}
      </a>
      `;
		});
	};

	const renderMovieStat = (data) => {
		return `
    <img src=${data.Poster}>
    <div>
      <h3 class="movie-data">Box Office: ${data.BoxOffice}</h3>
      <h3 class="movie-data">Genres: ${data.Genre}</h3>
      <h3 class="movie-data">Release Date: ${data.Released}</h3>
      <h3 class="movie-data">Rating: ${data.Rated}</h3>
      <h3 class="movie-data">Awards: ${data.Awards}</h3>
    </div>
    `;
	};
	const getMovieStat = async (e) => {
		if (e.target.className === 'dropdown-item') {
			const movieData = await movieCtrl.onMovieSelect(e.target.textContent);
			document.querySelector(DOMStrings.search).value = '';
			dropdown.style.display = 'none';
			document.querySelector(DOMStrings.movieStatSection).innerHTML = '';
			document.querySelector(DOMStrings.dropdownContent).classList.add('hide');
			document.querySelector(DOMStrings.movieStatSection).innerHTML += renderMovieStat(movieData);
		}
	};
	return {
		init
	};
})(movieController, UIController);

globalAppController.init();

// When user clicks on the movie, clear the autocomplete and the search
// Hide the autocomplete and then render the movie data
