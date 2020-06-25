// Project layout - Basic Idea
// 1- User types a movie and a list of movies matching show up
// 2- When the user clicks the give movie, stats about that movie show

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


const dropdown = document.querySelector('.dropdown');

const onInput = async (e) => {
  const items = await onMovieSearch(e.target.value).then((data) => {
    return data
  });
  console.log(items)

  if (items.length) {
    dropdown.style.display = 'block';
  } else {
    dropdown.style.display = 'none';

  }

  document.querySelector('.dropdown-content').innerHTML = '';

  items.forEach((item) => {
    const option = document.createElement('a');
    option.textContent = item.Title;
    option.classList.add('dropdown-item');
    document.querySelector('.dropdown-content').appendChild(option);
  });
};
document.querySelector('#search').addEventListener('input', onInput);