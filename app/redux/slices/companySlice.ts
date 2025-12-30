import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Company {
  // Define company properties based on API response
  id: number;
  name: string;
  // ... other properties
}

interface CompaniesState {
  companies: Company[];
  count: number;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  count: 0,
  loading: 'idle',
  error: null,
};

interface FetchCompaniesArgs {
  index: number;
  page?: number;
}

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async ({ index, page = 1 }: FetchCompaniesArgs, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/bff/api/companies', {
        params: {
          index: index,
          page: page,
          perPage: 24, // 24 items per page
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchCompanies = createAsyncThunk(
  'companies/searchCompanies',
  async (query: string, { rejectWithValue }) => {
    try {
      const url = `/api/bff/api/companies/search?q=${query}`;
      const response = await axios.get(url);
      console.log('Axtarış nəticəsi:', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = 'succeeded';
        if (Array.isArray(action.payload.data)) {
          state.companies = action.payload.data;
          state.count = action.payload.count;
        } else {
          state.companies = [];
          state.count = 0;
        }
      })
      .addCase(fetchCompanies.rejected, (state, action: PayloadAction<any>) => {
        state.loading = 'failed';
        state.error = action.payload?.message || 'Xəta baş verdi';
      })
      .addCase(searchCompanies.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(searchCompanies.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = 'succeeded';
        const companiesData = Array.isArray(action.payload) ? action.payload : action.payload?.data;
        if (Array.isArray(companiesData)) {
          state.companies = companiesData;
          state.count = companiesData.length;
        } else {
          state.companies = [];
          state.count = 0;
        }
      })
      .addCase(searchCompanies.rejected, (state, action: PayloadAction<any>) => {
        state.loading = 'failed';
        state.error = action.payload?.message || 'Axtarış zamanı xəta baş verdi';
      });
  },
});

export default companySlice.reducer;
