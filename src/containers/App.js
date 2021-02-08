import React, { Component } from "react";
//import ReactDOM from "react-dom";
import shuffle from "shuffle-array";
import Celebration from "../components/Celebration/Celebration";
import Cell from "../components/Cell/Cell";
import './App.scss';

const phrases = [
  "CONF CALL BINGO",
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
  "i'll have to get back to you ",
  "who just joined ",
  "sorry, something with my calender ",
  "Do you see my screen ",
  "lets wait for __!",
  "You will send the minutes? ",
  "sorry, i was on mute.",
  "can you repeat, please?"
];

const data = shuffle(phrases);
const temp = data[12];
const confBingo = data.indexOf("CONF CALL BINGO");
data[12] = data[confBingo];
data[confBingo] = temp;
data.reduce(
  (data, value, index) => ( { ...data, [index]: value } ),
  {}
); 

/* const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const shuffleArray = (array) => {
  const copy = [...array.slice(0, 2), ...array.slice(3, array.length)]
  return copy.sort(() => Math.random() - 0.5)
}
newArr = shuffleArray(myArr)
newArr.splice(3, 0, myArr[3])
console.log(newArr) */

class App extends Component {
  state = {
      checked: {},
      won: false,
      show: false,
      interval: null,
      disap: true,
      celb: [1,2,3,4,5]
  }

  componentDidMount(){
    this.interval = setTimeout( () => this.setState({disap: false}), 7000);
  }

  render() {
  const  {won, show, disap} = this.state;
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
      Object.keys(data).map(id => (
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
      { won && disap ? <Celebration circle={this.state.celb} />: null }
    </div> 
  );
  }
}

export default App;