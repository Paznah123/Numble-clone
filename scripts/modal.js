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


// ============================= deletes saved data from local storage
 
document.getElementById('deleteSave') 
.onclick = () => { 
    if (localStorage.getItem('win_time')) { 
        history.go('index.html') 
        alert('Statistics deleted! refreshing page...')
    }
    localStorage.clear()
    updateModalStats()
}

// ============================= modal open and close functionality

const modal = document.getElementById('scoresModal')

const div = initDiv({ className: 'modal-backdrop' })

document.getElementById('modalBtn') // open the modal
.onclick = () => {
    setTimeout(() => {
        div.classList.remove('modal-close')
        modal.classList.add('show')
        document.body.appendChild(div)
    }, 100)
}

document.getElementById('close').onclick = () => safeCloseModal() // close the modal

window.onclick = (e) => e.target == modal ? safeCloseModal() : null // close the modal if clicked outside of it

const safeCloseModal = () => {
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