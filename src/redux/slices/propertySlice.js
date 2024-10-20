import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API requests from environment variables
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Constants for action types
const FETCH_PROPERTIES = "properties/fetchProperties";
const DELETE_PROPERTY = "properties/deleteProperty";

// Fetch properties from the server
export const fetchProperties = createAsyncThunk(FETCH_PROPERTIES, async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/properties`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message); // Capture and throw error
  }
});

// Delete a property by ID
export const deleteProperty = createAsyncThunk(
  DELETE_PROPERTY,
  async (propertyId) => {
    try {
      await axios.delete(`${SERVER_URL}/api/properties/${propertyId}`);
      return propertyId; // Return the property ID for removal from the state
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message); // Capture and throw error
    }
  }
);

// Update a property
export const updateProperty = createAsyncThunk(
  "properties/updateProperty",
  async (propertyData) => {
    try {
      const response = await axios.put(
        `${SERVER_URL}/api/properties/${propertyData._id}`,
        propertyData
      );
      return response.data; // Return updated property
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message); // Capture and throw error
    }
  }
);

// Property slice to manage property data
const propertySlice = createSlice({
  name: "properties",
  initialState: {
    list: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    searchKey: "",
  },
  reducers: {
    setSearchKey: (state, { payload }) => {
      state.searchKey = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch properties
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading"; // Set status to loading
        state.error = null; // Reset error on new fetch
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded"; // Fetch succeeded
        state.list = action.payload; // Store fetched properties
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed"; // Fetch failed
        state.error = action.error.message; // Capture error message
      })
      // Delete property
      .addCase(deleteProperty.pending, (state) => {
        state.status = "loading"; // Set status to loading for delete
        state.error = null; // Reset error on new delete
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        // Remove the deleted property from the state
        state.list = state.list.filter(
          (property) => property._id !== action.payload
        );
        state.status = "succeeded"; // Deletion succeeded
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.status = "failed"; // Deletion failed
        state.error = action.error.message; // Capture error message
      })
      // Update property
      .addCase(updateProperty.pending, (state) => {
        state.status = "loading"; // Set status to loading for update
        state.error = null; // Reset error on new update
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        // Update the property in the state
        const index = state.list.findIndex(
          (property) => property._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload; // Update the specific property
        }
        state.status = "succeeded"; // Update succeeded
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.status = "failed"; // Update failed
        state.error = action.error.message; // Capture error message
      });
  },
});
export const { setSearchKey } = propertySlice.actions;

export default propertySlice.reducer;
