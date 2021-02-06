import logo from '../components/logo/logo.svg';
import './App.css';

import React, { Component } from "react";
//import ReactDOM from "react-dom";
import shuffle from "shuffle-array";
import Celebration from "../components/Celebration/Celebration";
import Cell from "../components/Cell/Cell";
import './App.css';

/* function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
} */

const bbb = [
  "child noises in the background ",
  "Hello, hello",
  "i neeed to jump o another call ",
  "can everyone go on mute ",
  "could you please get closer to the mic ",
  "losf painful echo / feedback ",
  "Next slide, please ",
  "can we tak this offline? ",
  "sorry, i had problems logging in",
  "animal noises in the background",
  "sorry, i didn't found the conference id ",
  "i was having connection issues",
  "is___on the call?",
  "Could you share this slides afterwards",
  "can somebody grant presenter rights?",
  "can you email that to everyone?",
  "CONF CALL BINGO ",
  "i'll have to get back to you ",
  "who just joined ",
  "sorry, something with my calender ",
  "Do you see my screen ",
  "lets wait for __!",
  "You will send the minutes? ",
  "sorry, i was on mute.",
  "can you repeat, please?"
];

const data = shuffle(bbb).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      checked: {},
      won: false
    }
  }

  render() {
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
      range.every(index => checked[index * 5 + index]) ||
      range.every(index => checked[index * 5 + 4 - index])
    );
  };

  const toggle = id =>
    this.setState( state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  const setTime = () => {
    setTimeout( ()=> this.setState({won: false}) , 1000);
  }
  
  return (
    <div className="App">
      <h1 className='tc bg-light-green w-100 '>SM-Bingo</h1>
      <div className="wrapper">
        {Object.keys(bbb).map(id => (
          <Cell
            key={id}
            id={id}
            isSet={!!this.state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Cell>
        ))}
      </div>
      { this.state.won ? 
        <Celebration /> : null && setTime()}
    </div>
  );
  }
}

export default App;