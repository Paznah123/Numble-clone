// ============================= returns a div with props

const initDiv = (props) => {
    const div = document.createElement('div')

    div.id = props.id
    div.className = props.className // className is used to add a class to the div

    if (props.style) div.style = props.style

    for (let j = 1; j <= props.elementNum; j++) {
            let element = props.createElement(j) // create the element
            div.appendChild(element)  // add the element to the div
    }

    props.inner ? div.innerHTML = props.inner : null // add innerHTML if it exists

    return div
}

// ============================= returns a button with props

const initButton = (props) => {    
    const btn = document.createElement('button')

    btn.id = props.id
    btn.className = props.className 
    btn.style = props.style
    btn.style.backgroundColor = props.backgroundColor
    if (props.onClick) 
        btn.onclick = () => props.onClick(btn)
    btn.innerHTML = props.inner
    
    return btn
}

// ============================= returns a small with props

const initSmall = (props) => {    
    const small = document.createElement('small')

    small.id = props.id
    small.style = props.style
    small.innerHTML = props.inner

    return small
}
