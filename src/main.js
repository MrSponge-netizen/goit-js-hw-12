import { createGallery, clearGallery, showLoader, hideLoader, hideLoadMoreButton, showLoadMoreButton} from "./js/render-functions";
import getImagesByQuery from "./js/pixabay-api";

import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');

const loadmoreButton = document.querySelector('[data-loadmore]');

let current_page = 1;

let savedUserInput = "";
let totalHits = 0;

form.addEventListener('submit', async (evt)  => {
  evt.preventDefault();

  const userInput = form.elements['search-text'].value.trim();
  

  if (userInput == '') {
    iziToast.show({
        title: 'Fill please all fields',
        color: 'white',
        position: 'topCenter',
        //message: 'Please choose a date in the future',
      });
    return false;
  }
  savedUserInput = userInput;
  current_page = 1;

  hideLoadMoreButton()
   showLoader();
    clearGallery();

   fetchData(userInput);


  
  console.log(userInput);
  form.reset();

});

async function fetchData(userInput) {

try{
  

 const data = await getImagesByQuery(userInput, current_page)

const images = data.hits;
    if (images.length === 0) {

      totalHits = 0;
      iziToast.show({
        title: 'Sorry, there are no images matching your search query. Please try again!',
        color: 'white',
        position: 'topCenter',
        //message: 'Please choose a date in the future',
      });
      // Handle empty state (e.g., show notification to user)
    } else {


     

      console.log(`Found ${images.length} images:`, images);
     totalHits = data.totalHits;
 
      createGallery(images);
      
    }

    checkIsThereMoreToLoad()
    

}
catch(err){
console.error('Failed to render gallery:', err);
    iziToast.error({
      title: 'Error',
      message: 'Failed to create gallery. Please try again.',
    });
   
}
hideLoader()

}

loadmoreButton.addEventListener('click', async (evt) => {
  evt.preventDefault();

  
  current_page += 1;
hideLoadMoreButton()
  showLoader();
  await fetchData(savedUserInput);

  let cardHeight = document.querySelector('.gallery-image').getBoundingClientRect().height;
 
scrollGalerry(cardHeight);
  


});

function checkIsThereMoreToLoad(){
  const currentlyLoaded =  current_page * 15;
  if(currentlyLoaded >= totalHits && totalHits != 0) {
    
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",

    });
    
    hideLoadMoreButton();}
  else showLoadMoreButton();

}

function scrollGalerry(cardHeight){
  window.scrollBy( {
  top: cardHeight *2,
  left: 0,
  behavior: 'smooth'
});
console.log("cardHeight" + cardHeight);
}