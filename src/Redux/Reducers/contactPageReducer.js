import { createSlice } from "@reduxjs/toolkit";
import { addNewContact, deleteContact, getInitialContactsList, updateContact } from "./contactsListReduces";

const contactPageSlice = createSlice({
    name: "selectedContact",
    initialState: {
        contact: null, // The currently selected contact
        index: null    // The index of the contact being updated
    },
    reducers: {
        // Action to select a contact
        select: (state, action) => {
            state.contact = action.payload; // Set the selected contact
            state.index = null; // Clear the index when selecting a contact
        },
        // Action to start updating a contact
        startUpdatingContact: (state, action) => {
            const { contact, index } = action.payload;
            console.log(typeof index)
            state.index = (state.index == index ? null : index); // Toggle index
            state.contact = contact; // Set the contact being updated
        }
    },
    extraReducers: (builder) => {
        // Update selected contact when fetching initial contacts list
        builder.addCase(getInitialContactsList.fulfilled, (state, action) => {
            state.contact = action.payload[0]; // Set the first contact as selected
        })
            // Update selected contact when adding a new contact
            .addCase(addNewContact.fulfilled, (state, action) => {
                state.contact = action.payload; // Set the newly added contact as selected
            })
            // Update selected contact when updating a contact
            .addCase(updateContact.fulfilled, (state, action) => {
                state.contact = action.payload.updatedContact; // Set the updated contact as selected
            })
            // Update selected contact when deleting a contact
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contact = action.payload.tempContact; // Set temporary contact after deletion
            });
    }
});

export const selectedContactReducer = contactPageSlice.reducer;
export const selectedContactAction = contactPageSlice.actions;
