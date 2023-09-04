

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
    
    // Creo variabile per numero celle
    let cellNum = Number(selectDifficulty.value);
    
    // Creo variabile per il punteggio
    let score = 0;

    // Creo variabile per disattivare celle se partita termina
    let active = true;

    // Scelgo numero bombe
    let bombsNum = 16;

    // Creo array di numeri random per le celle con la bomba
    let randomNums = Array.from({length: bombsNum}, () => Math.floor(Math.random() * cellNum));
    let randomCellNums = [];
    for (let i= 0; i < randomNums.length; i++) {
        randomCellNums[i] = ('cellNum' + randomNums[i]);
    }
    console.log(randomNums);
    console.log(randomCellNums);
    
    // Aggiungo celle a 'gridCont'
    for (let i = 1; i <= cellNum; i++) {

        // creazione singola cella con le relative classi
        let gridCell = document.createElement('div');
        gridCell.classList.add('gridCell');
        gridCell.classList.add(('cellNum' + i));
        gridCell.style.width = ((100 / Math.sqrt(cellNum)) + '%');
        gridCell.innerHTML = i;
        // Aggiungo la cella a 'gridCont'
        gridContainer.append(gridCell);

        //Aggiungo azione al click sulla cella
        gridCell.addEventListener('click', function() {

            if (active) {
                if (randomCellNums.includes(gridCell.classList[1])) {
    
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
                    // Aggiungo 1 al punteggio
                    score += 1;
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

