/* 
    ********************************PLEASE READ************************************
    For This Page code to work:
    Please add your own API keys from the site: https://www.omdbapi.com/apikey.aspx

    Replace your API Key with name YOUR_API_KEY to the variable imdb_api_key 
    and move the below statement out of the commented area

    imdb_api_key='YOUR_API_KEY';

*/

imdb_api_key='';

if (window.location.href === "http://127.0.0.1:5500/movie.html") {
    console.log("Page has changed to movie.html");
    // Your additional logic here
    showMovieDetails();
}

showMovieDetails();

function showMovieDetails(event) {
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
                    const movieTitle = document.getElementById("movieTitle");
                    console.log("Getting element by ID on new Page");
                    console.log(movieTitle);
                    movieTitle.innerText = data.Title
                    const moviePlot = document.getElementById("moviePlot");
                    moviePlot.textContent = data.Plot
                    const moviePoster = document.getElementById("moviePoster");
                    moviePoster.setAttribute('src', data.Poster);
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