// lifting up to Game

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Exp, BinaryExp } from './exp';

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
                  <input type='number' value={exp.value} onChange={(e) => this.onAtomChange(e)}/>
                  <div className='button-container'><button onClick={()=>this.toBinaryExp()}>←◉→</button></div>
                </div>
              </div>);
    else {
      // I'm a binary operator and two operands
      return (<div className='complex-expression row'>
                <div className='column'>
                  <Expression exp={exp.left} rootExpSub={this.props.rootExpSub} />
                </div>
                <div className='column'>
                  <select value={exp.op} onChange={(e)=>this.onBinaryOpChange(e)}>
                    <option>+</option>
                    <option>-</option>
                    <option>*</option>
                    <option>/</option>
                  </select>
                  <div className='button-container'><button onClick={()=>this.toAtomicExp()}>→○←</button></div>
                </div>
                <div className='column'>
                  <Expression exp={exp.right} rootExpSub={this.props.rootExpSub} />
                </div>
              </div>);
    }
  }

  onAtomChange(event) {
    const n = Number(event.target.value);
    if (n !== NaN)
      this.props.rootExpSub(this.props.exp, Exp.build(n));
  }

  toBinaryExp() {
    const value = this.props.exp.value;
    const left = Math.ceil(value / 2);
    const right = value - left;
    this.props.rootExpSub(this.props.exp, Exp.build({left: left, op: '+', right: right}));
  }

  toAtomicExp() {
    this.props.rootExpSub(this.props.exp, Exp.build(this.props.exp.value));
  }

  onBinaryOpChange(e) {
    const exp = this.props.exp;
    this.props.rootExpSub(this.props.exp, new BinaryExp({left: exp.left, op: e.target.value, right: exp.right}));
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super();
    this.state = {exp: Exp.build(0)};
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
