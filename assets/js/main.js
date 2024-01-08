let array = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
    
]
const win = [
        [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10],
        [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
        [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31],
        [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
        [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
        [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
        [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
        [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
        [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
        [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
        [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17],
        [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
        [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18],
        [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
        [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
        [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
        [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4],
        [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
        [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
        [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
        [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
        [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
        [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
]
let cpuChoice = randomize(0, array.length -1)
document.getElementById('gameEnd').style.display = "block";
const main = document.querySelector("#board");
const gameStatus = document.getElementById("gameStatus");
main.style.display='none';
gameStatus.style.display='none';
let playerOneTurn = true;
let turn = 0;
let isPlayable = true;
let cpuMode = true;

// FONCTION POUR PARCOURIR MON TABLEAU //
function frame() {
    main.innerHTML = ""
    array.forEach((e, i) => {
        const row = document.createElement("div")
        row.classList.add("row")
        main.appendChild(row)
        e.forEach((el, j) =>{
            const cell = document.createElement("div")
            cell.classList.add("cell")
            row.appendChild(cell)
            cell.addEventListener('click',() => {
                if (isPlayable) {
                    playGame(cell)
                }
            },{once:true})  
        })
    })
}
frame()
// FONCTION JOUER //
function playGame(cell) {
    if (playerOneTurn == true) {
        cell.style.backgroundColor = "yellow"
        cell.style.color = "yellow"
        cell.innerHTML = "X"
    }else{
        cell.style.backgroundColor = "red"
        cell.style.color = "red"
        cell.innerHTML = "O"
    }
    playerOneTurn = !playerOneTurn
    updateGameStatus(cell.innerHTML)
    checkWin(cell.innerHTML)
    if (isPlayable && playerOneTurn == false && cpuMode == true) {
        playCpu()
    }
    turn++
}
// FONCTION VICTOIRE et EGALITE //
function checkWin(cell) {
    let tabCells = document.querySelectorAll('.cell')
    console.log(tabCells);
    for (let i = 0; i < win.length; i++) {
        if (tabCells[win[i][0]].innerHTML != "") {
            if (tabCells[win[i][0]].innerHTML == tabCells[win[i][1]].innerHTML && tabCells[win[i][1]].innerHTML == tabCells[win[i][2]].innerHTML && tabCells[win[i][2]].innerHTML == tabCells[win[i][3]].innerHTML) {
              console.log("win");
                gameStatus.innerHTML = `Le joueur ${tabCells[win[i][0]].innerHTML} a gagné`;  
                endGame()
                return
                }    
        }
    }
    if (turn >= 41) {
        gameStatus.innerHTML = `Egalité! Personne ne Gagne! `;  
        endGame()
       }
}
// FONCTION AFFICHER LE STATUS //
function updateGameStatus(status) {
    let statusText;

    switch(status) {
        case "X" :
          statusText = "Au tour du joueur rouge";
          break;
        case "O" :
          statusText = "Au tour du joueur jaune";
          break;
    }
    gameStatus.innerHTML = statusText;
}
// FONCTION FIN DU MATCH //
function endGame() { 
    document.getElementById('gameEnd').style.display = "block";
    isPlayable = false
}
//FONCTION RESTART //
function reloadGame() {
    main.style.display='flex'
    gameStatus.style.display='block'
    turn = 0
    isPlayable = true
    playerOneTurn = true
    array = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ]
    frame()
    gameStatus.innerHTML = `Le Joueur 1 commence ! `;
    document.getElementById('gameEnd').style.display = "none"
}
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function playCpu() {
    let tabCells = document.querySelectorAll('.cell')
    while (tabCells [cpuChoice].innerHTML != "") {
        cpuChoice = randomize(0, tabCells.length-1)
    }
    tabCells[cpuChoice].click()
    checkWin()
}
function reloadGameCpu(cpu) {
    cpuMode = cpu
    reloadGame()
}




