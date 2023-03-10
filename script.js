// Get references to HTML elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const historyList = document.getElementById('history-list');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const searchHistoryBtn = document.getElementById('search-history-btn');
const searchPage = document.getElementById('search-page');
const historyPage = document.getElementById('history-page');
 
// Initialize search history array from localStorage
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
 
// Display search history in the history page
function displaySearchHistory() {
  historyList.innerHTML = '';
  for (let i = searchHistory.length - 1; i >= 0; i--) {
    const li = document.createElement('li');
    li.textContent = searchHistory[i];
    li.addEventListener('click', function() {
      searchBooks(searchHistory[i]);
    });
    historyList.appendChild(li);
  }
}
 
// Save search query to localStorage and search history array
function saveSearchQuery(query) {
  searchHistory.push(query);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  displaySearchHistory();
}
 
// Clear search history from localStorage and array
function clearSearchHistory() {
  searchHistory = [];
  localStorage.removeItem('searchHistory');
  displaySearchHistory();
}
 
// Display book data in the search results
function displaySearchResults(data) {
  searchResults.innerHTML = '';
  for (let i = 0; i < data.items.length; i++) {
    const book = data.items[i].volumeInfo;
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${book.imageLinks.thumbnail}">
    <h2>${book.title}</h2>
    <p>Author(s): ${book.authors}</p>
    <p>Published Date: ${book.publishedDate}</p>
    <p>Pages: ${book.pageCount}</p>
    <p>Categories: ${book.categories}</p>
    <p>Average Rating: ${book.averageRating}</p>
    <a href="${book.infoLink}" target="_blank">View on Google Books</a>
    <button id='buy'>Buy Now</button>
    `;
    searchResults.appendChild(div);
  }
}
 
// Fetch book data from Google Books API and display it
function searchBooks(query) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(response => response.json())
    .then(data => {
      displaySearchResults(data);
      saveSearchQuery(query);
    })
    .catch(error => console.error(error));
}
 
// Event listeners
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const query = searchInput.value;
  if (query) {
    searchBooks(query);
  }
});
 
clearHistoryBtn.addEventListener('click', clearSearchHistory);
searchHistoryBtn.addEventListener('click', function() {
  searchPage.style.display = 'none';
  historyPage.style.display = 'block';
  displaySearchHistory();
});

const backToSearchBtn = document.getElementById("back-to-search-btn");
backToSearchBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
  });

// Initialize app by displaying search history
displaySearchHistory();