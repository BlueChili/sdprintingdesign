console.log( 'hi product');
const rootElement = document.querySelector(`html`);
const featuredCards = document.querySelectorAll(".pc-featured");

const imagesContainer = document.querySelector(".pd-ImgContainer");
const thumbnails = document.querySelectorAll(".pd-Thumbnail");
thumbnails.forEach((el) => {
  el.addEventListener(`click`, (e) => {
    toggleSlider(e);
  });
});

function toggleSlider (event) {
  console.log("hi");
  event.preventDefault();
  const windowWidth = rootElement.clientWidth;
  const displacementBase = (windowWidth <= 400) ? -98 : -47
  const index = event.target.dataset.index;
  imagesContainer.style.transform = `translate3d(${index * displacementBase}vw, 0 ,0)`;
}
