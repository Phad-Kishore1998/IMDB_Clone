document.addEventListener('DOMContentLoaded', (event) => {
    loadMovies();
});

function loadMovies() {
    const movies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const list = document.getElementById('favorite-movies-list');
    list.innerHTML = '';

    movies.forEach((movie, index) => {
        const li = document.createElement('li');
        li.textContent = movie;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeMovie(index);
        li.appendChild(removeButton);
        list.appendChild(li);
    });
}

function removeMovie(index) {
    const movies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    movies.splice(index, 1);
    localStorage.setItem('favoriteMovies', JSON.stringify(movies));
    loadMovies();
}