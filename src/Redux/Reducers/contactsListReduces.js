import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: []
}

// Async thunk to fetch initial contacts list
export const getInitialContactsList = createAsyncThunk("contactsList/getInitialContactsList", async (payload, thunkAPI) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        let contactsList = await response.json();
        // Map contacts data to required format
        contactsList = contactsList.map((contact) => ({
            name: contact.name,
            phone: contact.phone.split(" ")[0]
        }))
        return contactsList;
    } catch (error) {
        console.error("Error fetching contacts list:", error);
        throw error;
    }
});

// Async thunk to add a new contact
export const addNewContact = createAsyncThunk("contactsList/addNewContact", async (payload, thunkAPI) => {
    const { name, phone } = payload;
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
            method: 'PATCH',
            body: JSON.stringify({
                name,
                phone
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const newContact = await response.json();
        return newContact;
    } catch (error) {
        console.log("error: ", error);
    }
})

// Async thunk to update an existing contact
export const updateContact = createAsyncThunk("contactsList/updateContact", async (payload, thunkAPI) => {
    const { name, phone, index } = payload;
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify({
                name,
                phone,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const updatedContact = await response.json();
        return ({ updatedContact, index });
    } catch (error) {
        console.log("error: ", error);
    }
})

// Async thunk to delete a contact
export const deleteContact = createAsyncThunk("contactsList/deleteContact", async (payload, thunkAPI) => {
    await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
    });
    const index = (payload === 0 ? 1 : payload - 1)
    const tempContact = thunkAPI.getState().contactsList.list[index];
    return { deleteIndex: payload, tempContact };
})

// Create a slice for the contacts list
const contactsListSlice = createSlice({
    name: "contactsList",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Update state when fetching initial contacts list
        builder.addCase(getInitialContactsList.fulfilled, (state, action) => {
            state.list = [...action.payload];
        })
        // Update state when adding a new contact
        .addCase(addNewContact.fulfilled, (state, action) => {
            state.list = [action.payload, ...state.list];
        })
        // Update state when deleting a contact
        .addCase(deleteContact.fulfilled, (state, action) => {
            state.list = state.list.filter((contact, index) => index !== action.payload.deleteIndex);
        })
        // Update state when updating a contact
        .addCase(updateContact.fulfilled, (state, action) => {
            state.list[action.payload.index] = action.payload.updatedContact;
        })
    },
});

// Export reducer and actions
export const contactListReducer = contactsListSlice.reducer;
export const contactsListAction = contactsListSlice.actions;
