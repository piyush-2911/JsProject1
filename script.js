const apiKey = "e1abb8af";
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const closeButton=document.querySelector('.close-btn');

searchInput.addEventListener('keyup', async (e) => {
  const query = e.target.value.trim();
  if (query.length < 3) {
    resultsDiv.innerHTML = "<p>Start typing to search</p>";
    return;
  }

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await res.json();

    console.log(data);

    resultsDiv.innerHTML = '';
    if (data.Response === 'True') {
      data.Search.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.dataset.id = movie.imdbID;

        const img = document.createElement('img');
        img.src = movie.Poster !== "N/A" ? movie.Poster :'https://media.istockphoto.com/id/1500807425/vector/image-not-found-icon-vector-design.jpg?s=2048x2048&w=is&k=20&c=ShHVnyKufdg46EgClCZFW5ifNbj1YK7dB9dYDfFRLns=';
        const title = document.createElement('h3');
        title.textContent = movie.Title;

        const year = document.createElement('p');
        year.textContent = movie.Year;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(year);

        resultsDiv.appendChild(card);
      });

    } 
    else {
      resultsDiv.innerHTML = `<p>No results found.</p>`;
    }
  } catch (error) {
    console.log(error);
    resultsDiv.innerHTML = `<p>Something went wrong.</p>`;
  }
});

resultsDiv.addEventListener('click', async (e) => {
  const card = e.target.closest('.movie-card');
  if (!card) return;

  console.log(card);

  const imdbID = card.dataset.id;
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`);
    const data = await res.json();
    showDetail(data);
  } catch (err) {
    console.log(err);
  }
});

function showDetail(movie) {
  const{ Title, Year, Poster, Plot, Ratings }=movie;

  const posterEl = document.getElementById('Detail-poster');
  posterEl.src = Poster !== "N/A"  ? Poster : 'https://media.istockphoto.com/id/1500807425/vector/image-not-found-icon-vector-design.jpg?s=2048x2048&w=is&k=20&c=ShHVnyKufdg46EgClCZFW5ifNbj1YK7dB9dYDfFRLns=';

  const titleE1 = document.getElementById('Detail-title');
  titleE1.innerText = `${Title} (${Year})`;

  const plotE1 = document.getElementById('Detail-plot');
  plotE1.innerText = Plot;

  const ratingsList = document.getElementById('Detail-ratings');
  ratingsList.innerHTML = '';
  Ratings.forEach(r => {
    const li = document.createElement('li');
    li.innerText = `${r.Source}: ${r.Value}`;
    ratingsList.appendChild(li);
  });

  document.getElementById('movie-Detail').classList.add('setFlex');
}

closeButton.addEventListener('click', () => {
  document.getElementById('movie-Detail').classList.remove('setFlex');
});
