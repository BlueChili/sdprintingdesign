// import React from "react";
// import ReactDOM from "react-dom";

const sliderControls = document.querySelectorAll(".qp-ImageSlider_Controls");
const imageSlider = document.querySelector(".qp-Images_Container");

sliderControls.forEach((el, index) => el.addEventListener(`click`, toggleSlider) );

function toggleSlider (event) {
  const index = event.target.dataset.index;
  const displacementBase = document.querySelector(`.qp-Image`).getBoundingClientRect().width;
  imageSlider.style.transform = `translate3d(-${index * displacementBase}px, 0 ,0)`;
}

window.addEventListener('DOMContentLoaded', () => {
  const sliderWidth = `${document.querySelector('.qp-ImageSlider').getClientRects()[0].width}px`;
  document.querySelector('.qp-ImageSlider')
    .style.setProperty("--qp-ImageHeight", sliderWidth); 
});

// Create a fallback for images that don't have file for all sizes
function originalSource (image) {
  image.onerror = () => image.closest('picture').children[0].remove();
}
document.querySelectorAll('.qp-Image')
  .forEach(originalSource);
document.querySelectorAll('.qp-Image_Control')
  .forEach(originalSource);
