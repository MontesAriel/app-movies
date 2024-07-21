import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface FilterSearch {
   filterSearch: string | null
}
export interface FilterPopular {
    filterPopular: boolean
}
export interface FilterCartelera {
    filterCartelera: boolean
}
export interface FilterValoradas {
    filterValoradas: boolean
}

interface FilterState {
    filterSearch: string | null
    filterPopular: boolean
    filterCartelera: boolean
    filterValoradas: boolean
}

const initialState: FilterState = {
    filterSearch: null,
    filterPopular: false,
    filterCartelera: false,
    filterValoradas: false
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterSearch: (state, action: PayloadAction<string | null>) => {
            state.filterSearch = action.payload;
        },
        setFilterPopular: (state, action: PayloadAction<boolean>) => {
            state.filterPopular = action.payload;
        },
        setFilterCartelera: (state, action: PayloadAction<boolean>) => {
            state.filterCartelera = action.payload;
        },
        setFilterValoradas: (state, action: PayloadAction<boolean>) => {
            state.filterValoradas = action.payload;
        },
    }
})

export const { setFilterSearch, setFilterPopular, setFilterCartelera, setFilterValoradas } = filterSlice.actions;

export const selectFilterSearch = (state: RootState) => state.filter.filterSearch;
export const selectFilterPopular = (state: RootState) => state.filter.filterPopular;
export const selectFilterCartelera = (state: RootState) => state.filter.filterCartelera;
export const selectFilterValoradas = (state: RootState) => state.filter.filterValoradas;

export default filterSlice.reducer;
