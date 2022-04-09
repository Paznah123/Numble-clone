// ============================= creates info modal

const createInfoEquation = (id, equation, result, bgColors) => {
    const mainDiv = document.getElementById(id)
    mainDiv.style = 'display: flex; flex-direction: row; padding-left: 10px; text-align: start;'

    mainDiv.appendChild(initDiv({
        style: 'content-align:start;',
        elementNum: INPUTS_ROW_SIZE,
        createElement: (i) => { return initButton({
                className: 'btn-small',
                style: 'margin-right: 4px;',
                backgroundColor: bgColors[i-1],
                inner: equation[i-1]
            })
        }
    }))

    mainDiv.appendChild(initDiv({
        elementNum: 2,
        createElement: (j) => { return initButton({
            className: 'btn-small',
            style: 'color: black;',
            backgroundColor: 'transparent',
            inner: j == 1 ? '=' : result
        })
    }
    }))
}

createInfoEquation('first-info', '2+3-0*1', '5', ['#28a745', '#343a40', '#343a40', '#343a40', '#343a40', '#343a40', '#343a40'])
createInfoEquation('second-info', '3*2/1+0', '6', ['#343a40', '#343a40', '#343a40', '#343a40', '#343a40', '#ffc107', '#343a40'])
createInfoEquation('third-info', '2*5-1/1', '9', ['#28a745', '#28a745', '#28a745', '#28a745', '#28a745', '#343a40', '#28a745'])

const infoModal = document.getElementById('infoModal')

document.getElementById('infoBtn') // open the modal
.onclick = () => {
    setTimeout(() => {
        div.classList.remove('modal-close')
        infoModal.classList.add('show')
        document.body.appendChild(div)
    }, 100)
}

document.getElementById('info-close').onclick = () => safeCloseModal(infoModal) // close the info modal

// ============================= creates modal guesses graph

const data = {
    labels: [ 1, 2, 3, 4, 5, 6 ],
    datasets: [{
        data: Array.from({length: GUESSES_AMOUNT}, (_, i) => { // gets guesses distribution data from local storage
            return localStorage.getItem(`btn_guess_${i+1}`) ? localStorage.getItem(`btn_guess_${i+1}`) : 0
        }),
        backgroundColor: colors
    }]
};

let guess_dist = new Chart(document.getElementById('guess_dist'), {
      type: 'bar',
      data: data,
      options: { 
        plugins:{ 
            legend: false,
            tooltip: { enabled: false }           
        },
        scales: {
            myScale: {
                type: 'linear',
                position: 'left',
                ticks: { min: 0, stepSize: 1 }
            }
        }
      }
});

// ============================= creates modal stats div

const modalStatsHelper = (modal, tag, content, id_label) => {
    const ids = ['played', 'won', 'win_perc']

    for (let i = 0; i < ids.length; i++) {
        modal.appendChild(
            initDiv({
                id: ids[i],
                className: 'stat',
                inner: `<${tag} id=${ids[i] +'_'+ id_label}>${content[i]}</${tag}>`
            }
        ))
    }
}

updateModalStats = () => {
    const modal_stats = document.getElementById('modal-stats')

    while(modal_stats.lastChild)
        modal_stats.removeChild(modal_stats.lastChild)
      
    // get stats from local storage
    const played = localStorage.getItem('played') ? parseInt(localStorage.getItem('played')) : 0
    const won = localStorage.getItem('won') ? parseInt(localStorage.getItem('won')) : 0

    const stats = [played, won, (won/played*100).toFixed(0)]
    const labels = ['Played', 'Won', 'Win %']

    modalStatsHelper(modal_stats, 'h1', stats, 'stat') // add stats to modal
    modalStatsHelper(modal_stats, 'small', labels, 'label') // add stats labels to modal
}

updateModalStats()

// ============================= modal open and close functionality

const scoresModal = document.getElementById('scoresModal')

const div = initDiv({ className: 'modal-backdrop' })

document.getElementById('scoresBtn') // open the modal
.onclick = () => {
    setTimeout(() => {
        div.classList.remove('modal-close')
        scoresModal.classList.add('show')
        document.body.appendChild(div)
    }, 100)
}

document.getElementById('scores-close').onclick = () => safeCloseModal(scoresModal) // close the scores modal

const safeCloseModal = (modal) => {
    setTimeout(() => {
        modal.classList.remove('show')
        div.classList.add('modal-close')
    }, 100)

    setTimeout(() => {
        try {
            document.body.removeChild(div)
            div.classList.remove('modal-close')
        } catch (err) { } 
    }, 200)
}

window.onclick = (e) => e.target == scoresModal || e.target == infoModal ? safeCloseModal(e.target) : null // close the modal if clicked outside of it
