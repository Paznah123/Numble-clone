// ============================= creates result buttons div

const createResult = (rowId, result) => {
    document.getElementById('input_'+rowId)
    .appendChild( // add the result to current guess row
        initDiv({
            id: 'answer',
            elementNum: 2, // 2 elements in the div
            createElement: (i) => {
                return initButton({
                    className: 'box btn',
                    style: 'pointer-events: none;',
                    inner: ['=', result][i-1]
                })
            }
        }
    ));
}

// ============================= updates score to modal stats and announces the win/lose

const gameEnd = (userWon) => {
    let end;

    if (!userWon) end = ['L', 'O', 'S', 'T'] 
    else { 
        end = ['W', 'I', 'N']
        document.getElementById('played_stat').innerHTML =  1
        document.getElementById('won_stat').innerHTML = 1
        document.getElementById('win_perc_stat').innerHTML = 100
        updateChart(rowId)
    }

    const buttons = document.getElementById('buttons')
    while (buttons.firstChild) 
        buttons.removeChild(buttons.firstChild) // remove all children from buttons div
    
    createMainDiv('buttons', 1, end.length, (_, j) => {
        return initButton({
            className: 'box btn btn-secondary',
            style: 'background-color: #DC3545',
            onClick: (btn) => animateBtn(btn),
            inner: end[j-1]
        })
    });

    saveData(userWon) // save data to local storage
    updateModalStats() 

    document.getElementById('head')
    .appendChild(initSmall({
        inner: `Come back for a new equation <br> in ${parseTime()} <br> 
                    ${userWon == false ?
                        "Today's equation was: <br> <b>" + equation + "!</b>" 
                        : ''}`,
        style:  'line-height: 25px; font-size: 1rem;'
    }))
}

// ============================= saves statistics to local storage

const saveData = (userWon) => {
    saveDataHelper('played', 0)
    
    if (userWon)
        saveDataHelper('won', 0)

    for (let i = 0; i < GUESSES_AMOUNT; i++) { // save guesses to local storage
        localStorage.setItem(`guess_${i+1}`, guesses[i])
        for (let j = 0; j < guesses[i].length; j++) { // save colors to local storage
            let btn = document.getElementById(`box_${i*INPUTS_ROW_SIZE+(j+1)}`)
            localStorage.setItem(`guess_${i+1}_${j}_color`, btn.style.backgroundColor)
        }
        localStorage.setItem(`btn_guess_${i+1}`, guess_dist.data.datasets[0].data[i]) // save chart data to local storage
    }
    localStorage.setItem('win_state', userWon) // save win state to local storage
    localStorage.setItem('win_time', new Date()) // save win time to local storage
    localStorage.setItem('equation', todayEquation) // save equation to local storage
    localStorage.setItem('guess_num', guess_num) // save guess number to local storage
}

const saveDataHelper = (id, ifNot) => {
    const stat = localStorage.getItem(id) ? parseInt(localStorage.getItem(id)) : ifNot
    localStorage.setItem(id, stat+1)
}

// ============================= updates modal graph data

const updateChart = (rowId) => {
    const guess = localStorage.getItem(`btn_guess_${rowId}`) ? localStorage.getItem(`btn_guess_${rowId}`) : 0
    guess_dist.data.datasets[0].data[rowId-1] = parseInt(guess) + 1
    guess_dist.update()
}