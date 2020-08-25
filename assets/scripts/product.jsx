import React from "react";
import ReactDOM from "react-dom";

const productData = JSON.parse(document.querySelector(".ProductConfigurations").innerText);


function Description (props){
  return (
    <div className="pd-Description">
      <p dangerouslySetInnerHTML={{__html: props.description }} />
    </div>
  )
};

function ProductOptions (props) {
  const options = props.options.map(x => {
    switch (x.type) {
      case 'SELECT':
        return ( x.name == 'Units'
          ? <QuantitySelector choices={x.choices} name={x.name} key={x.name} qtyOthers={props.qtyOthers} qty={props.qty} />
          : <SelectInput choices={x.choices} name={x.name} key={x.name}/>);
      case 'SIZE':
        return <SizeInput choices={x.choices} key={x.name}/>;
      case 'RADIO':
        return <RadioInput choices={x.choices} name={x.name} key={x.name}/>;
      case 'TEXTFIELD':
        return <TextInput name={x.name} key={x.name}/>;
      case 'CHECKBOX':
        return <CheckInput choices={x.choices} name={x.name} key={x.name}/>;
      case 'FILES':
        return <FileInput name={x.name} key={x.name}/>;
    }
  });
  return (
    <div>{options}</div>
  )

}

      // { props.qtyOthers == true &&  <QuantityInput qty={props.qty} />}
function QuantitySelector (props) {
  const options = props.choices.map( x => <option value={x.text} key={x.text}>{x.text} {props.name}</option>);

  options.push((<option value="other" key="other">Other</option>));
  if (props.qtyOthers) return <QuantityInput qty={props.qty} />;
  return (
    <div className="pd-SelectInput" key={props.name} onChange={props.qty.handleSelect}>
      <p className="title">{props.name}</p>
      <select id={props.name} className="field">
        {options}
      </select>
    </div>
  )
}

function QuantityInput (props) {
  console.log(  props )
  const message = !!props.qty.min ? `Minimum ${props.qty.min} units` : `Quantity`;
  return (
      <div className="pd-TextInput" >
        <input value={props.qty.value} type="number" min={props.qty.min} className="field" id="qtyInput"  onChange={props.qty.handleInput} />
        <label htmlFor="qtyInput" className="label">{message}</label>
      </div>
  )
}

function SelectInput (props) {
  const options = props.choices.map( x => <option value={x.text} key={x.text}>{x.text} {props.name}</option>);

  return (
    <div className="pd-SelectInput" key={props.name}>
      <p className="title">{props.name}</p>
      <select id={props.name} className="field">
        {options}
      </select>
    </div>
  )
}

function SizeInput (props) {
  const sizes = props.choices.map( x => (
    <button type="button" className="sizeButton" key={x.text}>{x.text}</button>
  ));

  return (
    <div className="pd-SizeInput" key={props.name}>
      <p className="title">Size: </p>
      {sizes}
    </div>
  )
}

function RadioInput (props) {
  // Color options are processed as part of the variants
  if (props.name.toLowerCase() === 'color') return null;

  const choices = props.choices.map(x => {
    const identifier  = `${props.name}${x.text}`;
    return (
      <div key={x.text}>
      <input className="field" type="radio" id={identifier} name={props.name} />
      <label className="label" htmlFor={identifier}>{x.text}</label>
      </div>
    )
  });

  return (
    <div className="pd-RadioInput" key={props.name}>
      <p className="title">{props.name}</p>
      {choices}
    </div>
  )
}

function TextInput(props) {
  return (
    <div className="pd-TextInput" key={props.name}>
      <input type="text" className="field" required id={props.name} />
      <label htmlFor={props.name} className="label">{props.name}</label>
    </div>
  )
}

function CheckInput(props) {
  const choices = props.choices.map( x => { 
    return ( <span key={x.text}>
        <input id={x.text} type="checkbox" className="field"/>
        <label htmlFor={x.text} className="label">{x.text}</label>
      </span>)
  })
  return (
    <div className="pd-CheckInput" key={props.name}>
      <p className="title">{props.name}</p>
      {choices}
    </div>
  )
}

function FileInput(props) {
  return (
    <div className="pd-FileInput" key={props.name}>
      <label htmlFor={props.name} className="label">Upload your design:</label>
      <input id={props.name} type="file" className="field" placeholder={props.name} />
    </div>
  )
}

function Colors (props) {
  const colorCombinations = props.combinations.filter( x => {
    return x.options[0].name === "Color";
  })
  const combinations = colorCombinations.map( x => (
    <section className={`pd-Color ${props.activeColor == x.id ? 'pd-Color_Active' : ''}`} onClick={props.colorPick} key={x.id} data-id={x.id}>
      <p className="pd-Color_Title">{x.options[0].value}</p>
      <img className="pd-Color_Image" src={x.smallThumbnailUrl} />
    </section>
  ));
  return (
    <div className="pd-ColorContainer">{combinations}</div>
  )
}

function Price (props) {
  let total;
  if ( props.product.wholesaleprices && !!props.product.wholesaleprices.length) {
    const wsprice = props.product.wholesaleprices.filter(x => {
      return x.quantity == props.product.quantity});
    total = !!wsprice.length ? props.product.quantity * wsprice[0].price : props.product.quantity * props.product.price;
  } else {
    total = props.product.quantity * props.product.price;
  }
  return ( <h1 className="pd-Price">Price: ${currencyFormatter(total)}</h1> );
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = productData;

    this.colorPick = this.colorPick.bind(this);
    this.handleQuantitySelector= this.handleQuantitySelector.bind(this);
    this.handleQtyInput = this.handleQtyInput.bind(this);
  }

  componentDidMount() {

    const minqty = productData.attributes.filter(x => x.name == 'minimumunits');

    if (!!minqty.length) {
    this.setState({ quantity : minqty[0].value});
    this.setState({ minimumunits : minqty[0].value});
    this.setState({ qtyOthers : false});
    } else {
      this.setState({ quantity : 1 });
    }
    this.setState({ activeColor : '' });
  }

  colorPick(e) {
    this.setState({activeColor: e.currentTarget.dataset.id  });
  }

  handleQuantitySelector(e) {
    if (e.target.value == "other") {
      this.setState({quantity: this.state.minimumunits}); this.setState({qtyOthers: true})
    } else {
      this.setState({quantity: Number(e.target.value)}); this.setState({qtyOthers: false})
    }
  }
  
  handleQtyInput (e) {
    this.setState({quantity: e.target.value});
    if (this.state.qtyOthers) {
      this.setState({qtyOthers: true});
    }
  }

  addToCart = () => {
    const id = Date.now();
    localforage.setItem(id, this.state)
      .then (success => {
        success !== null && cartUpdateCounter();
      });
  }

  render () {
    const qty = {
      value: this.state.quantity,
      handleSelect: this.handleQuantitySelector,
      handleInput: this.handleQtyInput,
      min: this.state.minimumunits
    }
    return (
      <div>
        <h1 className="pd-Title"> {this.state.name} </h1>
        <Description description={this.state.description} />
        <ProductOptions options={this.state.options} qty={qty} qtyOthers={this.state.qtyOthers}/>
        <Colors combinations={this.state.combinations} activeColor={this.state.activeColor} colorPick={this.colorPick}/>
        { !!this.state.minimumunits == false && <QuantityInput qty={qty} /> }
        <Price product={this.state} />
        <button className="pd-AddToCart" onClick={this.addToCart} >Add to Cart</button>
      </div>
    )   
  }
}

ReactDOM.render(<App />, document.getElementById('product'));

function currencyFormatter(number){
  const isFloat = /\./; const twoDigitFloat = /\d*\.\d\d+/;
  if (isFloat.test(number)) { return twoDigitFloat.test(number) ? truncateToCurrency(number) : `${number}0`;
  } else { return `${number}.00`; } }

function truncateToCurrency (number) { const regex = /\d*\.?\d?\d?/; return String(number).match(regex)[0]; }
