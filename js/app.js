document.addEventListener("DOMContentLoaded", function () {
    
    function GameOfLife(boardWith, boardHeight) {
        this.width = boardWith;
        this.height = boardHeight;
        this.board = document.querySelector("#board");
        this.cells = [];
    }

    GameOfLife.prototype.createBoard = function () {
        this.board.style.width = `${this.width * 10}px`;
        this.board.style.height = `${this.height * 10}px`;

        let divsCountA = this.width * this.height;

        for(let i = 0; i<divsCountA; i++){
            let newDiv = document.createElement("div");
            this.board.appendChild(newDiv);
            let y = Math.ceil((i+1)/this.width);
            let x = (i+1)%this.width;
            this.cells.push({reference:newDiv,x: x, y: y, isAlive: false, tableIndex: x*y});
        }

/*        this.cells = document.querySelectorAll("#board div");*/

        this.cells.forEach(function (cell) {
            cell.reference.addEventListener("click", function (e) {
                this.classList.toggle("live");
                if(cell.isAlive===false){
                    cell.isAlive=true;
                }
                else {
                    cell.isAlive=false;
                }
                console.log(`${cell.x}, ${cell.y}`+` ` +cell.isAlive)
            })
        });
    };

    let game = new GameOfLife(20,20);
    game.createBoard();
});