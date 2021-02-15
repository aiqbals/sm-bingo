import React, { Component } from "react";
import Celebration from "../components/Celebration/Celebration";
import Cell from "../components/Cell/Cell";
import "./App.scss";

const phrases = [
  "i was having connection issues",
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
  "CONF CALL BINGO", 
  "is___on the call?",
  "Could you share this slides afterwards",
  "can somebody grant presenter rights?",
  "can you email that to everyone?",
  "i'll have to get back to you ",
  "who just joined ",
  "sorry, something with my calender ",
  "Do you see my screen ",
  "lets wait for __!",
  "You will send the minutes? ",
  "sorry, i was on mute.",
  "can you repeat, please?",
];
//not ideal using shuffle libray only for shuffling an samll arraya
const shuffle = (array, index) => {
  if (array.length === 0) return `empty array`
  if (index > array.length - 1 || index < 0) return -1
  /* const copy = [
    ...array.slice(0, index),
    ...array.slice(index + 1, array.length),
  ]
  copy.sort(() => Math.random() - 0.5)
  copy.splice(index, 0, array[index]) // not feasible incase the desired index value changes its position, means index dependent not value dependent*/
  const copy = array.sort(() => Math.random() - 0.5)
  const temp = copy[12];
  const confBingo = copy.indexOf("CONF CALL BINGO");
  copy[12] = copy[confBingo];
  copy[confBingo] = temp;
  return copy
}
const data = shuffle(phrases, 12);
data.reduce((data, value, index) => ({ ...data, [index]: value }), {});

/* const r1 = {0: true,1: true,2: true,3: true,4: true};
const r2 = {5: true,6: true,7: true,8: true,9: true};
const r3 = {10: true,11: true,12: true,13: true,14: true};
const r4 = {15: true,16: true,17: true,18: true,19: true};
const r5 = {20: true,21: true,22: true,23: true,24: true};
const c1 = {0: true,5: true,10: true,15: true,20: true};
const c2 = {1: true,6: true,11: true,16: true,21: true};
const c3 = {2: true,7: true,12: true,17: true,22: true};
const c4 = {3: true,8: true,13: true,18: true,23: true};
const c5 = {4: true,9: true,14: true,19: true,24: true};
const d1 = {1: true,6: true,12: true,18: true,24: true};
const d2 = {4: true,8: true,12: true,16: true,20: true}; */
class App extends Component {
  constructor(props) {
    super(props);
    this.showCelebration = this.showCelebration.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      checked: { 12: true },
      show: false,
      won: false,
      disap: false,
      celb: [1, 2, 3, 4, 5], 
    };
  }

  showCelebration() {
    setTimeout(() => this.setState({ won: false }), 4000); 
  }
  // Issues: 
  // Single winning is possible in all combination nicely by removing multiple winning condition
  // Multiple time winning is possible by checked obj length-1%5 for row,column and length-1%4 for diagonal except few cases, it doesnt work.
  isWon(checked) {
    const range = [0, 1, 2, 3, 4];
    const len = Object.keys(checked).length; // to calculate multiple winning
    return(
      (undefined !== 
        (range.find((row) =>
          range.every((column) => checked[row * 5 + column])
        )) && (len-1)%5===0) ||
      (undefined !==
        (range.find((column) =>
          range.every((row) => checked[row * 5 + column])
        )) && (len-1)%5===0) ||
      (range.every((index) => checked[index * 5 + index]) && (len-1)%4===0) ||
      (range.every((index) => checked[index * 5 + 4 - index]) && (len-1)%4===0)
    );     
  } 

  toggle(id) {
    const { checked } = this.state;
    let newChecked = { ...checked, [id]: !checked[id] };
    let won = this.isWon(newChecked);
    if (won) {
      this.showCelebration();
    } 
    this.setState({
      checked: newChecked,
      won,
      disap: won
    }); 
  }

  render() {
    const { won, show, disap } = this.state;
    const onBtnPlay = () => {
      let state = Object.assign({}, this.state, { show: true });
      this.setState(state);
    };

    let cells = this.state.show ? (
      Object.keys(data).map((id) => (
        <Cell
          key={id}
          id={id}
          isSet={!!this.state.checked[id]}
          onToggle={() => this.toggle(id)}
        >
          {data[id]}
        </Cell>
      ))
    ) : (
      <button onClick={onBtnPlay} className="w-20 shadow-5 pa2 mt4">
        Play
      </button>
    );

    return (
      <div className="App">
        <h1 className="tc f2">sm-bingo</h1>
        <div className={`${show ? "wrapper" : ""}`}>{cells}</div>
        {won && disap? (
          <Celebration won={won} circle={this.state.celb} />
        ) : null}
      </div>
    );
  }
}

export default App;
