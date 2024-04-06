import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { iBook } from "../../interface/common";

interface iState {
    books:iBook[] | []
}

const initialState:iState = {
    books:[]
}

const bookSlice = createSlice({
    name:"books",
    initialState,
    reducers:{
        setBooks:(state,action:PayloadAction<iBook[]>)=>{
            state.books = action.payload
        },
    }
})

export const {setBooks} = bookSlice.actions

export default bookSlice.reducer