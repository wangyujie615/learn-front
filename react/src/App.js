import React, { useState, useEffect, useCallback, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment } from "./store/counterSlice";
function App() {
    const [first, setFirst] = useState(0);
    const [second, setSecond] = useState(0);
    const [third, setThird] = useState(0);
    const m = useRef(0)
    useEffect(() => {
        setThird(first + second + m.current)
    }, [first, m])
    return (
        <div>
            <span>{first}</span>
            <button onClick={() => setFirst(first + 1)}>btn_first</button>
            <span>{second}</span>
            <button onClick={() => setSecond(second + 1)}>btn_second</button>
            <span>{third}</span>
        </div>
    )
}
export default App;