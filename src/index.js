import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Donut } from 'react-dial-knob'

function Step(props) {
    return (
      <button className="Step" onClick={props.onClick} style = {{color : props.value? 'red' : 'white'}}>
        {props.value.toString()}
      </button>
    );
}

function Knob(props) {
  return <Donut
        diameter={200}
        min={0}
        max={100}
        step={1}
        value={props.decay}
        theme={{
            donutColor: 'lightcoral'
        }}
        style={{
          position: 'relative',
          margin: '100px auto',
          width: '200px'
        }}
        onValueChange={props.onValueChange}
        ariaLabelledBy={'my-label'}
        spaceMaxFromZero={false}
    >
        <label id={'my-label'} style={{
          textAlign: 'center',
          width: '200px',
          display: 'block',
          padding: '10px 0'
        }}>My Label</label>
    </Donut>
}

class Oscillator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      decay: props.decay,
      shape: 'square',
      tune: 0,
      envAmount: 0,
      handler: props.handler.bind(this),
    }
  }
  renderKnob(props){
    return <Knob decay={this.state.decay}
     onValueChange={this.state.handler}
     />
  }

  handleValueChange(e){
    this.setState({decay:e});
    console.log(e);
  }

  render() {
    return (<div>{this.renderKnob()}</div>);
  }
}

class Sequencer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      voice1Seq: Array(16).fill(false),
      voice2Seq: Array(16).fill(false),
      voice3Seq: Array(16).fill(false),
      numSteps1: 16,
      numSteps2: 16,
      numSteps3: 16,
    };
    this.renderStep = this.renderStep.bind(this);
  }
  renderStep(i,j) {
    switch(i){
      case 1:
        return <Step value = {this.state.voice1Seq[j-1]}
        onClick = {()=> {this.handleClick(i,j)}}
        />;
      case 2:
        return <Step value = {this.state.voice2Seq[j-1]}
        onClick = {()=> {this.handleClick(i,j)}}
        />;
      case 3:  
        return <Step value = {this.state.voice3Seq[j-1]}
        onClick = {()=> {this.handleClick(i,j)}}
        />;
  };
}
  handleClick(i,j){
    let steps;
    switch(i){
      case 1:
        steps = this.state.voice1Seq.slice();
        steps[j-1] = (!this.state.voice1Seq[j-1]);
        this.setState({voice1Seq: steps});
        break;
      case 2:
        steps = this.state.voice2Seq.slice();
        steps[j-1] = (!this.state.voice2Seq[j-1]);
        this.setState({voice2Seq: steps});
        break;
      case 3:
        steps = this.state.voice3Seq.slice();
        steps[j-1] = (!this.state.voice3Seq[j-1]);
        this.setState({voice3Seq: steps});
        break;
    }
  }

  render() {
    let status;
    status = "Wow, cool moves"
    //const voice1SeqRow = [];
    const voice1SeqRow = Array.from({length: this.state.numSteps1}, (_, i) => i + 1).map((j) => 
      <div key={'1' + j.toString()}> {this.renderStep(1,j)}</div>
    );
    const voice2SeqRow = Array.from({length: this.state.numSteps2}, (_, i) => i + 1).map((j) => 
      <div key={'2' + j.toString()}> {this.renderStep(2,j)}</div>
    );
    const voice3SeqRow = Array.from({length: this.state.numSteps3}, (_, i) => i + 1).map((j) => 
      <div key={'3' + j.toString()}> {this.renderStep(3,j)}</div>
    );
    return (<div>
      <div className="status">{status}</div>
      <div className="container">
        {voice1SeqRow}
      </div>
      <div className="container">
        {voice2SeqRow}
      </div>
      <div className="container">
        {voice3SeqRow}
      </div>
  </div>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numSteps1: 16,
      numSteps2: 16,
      numSteps3: 16,
      VcoDecay: 84,
      decayChange : this.decayChange.bind(this),
    };
  }
  decayChange(value){
    console.log('change in Osc to ' + value);
    this.setState({VcoDecay: value});
  }
  render() {
    console.log('renderbender')
    return (
      <div className="DrumMachine">
        <div className="Oscillator">
        <Oscillator decay={this.state.VcoDecay} handler={this.state.decayChange}/>
        <Sequencer/>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="game">
        <DrumMachine/>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
