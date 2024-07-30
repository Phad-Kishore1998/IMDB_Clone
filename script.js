/* 
    ********************************PLEASE READ************************************
    For This Page code to work:
    Please add your own API keys from the site: https://www.omdbapi.com/apikey.aspx

    Replace your API Key with name YOUR_API_KEY to the variable imdb_api_key 
    and move the below statement out of the commented area

    imdb_api_key='YOUR_API_KEY';

*/

imdb_api_key='';

// Get references to HTML elements
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchButton = document.getElementById('searchButton'); 

// Event listener for search button
searchButton.addEventListener('click', handleSearch); 

// Function to handle search input
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    console.log(searchTerm);
    if (searchTerm) {
        // Call the OMDb API to get search results
        console.log(`http://www.omdbapi.com/?apikey=${imdb_api_key}&s=${searchTerm}`);
        fetch(`http://www.omdbapi.com/?apikey=${imdb_api_key}&s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.title);
                console.log(`S way: ${data.Search[0].Title}`);
                if (data.Search) {
                    displayResults(data.Search);
                } else {
                    searchResults.innerHTML = 'No results found.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        searchResults.innerHTML = '';
    }
}


// Function to display search results
function displayResults(results) {
    searchResults.innerHTML = '';
    results.forEach(movie => {
        const li = document.createElement('li');
        console.log(`movie name is present: ${movie.Title}`);
        li.innerHTML = `<a href="movie.html?status=${movie.imdbID}"> <span class="moviePage">${movie.Title}</span></a>
        <button class="favorite-btn" data-id="${movie.imdbID}">Add to Favorites</button>`;
        searchResults.appendChild(li);
    });

    // Add event listeners for favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', addToFavorites);
    });
}

// Function to handle adding a movie to favorites
function addToFavorites(event) {
    const movieId = event.target.dataset.id;
    const prevSibling = event.target.previousElementSibling;
    if (prevSibling) {
        const movieName = prevSibling.textContent;
        console.log("Previous sibling text content:", movieName);
        console.log(`Added movie with ID: ${movieId} and Name: ${movieName} to favorites.`);
        message = `Added movie with ID: ${movieId} and Name: ${movieName} to favorites.`
        addedToFavNotification(message);
        
        if (movieName) {
            console.log("Adding fav Movie to localStorage");
            const movies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
            movies.push(movieName);
            localStorage.setItem('favoriteMovies', JSON.stringify(movies));
            console.log(movies);
        }
    }
}


const flashMessage = document.getElementById("flashMessage");
function addedToFavNotification(message) {
    flashMessage.innerHTML = `<b>${message}</b>`;
    setTimeout(function() {
        flashMessage.innerHTML = "";
    }, 2000);
}



if (window.location.href === "http://127.0.0.1:5500/movie.html") {
    console.log("Page has changed to movie.html");
    // Your additional logic here
    document.addEventListener("DOMContentLoaded", function() {
        // Your JavaScript code here
        console.log("New page DOM content has loaded!");
    });
    console.log(showMovieDetails);
    showMovieDetails();
}


function showMovieDetails() {
    console.log("Showing Details");
    //const movieID = event.target.nextElementSibling;
    const movieID = new URLSearchParams(window.location.search).get('status');
    //const searchTerm = searchInput.value.trim();
    const searchTerm = movieID;
    console.log(searchTerm);
    if (searchTerm) {
        // Call the OMDb API to get search results
        console.log(`http://www.omdbapi.com/?apikey=${imdb_api_key}&i=${movieID}`);
        fetch(`http://www.omdbapi.com/?apikey=${imdb_api_key}&i=${movieID}`)
            .then(response => response.json())
            .then(data => {
                if (data.Title) {
                    console.log(data.Title);
                    const movieTitle = document.getElementById("flashMessage");
                    movieTitle.textContent = data.Title
                    const moviePlot = document.getElementById("moviePlot");
                    movieTitle.textContent = data.Plot
                    const moviePoster = document.getElementById("moviePoster");
                    moviePoster.setAttribute('src',data.Poster);
                } else {
                    searchResults.innerHTML = 'No results found.';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        searchResults.innerHTML = '';
    }
}
