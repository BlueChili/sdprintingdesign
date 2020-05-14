const mobileNav = document.querySelector('#sb-Toggle');
const mobileLinks = document.querySelector('.sb');
mobileNav.addEventListener('click', (e) => {
  e.preventDefault();
  mobileLinks.classList.toggle('sb-visible');
})
