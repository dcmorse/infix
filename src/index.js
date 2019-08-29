// lifting up to Game

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Exp, BinaryExp, AtomicExp } from './exp';

function ResultDisplay({value}) {
  return <div class='equals'>equals<br/><div class='total'>{value}</div></div>;
}

function Expression(arg) {
  const exp = arg.exp;
  if (exp.isAtom)
    // I am a number
    return (<div class='row'>
              <div class='column'>
                <input type='text' value={exp.value}/>
                <div class='button-container'><a href="#">←◉→</a></div>
              </div>
            </div>);
  else {
    // I'm a binary operator and two operands
    return (<div class='complex-expression row'>
              <div class='column'>
                <Expression exp={exp.left}/>
              </div>
              <div class='column'>
                <select value={exp.op}>
                  <option>+</option>
                  <option>-</option>
                  <option>*</option>
                  <option>/</option>
                </select>
                <div class='button-container'><a href="#">→○←</a></div>
              </div>
              <div class='column'>
                <Expression exp={exp.right}/>
              </div>
            </div>);
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super();
    this.state = {exp: Exp.build({left: 6, op: '+', right: {left: 5, op: '-', right: 3}})};
  }
  render() {
    const exp = this.state.exp;
    return (<div>
              <Expression exp={exp} />
              <br/>
              <ResultDisplay value={exp.value}/>
            </div>);
  }
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
