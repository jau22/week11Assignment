const tiles = document.querySelectorAll(".tile");
const player_X= "X";
const player_O= "O";
let turn = player_X;

//boardState keeps track of which player has claimed which tile
const boardState = Array(tiles.length);
console.log(boardState);
boardState.fill(null);

//Elements from html
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById('game-over-layout');
const gameOverText = document.getElementById('game-over-text');
const playAgain = document.getElementById('play-again');
const gameStatus = document.getElementById('game-status');
//Tiles Function when Clicked

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHover(){
    tiles.forEach(tile=>{
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });
    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach(tile=>{
        if(tile.innerText == ""){
            tile.classList.add(hoverClass);
        }
    })
}
setHover();

function tileClick(event){
    if (gameOverArea.classList.contains('visible')){
        return;
    }

    const tile=event.target;
    const tileNumber=tile.dataset.index;
    console.log(tileNumber);
    if (tile.innerText != ""){
        return;
    }

    if(turn === player_X){
        tile.innerText = player_X;
        boardState[tileNumber-1] = player_X;
        turn = player_O;
        gameStatus.innerText = "Player O's Turn";
    }

    else {
        tile.innerText = player_O;
        boardState[tileNumber-1] = player_O;
        turn = player_X;
        gameStatus.innerText = "Player X's Turn";
    }

    setHover();
    checkWinner();
}

function checkWinner(){
    for(const winningCombo of winningCombos){
        //Object Destructuring
        const {combo,strikeClass} = winningCombo;

        const tileValue1 = boardState[combo[0]-1];
        const tileValue2 = boardState[combo[1]-1];
        const tileValue3 = boardState[combo[2]-1];

        if(
            tileValue1 != null && 
            tileValue1 === tileValue2 && 
            tileValue1 === tileValue3){
                strike.classList.add(strikeClass)
                gameOverScreen(tileValue1);
                return;
            }
    }

    const allTilesFilled = boardState.every((tile) => tile !== null);
    if (allTilesFilled == true){
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText){
    let text='Draw!';
    gameStatus.innerText = "Draw!"
    if (winnerText != null){
        text=`Winner is ${winnerText}`;
        gameStatus.innerText = `${winnerText} wins!`
    }
    gameOverArea.className="visible";
    gameOverText.innerText= text;
}

playAgain.addEventListener("click",startNewGame);

function startNewGame(){
    gameOverArea.className="hidden";
    boardState.fill(null);
    tiles.forEach((tile) => tile.innerText="");
    strike.className = "strike";
    turn = player_X;
    gameStatus.innerText = "Player X's Turn"
}

//Check for winner every turn by describing each winning conditions
const winningCombos = [
    {combo:[1,2,3], strikeClass: "strike-row-1"},
    {combo:[4,5,6], strikeClass: "strike-row-2"},
    {combo:[7,8,9], strikeClass: "strike-row-3"},

    {combo:[1,4,7], strikeClass: "strike-col-1"},
    {combo:[2,5,8], strikeClass: "strike-col-2"},
    {combo:[3,6,9], strikeClass: "strike-col-3"},

    {combo:[1,5,9], strikeClass: "strike-dia-1"},
    {combo:[3,5,7], strikeClass: "strike-dia-2"}
]

