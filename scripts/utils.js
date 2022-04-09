// ============================= color input cells according to answer equation (green - correct place and number, yellow - correct number wrong place, grey - wrong number)

const colorCells = (answer) => {
    let corrects = [0,0,0,0,0,0,0]

    for (let i = 0; i < answer.length; i++) {
        const id = 'box_'+((rowId-1)*INPUTS_ROW_SIZE+i+1)
        let color = '#343A40', animation = 'fadeIn .25s linear';
        let answerIdxInEquation = todayEquation.indexOf(answer[i])
        
        // if the number and index are correct
        if (answer[i] == todayEquation[i]) {
            corrects[i] = 1
            color = '#28A745'

        // if the number is correct but not in the correct index or if number already appeared in answer and is in equation
        } else if (answerIdxInEquation == answer.lastIndexOf(answer[i]) || (answer.indexOf(answer[i]) < i && todayEquation.includes(answer[i])) ) 
            animation = 'shake .75s linear'

        // if the number is correct but not in the correct place or the number is not colored
        else if ( (answerIdxInEquation > i && todayEquation.includes(answer[i]) ) || corrects[answerIdxInEquation] == 0)
            color = '#FFC107'

        else 
            animation = 'shake .75s linear'
        
        let btn = document.getElementById(id)
        btn.classList.remove('slide')
        btn.style.animation = animation
        btn.style.backgroundColor = color
        btn.style.borderColor = color
        btn.style.color = 'white'
    }

    return corrects
}

// ============================= colors operators cells that are not in the answer equation

const colorOps = (answer, corrects) => {
    for (let i = 0; i < answer.length; i++) {
        let color;
        
        if (!todayEquation.includes(answer[i])) // if the operator is not in the answer equation
            color = '#343A40'   
        else if (corrects[i] == 1) // if the operator is in the answer equation and in correct index
            color = '#28A745'    
        
        let btn = document.getElementById('op-box_'+answer[i])
        btn.style.backgroundColor = color
        btn.style.borderColor = color
    }
}

// ============================= add border color when button is clicked

const animateBtn = (btn) => {
    try { 
        let clickedBtn = document.getElementsByClassName('clicked')[0]
        animateHelper(clickedBtn, clickedBtn.style.backgroundColor)
    } catch (err){ } finally {
        animateHelper(btn, '#AAAFB3')
    }
};

const animateHelper = (btn, bgColor) => {
    btn.classList.toggle('clicked');
    btn.style = `border: 3px solid ${bgColor}; background-color: ${btn.style.backgroundColor}; color: ${btn.style.color};`
}

// ============================= check for errors in user equation and animates wrong buttons 

const shakeErrors = () => {
    setErrorAnimation('shake .75s', true)
    setTimeout(() => { setErrorAnimation('none', false) }, 1000)
};

const setErrorAnimation = (animation, enterDisabled) => { 
    for (let i = (rowId-1)*INPUTS_ROW_SIZE+1; i < currBox; i++) { // loop through all current row inputs
        document.getElementById('box_'+i).style.animation = animation
    }
    document.getElementById('enter-button').disabled = enterDisabled // disable enter button for a short period of time to prevent multiple clicks during animation
}

// ============================= check if 24 passed since last game

const checkTimePassed = (lastTime) => {

    if (lastTime) { // if there is a win time
        let msBetweenDates = Math.abs(new Date(lastTime).getTime() - new Date().getTime()) // get the difference between the current time and the win time in milliseconds

        const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000) // convert the difference to hours
        const minutesBetweenDates = msBetweenDates / (60 * 1000) % 60 // convert the difference to minutes
        const secondsBetweenDates = (msBetweenDates / 1000) % 60 // convert the difference to seconds

        return [hoursBetweenDates, minutesBetweenDates, secondsBetweenDates] // return the difference in hours and minutes
    }

    return [null, null, null] // return null if there is no win time
}

// ============================= returns time in format x hours y minutes

const parseTime = () => {
    let timePassed = checkTimePassed(localStorage.getItem('win_time'))

    let hours = Math.floor(9 - timePassed[0])
    let minutes = Math.floor(60 - timePassed[1])
    let seconds = Math.floor(60 - timePassed[2])

    if (hours != 0 && minutes == 0) 
        return `<b>${hours} hours</b>!`
    else if (hours == 0 && minutes != 0)
        return `<b>${minutes} minutes</b>`
    else if (hours == 0 && minutes == 0)
        return `<b>${seconds} seconds</b>`
    else
        return `<b>${hours} hours and ${minutes} minutes</b>!`
}