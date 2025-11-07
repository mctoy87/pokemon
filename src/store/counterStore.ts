import { create } from "zustand";

//store interface
interface CounterState {
  count: number;

  //actions
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// create a store
export const useCounterStore = create<CounterState>((set) => ({
  //initial state
  count: 0,

  //increment for count
  increment: () => set((state) => ({ count: state.count + 1 })),

  //decrement for count
  decrement: () => set((state) => ({ count: state.count - 1 })),

  //reset for count
  reset: () => set({ count: 0 }),
}));


