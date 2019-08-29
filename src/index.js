// lifting up to Game

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// function component
// function Square(props) {
//   return (
//     <button className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }

// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: null};
//   }
//
//   render() {
//     return (
//         <button
//           className="square"
//           onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

// class Board extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     squares: [null,null,null, null,null,null, null,null,null],
//   //     xIsNext: true
//   //   };
//   // }

//   renderSquare(i) {
//     return (<Square
//               value={this.props.squares[i]}
//               onClick={() => this.props.onClickI(i)}
//             />);
//   }

//   status() {
//     const winner = calculateWinner(this.state.squares);
//     if (winner)
//       return 'Player '+ winner + ' wins';
//     else
//       return 'Next player: ' + (this.state.xIsNext ? 'Player X' : 'Player O') ;
//   }

//   render() {
//     return (
//       <div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       history: [{
//         squares: [null,null,null, null,null,null, null,null,null],
//         xIsNext: true
//       }]};
//   }

//   thePresent() {
//     return this.state.history[this.state.history.length-1];
//   }

//   handleClick(i) {
//     const squares = this.thePresent().squares.slice();
//     if (calculateWinner(squares)) return;
//     const xIsNext = this.thePresent().xIsNext;
//     squares[i] = xIsNext ? 'X' : 'O';
//     const newState = {squares: squares, xIsNext: !xIsNext};
//     this.setState({history: [...this.state.history, newState]});
//   }

//   historyRestorationLis() {
//     return this.state.history.map((snapshot, i) => {
//       const label = i ? 'restore to move '+i : 'restore to beginning';
//       return (<li>
//                 <button onClick={() => this.restoreHistory(i)}>{label}</button>
//               </li>);
//     });
//   }

//   restoreHistory(i) {
//     this.setState({history: this.state.history.slice(0, i+1)});
//   }

//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//         <Board squares={this.thePresent().squares} onClickI={(i) => this.handleClick(i)}/>
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{this.historyRestorationLis()}</ol>
//         </div>
//       </div>
//     );
//   }
// }


function ResultDisplay({value}) {
  return <div class='equals'>equals<br/><div class='total'>{value}</div></div>;
}

function nodeIsAtom(node) {
  return node.op === undefined;
}

function Expression(arg) {
  const node = arg.node;
  if (nodeIsAtom(node))
    // I am a number
    return (<div class='row'>
              <div class='column'>
                <input type='text' value={node}/>
                <div class='button-container'><a href="#">←◉→</a></div>
              </div>
            </div>);
  else {
    // I'm a binary operator and two operands
    return (<div class='complex-expression row'>
              <div class='column'>
                <Expression node={node.left}/>
              </div>
              <div class='column'>
                <select value={node.op}>
                  <option>+</option>
                  <option>-</option>
                  <option>*</option>
                  <option>/</option>
                </select>
                <div class='button-container'><a href="#">→○←</a></div>
              </div>
              <div class='column'>
                <Expression node={node.right}/>
              </div>
            </div>);
  }
}

class Calculator extends React.Component {
  render() {
    const node = {left: 6, op: '+', right: {left: 5, op: '-', right: 3}};
    return (<div>
              <Expression node={node} />
              <br/>
              <ResultDisplay value={8}/>
            </div>);
  }
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
