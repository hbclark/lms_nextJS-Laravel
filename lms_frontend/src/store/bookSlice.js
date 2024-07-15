export const createBookSlice = (set) => ({
  books: [],
  findBooks: (books) => set({ books }),
});
