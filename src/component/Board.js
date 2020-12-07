import React from 'react'
import './Board.css'



function Board({ boardSize, dificullity }) {
    const difficulityCoeff = (dificullity === 1 ? 0.40 : dificullity === 2 ? 0.50 : dificullity === 3 ? 0.55 : 0.60)
    const minesCount = Math.floor(boardSize * boardSize * difficulityCoeff)    

    const minesLocation = Array(minesCount).fill(0)
    const boardIndex = Array.from(Array(boardSize * boardSize).keys())

    for (let i = 0; i < minesCount; i++){
        const newMineLocation = Math.floor(Math.random() * ((boardSize * boardSize ) -1 - i))
        minesLocation[i] = boardIndex[newMineLocation]
        let temp = boardIndex[newMineLocation]
        boardIndex[newMineLocation] = boardIndex[(boardSize * boardSize) -1 - i]
        boardIndex[(boardSize * boardSize) - 1] = temp
    }

    const boardMap = Array(boardSize * boardSize).fill(0)

    minesLocation.map((item) => {
        boardMap[item] = Number(10)
        let i = Math.floor(item/boardSize)
        if ( typeof boardMap[item - 1] != "undefined" && Math.floor((item - 1) / boardSize) === i)
            boardMap[item - 1]++
        if (typeof boardMap[item + 1] != "undefined" && Math.floor((item + 1) / boardSize) === i)
            boardMap[item + 1]++
        if (typeof boardMap[item - boardSize - 1] != "undefined" && Math.floor((item - boardSize - 1) / boardSize) === i - 1)
            boardMap[item - boardSize - 1]++
        if (typeof boardMap[item - boardSize] != "undefined" && Math.floor((item - boardSize) / boardSize) === i - 1)
            boardMap[item - boardSize]++
        if (typeof boardMap[item - boardSize + 1] != "undefined" && Math.floor((item - boardSize + 1) / boardSize) === i - 1)
            boardMap[item - boardSize + 1]++
        if (typeof boardMap[item + boardSize + 1] != "undefined" && Math.floor((item + boardSize + 1) / boardSize) === i + 1)
            boardMap[item + boardSize + 1]++
        if (typeof boardMap[item + boardSize] != "undefined" && Math.floor((item + boardSize) / boardSize) === i + 1)
            boardMap[item + boardSize]++
        if (typeof boardMap[item + boardSize + 1] != "undefined" && Math.floor((item + boardSize - 1) / boardSize) === i + 1)
            boardMap[item + boardSize - 1]++
        
        return boardMap
    })

    let disabledCount = 0;

    let correctFlagCount = 0;

    const winOrLoos = (detector) => {
        if (detector >= 10) {
            document.getElementById("maintext").innerText = "You Lost! try again..."
            document.getElementById("maintext").className = `${document.getElementById("maintext").className} lostText`
            for (let i = 0; i < boardSize * boardSize; i++) {
                let value = boardMap[i]
                if (value >= 10) {
                    if (document.getElementById(`btn__${i}`).flaged) {
                        document.getElementById(`btn__${i}`).className = `${document.getElementById(`btn__${i}`).className} correct`
                    }
                    else {
                        document.getElementById(`btn__${i}`).innerHTML = "<i class='fa bombIcon'>&#xf1e2</i>"
                        document.getElementById(`btn__${i}`).className = `${document.getElementById(`btn__${i}`).className}`
                    }
                }
                document.getElementById(`btn__${i}`).disabled = true
            }
        }
        else if (disabledCount === boardSize * boardSize - minesCount || correctFlagCount === minesCount) {
            document.getElementById("maintext").innerText = "You Won! lets play another game"
            document.getElementById("maintext").className = `${document.getElementById("maintext").className} winText`
        }
    }

    const toTurnOn = []
    const checkedCells = []
    const checkNeighbours = (location, mainloc) => {
        if (checkedCells.find(element => element === location + 1))
            return toTurnOn
        
        checkedCells.push(location + 1)
        let i = Math.floor(location / boardSize)
        let path = document.getElementById(`btn__${location}`)

        if (location !== mainloc && ( path.disabled || path.flaged || boardMap[location] >= 10)) {
            return toTurnOn
        } 

        if (boardMap[location - 1] < 10 && Math.floor((location - 1) / boardSize) === i) {
            checkNeighbours(location - 1, mainloc)
        }
        if (boardMap[location + 1] < 10 && Math.floor((location + 1) / boardSize) === i)
            checkNeighbours(location + 1, mainloc)

        if (boardMap[location - boardSize] < 10 && Math.floor((location - boardSize) / boardSize) === i - 1)
            checkNeighbours(location - boardSize, mainloc)

        if (boardMap[location + boardSize] < 10 && Math.floor((location + boardSize) / boardSize) === i + 1)
            checkNeighbours(location + boardSize, mainloc)
        
        toTurnOn.push(location)
        return toTurnOn
    }

    const ClickedButton = ({ e, location }) => {
        let value = boardMap[location]
        const identifier = document.getElementById(`btn__${location}`)
        let toTurn = []
        let status = identifier.disabled ? "disabled" :
            identifier.flaged ? "flaged" : "nothing"

        if (e.type === 'click') {
            if (status === "flaged") {
                identifier.flaged = false
                identifier.innerHTML = " "
                status = "nothing"
            }

            if (status === "nothing") {
                if (value >= 10) {
                    identifier.innerHTML = "<i class='fa bombIcon'>&#xf1e2</i>"
                    document.getElementById(`btn__${location}`).className = `${document.getElementById(`btn__${location}`).className} disabled`
                    document.getElementById(`btn__${location}`).disabled = true
                    disabledCount++
                    winOrLoos(value)
                }
                else {
                    toTurn = checkNeighbours(location, location)
                    toTurn.push(location)
                    toTurn.map(item => {
                        if (!document.getElementById(`btn__${item}`).disabled) {
                            value = boardMap[item]
                            if (value !== 0) {
                                document.getElementById(`btn__${item}`).innerHTML = `${value}`
                                document.getElementById(`btn__${item}`).className = `${identifier.className} btn-${value}`
                            }
                            document.getElementById(`btn__${item}`).className = `${document.getElementById(`btn__${item}`).className} disabled`
                            document.getElementById(`btn__${item}`).disabled = true
                            disabledCount++
                        }
                        return 0
                    })
                    winOrLoos(0)
                }
            }
        } else if (e.type === 'contextmenu') {
            if (!identifier.disabled) {
                if (identifier.flaged) {
                    identifier.flaged = false
                    identifier.innerHTML = " "
                    if (value >= 10)
                        correctFlagCount--
                }
                else {
                    identifier.innerHTML = "<i class='fa flagIcon'>&#xf024</i>"
                    identifier.flaged = true
                    if (value >= 10)
                        correctFlagCount++
                }
            }
            winOrLoos(0)
        }
    }
    console.log(minesLocation)
    const Square = ({location}) => {
        return <button contextMenu="none"
            id={`btn__${location}`}
            className={`btn btn-size-${boardSize}`}
            type="button"
            onClick={(e) => {
                ClickedButton({ e, location })
            }}
            onContextMenu={(e) => {
                e.preventDefault()
                ClickedButton({ e, location })
            }}
        > </button>
    }

    return (
        <div className="container-game">
            <h6 className="bombsCount" id="maintext">number of bombs : {minesCount}</h6>
            <div className="container-board">
                {boardMap.map((value, index) => {
                    return <Square key={index.toString()} location={index}/>
                })}
            </div>
        </div>
    )
}

export default Board