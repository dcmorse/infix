class Exp {
  // this "interface" implements
  // get value => number
  // get isAtom => boolean
  // sub(oldExp, newExp) => Exp


  static build(expDescriptor) {
    const e = expDescriptor;
    if (typeof e === 'number')
      return new AtomicExp(e);
    else if (e.left && e.op && e.right)
      return new BinaryExp({left: this.build(e.left), op: e.op, right: this.build(e.right)});
    else
      throw new Error("uh-oh, I got something unexpected as my argument: "+JSON.stringify(e));
  }
}

class AtomicExp extends Exp {
  // public property
  value;

  constructor(value) {
    super({});
    this.value = value;
  }

  get isAtom() {
    return true;
  }

  sub(oldExp, newExp) {
    return (this === oldExp) ? newExp : this;
  }
}

class BinaryExp extends Exp {
  // public properties
  left;                         // an Exp
  op;                           // '+', '-', '*', or '/'
  right;                        // an Exp

  constructor({left, op, right}) {
    super();
    this.left = left;
    this.op = op;
    this.right = right;
  }

  get isAtom() {
    return false;
  };

  get value() {
    const l = this.left.value;
    const r = this.right.value;
    switch (this.op) {
    case '+': return l + r;
    case '-': return l - r;
    case '*': return l * r;
    case '/': return l / r;
    default:
      throw new Error("Surprising new binary operator discovered at runtime!: " + this.op);
    }
  }

  sub(oldExp, newExp) {
    if (this === oldExp)
      return newExp;
    const newLeft = this.left.sub(oldExp, newExp);
    const newRight = this.right.sub(oldExp, newExp);
    if (this.left === newLeft && this.right === newRight)
      return this;
    else
      return new BinaryExp({left: newLeft, op: this.op, right: newRight});
  }
}

export default Exp;
