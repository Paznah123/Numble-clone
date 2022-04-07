// ============================= creates a div with rows*cols buttons grid and assign an action to each button

const createMainDiv = (mainId, rows, cols, init) => {
    const mainDiv = document.getElementById(mainId)
    for (let i = 1; i <= rows; i++) {
        id = mainId.slice(0,-1)
        mainDiv.appendChild(
            initDiv({ // create a new row
                id: `${id}_${i}`,
                className: id,
                elementNum: cols, // number of elements in the row
                createElement: (j) => { return init(i, j) } // function to create each element
            }
        ))
    }
};

// ============================= creates the game page

const createNewGame = () => {
    
    createMainDiv('inputs', GUESSES_AMOUNT, INPUTS_ROW_SIZE, (i, j) => { // create the inputs grid
        return initButton({ 
            id: `box_${(i-1)*INPUTS_ROW_SIZE+j}`, // id: box_1, box_2, ...
            className: 'box btn btn-outline slide', // slide class is used to animate the buttons 
            inner: ''
        })
    });

    createMainDiv('buttons', OPS_ROWS_AMOUNT, OPS_ROW_SIZE, (i, j) => { // create the buttons for the operators
        buttons = ['1','2','3','4','5','6','7','8','9','0','+','-','/','*','⌫']
        const index = (i-1)*OPS_ROW_SIZE+(j-1)
        const btn_txt = buttons[index]

        return initButton({
            id: `op-box_${btn_txt}`, // id: op-box_1, op-box_2, ...
            className: 'box btn btn-secondary',
            onClick: (btn) => { // add functionality and animate the buttons
                index == OPS_ROWS_AMOUNT*OPS_ROW_SIZE-1 ? 
                deleteValFromLastBox() : insertValToBox(btn_txt)
                animateBtn(btn)
            },
            inner : buttons[index], // text of the button
            backgroundColor: '#6c757d' // background color of the button
        })
    });

    createMainDiv('buttons', 1, 1, () => { // create the enter button
        return initButton({
            id:  'enter-button',
            className: 'btn btn-secondary',
            onClick: () => evalAnswer(), // evaluate the answer
            inner : 'Enter' // text of the button
        })
    });

    createResult(rowId, todayGuess) // create the result box
}

// ============================= creates the last saved game page

const renderLastGame = () => { 

    const equation = localStorage.getItem('equation') // get last game equation
    const userWon = localStorage.getItem('win_state') // get last game won state (won/lost)

    document.getElementById('head') 
    .appendChild(
        initSmall({ 
            inner: `Come back for a new equation <br> in ${parseTime()} <br> 
                        ${userWon == 'false' ?
                            "Today's equation was: <br> <b>" + equation + "!</b>" 
                            : ''}`, 
            style:  'line-height: 25px; font-size: 1rem;' 
    }))

    if (userWon == 'true')
        end = ['W', 'I', 'N']
    else 
        end = ['L', 'O', 'S', 'T']

    for (let i = 0; i < GUESSES_AMOUNT; i++) // get last game's guesses
        guesses[i] = localStorage.getItem(`guess_${i+1}`)   

    const colors = JSON.parse(localStorage.getItem('colors'))

    createMainDiv('inputs', GUESSES_AMOUNT, INPUTS_ROW_SIZE, (i, j) => { // reproduce last game guesses
        bgColor = colors[i-1][j-1]
        return initButton({
            id: `box_${(i-1)*INPUTS_ROW_SIZE+j}`,
            className: `box btn btn-outline ${bgColor ? '' : 'slide'}`,
            inner: `${guesses[i-1][j-1] ? guesses[i-1][j-1] : ''}`,
            backgroundColor: bgColor,
            style: 'color: white;'
        })
    });

    createMainDiv('buttons', 1, end.length, (_, j) => { // reproduce last game result
        return initButton({
            className: 'box btn btn-secondary',
            onClick: (btn) => animateBtn(btn),
            inner: end[j-1],
            style: 'background-color: #DC3545'
        })
    });  

    createResult(localStorage.getItem('guess_num'), eval(equation)) // reproduce last game result
}

// ============================= checks what page to render

const renderPage = () => {
    timePassed = checkTimePassed() // get hours passed since last game 
    hoursPassed = timePassed[0]

    if (hoursPassed && hoursPassed < 9)  // create a new game only after 9 hours passed
        renderLastGame()    
    else
        createNewGame() 
}

renderPage()
