const axios = require('axios').default;
const form = document.querySelector('#search-form');
import Notiflix from 'notiflix';
form.addEventListener("submit", handleSubmit);
const gallery = document.querySelector(".gallery");
let markup = "";
const API_KEY = '28203095-60f45d0309e92efa731dcf20a';
let pageNr = 1;
const loadMore = document.querySelector(".load-more");
loadMore.style.visibility = "hidden";


function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { searchQuery, button }
  } = event.currentTarget;
  pageNr = 1;
  async function getPictures() {
    const searchParams = new URLSearchParams(
      {
        key: API_KEY,
        q: searchQuery.value,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 10,
        page: pageNr,
      }
    );  
    let response = await axios({
      method: 'get',
      url: `https://pixabay.com/api/?${searchParams}`,
    });
    const data = response.data;
    return data
  };
  console.log(searchQuery.value);

  getPictures()
    .then(data => renderData(data))
    .catch(error => console.log(error));
  
  loadMore.addEventListener("click", loadMoreImg);
  function loadMoreImg(event) {
    event.preventDefault();
    pageNr += 1;
    loadMore.style.visibility = "hidden";
    console.log(`page: ${pageNr}`);
      getPictures()
      .then(data => renderData(data))
      .catch(error => console.log(error));
  }
  
}

function renderData(data) {
  // console.log(data);
  // console.log(data.total);
  // console.log(data.totalHits);
  console.log(data.hits[0]);
  if (data.total === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    markup = "";
    gallery.innerHTML = markup;
    loadMore.style.visibility = "hidden";
  } else {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      markup = data.hits
        .map((hit) => {
          return `<div class="photo-card">
            <img class="photo" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes ${hit.likes}</b>
              </p>
              <p class="info-item">
                <b>Views ${hit.views}</b>
              </p>
              <p class="info-item">
                <b>Comments ${hit.comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads ${hit.downloads}</b>
              </p>
            </div>
          </div>`;
        })
      .join(""); 
    gallery.insertAdjacentHTML('beforeend', markup);
    loadMore.style.visibility = "visible";
  };
  

};


// const axios = require('axios');


// const fetchUsers = async () => {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   console.log(response);
//   const users = await response.json();
//   return users;
// };

// fetchUsers().then(users => console.log(users));