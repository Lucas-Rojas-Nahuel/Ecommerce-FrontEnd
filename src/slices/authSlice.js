import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

// Acción asincrónica para obtener el perfil del usuario
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return rejectWithValue("Token no encontrado");
    }

    try {
      const decodedToken = jwtDecode(token);

      if (!decodedToken || !decodedToken.usuarioId) {
        throw new Error("Token inválido o incompleto");
      }

      const userId = decodedToken.usuarioId;
      const response = await axios.get(
        `http://localhost:3001/api/v1/usuarios/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al decodificar el token o al obtener el perfil: ", error);
      return rejectWithValue("Error al obtener el perfil del usuario");
    }
  }
);

// Slice de autenticación y perfil
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.profile = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
