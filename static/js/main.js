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
