import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const Task = {
    _id: String,        
    title: String,
    description: String,    
    priority: 'low' | 'medium' | 'high',
    status: 'pending' | 'completed', 
    duedate: String,
}

const TaskState = {
    tasks: [Task],          
    loading: Boolean,
    error: String | null,   
    // success: Boolean,
}

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};


export const fetchTasks = createAsyncThunk(
    'task/fetchTasks',  
    async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, { withCredentials: true });
        return data;
    }
);

export const createTask = createAsyncThunk(
    'task/createTask',  
    async ({ title, description, priority, status, duedate }) => {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, { title, description, priority, status, duedate }, { withCredentials: true });
        return data;
    }
);

export const updateTask = createAsyncThunk(
    'task/updateTask',  
    async ({id, title, description, priority, status, duedate }) => {
        const allowedStatuses = ['pending', 'completed'];
        const updatedtask = {
          ...Task,
          status: allowedStatuses.includes(Task.status) ? Task.status : 'pending'
        };

        const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`,updatedtask , { withCredentials: true });
        return data;
    }

);

export const deleteTask = createAsyncThunk(
    'task/deleteTask',  
    async (id) => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`, { withCredentials: true });
        return id;
    }
);

const taskSlice = createSlice({
    name: 'task',   
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },  
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            // .addCase(createTask.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            // .addCase(createTask.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message || 'Failed to create task';
            // })
            // .addCase(updateTask.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            .addCase(updateTask.fulfilled, (state, action) => {
                // state.loading = false;
                const index = state.tasks.findIndex(task => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            // .addCase(updateTask.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message;
            // })
            // .addCase(deleteTask.pending, (state) => {
            //     state.loading = true;
            // })
            .addCase(deleteTask.fulfilled, (state, action) => {
                // state.loading = false;
                state.tasks = state.tasks.filter(task => task._id !== action.payload);
            });
            // .addCase(deleteTask.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message;
            // });
    },
});

export default taskSlice.reducer;