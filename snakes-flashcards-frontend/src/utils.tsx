export function newGame() {
    return new Game(6, 6, [new Player(0, "player_id", "red"), new Player(0, '', "yellow"), new Player(0, '', 'pink')], {7: 3}, {2: 32, 9:23}, new Set([5, 8]), new Set([7, 14]))
}


export function diceThrow() {
    return Math.floor(Math.random() * (6 - 1) ) + 1;
}

export class Player {
    pos: number
    pid: String
    color: string
    
    constructor(pos: number, pid: String, color: string) {
        this.pos = pos
        this.pid = pid
        this.color = color
    }
}

export class Cell {
    index: number
    isHead: boolean
    isLadderBtm: boolean
    connectTo: number | null
    players: Player[]
    isDrawAgain: boolean
    isSkipNext: boolean
    
    constructor( index: number, isHead: boolean, isLadderBtm: boolean, connectTo: number | null, players: Player[], isDrawAgain: boolean, isSkipNext: boolean) {
        this.index = index
        this.isHead = isHead
        this.isLadderBtm = isLadderBtm
        this.connectTo = connectTo
        this.players = players
        this.isDrawAgain = isDrawAgain
        this.isSkipNext = isSkipNext
    }
    
}

export const numWords: Record<number, string>  = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six'
}

export class Game {
    nCols: number;
    nRows: number;
    players: Player[];
    snakes: Record<number, number>;
    ladders: Record<number, number>;
    drawAgainCells: Set<number>;
    skipNextCells: Set<number>;
    turn: number = 0;
    repeatTurn: boolean = false;
    skipTurn: Set<number> = new Set([]);
    needToUpdateSnakeLadder: boolean = false;
    playerToUpdate: Player | null = null
    winner: Player | null = null
    lastDice: number = 6
    
    constructor
    (
        nCols: number,
        nRows: number,
        players: Player[],
        snakes: Record<number, number>,
        ladders: Record<number, number>,
        drawAgainCells: Set<number>,
        skipNextCells: Set<number>,
    ) {
            this.nCols     = nCols
            this.nRows = nRows
            this.players = players
            this.snakes = snakes
            this.ladders = ladders
            this.drawAgainCells = drawAgainCells
            this.skipNextCells =     skipNextCells
            this.cellList()
    }
    
    update() {
        // Update Previous Snake/Ladder
        if (this.playerToUpdate != null) {
            const pos = this.playerToUpdate.pos
            this.playerToUpdate.pos = pos in this.snakes ? this.snakes[pos] : this.ladders[pos]
            this.playerToUpdate = null
            this.turn = (this.turn + 1) % this.players.length
            return this
        }

        // Move the player
        const oldPos = this.curPlayer().pos
        this.lastDice = diceThrow();
        let newPos = oldPos + this.lastDice;
        newPos = newPos < this.nCells() ? newPos : oldPos
        this.curPlayer().pos = newPos
        if (newPos == this.nCells() - 1) this.winner = this.curPlayer()

        // Check for stuff
        if (newPos in this.snakes || newPos in this.ladders) {
            console.log(this.players.indexOf(this.curPlayer()) + ' is on snake')
            this.playerToUpdate = this.curPlayer()
        }
        

        // Update turn:
        if (!(this.playerToUpdate))
            this.turn = (this.turn + 1) % this.players.length
        console.log('newPos: ' + newPos)
        return this
    }

    nCells() {
        return this.nCols * this.nRows
    }
    cellList() {
        const cellList = []
        for (let i = 0; i < this.nCols * this.nRows; i++) {
            cellList.push(new Cell(
                i,
                i in this.snakes,
                i in this.ladders,
                i in this.snakes ? this.snakes[i] : i in this.ladders? this.ladders[i] : null,
                this.players.filter(p => p.pos == i),
                this.drawAgainCells.has(i),
                this.skipNextCells.has(i),
            ))
        }
        return cellList
    }
    

    curPlayer() {
        return this.players[this.turn]
    }   
}
    