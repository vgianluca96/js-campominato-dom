

// Variabile agganciata al div 'gridCont'
let gridContainer = document.getElementById('gridCont');
// Variabile agganciata al button
let btnGridGen = document.getElementById('btnGridGen');
// Variabile agganciata al select
let selectDifficulty = document.getElementById('difficulty');

// Event listener del button
btnGridGen.addEventListener('click', function(){
    
    // Cancello il contenuto di 'gridCont', così al click si azzera la griglia
    gridContainer.innerHTML = '';
    
    // Dichiaro variabile per numero celle
    let cellNum = Number(selectDifficulty.value);
    
    // Dichiaro variabile per disattivare celle se partita termina
    let active = true;

    // Dichiaro variabile per il punteggio
    let score = 0;
    
    // Dichiaro variabile che mi dice se una cella è già stata cliccata
    let alreadyClicked = [];
    
    // Scelgo numero bombe
    let bombsNum = 16;

    // Dichiaro array di numeri random per le celle con la bomba
    let bombCellId = [];
    let i = 0;
    while (bombCellId.length < bombsNum) {

        let randomNumber = Math.floor(Math.random() * cellNum) + 1;
        if (!(bombCellId.includes(randomNumber))) {
            bombCellId[i] = randomNumber;
            i++ 
        }

    }

    console.log(bombCellId);

    
    // Aggiungo celle a 'gridCont'
    for (let i = 1; i <= cellNum; i++) {

        // creazione singola cella con le relative classi
        let gridCell = document.createElement('div');
        gridCell.classList.add('gridCell');
        gridCell.style.width = ((100 / Math.sqrt(cellNum)) + '%');
        gridCell.innerHTML = i;
        // Aggiungo la cella a 'gridCont'
        gridContainer.append(gridCell);

        // Inizializzo il valore (i-1)-esimo
        alreadyClicked[i-1] = false;

        //Aggiungo azione al click sulla cella
        gridCell.addEventListener('click', function() {

            if (active) {

                if (bombCellId.includes(Number(gridCell.innerHTML))) {
    
                    // Rimuovo numero da cella e mostro pepe the frog
                    gridCell.removeChild(gridCell.firstChild);
                    let newHTML = `<img src="./img/pepe-the-frog.webp" alt="">`;
                    gridCell.insertAdjacentHTML('beforeend',newHTML);
                    // Stampo scritta 'hai perso'
                    let youLooseDiv = `<div class="finalmessage badge text-bg-dark">HAI PERSO <br> PUNTEGGIO: ${score} </div>`;
                    gridContainer.insertAdjacentHTML('beforeend',youLooseDiv);
                    // Disattivo celle
                    active = false;
    
                } else {
    
                    // Cambio colore sfondo a cella
                    gridCell.classList.add('gridCellClick');
                    console.log('Hai cliccato sulla cella ' + gridCell.innerHTML);
                    
                    // verifico non sia già stato cliccato sulla cella
                    if (!alreadyClicked[i-1]) {
                        alreadyClicked[i-1] = true;
                        // Aggiungo 1 al punteggio
                        score += 1;
                    }

                    // Se ho cliccato su tutte le celle senza perdere, disattivo le altre
                    if (score == (cellNum - bombsNum)) {
                        // Stampo scritta 'hai vinto'
                        let youWinDiv = `<div class="finalmessage badge text-bg-dark">HAI VINTO <br> PUNTEGGIO: ${score} </div>`;
                        gridContainer.insertAdjacentHTML('beforeend', youWinDiv);
                        // Disattivo celle
                        active = false;
                    }
    
                }

            }

        })

    }

})

