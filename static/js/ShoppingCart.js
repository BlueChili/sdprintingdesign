const cart = document.querySelector(`.hd-ShoppingCart`);
const cartCounter = document.querySelector(`.hd-ShoppingCart_Counter`);
// let products = JSON.parse(document.querySelector(`[type="application/json"].ProductsIndex`).textContent);

// fetch(`/products/index.json`)
  // .then(res => res.json()).then(data => products = data);

localforage.length().then((n) => {
  if (n > 0) {
    cartUpdateCounter(); 
    cartCounter.classList.toggle('hd-ShoppingCart_CounterActive');
  }
});

function cartUpdateCounter() {
  const cart = document.querySelector(`.hd-ShoppingCart`);
  const counter = cart.querySelector(`.hd-ShoppingCart_Counter`);
  localforage.length().then(x => {
    if (x == 0) {
      counter.classList.length > 1 && counter.classList.remove(`hd-ShoppingCart_CounterActive`);
      document.querySelector(`.mc-Wrapper`).classList.remove(`mc-Wrapper_Active`);
      setTimeout(() => { document.body.removeChild(document.querySelector(`.mc`));}, 700);
    } else {
    counter.classList.length == 1 && counter.classList.add(`hd-ShoppingCart_CounterActive`);
    }
    (function(){
      let items = 0;
      localforage.iterate(function(item){
        items ++;
      }).then(result => counter.textContent = items.toString() )
    }());
  });
}

cart.addEventListener(`click`, e => {
  miniCart = document.querySelector(`.mc`);
  async function check() {
    const storeLength = await localforage.length().then(x => x) 
    !storeLength && emptyCartCallout();
    miniCart === null && storeLength > 0 && mcReveal();
    !!miniCart && mcHide(miniCart);
  }
  check();
})
  
function mcReveal () {
  const template = document.querySelector(`.MiniCart`)
    .content.cloneNode(true);
  document.body.appendChild(template);
  setTimeout(() => {document.querySelector(`.mc-Wrapper`).classList.toggle(`mc-Wrapper_Active`)}, 17);
  const itemsWrapper = document.querySelector(`.mc-ItemsWrapper`);

  // Items are populated using the built-in iterator of localforage
  
  localforage.iterate((value, key, index) => {
    const metadata = products.find(x => x.productid == value.productid);
    const item = document.querySelector(`.MiniCart-Item`)
      .content.cloneNode(true);
    function qsl (s) { return item.children[0].querySelector(s);}
    itemPriceUpdater(item.children[0], value.price, value.quantity);
    item.children[0].setAttribute(`data-productid`, key);
    qsl(`.mc-ItemImage`).src = metadata.images[0];
    qsl(`.mc-ItemTitle`).innerText = value.title;
    qsl(`.mc-ItemQuantity_Minus`).setAttribute(`data-productid`, key);
    qsl(`.mc-ItemQuantity_Amount`).innerText = value.quantity;
    qsl(`.mc-ItemQuantity_Plus`).setAttribute(`data-productid`, key);
    itemsWrapper.appendChild(item);
  });
}

function mcHide (target) {
  target.querySelector(`.mc-Wrapper`).classList.toggle(`mc-Wrapper_Active`);
  setTimeout(() => { document.body.removeChild(target);}, 700);
}

function emptyCartCallout () {
  const template = document.querySelector(`.co`)
    .content.cloneNode(true);
  document.body.appendChild(template);
  setTimeout(() => {
    document.body.removeChild(document.querySelector(`.co-Overlay`));
  }, 3100);
}

function mcQuantityDecrease (e) {
  const id = e.target.dataset.productid;
  const item = document.querySelector(`.mc-Item[data-productid="${id}"]`);
  localforage.getItem(id)
    .then( result => {
      if (result.quantity != 1) { // Change quantity and update the UI
        result.quantity = result.quantity - 1;
        return localforage.setItem(id, result)
        .then(success => {
          if (success === null) throw { message: 'something failed' }
          cartUpdateCounter(); 
          item.querySelector(`.mc-ItemQuantity_Amount`)
              .innerText = `${result.quantity}`
          itemPriceUpdater(item, result.price,  result.quantity);
        });
      }
      // Remove and Update the UI
      //
      localforage.removeItem(id).then(res => {
        cartUpdateCounter();
        document.querySelector(`.mc-ItemsWrapper`)
          .removeChild(item)
      });
    })
}


function mcQuantityIncrease (e) {
  const id = e.target.dataset.productid;
  const item = document.querySelector(`.mc-Item[data-productid="${id}"]`);
  localforage.getItem(id).then( result => {
    result.quantity = result.quantity + 1;
    localforage.setItem(id, result)
      .then(success => {
        if (success !== null) {
          cartUpdateCounter(); 
          item.querySelector(`.mc-ItemQuantity_Amount`)
            .innerText = `${result.quantity}`
          itemPriceUpdater(item, result.price, result.quantity);
        }
    });
  });
}

function itemPriceUpdater (item, price, quantity) {
  item.querySelector(`.mc-ItemPrice`).innerText = `$${ price * quantity }`;
}
