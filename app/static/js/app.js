document.addEventListener('DOMContentLoaded', function() {
    const showAddMovieBtn = document.getElementById('showAddMovie');
    const showMoviesBtn = document.getElementById('showMovies');
    const addMovieForm = document.getElementById('addMovieForm');
    const moviesList = document.getElementById('moviesList');
    const form = document.getElementById('movieForm');

    let shouldFetchMovies = false;

    showAddMovieBtn.addEventListener('click', function() {
        moviesList.style.display = 'none';
        addMovieForm.style.display = 'block';
    });

    showMoviesBtn.addEventListener('click', function() {
        addMovieForm.style.display = 'none';
        moviesList.style.display = 'block';
        if (shouldFetchMovies) {
            fetchMovies();
            shouldFetchMovies = false;
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });

        fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Movie added successfully!');
                form.reset();
                shouldFetchMovies = true;
            } else {
                alert('Failed to add movie. ' + data.errors.join('; '));
            }
        })
        .catch(error => alert('Error adding movie.'));
    });

    function fetchMovies() {
        fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            moviesList.innerHTML = '<h2>All Movies</h2>';
            movies.forEach(movie => {
                const movieEl = document.createElement('div');
                movieEl.innerHTML = `<p><strong>${movie.title}</strong> (Directed by ${movie.director || 'Unknown'}) - Genre: ${movie.genre || 'N/A'}</p>`;
                moviesList.appendChild(movieEl);
            });
        });
    }
});
