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
  const windowWidth = rootElement.clientWidth;
  const displacementBase = document.querySelector(`.pd-Img`).getBoundingClientRect().width;
  const index = event.target.dataset.index;
  imagesContainer.style.transform = `translate3d(-${index * displacementBase}px, 0 ,0)`;
}

const confToggles = document.querySelectorAll(`.pd-PreConfig`);
const configs = document.querySelectorAll(`.pd-PreConfigDetails`);
function toggler(e) {
  const index = e.target.dataset.preconfig;
  document.querySelector(".pd-PreConfig_Active").classList.toggle(`pd-PreConfig_Active`);
  confToggles.forEach(function(el) {
    el.dataset.preconfig == index && el.classList.toggle(`pd-PreConfig_Active`)
  });
  document.querySelector(".pd-PreConfigDetails_Active").classList.toggle(`pd-PreConfigDetails_Active`);
  document.querySelector(`[data-conf="${index}"]`).classList.toggle(`pd-PreConfigDetails_Active`);
}
confToggles.forEach((el) => {
  el.addEventListener(`click`, toggler)
});
