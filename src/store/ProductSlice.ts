import { createSlice } from '@reduxjs/toolkit';

interface Product {
  id: string | number;
  name: string;
  weight:number,
  price: number;
  category?: { name: string };
  subCategory?: { name: string };
  images?: { url: string }[];
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteProduct:(state,action)=>{
      state.products = state.products.filter((product) => product.id !== action.payload)
    },
    editProduct:(state,action)=>{
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getProducts, setLoading, setError,deleteProduct,editProduct } = productSlice.actions;
export default productSlice.reducer;
