const mobileNav = document.querySelector('#sb-Toggle');
const mobileLinks = document.querySelector('.sb');
mobileNav.addEventListener('click', (e) => {
  e.preventDefault();
  mobileLinks.classList.toggle('sb-visible');
})

const rootElement = document.querySelector(`html`);
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
    const windowWidth = rootElement.clientWidth;
    const displacementBase = (windowWidth <= 400) ? -98 : -47
    const index = event.target.dataset.index;
    imagesContainer.style.transform = `translate3d(${index * displacementBase}vw, 0 ,0)`;
  }
});

