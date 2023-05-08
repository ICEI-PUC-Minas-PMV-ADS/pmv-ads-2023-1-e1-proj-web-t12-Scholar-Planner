

/** Mensagem do console */

function log(message) {
    console.log('> ' + message)
}

/** O que é que eu estou identificando*/

    /**#1 */
const card = document.querySelectorAll (".card")

    /**#2 */
const coluna = document.querySelectorAll (".coluna")

/**classificação do que eu estou identificando*/

    /** #1 */
card.forEach (card => {
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
})

/**funções */
    /**#1 */
function dragstart(){
    log('CARD: Start Draggin')
    /**add cor de fundo quando puxa o card */
        coluna.forEach( coluna => coluna.classList.add("luzdefundo"))
        this.classList.add("arrastando")
}

function drag(){
    log('CARD: Draggin')
    
}

function dragend(){
    log('CARD: Stop Draggin')
    /**add cor de fundo quando puxa o card */
        coluna.forEach( coluna => coluna.classList.remove("luzdefundo"))   
        this.classList.remove("arrastando") 
}

    /** #2 */
coluna.forEach (coluna => {
    coluna.addEventListener('dragenter', dragenter)
    coluna.addEventListener('dragover', dragover)
    coluna.addEventListener('dragleave', dragleave)
    coluna.addEventListener('dragdrop', dragdrop)
})

/**funções */
    /**#2 */
function dragenter(){
    log('coluna: Entrou na Zona')

}

function dragover(){
    log('coluna: Na zona')
    /** Mudar a cor de fundo */
    this.classList.add("over")
    /**fantasma de card */
    const cardBeingDragged = document.querySelector(".arrastando")
    /**soltar card */
    this.appendChild(cardBeingDragged)
    
}

function dragleave(){
    log('coluna: Saiu da Zona')
    this.classList.remove("over")
    
}

function dragdrop(){
    log('coluna: Soltou')
    
}
