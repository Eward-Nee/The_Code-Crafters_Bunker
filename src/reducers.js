import { createSlice } from "@reduxjs/toolkit"

const pageSlice = createSlice({
    name: "page",
    initialState: {
        pageIndex: 0
    },
    reducers: {
        switchPage(state, action) {
            state.pageIndex = action.payload
        }
    },
})

export const actionPage = pageSlice.actions

export default {
    page: pageSlice.reducer
}