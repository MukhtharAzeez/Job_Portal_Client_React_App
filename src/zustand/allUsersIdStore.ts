import { create } from "zustand";

interface State {
  id: string | null;
  setId: any;
}

export const allUsersIdStore = create<State>((set:any) => ({
  id: null,
  setId: (id: string) => set(() => ({ id })),
}));
