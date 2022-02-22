// ? styles
import '../Styles/Game.scss'

// ? packages
import { useState, useEffect } from 'react'

// ? firebase
import { set, ref, onValue } from 'firebase/database'
import db from '../Firebase'

export default function Game() {
    const [data, setData] = useState([])
    useEffect(() => {
        const dataRef = ref(db, 'tictactoe')
        onValue(dataRef, snapshot => {
            const data = snapshot.val()
            var arr = [];
            for (let item in data) {
                arr.push(data[item]);
            }
            setData(arr)
        })
    }, [])

    const [counter, setCounter] = useState(true)
    const [winsX, setWinsX] = useState(false)
    const [winsO, setWinsO] = useState(false)

    const setXO = (xo, i) => {
        const valuesRef = ref(db, `tictactoe/field${i}/value`)
        set(valuesRef, xo)
        winner()
    }

    const makeMove = (item, index) => {
        if (!item.value) {
            if (counter) setXO("X", index)
            else setXO("O", index)
            setCounter(!counter)
        }
        winner()
    }

    const clearAll = () => {
        for (let i = 0; i<9; i++) {
            const valuesRef = ref(db, `tictactoe/field${i}/value`)
            set(valuesRef, "")
        }
    }

    const winner = () => {
        if (data) {
            // / X wins
            if (
                // горизонтально
                (data[0].value === "X" && data[1].value === "X" && data[2].value === "X") ||
                (data[3].value === "X" && data[4].value === "X" && data[5].value === "X") ||
                (data[6].value === "X" && data[7].value === "X" && data[8].value === "X") ||
                // вертикально
                (data[0].value === "X" && data[3].value === "X" && data[6].value === "X") ||
                (data[1].value === "X" && data[4].value === "X" && data[7].value === "X") ||
                (data[2].value === "X" && data[5].value === "X" && data[8].value === "X") ||
                // діагонально
                (data[0].value === "X" && data[4].value === "X" && data[8].value === "X") ||
                (data[2].value === "X" && data[4].value === "X" && data[6].value === "X")
            ) {
                // console.log("XXX")
                setWinsX(true)
                setWinsO(false)
                setCounter(true)
                clearAll()
            }
            // / O wins
            else if (
                // горизонтально
                (data[0].value === "O" && data[1].value === "O" && data[2].value === "O") ||
                (data[3].value === "O" && data[4].value === "O" && data[5].value === "O") ||
                (data[6].value === "O" && data[7].value === "O" && data[8].value === "O") ||
                // вертикально
                (data[0].value === "O" && data[3].value === "O" && data[6].value === "O") ||
                (data[1].value === "O" && data[4].value === "O" && data[7].value === "O") ||
                (data[2].value === "O" && data[5].value === "O" && data[8].value === "O") ||
                // діагонально
                (data[0].value === "O" && data[4].value === "O" && data[8].value === "O") ||
                (data[2].value === "O" && data[4].value === "O" && data[6].value === "O")
            ) {
                // console.log("OOO")
                setWinsX(false)
                setWinsO(true)
                setCounter(false)
                clearAll()
            }
        }
    }

    return (
        <div className={`game ${winsX ? "game-red" : ""} ${winsO ? "game-blue" : ""}`} onDoubleClickCapture={() => clearAll()}>
            <div className="containerr">
                <div className="game-inner">

                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="game-item"
                            onClick={() => makeMove(item, index)}
                        >
                            <h1 className="display-1 text-white">
                                {item.value}
                                {/* {index} */}
                            </h1>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}