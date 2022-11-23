import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Donut } from 'react-dial-knob'

function Step(props) {
    return (
      <button className="Step" onClick={() => {props.onClick(); } }>
        {props.value}
      </button>
    );
}

function Knob(props) {
  const [value, setValue] = React.useState(5)
  return <Donut
        diameter={200}
        min={0}
        max={20}
        step={1}
        value={value}
        theme={{
            donutColor: 'lightcoral'
        }}
        style={{
          position: 'relative',
          margin: '100px auto',
          width: '200px'
        }}
        onValueChange={setValue}
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
      decay: 100,
      shape: 'square',
      tune: 0,
      envAmount: 0,
    }
  }
  renderKnob(type){
    return <Knob value={this.state.decay}
     onValueChange={() => {this.handleValueChange()}}/>
  }

  handleValueChange(value){
    console.log(value);
  }

  render() {
    return (<div>{this.renderKnob()}</div>);
  }
}

class Sequencer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      voice1Seq: Array(16).fill(0),
      voice2Seq: Array(16).fill(0),
      voice3Seq: Array(16).fill(0),
      numSteps1: 16,
      numSteps2: 16,
      numSteps3: 16,
    };
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
    const squares = this.state.steps.slice();
    squares[i] = (this.state.xIsNext? 'X' : 'O');
    this.setState({squares: squares, xIsNext: !this.state.xIsNext});
  }

  render() {
    let status;
    status = "Wow, cool moves"
    const voice1SeqRow = [];
    /*for (let j = 0; j < this.numSteps1; j++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      voice1SeqRow.push({this.renderStep(1,j)}).bind(this);
    }
    console.log("MadeIt")
    const voice2SeqRow = [];
    for (let j = 0; j < this.numSteps2; j++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      voice2SeqRow.push(key={j}{this.renderStep(2,j)});
    }
    const voice3SeqRow = [];
    for (let j = 0; j < this.numSteps3; j++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
      voice3SeqRow.push( key={j}{this.renderStep(3,j)});
    }
    */
    return (<div>
      <div className="status">{status}</div>
      <div className="board-row">
          {this.renderStep(1,1)}
          {this.renderStep(1,2)}
          {this.renderStep(1,3)}
          {this.renderStep(1,4)}
          {this.renderStep(1,5)}
          {this.renderStep(1,6)}
          {this.renderStep(1,7)}
          {this.renderStep(1,8)}
          {this.renderStep(1,9)}
          {this.renderStep(1,10)}
          {this.renderStep(1,11)}
          {this.renderStep(1,12)}
          {this.renderStep(1,13)}
          {this.renderStep(1,14)}
          {this.renderStep(1,15)}
          {this.renderStep(1,16)}
      </div>
    <div className="board-row">
          {this.renderStep(2,1)}
          {this.renderStep(2,2)}
          {this.renderStep(2,3)}
          {this.renderStep(2,4)}
          {this.renderStep(2,5)}
          {this.renderStep(2,6)}
          {this.renderStep(2,7)}
          {this.renderStep(2,8)}
          {this.renderStep(2,9)}
          {this.renderStep(2,10)}
          {this.renderStep(2,11)}
          {this.renderStep(2,12)}
          {this.renderStep(2,13)}
          {this.renderStep(2,14)}
          {this.renderStep(2,15)}
          {this.renderStep(2,16)}
    </div>
    <div className="board-row">
          {this.renderStep(3,1)}
          {this.renderStep(3,2)}
          {this.renderStep(3,3)}
          {this.renderStep(3,4)}
          {this.renderStep(3,5)}
          {this.renderStep(3,6)}
          {this.renderStep(3,7)}
          {this.renderStep(3,8)}
          {this.renderStep(3,9)}
          {this.renderStep(3,10)}
          {this.renderStep(3,11)}
          {this.renderStep(3,12)}
          {this.renderStep(3,13)}
          {this.renderStep(3,14)}
          {this.renderStep(3,15)}
          {this.renderStep(3,16)}
    </div>
  </div>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      voice1Seq: Array(16).fill(0),
      voice2Seq: Array(16).fill(0),
      voice3Seq: Array(16).fill(0),
      numSteps1: 16,
      numSteps2: 16,
      numSteps3: 16,
    };
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
        <Oscillator/>
        <Oscillator/>
        <Sequencer/>
        </div>
        <div className="facts">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DrumMachine />);
