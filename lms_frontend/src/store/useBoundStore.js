import { create } from "zustand";
import { createBookSlice } from "./bookSlice";
import { createUserSlice } from "./userSlice";

export const useBoundStore = create((set) => ({
  ...createBookSlice(set),
  ...createUserSlice(set),
}));
