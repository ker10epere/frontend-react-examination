export enum Digits {
  ZERO = '0',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
}

export enum Commands {
  CLEAR = 'AC',
  EVALUATE = '=',
  NULL_CMD = 'NULL_CMD',
}

export enum Operators {
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
  NULL_OP = 'NULL_OP',
}

export type calculatorKeys = Digits | Commands | Operators
