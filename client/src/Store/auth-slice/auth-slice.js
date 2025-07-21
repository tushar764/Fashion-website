import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk('/auth/register',
    async (FormData) => {
        const response = await axios.post('http://localhost:5000/api/auth/register', FormData, {
            withCredentials: true
        });
        return response.data;
    }
);


// Logout function...

export const logoutUser = createAsyncThunk('/auth/logout', 
    async () => {
        const response = await axios.post('http://localhost:5000/api/auth/logout',{},  {
            withCredentials: true
        });
        return response.data;
    }
);





export const checkAuth = createAsyncThunk('/auth/checkauth', async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/check-auth", {
        withCredentials: true,
      });
  
      if (response.data.success) {
        return response.data;
      } else {
        return { success: false, user: null };
      }
    } catch (error) {
      return { success: false, user: null };
    }
  });
  


// Login 

export const loginUser = createAsyncThunk('/auth/login',
    async (FormData) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', FormData, {
            withCredentials: true
        });
        return response.data;
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            // .addCase(registerUser.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.user = action.payload; // ✅ Store registered user data
            //     state.isAuthenticated = true;
            // })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;  // ✅ Do not store user after registration
                state.isAuthenticated = false; // ✅ Ensure user is NOT logged in
            })
            
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // Login side 
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            // .addCase(loginUser.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.user = !action.payload.success ? null :action.
            // payload.user;
            //     state.isAuthenticated = action.payload.success ? false : true;
            // })

            .addCase(loginUser.fulfilled, (state, action) => {
                // console.log("Login Response:", action.payload);
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null; // ✅ Simplified user assignment
                state.isAuthenticated = action.payload.success;
                //  ? true : false; // ✅ Fixed isAuthenticated logic
            })
            

            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

            // check auth

            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
          .addCase(checkAuth.fulfilled, (state, action) => {
                
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null; 
                state.isAuthenticated = action.payload.success;
            })
              

                 // Logut 
                 .addCase(logoutUser.fulfilled, (state, action) => {
                
                    state.isLoading = false;
                    state.user =  null; 
                    state.isAuthenticated = false;
                })
                  
      
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });

       

        }

});

// Export actions and reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
