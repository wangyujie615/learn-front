import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counterSlice";
//创建Store
const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})
export default store;