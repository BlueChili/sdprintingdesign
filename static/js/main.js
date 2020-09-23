const mobileNav = document.querySelector('#sb-Toggle');
const mobileLinks = document.querySelector('.sb');
mobileNav.addEventListener('click', (e) => {
  e.preventDefault();
  mobileLinks.classList.toggle('sb-visible');
})

const featuredCards = document.querySelectorAll(".pc-featured");

featuredCards.forEach((card) => {
  const imagesContainer = card.querySelector(".pc-featured_ImagesContainer");
  const thumbnails = card.querySelectorAll(".pc-featured_Thumbnail");
  thumbnails.forEach((el, index) => {
    el.addEventListener(`click`, (e) => {
      toggleSlider(e);
    });
  });
  function toggleSlider (event) {
    event.preventDefault();
    const index = event.target.dataset.index;
    const displacementBase = document.querySelector(`.pc-featured_Image`).getBoundingClientRect().width;
    imagesContainer.style.transform = `translate3d(-${index * displacementBase}px, 0 ,0)`;
  }
});



const caroussel = document.querySelectorAll(".pc-caroussel");
if (caroussel.length) {
const carousselControls = document.querySelectorAll(".pc-caroussel_Control");

caroussel.forEach((card) => {
  const imagesContainer = card.querySelector(".pc-caroussel_ImagesContainer");
  carousselControls.forEach((el, index) => {
    el.addEventListener(`click`, (e) => {
      toggleSlider(e);
      document.querySelector('.pc-caroussel_Control[aria-current="true"]').setAttribute('aria-current', false) 
      e.target.setAttribute('aria-current', true);
      if (e.isTrusted) clearInterval( carousselTicker );
    });
  });
  function toggleSlider (event) {
    event.preventDefault();
    const index = event.target.dataset.index;
    const displacementBase = document.querySelector(`.pc-caroussel_Image`).getBoundingClientRect().width;
    imagesContainer.style.transform = `translate3d(-${index * displacementBase}px, 0 ,0)`;
  }
});

let carousselTicker = window.setInterval(function() {
  if (!!document.querySelector('[aria-current="true"]').nextElementSibling) document.querySelector('[aria-current="true"]').nextElementSibling.click()
  else { carousselControls[0].click() }
}, 5000)

carousselTicker();
}
