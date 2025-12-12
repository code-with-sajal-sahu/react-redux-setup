import { createSlice } from "@reduxjs/toolkit";
import { generateObjectId } from "../../utils";
import { getAllRecipes } from "./userServices.js";


const userSlice = createSlice({
    name: "User",
    initialState: {
        taskList: [],
        recipesList: {}
    }, 
    reducers: {
        addTask: (state, action) => {
            state.taskList.push({id: generateObjectId(), status: "Open", ...action.payload});
        },
        updateTaskStatus: (state, action) => {
            const updatedTask = state.taskList.find(task => task.id === action.payload.id);
            if (updatedTask) {
                updatedTask.status = action.payload.status;
            }
        }
    },    
    extraReducers: (builder) => {
        builder.addCase(getAllRecipes.fulfilled, (state, action)=>{
            state.recipesList = action.payload
        })
    } 
})

export const { addTask, updateTaskStatus } = userSlice.actions;
export default userSlice.reducer;