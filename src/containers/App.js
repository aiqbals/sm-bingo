import React, { Component } from "react";
//import ReactDOM from "react-dom";
import shuffle from "shuffle-array";
import Celebration from "../components/Celebration/Celebration";
import Cell from "../components/Cell/Cell";
import './App.scss';

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
      won: false,
      show: false,
      interval: null,
      disap: true
    }
  }

  componentDidMount(){
    this.interval = setTimeout( () => this.setState({disap: false}), 7000);
  }

  render() {
  const  {checked, won, show,interval, disap } = this.state;
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

  const onBtnPlay = () => {
    let state = Object.assign({}, this.state, {show: true});
    this.setState(state)
  }

  let bingo = this.state.show ? 
      Object.keys(bbb).map(id => (
        <Cell
          key={id}
          id={id}
          isSet={!!this.state.checked[id]}
          onToggle={() => toggle(id)}
        >
          {data[id]}
        </Cell> 
    )) : 
    <button onClick={onBtnPlay} className='w-20 shadow-5 pa2 mt4'> Play </button>;

  
  return (
    <div className="App">
      <h1 className='tc f2'>sm-bingo</h1>
      <div className={ `${show ? 'wrapper' : ''}` }>
        {bingo}
      </div> 
      { won && disap? <Celebration />: null }
    </div> 
  );
  }
}

export default App;