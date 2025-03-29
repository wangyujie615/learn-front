import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { decrement, increment } from "./store/counterSlice";
function App() {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    return (
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <span>{count}</span>
            <button onClick={() => dispatch(decrement())}>decrement</button>
        </div>
    )
}
export default App;