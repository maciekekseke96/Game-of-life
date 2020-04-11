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

        function showTheNeighbours(cell) {
            let indexesToShow=[];
            let coordinatesToCount=[];
            let mainX = cell.x;
            let mainY = cell.y;
            coordinatesToCount.push([mainX-1,mainY],[mainX-1,mainY-1],[mainX,mainY-1],[mainX+1,mainY+1],[mainX+1,mainY],[mainX+1,mainY-1],[mainX,mainY+1],[mainX-1,mainY+1]);

            let filteredCoordinates = coordinatesToCount.filter(function (coordinate) {
                return coordinate[0]>0 && coordinate[0]<=self.width && coordinate[1]>0 && coordinate[1]<=self.height
            });
            console.log(filteredCoordinates);
            filteredCoordinates.forEach(function (element) {
                indexesToShow.push(element[0]+((element[1]-1)*self.width));
            });
            indexesToShow.forEach(function (element) {
                console.log(self.cells[element-1]);
                self.cells[element-1].reference.style.backgroundColor = "red";
            })
        }

        this.cells.forEach(function (cell) {
            cell.reference.addEventListener("click", function (e) {
                this.classList.toggle("live");
                if(cell.isAlive===false){
                    cell.isAlive=true;
                }
                else {
                    cell.isAlive=false;
                }
                showTheNeighbours(cell);
            })
        });
    };

    let game = new GameOfLife(20,20);
    game.createBoard();
});