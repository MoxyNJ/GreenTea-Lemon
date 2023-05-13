import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Istate {
  count: number;
  name: 'Ninjee' | 'Hou' | 'Moxy';
  message: string;
}

const initialState: Istate = {
  count: 100,
  name: 'Ninjee',
  message: 'Hello Redux'
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // changeMessageAction(state, action: PayloadAction<string>) {
    //   state.message = action.payload;
    // }
    changeMessageAction(state, { payload }: PayloadAction<string>) {
      state.message = payload;
    }
  }
});

export const { changeMessageAction } = counterSlice.actions;
export default counterSlice.reducer;
