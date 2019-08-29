// lifting up to Game

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Exp from './exp';

function ResultDisplay({value}) {
  return <div className='equals'>equals<br/><div className='total'>{value}</div></div>;
}

class Expression extends React.Component {

  render() {
    const exp = this.props.exp;
    if (exp.isAtom)
      // I am a number
      return (<div className='row'>
                <div className='column'>
                  <input type='number' value={exp.value} onChange={(e) => this.onChange(e)}/>
                  <div className='button-container'><button>←◉→</button></div>
                </div>
              </div>);
    else {
      // I'm a binary operator and two operands
      return (<div className='complex-expression row'>
                <div className='column'>
                  <Expression exp={exp.left} rootExpSub={this.props.rootExpSub} />
                </div>
                <div className='column'>
                  <select value={exp.op}>
                    <option>+</option>
                    <option>-</option>
                    <option>*</option>
                    <option>/</option>
                  </select>
                  <div className='button-container'><button>→○←</button></div>
                </div>
                <div className='column'>
                  <Expression exp={exp.right} rootExpSub={this.props.rootExpSub} />
                </div>
              </div>);
    }
  }

  onChange(event) {
    const n = Number(event.target.value);
    if (n !== NaN)
      this.props.rootExpSub(this.props.exp, Exp.build(n));
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super();
    this.state = {exp: Exp.build({left: 6, op: '+', right: {left: 5, op: '-', right: 3}})};
  }
  rootExpSub(oldExp, newExp) {
    this.setState({exp: this.state.exp.sub(oldExp, newExp)});
  }
  render() {
    const exp = this.state.exp;
    return (<div>
              <Expression exp={exp} rootExpSub={(oldExp, newExp)=>this.rootExpSub(oldExp, newExp)} />
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
