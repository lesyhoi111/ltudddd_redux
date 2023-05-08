import { createSlice, nanoid } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {

      const newTask = {
        id: nanoid(),
        name: action.payload.task,
        description: action.payload.description,
        date: action.payload.dateDo,
        done: action.payload.done,
      };
      state.push(newTask);
    },
    editTask: (state, action) => {
      
      upd_obj = state.findIndex((obj => obj.id == action.payload.id));
      state[upd_obj].name = action.payload.task;
      state[upd_obj].description= action.payload.description;
      state[upd_obj].date= action.payload.dateDo;
      state[upd_obj].done= action.payload.done;
    },
  },
});

export const { addTask, editTask } = taskSlice.actions;

export default taskSlice.reducer;
