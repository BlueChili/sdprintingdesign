const cart = document.querySelector(`.hd-ShoppingCart`);
const cartCounter = document.querySelector(`.hd-ShoppingCart_Counter`);
const addButtons = document.querySelectorAll(`.pd-AddToCart`);
localforage.length().then((n) => {
  if (n > 0) {
    CartUpdateCounter(cartCounter); 
    document.querySelector(`.hd-ShoppingCart_Counter`)
      .classList.toggle('hd-ShoppingCart_CounterActive');
  }
});

function CartUpdateCounter(target) {
  localforage.length().then(x => target.textContent = x.toString());
}


addButtons.forEach(x => {
  x.addEventListener('click', e => {
    localforage.setItem(`${Date.now()}`, `test`)
      .then(res => CartUpdateCounter(cartCounter));
  });
});

cart.addEventListener(`click`, e => {
  miniCart = document.querySelector(`.mc`);
  async function check() {
    const storeLength = await localforage.length().then(x => x) 
    !storeLength && emptyCartCallout();
    miniCart === null && storeLength > 0 && mcReveal();
  }
  check();
})
  
function mcReveal () {
 console.log('show cart'); 
}

function emptyCartCallout () {
  const template = document.querySelector(`.co`)
    .content.cloneNode(true);
  document.body.appendChild(template);
  ,l  setTimeout(() => {
    document.body.removeChild(document.querySelector(`.co-Overlay`));
  }, 3100);
  console.log('empty store');
}
