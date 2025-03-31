import React, { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment } from "./store/counterSlice";
function App() {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    const [isRunning, setIsRunning] = useState(false)
    const [num, setNum] = useState(0)
    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setNum(num + 1)
            }, 1000)
        }
        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [isRunning, num])
    //这样会导致无限请求问题
    const handleClick = (p)=>{
        setNum(num+1)
        console.log(p)
    }
    useEffect(()=>{
       handleClick('pp');
    },[handleClick])
    return (
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <span>{count}</span>
            <button onClick={() => dispatch(decrement())}>decrement</button>
            <button onClick={() => setIsRunning(!isRunning)}>start</button>
            <span>{num}</span>
            <button>change</button>
            <span>{num}</span>
        </div>
    )
}
export default App;