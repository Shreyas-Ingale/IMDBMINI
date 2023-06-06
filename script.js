const searchBar = document.getElementById('movie-search');
const resultList = document.getElementById('search-list');

let favouriteList = JSON.parse(localStorage.getItem("favouritelist")) || [];

searchBar.addEventListener("search", initiateSearch);
searchBar.addEventListener("keyup", initiateSearch);

function searchAPICall(searchInput) {
    fetch(`https://www.omdbapi.com/?s=${searchInput}&page=1&apikey=98a5a9c1`)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response == "True") displayResult(data.Search);
        });
}

function initiateSearch() {
    let searchInput = (searchBar.value).trim();
    if (searchInput.length > 0) {
        searchAPICall(searchInput);
        resultList.classList.remove('display-none');
        searchBar.classList.add('border-adjustment');
    }
    else {
        resultList.classList.add('display-none');
        searchBar.classList.remove('border-adjustment');
    }
}

function displayResult(result) {
    let moviePoster = "", movieCast = "", movieURL = "";
    resultList.innerHTML = "";
    for (let i = 0; i < result.length; i++) {
        console.log(i, result[i].Title);
        if (result[i].Poster != "N/A") {
            moviePoster = result[i].Poster;
        }
        else {
            moviePoster = "images/notfound.png";
        }
        let movieListItem = document.createElement('a');
        movieURL = "assist/moviePage.html?id=" + result[i].imdbID;
        movieListItem.setAttribute('href', movieURL);
        movieListItem.classList.add('list-group-item', 'd-flex', 'flex-row', 'justify-content-between', 'list-group-item-action');
        fetch(`https://www.omdbapi.com/?i=${result[i].imdbID}&apikey=98a5a9c1`)
            .then((response) => response.json())
            .then((data) => {
                movieCast = data.Actors;
            });
        movieListItem.innerHTML = `
            <span class="align-self-center"><img src="${moviePoster}" alt="poster" width="70" height="90"></span>
            <div class="d-flex flex-column w-75 justify-content-between">
                <h5 class="mb-1">${result[i].Title}</h5>
                <p class="mb-1">${movieCast}</p>
                <small>${result[i].Year}</small>
            </div>
            <small id="${result[i].imdbID}" class="align-self-center"><i class="fa-solid fa-heart fa-xl"></i></small>
        `;
        resultList.appendChild(movieListItem);
        const small = document.getElementById(result[i].imdbID);
        small.addEventListener('click', function (event) { event.preventDefault(); addFavourites(result[i].imdbID); event.stopPropagation(); });
    }
    updateFavBtn();
}

function updateFavBtn() {

    favouriteList.forEach(elemID => {
        if (document.getElementById(elemID)) {
            const fav = document.getElementById(elemID);
            fav.classList.add('text-danger');
        }
    });

}

// update favourate list

function addFavourites(favID) {
    favBtn = document.getElementById(favID);
    let movieID = favID;
    favBtn.classList.toggle('text-danger');
    // to remove the duplicacy of fav. movie
    if (favouriteList.includes(movieID)) {
        let index = favouriteList.indexOf(movieID);
        favouriteList.splice(index, 1);
        localStorage.setItem("favouritelist", JSON.stringify(favouriteList));
        let tooltip = bootstrap.Tooltip.getInstance("#favourite-link");
        tooltip._config.title = "" + favouriteList.length;
        tooltip.update();
        return;
    }
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