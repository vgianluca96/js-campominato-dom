

// Variabile agganciata al div 'gridCont'
let gridContainer = document.getElementById('gridCont');
// Variabile agganciata al button
let btnGridGen = document.getElementById('btnGridGen');

// Event listener del button
btnGridGen.addEventListener('click', function(){
    
    // Cancello tutti i figli di 'gridCont', così al click si azzera la griglia
    while (gridContainer.hasChildNodes()) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    
    // Scelgo 10 numeri random e stabilisco le celle che avranno pepe the frog
    let randomNums = Array.from({length: 10}, () => Math.floor(Math.random() * 100));
    let randomCellNums = [];
    for (let i= 0; i < randomNums.length; i++) {
        randomCellNums[i] = ('cellNum' + randomNums[i]);
    }
    console.log(randomNums);
    console.log(randomCellNums);
    
    // Aggiungo celle a 'gridCont'
    for (let i = 1; i <= 100; i++) {

        // creazione singola cella con le relative classi
        let gridCell = document.createElement('div');
        gridCell.classList.add('gridCell');
        gridCell.classList.add(('cellNum' + i));
        gridCell.innerHTML = i;
        // Aggiungo la cella a 'gridCont'
        gridContainer.append(gridCell);

        //Aggiungo azione al click sulla cella
        gridCell.addEventListener('click', function() {

            if (randomCellNums.includes(gridCell.classList[1])) {

                // Rimuovo numero da cella e mostro pepe th frog
                gridCell.removeChild(gridCell.firstChild);
                let newHTML = `<img src="./img/pepe-the-frog.webp" alt="">`;
                gridCell.insertAdjacentHTML('beforeend',newHTML);
                // Stampo scritta 'hai perso
                let youLooseDiv = `<div class="youloose">HAI PERSO</div>`;
                gridContainer.insertAdjacentHTML('beforeend',youLooseDiv);

            } else {

                // Cambio colore sfondo a cella
                gridCell.classList.add('gridCellClick');
                console.log('Hai cliccato sulla cella ' + gridCell.innerHTML);

            }

        })

    }

})


/*
function youLoose () {

    for (let i = 0; i < randomCellNums.length; i++) {

    }

}
*/
