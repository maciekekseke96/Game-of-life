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
        }

        this.cells = document.querySelectorAll("#board div");

        this.cells.forEach(function (cell) {
            cell.addEventListener("click", function (e) {
                this.classList.toggle("live");
            })
        })
    };

    let game = new GameOfLife(20,20);
    game.createBoard();
});