import './style.css'
import './spinner.css'
const api_key = 'pOyOmP8C1o7kWuXo25JfF-VHbvvl3Wk7NzHDli_u_0I';
const imageContainer = document.querySelector('#image-container')
const loader = document.querySelector('#loader')

let count = 5;
let ready = false;
let imagesLoaded = 0
let totalImages = 0;
let initialLoad = true;
//when image is loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30

  }
}
function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
function displayPhotos(photosArray) {
  imagesLoaded = 0;
  totalImages = photosArray.length
  photosArray.forEach(photo => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    })
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    })
    //add event listener
    img.addEventListener('load', imageLoaded)
    item.appendChild(img);
    imageContainer.appendChild(item)
  });
}
//get photos from unsplash api
async function getPhotos() {
  let apiUrl = `https://api.unsplash.com//photos/random/?client_id=${api_key}&count=${count}`
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayPhotos(data);
  } catch (err) {
    console.log(err)
  }
}
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos()
  }
})
getPhotos()