// Project layout - Basic Idea
// 1- User types a movie and a list of movies matching show up
// 2- When the user clicks the give movie, stats about that movie show
import {autoComplete} from './autocomplete'

document.querySelector('.autocomplete-section').innerHTML = autoComplete();
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
    
  console.log(response)
	if (response.Error) {
		return [];
  }
  
	return response.Search;
};

const onInput = async (e) => {
	const items = await onMovieSearch(e.target.value).then((data) => {
		return data;
  });

  const dropdown = document.querySelector('.dropdown');
	dropdown.innerHTML = '';

	items.forEach((item) => {
		dropdown.innerHTML += `
    <a href="" class="dropdown-item">
      <img src=${item.Poster}>
      ${item.Title}
    </a>
    `;
	});
};

document.querySelector('#search').addEventListener('input', onInput);
