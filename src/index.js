const form = document.querySelector('#search-form');
import Notiflix from 'notiflix';
form.addEventListener("submit", handleSubmit);
let gallery = document.querySelector(".gallery");
// let markup = "";
let lightBox = new SimpleLightbox('.gallery a');

const loadMore = document.querySelector(".load-more");
loadMore.style.visibility = "hidden";
import SimpleLightbox from 'simplelightbox';
// Dodatkowy import stylów
import 'simplelightbox/dist/simple-lightbox.min.css';
import getPictures from "./js/getPictures.js"
let pageNr = 1;

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { searchQuery, button }
  } = event.currentTarget;
  searchQueryValue = searchQuery.value
  pageNr = 1;
  gallery.innerHTML = "";
  console.log(searchQuery.value);
  if (searchQueryValue.trim() === '') {
    Notiflix.Notify.failure("Please insert proper serach query");
    loadMore.style.visibility = "hidden";
  } else {
    getPictures(searchQueryValue, pageNr)
      .then(data => renderData(data))
      .catch(error => console.log(error));
  }
  return searchQueryValue;
}

function renderData(data) {
  console.log(data.hits[0]);
  if (data.total === 0) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    markup = "";
    gallery.innerHTML = markup;
    loadMore.style.visibility = "hidden";
  } else {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    loadPhotos(data);
    loadMore.style.visibility = "visible";
    
      // markup = data.hits
      //   .map((hit) => {
      //     return `<a href="${hit.largeImageURL}"><div class="photo-card">
      //       <img class="photo" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
      //       <div class="info">
      //         <p class="info-item">
      //           <b>Likes ${hit.likes}</b>
      //         </p>
      //         <p class="info-item">
      //           <b>Views ${hit.views}</b>
      //         </p>
      //         <p class="info-item">
      //           <b>Comments ${hit.comments}</b>
      //         </p>
      //         <p class="info-item">
      //           <b>Downloads ${hit.downloads}</b>
      //         </p>
      //       </div>
      //     </div></a>`;
      //   })
      // .join(""); 
    // gallery.insertAdjacentHTML('beforeend', markup);
    
    // let box = gallery;
    // box = new SimpleLightbox('.gallery a');
    // let gallerySimpleLightBox = gallery;
    // gallerySimpleLightBox = new SimpleLightbox('.gallery a');
    
  };
};

function loadPhotos(data) {
    markup = data.hits
      .map((hit) => {
        return `<a href="${hit.largeImageURL}"><div class="photo-card">
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
        </div></a>`;
      })
    .join(""); 
  if (pageNr !== 1) {
      checkTotalHits(data.totalHits, pageNr);
  }
  pageNr += 1;
  loadMore.style.visibility = "visible";
  

  gallery.insertAdjacentHTML('beforeend', markup);
  lightBox.refresh();
};
  
loadMore.addEventListener("click", loadMoreImg);

function loadMoreImg(event) {
  event.preventDefault();
  loadMore.style.visibility = "hidden";
  console.log(`page: ${pageNr}`);
    getPictures(searchQueryValue, pageNr)
    .then(data => loadPhotos(data))
    .catch(error => console.log(error));
};

function checkTotalHits(totalHits, pageNr) {
  if (totalHits - pageNr * 40 < 0) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  };  
}