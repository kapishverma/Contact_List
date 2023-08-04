import { createSlice } from "@reduxjs/toolkit";
import { addNewContact, getInitialContactsList, updateContact } from "./contactsListReduces";

const contactPageSlice = createSlice({
    name: "selectedContact",
    initialState: {
        contact: null,
        index: null
    },
    reducers: {
        select: (state, action) => {
            state.contact = action.payload;
            state.index = null;
        },
        startUpdatingContact: (state, action) => {
            const { contact, index } = action.payload;
            state.index = (state.index === index ? null : index);
            state.contact = contact;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInitialContactsList.fulfilled, (state, action) => {
            state.contact = action.payload[0];
        }).addCase(addNewContact.fulfilled, (state, action) => {
            state.contact = action.payload;
        }).addCase(updateContact.fulfilled, (state, action) => {
            state.contact = action.payload.updatedContact;
        })
    }
});

export const selectedContactReducer = contactPageSlice.reducer;
export const selectedContactAction = contactPageSlice.actions;