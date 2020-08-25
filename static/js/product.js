const rootElement = document.querySelector(`html`);

const imagesContainer = document.querySelector(".pd-ImgContainer");
const thumbnails = document.querySelectorAll(".pd-Thumbnail");
thumbnails.forEach((el) => {
  el.addEventListener(`click`, (e) => {
    toggleSlider(e);
  });
});

function toggleSlider (event) {
  const windowWidth = rootElement.clientWidth;
  const displacementBase = document.querySelector(`.pd-Img`)
    .getBoundingClientRect().width;
  const index = event.target.dataset.index;
  imagesContainer.style.transform = `translate3d(-${index * displacementBase}px, 0 ,0)`;
}

const confToggles = document.querySelectorAll(`.pd-Variation`);
const configs = document.querySelectorAll(`.pd-VariationDetails`);

function toggler(e) {
  const index = e.target.dataset.preconfig;
  document.querySelector(".pd-Variation_Active").classList.toggle(`pd-Variation_Active`);
  confToggles.forEach(function(el) {
    el.dataset.preconfig == index && el.classList.toggle(`pd-Variation_Active`)
  });
  document.querySelector(".pd-VariationDetails_Active").classList.toggle(`pd-VariationDetails_Active`);
  document.querySelector(`[data-conf="${index}"]`).classList.toggle(`pd-VariationDetails_Active`);
}

confToggles.forEach((el) => {
  el.addEventListener(`click`, toggler)
});

const productConfigurations = function(){
  const textData = document.querySelector(`[type="application/json"].ProductConfigurations`);
  return JSON.parse(textData.textContent);
}();


  // Main product add to cart option 
// document.querySelector(`.pd-AddToCart`).addEventListener('click', e => {
//   const data  = productConfigurations.preconfig.length == 1 
//     ? productConfigurations.preconfig[0]
//     : findVariation();
//   data.quantity = 1;
//   data.productid = productConfigurations.productid;
//   insertItem(data.title ,data);
//
//   function findVariation(){
//     const configs = document.querySelectorAll(`.pd-Variation`);
//     const index = Array.prototype.filter.call(configs, e => e.classList.length == 2);
//     return  productConfigurations.preconfig[index[0].dataset.preconfig];
//   }
//   function insertItem(id, data) {
//     // localforage.setItem(`${Date.now()}`, data)
//     localforage.getItem(id).then(item => {
//       if (item !== null) {
//         item.quantity += 1;
//         data = item;
//       }
//       localforage.setItem(id, data)
//         .then( success => {
//           success !== null && cartUpdateCounter();
//         });
//     });
//   }
// });
