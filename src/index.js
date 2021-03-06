import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Board from './component/Board'
import * as AiIcon from 'react-icons/ai'
import * as CgIcon from 'react-icons/cg'
import './index.css'
 
function Game() {
    const [diff, setDiff] = useState(() => 1)
    const [size, setSize] = useState(() => 9)
    const [start, setStart] = useState(()=> false)
    const changeDiff = (val) => setDiff(val)
    const changeSize = (val) => setSize(val)
    const startGame = () => {
        if (start) {
            document.getElementById("startbtn").innerText = "start"
            document.getElementsByName("label").disabled = false
        } else {
            document.getElementById("startbtn").innerText = "restart"
            document.getElementsByClassName("diffContainer").disabled = true
        }
        setStart(!start)
    }
    return (
        <div className="container">
            <h2>mine sweeper game</h2>
            {start ? null :
                <div className={`diffContainer`}>
                    <h6>dificullity</h6>
                    <label>
                        <input type="radio" value={1} name="diff" className="radiobtn" onClick={(e) => changeDiff(Number(e.target.value))} />
                        <AiIcon.AiFillStar className={`star star-easy ${diff === 0 ? "diactive" : "active"}`} />
                    </label>
                    <label>
                        <input type="radio" value={2} name="diff" className="radiobtn" onClick={(e) => changeDiff(Number(e.target.value))} />
                        <AiIcon.AiFillStar className={`star star-medium ${diff > 1 ? "active" : "deactive"}`} />
                    </label>
                    <label>
                        <input type="radio" value={3} name="diff" className="radiobtn" onClick={(e) => changeDiff(Number(e.target.value))} />
                        <AiIcon.AiFillStar className={`star star-hard ${diff > 2 ? "active" : "deactive"}`} />
                    </label>
                    <label>
                        <input type="radio" value={4} name="diff" className="radiobtn" onClick={(e) => changeDiff(Number(e.target.value))} />
                        <AiIcon.AiFillStar className={`star star-extreme ${diff > 3 ? "active" : "deactive"}`} />
                    </label>
                </div>
            }
            {start ? null :
                <div className={`sizeContainer`}>
                    <h6>size</h6>
                    <label>
                        <input type="radio" value={9} name="size" className="radiobtn" onClick={(e)=>changeSize(Number(e.target.value))}/>
                        <CgIcon.CgMenuGridR className={`size size-small ${size === 9 ? "active" : "deactive"}`} />
                    </label>
                    <label>
                        <input type="radio" value={13} name="size" className="radiobtn" onClick={(e)=>changeSize(Number(e.target.value))}/>
                        <CgIcon.CgMenuGridR className={`size size-medium ${size === 13 ? "active" : "deactive"}`} />
                    </label>
                    <label>
                        <input type="radio" value={17} name="size" className="radiobtn" onClick={(e)=>changeSize(Number(e.target.value))}/>
                        <CgIcon.CgMenuGridR className={`size size-large ${size === 17 ? "active" : "deactive"}`} />
                    </label>
                </div>
            }
            <button type="submit" className="btn startbtn" onClick={()=>startGame()} id="startbtn">start</button>
            {start ? <Board boardSize={size} dificullity={diff} /> : null}
        </div>
    )
}


ReactDOM.render(<Game/>,document.getElementById('root'))