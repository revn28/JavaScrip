const apiKey = '167da97b0b530432b38b66715e23eba1'; 
const baseUrl = 'https://api.themoviedb.org/3';
const catalog = document.getElementById('catalog');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const detailsSection = document.getElementById('details');
const detailsContent = document.getElementById('details-content');
const closeDetails = document.getElementById('close-details');


async function fetchPopularMovies() {
    const response = await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=pt-BR`);
    const data = await response.json();
    displayMovies(data.results);
}


function displayMovies(movies) {
    catalog.innerHTML = '';
    if (movies.length === 0) {
        catalog.innerHTML = '<p>Nenhum resultado encontrado.</p>';
    } else {
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            movieElement.addEventListener('click', () => showDetails(movie.id));
            catalog.appendChild(movieElement);
        });
    }
}


async function showDetails(movieId) {
    const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=pt-BR`);
    const movie = await response.json();
    detailsContent.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <p><strong>Sinopse:</strong> ${movie.overview}</p>
        <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
        <p><strong>Avaliação:</strong> ${movie.vote_average}/10</p>
    `;
    detailsSection.classList.remove('hidden');
    detailsSection.style.display = 'flex';
}



closeDetails.addEventListener('click', () => {
    detailsSection.classList.add('hidden');
    detailsSection.style.display = 'none';
});


async function searchMovies(query) {
    const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`);
    const data = await response.json();
    displayMovies(data.results);
}


searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length > 2) {
        searchMovies(query); 
    }
});


searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if (query.length > 2) {
        searchMovies(query);
    }
});


fetchPopularMovies();
