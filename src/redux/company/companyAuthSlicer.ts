import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CompanyDetails {
  companyName: string | null;
  email: string | null;
  companyId: string | null;
  companyToken: string | null;
  image: string | null;
}

const initialState: CompanyDetails = {
  companyName: null,
  email: null,
  companyId: null,
  companyToken: null,
  image: '',
};

const companyAuthSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompanyDetails(state, actions) {
      const newItem = actions.payload;
      state.companyName = newItem.result.company;
      state.companyId = newItem.result._id;
      state.email = newItem.result.email;
      state.image = newItem.result.image
      state.companyToken = newItem.accessToken.access_token;
    },
  },
});

export const { addCompanyDetails } = companyAuthSlice.actions;
export const currentCompany = (state: RootState) => state.company
export default companyAuthSlice;


