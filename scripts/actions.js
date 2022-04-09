// ============================= deletes current row result div from DOM

const removeGuessFromPrevInput = () => {
    const input_div = document.getElementById('input_'+rowId)
    input_div.removeChild(input_div.lastChild)
};

// ============================= inserts a number to current input box

const insertValToBox = (val) => {
    if (currBox > rowId*INPUTS_ROW_SIZE) // if the current box is the last in the row return
        return
    document.getElementById("box_"+currBox).innerHTML = val
    currBox++
}

// ============================= deletes the number from last written input box

const deleteValFromLastBox = () => {
    if ((currBox == (rowId-1)*INPUTS_ROW_SIZE+1)) // if the current box is the first box in the row return
        return
    document.getElementById("box_"+(currBox-1)).innerHTML = ''
    currBox--
}

// ============================= validates user answer

const evalAnswer = () => {
    let answer = ''
    let res;

    for (let i = 1; i <= INPUTS_ROW_SIZE; i++) { // get the answer from the input boxes
        const val = document.getElementById("box_"+((rowId-1)*INPUTS_ROW_SIZE+i)).innerHTML
        answer +=  val      
    }

    try {
        res = eval(answer) // evaluate the answer
    } catch (err) {}

    if (res == todayGuess && answer.length == INPUTS_ROW_SIZE) { // if the answer result is equal to the equation result
        guesses[guess_num] = answer // save the answer
        const corrects = colorCells(answer) // color the cells
        guess_num++

        if (corrects.every(val => val == 1) || GUESSES_AMOUNT == guess_num){ // if answer equals to the equation  
            gameEnd(corrects.every(val => val == 1)) // end the game
            return
        }

        colorOps(answer, corrects) // color the operators
        removeGuessFromPrevInput() // remove the result box from the previous input div
        rowId++
        createResult(rowId, todayGuess) // create a new result box in current row
    } else
        shakeErrors(answer) // if the answer is not correct, shake row cells
}

// ============================= generates random equation 

const randEquation = () => { 
    const hoursSinceLastEquation = checkTimePassed(localStorage.getItem('lastEquationTime'))[0]

    if (hoursSinceLastEquation < 9) {
        todayEquation = localStorage.getItem('equation')
        todayGuess = eval(todayEquation)
        return
    }

    let eq = ''
    let i = 0

    while (eq.length < INPUTS_ROW_SIZE) { 
        if (i % 2 == 0) // if the iteration is even
            eq += Math.floor(Math.random() * 9) // generate random number
        else  // if the iteration is odd              
            eq += ['+', '-', '*', '/'][Math.floor(Math.random() * 4)] // generate random operator
        i++
    }

    todayEquation = eq
    todayGuess = eval(todayEquation)
    if(!Number.isInteger(todayGuess)) // if the result is not an integer
        randEquation() // generate new equation

    localStorage.setItem('equation', todayEquation)
    localStorage.setItem('lastEquationTime', new Date())
}