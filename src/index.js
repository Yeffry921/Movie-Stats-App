// Project layout - Basic Idea
// 1- User types a movie and a list of movies matching show up
// 2- When the user clicks the give movie, stats about that movie show
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
    onMovieSelect,
  }
})();

// UI CONTROLLLER
const UIController = (() => {})();


// GLOBAL CONTROLLER
const globalAppController = ((movieCtrl, UICtrl) => {
	const init = () => {
    document.querySelector('.autocomplete-section').innerHTML = autoComplete();
		loadEventListeners();
	};

	const loadEventListeners = () => {
		document.querySelector('#search').addEventListener('input', onInput);
		document.querySelector('.dropdown-content').addEventListener('click',getMovieStat);
  };

  const dropdown = document.querySelector('.dropdown');
  const results = document.querySelector('.results');

  const onInput = async (e) => {
    const items = await movieCtrl.onMovieSearch(e.target.value).then((data) => {
      return data;
    });
  
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
    // boxOffice genre,runtime year rating
    console.log(data);
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
  
      document.querySelector('#search').value = '';
      dropdown.style.display = 'none';
      document.querySelector('.movie-stat-section').innerHTML = '';
      document.querySelector('.dropdown-content').classList.add('hide');
  
      document.querySelector('.movie-stat-section').innerHTML += renderMovieStat(movieData);
    }
  };

	return {
		init
	};
})(movieController, UIController);

globalAppController.init();








// When user clicks on the movie, clear the autocomplete and the search
// Hide the autocomplete and then render the movie data
