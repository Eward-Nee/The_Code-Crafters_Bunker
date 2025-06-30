import { configureStore } from "@reduxjs/toolkit";
import red from "./reducers"

const store = configureStore({
    reducer: {
        page: red.page
    }
})

export default store