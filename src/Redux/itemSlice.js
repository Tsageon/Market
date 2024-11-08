import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get('https://backendma-2.onrender.com/api/getItems');
  return response.data.data; 
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {
  const response = await axios.post('https://backendma-2.onrender.com/api/addItem', item);
  return { ...item, id: response.data.id }; 
});

export const updateItem = createAsyncThunk('items/updateItem', async (item) => {
  await axios.put(`https://backendma-2.onrender.com/api/updateItem`, item);
  return item;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
  await axios.delete(`https://backendma-2.onrender.com/api/deleteItem/${id}`);
  return id;
});


const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    filteredItems: [],
    status: 'idle',
    error: null,
  },
  reducers: {   filterItems: (state, action) => {
    const filterType = action.payload;
    if (filterType === 'all') {
      state.filteredItems = state.items; 
    } else {
      state.filteredItems = state.items.filter(item => {
        switch (filterType) {
          case 'type':
            return item.type;
          case 'availability':
            return item.availability; 
          case 'stockLeft':
            return item.stockLeft > 0;
          case 'name':
            return item.name.toLowerCase().includes('your-search-term'); 
          default:
            return true;
        }
      });
    }
  }
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload; 
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
     
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.filteredItems.push(action.payload); 
      })
     
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          const filteredIndex = state.filteredItems.findIndex(item => item.id === action.payload.id);
          if (filteredIndex !== -1) {
            state.filteredItems[filteredIndex] = action.payload;
          }
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { filterItems } = itemsSlice.actions;
export default itemsSlice.reducer;
