import React from 'react'
import { FaBomb } from 'react-icons/fa'
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

    const Square = ({value}) => {
        if (value >= 10) {
            return <button className={`btn btn-bomb btn-size-${boardSize}`} type="button" ><FaBomb className="bobmIcon"/></button>
        } else if (value === 0) {
            return <button className={`btn btn-empty btn-size-${boardSize}`} type="button" > </button>
        } else {
            return <button className={`btn btn-numbered btn-size-${boardSize} btn-${value}`} type="button" >{value}</button>
        }
    }

    const forCreatingTable = Array(boardSize * boardSize)
    for (let i = 0; i < boardSize; i++){
        for (let j = 0; j < boardSize; j++){
            forCreatingTable[i*boardSize + j] = Number(boardMap[i][j])
        }
    }

    return (
        <div>
        <h6 className="bombsCount">number of bombs : {minesCount}</h6>
        <div className="container-board">
            {forCreatingTable.map((value, index) => {
                return <Square key={index.toString()} value={value}/>
            })}
            </div>
        </div>
    )
}

export default Board