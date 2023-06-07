// collecting elements from DOM
const container = document.getElementById('content-holder');
// local array to store favourites
let favouriteList = JSON.parse(localStorage.getItem("favouritelist")) || [];

// geting the movie id and caling the API
let searchID = '';
const urlParams = new URLSearchParams(location.search);
for(const [key, value]of urlParams){
    searchID = value;
}
searchAPICall();

// funtion to call the API
async function searchAPICall() {
    await fetch(`https://www.omdbapi.com/?i=${searchID}&apikey=98a5a9c1`)
        .then((response) => response.json())
        .then((data) => {
            displayResult(data);
        });
}

// Displat Results
function displayResult(movie) {
    let isFavourite = "", moviePoster = "";
    // if content is already in favourites make heart icon red
    if(favouriteList.includes(searchID)){
        isFavourite = "text-danger";
    }
    // check if movie poster exist or not if not give default image
    if (movie.Poster) {
        moviePoster = movie.Poster;
    }
    else {
        moviePoster = "../images/notfound.png";
    }
    const card = document.createElement('div');
    card.classList.add('card', 'text-bg-dark', 'border-dark', 'mb-3', 'w-100');
    card.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${moviePoster}" class="img-fluid h-100 rounded-start bg-secondary" alt="Poster">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center text-warning">
                        <h3 class="card-title text-break">${movie.Title}</h3>
                        <p class="card-text fs-5 me-4 align-self-baseline">IMDb Rating : <span>${movie.imdbRating}</span></p>
                    </div>
                    <div class="pe-4 d-flex justify-content-between">
                        <p class="card-text">
                            <small class="text-white-50 d-flex gap-2 align-items-center">
                                <span class="me-1">${movie.Year}</span> 
                                <span class="position-relative">
                                    <span class="position-absolute top-50 end-100 translate-middle border border-secondary border-2 rounded-circle"></span>
                                    <span class="mx-1">${movie.Rated}</span>
                                </span>
                                <span class="position-relative">
                                    <span class="position-absolute top-50 end-100 translate-middle border border-secondary border-2 rounded-circle"></span>
                                    <!-- runtime -->
                                    <span class="ms-1">${movie.Runtime}</span>
                                </span>                                
                            </small>
                        </p>
                        <span class="d-flex pt-2 pe-2 text-secondary"><i id="${movie.imdbID}" class="fa-solid fa-heart fa-xl ${isFavourite}" onclick="toggleFavourite(id)"></i></span>
                    </div>
                    <p class="card-text">${movie.Plot}</p>
                    <p class="card-text text-warning">${movie.Genre}</p>
                    <p class="card-text my-1"><span>Director : </span><small class="text-warning">${movie.Director}</small></p>
                    <div class="w-75 border border-secondary"></div>
                    <p class="card-text my-1"><span>Writer : </span><small class="text-warning">${movie.Writer}</small></p>
                    <div class="w-75 border border-secondary"></div>
                    <p class="card-text my-1"><span>Cast : </span><small class="text-warning">${movie.Actors}</small></p>
                    <div class="w-75 border border-secondary"></div>
                    <p class="card-text my-1"><span>Awards : </span><small class="text-warning">${movie.Awards}</small></p>
                    <div class="w-75 border border-secondary"></div>
                </div>
            </div>
        </div>
    `;
    container.appendChild(card);
}

// Add/Remove the content from favourites
function toggleFavourite(movieID){
    favBtn = document.getElementById(movieID);
    favBtn.classList.toggle('text-danger');
    // to handle the duplicacy/removal of Content
    if (favouriteList.includes(movieID)) {
        let index = favouriteList.indexOf(movieID);
        favouriteList.splice(index, 1);
        localStorage.setItem("favouritelist", JSON.stringify(favouriteList));
        let tooltip = bootstrap.Tooltip.getInstance("#favourite-link");
        tooltip._config.title = "" + favouriteList.length;
        tooltip.update();
        return;
    }
    // to add the content 
    else {
        favouriteList.push(movieID);
        localStorage.setItem("favouritelist", JSON.stringify(favouriteList))
        let tooltip = bootstrap.Tooltip.getInstance("#favourite-link");
        tooltip._config.title = "" + favouriteList.length;
        tooltip.update();
        return;
    }
}

// greetings
var myDate = new Date();
var hrs = myDate.getHours();

var greet;

if (hrs >= 5 && hrs < 12)
    greet = '⛅ Good Morning';
else if (hrs >= 12 && hrs < 17)
    greet = '🌞 Good Afternoon';
else if (hrs >= 17 && hrs <= 23)
    greet = '🎴 Good Evening';
else if (hrs >= 0 && hrs < 5)
    greet = '🌃 Good Night';

document.querySelector('.greeting-message').innerText = greet;

// tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
let tooltip = bootstrap.Tooltip.getInstance("#favourite-link");
tooltip._config.title = "" + favouriteList.length;
tooltip.update();