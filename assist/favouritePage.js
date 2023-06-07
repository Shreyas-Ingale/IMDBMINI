const list = document.getElementById('fav-list');
const clearAll = document.getElementById('clear-all');
let favouriteList = JSON.parse(localStorage.getItem("favouritelist")) || [];

clearAll.addEventListener('click', function () {
    favouriteList = [];
    localStorage.setItem("favouritelist", JSON.stringify(favouriteList));
    window.location.reload();
});

// IIFE to start the rendering
(async () => {
    for (let index = 0; index < favouriteList.length; index++) {
        await getAPICall(favouriteList[index]);
    }
    if(list.innerHTML.trim().length == 0){
        const p = document.createElement('p');
        p.classList.add('text-center', 'w-100', 'fs-4')
        p.innerText = 'Nothing to show here. Please add movies/series to Favourites ...'
        list.appendChild(p);
    }
})();


async function getAPICall(id) {
    await fetch(`https://www.omdbapi.com/?i=${id}&apikey=98a5a9c1`)
        .then((response) => response.json())
        .then((data) => { console.log(data); renderList(data) });
}

function renderList(movie) {
    let moviePoster = "";
    if (movie.Poster) {
        moviePoster = movie.Poster;
    }
    else {
        moviePoster = "../images/notfound.png";
    }
    let movieURL = "moviePage.html?id=" + movie.imdbID;
    const listItem = document.createElement('div');
    listItem.classList.add('col');
    listItem.innerHTML = `
    <div class="card text-bg-dark border-secondary">
        <div class="row g-0">
            <div class="col-lg-4">
                <a href="${movieURL}"><img src="${moviePoster}" class="img-fluid h-100 rounded-start" alt="Poster"></a>
            </div>
            <div class="col-lg-8">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-baseline">
                        <h5 class="card-title text-warning">${movie.Title}</h5>
                        <span><i id="${movie.imdbID}" class="fa-regular fa-trash-can text-secondary" onclick="deleteBtn(id)"></i></span>
                    </div>
                    <p class="card-text">
                        <small class="text-white-50 d-flex gap-2 align-items-center">
                            <span class="me-1">${movie.Year}</span>
                            <span class="position-relative">
                                <span class="position-absolute top-50 end-100 translate-middle border border-secondary border-2 rounded-circle"></span>
                                <span class="mx-1">${movie.Rated}</span>
                            </span>
                            <span class="position-relative">
                                <span class="position-absolute top-50 end-100 translate-middle border border-secondary border-2 rounded-circle"></span>
                                <span class="ms-1">${movie.Runtime}</span>
                            </span>
                        </small>
                    </p>
                    <p class="card-text text-white">${movie.Actors}</p>
                </div>
            </div>
        </div>
    </div>
    `;
    list.appendChild(listItem);
}

function deleteBtn(id) {
    let i = favouriteList.indexOf(id);
    console.log("Delete ID : ",id);
    favouriteList.splice(i, 1);
    localStorage.setItem("favouritelist", JSON.stringify(favouriteList));
    window.location.reload();
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