const INPUTS_ROW_SIZE = 7 // number of input boxes in a row

const OPS_ROW_SIZE = 5 // number of buttons in a row
const OPS_ROWS_AMOUNT = 3 // number of rows of buttons

const GUESSES_AMOUNT = 6 // number of rows of input boxes & guesses

let rowId = 1 // current row of input boxes
let currBox = 1 // current input box

let todayEquation = '' // today's equation
let todayGuess = '' // today's guess

let guess_num = 0 // current guess number

let guesses = ['','','','','','',''] // array of guesses

const colors = [
    '#28A745',
    '#FFC107',
    '#343A40',
    '#DC3545',
    '#4B487C',
    '#FEAE63'
]