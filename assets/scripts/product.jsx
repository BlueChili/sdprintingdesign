import React from "react";
import ReactDOM from "react-dom";

const productData = JSON.parse(document.querySelector(".ProductConfigurations").innerText);

productData.activeColor = '';

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
        return <SelectInput choices={x.choices} name={x.name} key={x.name}/>;
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
class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = productData;

    this.colorPick = this.colorPick.bind(this);
  }

  colorPick(e) {
    console.log( e.currentTarget.dataset.id );
    this.setState({activeColor: e.currentTarget.dataset.id  });
    console.log(this.state);
    console.log(this.state.activeColor);
  }

  render () {
    return (
      <div>
        <h1 className="pd-Title"> {this.state.name} </h1>
        <Description description={this.state.description} />
        <ProductOptions options={this.state.options} />
        <Colors combinations={this.state.combinations} activeColor={this.state.activeColor} colorPick={this.colorPick}/>
      </div>
    )   
  }
}

ReactDOM.render(<App />, document.getElementById('product'));
