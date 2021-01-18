const apiKey = config.UNSPLASH;

let count = 5;
// const apiKey = 'PtUy9ySK5w-EmQxlugcL8uWN7gbbpF7_nTYFv_NGiFg';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Check if images were loaded
function imageLoaded() {
  imagesLoaded++; 
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

//Set several attributes to an element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Add photos to the container
function displayPhotos() {
  //Reset imagesLoaded to match the assertion to totalImages
  imagesLoaded = 0; 
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Check if each image was loaded
    img.addEventListener('load', imageLoaded);
    
    //Create image elements
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get photos from API
async function getPhotos() {
  try {
    const data = await fetch(apiUrl);
    photosArray = await data.json()
    displayPhotos();
  } catch {

  }
}

//Check if scrolling near bottom of th pages to load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

//On Load
getPhotos()