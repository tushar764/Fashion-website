import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  featureImageList: [], // ✅ Correct spelling
};

// ✅ Fetch feature images
export const getFeatureImages = createAsyncThunk(
  'common/getFeatureImages',
  async () => {
    const response = await axios.get('http://localhost:5000/api/common/feature/get');
    return response.data;
  }
);

// ✅ Add a new feature image
export const addFeatureImage = createAsyncThunk(
  'common/addFeatureImage',
  async (image) => {
    const response = await axios.post('http://localhost:5000/api/common/feature/add', {
      image,
    });
    return response.data;
  }
);

// ✅ Slice
const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data; // ✅ fixed typo here
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = []; // ✅ fixed typo here
      });
  },
});

export default commonSlice.reducer;
