document.addEventListener("DOMContentLoaded", function () {
    
    function GameOfLife(boardWith, boardHeight) {                /*KONSTRUKTOR DLA OBIEKTU REPREZENTUJĄCEGO CAŁA GRĘ*/
        this.width = boardWith;
        this.height = boardHeight;
        this.board = document.querySelector("#board");
        this.cells = [];
    }

    GameOfLife.prototype.createBoard = function () {      /*DODANIE DO KONSTRUKTORA FUNKCJI KREAUJĄCEJ NASZĄ SEKCJĘ BOARD*/
        this.board.style.width = `${this.width * 10}px`;
        this.board.style.height = `${this.height * 10}px`;
        let self = this;

        let divsCountA = this.width * this.height;      /*CAŁKOWITA LICZBA WSZYSTKICH KOMÓREK*/

        function NewCell(reference, x,y,tableIndex){    /*FUNKCJA TWORZĄCA OBIEKTY REPREZENTUJĄCE POJEDYNCZE KOMÓRKI*/
            this.reference = reference;
            this.x = x;
            this.y = y;
            this.tableIndex = tableIndex;
            this.isAlive = false;
        }
        for(let i = 0; i<divsCountA; i++){  /*TWORZENIE KOMÓREK W PĘTLI, OBLICZANIE DLA NICH X I Y WEDŁUG UKŁADU WSPÓŁRZĘDNYCH ORAZ OKREŚLANIE ICH POŁOŻENIA W TABLICY CELLS DO KTÓREJ BĘDZIEMY JE WRZUCAĆ*/
            let newDiv = document.createElement("div");
            this.board.appendChild(newDiv);
            let y = Math.ceil((i+1)/this.width);
            let x;
            if((i+1)%this.width===0){
                x=this.width;
            }
            else {
               x = (i+1)%this.width;
            }
            let tableIndex =  x + ((y-1)*this.width);
            this.cells.push(new NewCell(newDiv,x,y,tableIndex))  /*MOMENT WRZUCENIA OBIEKTU REPREZENTUJĄCEGO POJEDYNCZĄ KOMÓRKĘ DO TABLICY CELLS*/
        }

        function showTheNeighbours(cell) {   /*FUNKCJA OKREŚLAJĄCA MIEJSCE POŁOŻENIA SĄSIADÓW DANEJ KOMÓRKI W TABLICY WSZYSTKICH KOMÓREK*/
            let indexesToShow=[];
            let coordinatesToCount=[];
            let mainX = cell.x;
            let mainY = cell.y;
            coordinatesToCount.push([mainX-1,mainY],[mainX-1,mainY-1],[mainX,mainY-1],[mainX+1,mainY+1],[mainX+1,mainY],[mainX+1,mainY-1],[mainX,mainY+1],[mainX-1,mainY+1]);

            let filteredCoordinates = coordinatesToCount.filter(function (coordinate) {
                return coordinate[0]>0 && coordinate[0]<=self.width && coordinate[1]>0 && coordinate[1]<=self.height
            });
            filteredCoordinates.forEach(function (element) {
                indexesToShow.push(element[0]+((element[1]-1)*self.width));
            });
            return indexesToShow;
        }

        this.cells.forEach(function (cell) {
            cell.reference.addEventListener("mouseenter", function (e) {
                this.classList.add("live");
                    cell.isAlive=true
            });
        });
        let computeCellNextState = function (cell) {  /*FUNKCJA KALKULUJĄCA PRZYSZŁY STAN KOMÓRKI NA PODSTAWIE JEJ SĄSIADÓW*/
            let cellNeighbours = showTheNeighbours(cell);
            let aliveNeighbours = 0;
            cellNeighbours.forEach(function (element) {
                if(self.cells[element-1].isAlive){
                    aliveNeighbours++;
                }
            });
            if(cell.isAlive===true&&aliveNeighbours<2){
                return 0;
            }
            else if(cell.isAlive&&(aliveNeighbours===2||aliveNeighbours===3)){
                return 1;
            }
            else if(cell.isAlive&&aliveNeighbours>3){
                return 0;
            }
            else if(!cell.isAlive&&aliveNeighbours===3){
                return 1;
            }
            else{
                return 0;
            }
        };

        let computeNextGeneration = function () {
            let newStates = [];
            self.cells.forEach(function (cell) {
                let nextState = computeCellNextState(cell);
                newStates.push(nextState);
            });
            return newStates;
        };
        let printNextGeneration = function () {
            let newStates = computeNextGeneration();
            self.cells.forEach(function (cell, index) {
                if(cell.isAlive===true&&newStates[index]===0){
                    cell.reference.classList.remove("live");
                    cell.isAlive = false;
                }
                else if(cell.isAlive===false&&newStates[index]===1){
                    cell.reference.classList.add("live");
                    cell.isAlive = true;
                }
            })
        };
        let playButton = document.querySelector("#play");
        let pauseButton = document.querySelector("#pause");
        playButton.addEventListener("click", function (e) {
            e.preventDefault();
            let letsPlay = setInterval(function () {
                printNextGeneration();
            },500);
            pauseButton.addEventListener("click", function (e) {
                e.preventDefault();
                clearInterval(letsPlay);
            });
        });
    };
    let rowsCount = parseFloat(prompt("How many rows?"));
    let columnsCount = parseFloat(prompt("How many columns?"));
    let game = new GameOfLife(rowsCount,columnsCount);
    game.createBoard();
});