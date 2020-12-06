import React from 'react'
import './Board.css'

function Board({ boardSize, dificullity }) {
    let minesCount = 20;
    const diffCoeff = (dificullity === 1 ? 0.25 : dificullity === 2 ? 0.40 : dificullity === 3 ? 0.6 : 0.8)
    minesCount = (Math.floor(boardSize * boardSize * diffCoeff))

    const minesLocation = Array(minesCount).fill(0)
    for (let i = 0; i < minesCount; i++){
        const newBombLocation = Math.floor(Math.random() * (boardSize * boardSize))
        if (!(minesLocation.find(element => element === newBombLocation))) {
            minesLocation[i]=newBombLocation+1
        } else {
            i--;
        }
    }

    const boardMap = new Array(boardSize)
    for (let i = 0; i < boardSize; i++)
        boardMap[i]=new Array(boardSize).fill(0)
    for (let i = 0; i < boardSize; i++){
        for (let j = 0; j < boardSize; j++){
            if (minesLocation.find(element => element === (i * 9) + j + 1)) {
                boardMap[i][j] = 10
                if (i === 0) {
                    if (j === 0) {
                        boardMap[i][j + 1]++
                        boardMap[i + 1][j]++
                        boardMap[i + 1][j + 1]++
                    }
                    else if (j === boardSize - 1) {
                        boardMap[i][j - 1]++ 
                        boardMap[i + 1][j - 1]++
                        boardMap[i + 1][j]++
                    }
                    else {
                        boardMap[i][j - 1]++
                        boardMap[i][j + 1]++
                        boardMap[i + 1][j - 1]++
                        boardMap[i + 1][j]++
                        boardMap[i + 1][j + 1]++
                    }
                } else if (i === boardSize - 1) {
                    if (j === 0) {
                        boardMap[i - 1][j]++
                        boardMap[i - 1][j + 1]++
                        boardMap[i][j + 1]++
                    }
                    else if (j === boardSize - 1) {
                        boardMap[i - 1][j - 1]++
                        boardMap[i - 1][j]++
                        boardMap[i][j - 1]++
                    }
                    else {
                        boardMap[i - 1][j - 1]++
                        boardMap[i - 1][j]++
                        boardMap[i - 1][j + 1]++
                        boardMap[i][j - 1]++
                        boardMap[i][j + 1]++
                    }
                } else {
                    if (j === 0) {
                        boardMap[i - 1][j]++
                        boardMap[i - 1][j + 1]++
                        boardMap[i][j + 1]++
                        boardMap[i + 1][j]++
                        boardMap[i + 1][j + 1]++
                    }
                    else if (j === boardSize - 1) {
                        boardMap[i - 1][j - 1]++
                        boardMap[i - 1][j]++
                        boardMap[i][j - 1]++
                        boardMap[i + 1][j - 1]++
                        boardMap[i + 1][j]++
                    }
                    else {
                        boardMap[i - 1][j - 1]++
                        boardMap[i - 1][j]++
                        boardMap[i - 1][j + 1]++
                        boardMap[i][j - 1]++
                        boardMap[i][j + 1]++
                        boardMap[i + 1][j - 1]++
                        boardMap[i + 1][j]++
                        boardMap[i + 1][j + 1]++
                    }
                }
            }
        }
    }
    let ableToCountinue = 1;
    const winOrLoos = (detector) => {
        if (detector) {
            document.getElementById("maintext").innerText = "You Lost! try again..."
            document.getElementById("maintext").className = `${document.getElementById("maintext").className} lostText`
            ableToCountinue = 0
            for (let i = 0; i < boardSize * boardSize; i++){
                let value = forCreatingTable[i]
                if (value >= 10) {
                    if (document.getElementById(`btn__${i}`).flaged) {
                        document.getElementById(`btn__${i}`).className = `${document.getElementById(`btn__${i}`).className} correct`
                    }
                    else {
                        document.getElementById(`btn__${i}`).innerHTML = "<i class='fa bombIcon'>&#xf1e2</i>"
                        document.getElementById(`btn__${i}`).className = `${document.getElementById(`btn__${i}`).className} disabled`
                    }
                }
                document.getElementById(`btn__${i}`).disabled = true
            }
        }
        return ableToCountinue
    }

    const ClickedButton = ({ e, value, location }) => {
        if (winOrLoos(0)) {
            if (e.type === 'click') {
                if (document.getElementById(`btn__${location}`).flaged) {
                    document.getElementById(`btn__${location}`).flaged = false
                    document.getElementById(`btn__${location}`).innerHTML= " "
                }
                if (!document.getElementById(`btn__${location}`).disabled) {
                    if (value >= 10) {
                        document.getElementById(`btn__${location}`).innerHTML = "<i class='fa bombIcon'>&#xf1e2</i>"
                        document.getElementById(`btn__${location}`).disabled = true
                        document.getElementById(`btn__${location}`).className = `${document.getElementById(`btn__${location}`).className} disabled`
                        winOrLoos(1)
                    } else if (value === 0) {
                        document.getElementById(`btn__${location}`).disabled = true
                        document.getElementById(`btn__${location}`).className = `${document.getElementById(`btn__${location}`).className} disabled`
                    } else {
                        document.getElementById(`btn__${location}`).innerHTML = `${value}`
                        document.getElementById(`btn__${location}`).disabled = true
                        document.getElementById(`btn__${location}`).className = `${document.getElementById(`btn__${location}`).className} disabled btn-${value}`
                    }
                }
            } else if (e.type === 'contextmenu') {
                if (!document.getElementById(`btn__${location}`).disabled) {
                    if (document.getElementById(`btn__${location}`).flaged) {
                        document.getElementById(`btn__${location}`).flaged = false
                        document.getElementById(`btn__${location}`).innerHTML = " "
                    } else {
                        document.getElementById(`btn__${location}`).innerHTML = "<i class='fa flagIcon'>&#xf024</i>"
                        document.getElementById(`btn__${location}`).flaged = true
                    }
                }
            }
        }
    }

    const Square = ({ value , location}) => {
        return <button contextMenu="none"
            id={`btn__${location}`}
            className={`btn btn-size-${boardSize}`}
            type="button"
            onClick={(e) => {
                ClickedButton({ e, value, location })
            }}
            onContextMenu={(e) => {
                e.preventDefault()
                ClickedButton({ e, value, location })
            }}
        > </button>
    }

    const forCreatingTable = Array(boardSize * boardSize)
    for (let i = 0; i < boardSize; i++){
        for (let j = 0; j < boardSize; j++){
            forCreatingTable[i*boardSize + j] = Number(boardMap[i][j])
        }
    }

    return (
        <div>
        <h6 className="bombsCount" id="maintext">number of bombs : {minesCount}</h6>
        <div className="container-board">
            {forCreatingTable.map((value, index) => {
                return <Square key={index.toString()} value={value} location={index}/>
            })}
            </div>
        </div>
    )
}

export default Board