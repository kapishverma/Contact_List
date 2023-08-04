import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: []
}

export const getInitialContactsList = createAsyncThunk("contactsList/getInitialContactsList", async (payload, thunkAPI) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        let contactsList = await response.json();
        contactsList = contactsList.map((contact) => ({
            name: contact.name,
            phone: contact.phone.split(" ")[0]
        }))
        return contactsList;
    } catch (error) {
        console.error("Error fetching contacts list:", error);
        throw error;
    }
}
);

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
        console.log(newContact);
        return newContact;

    } catch (error) {
        console.log("error: ", error);
    }

})

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
        console.log(updatedContact);
        return ({ updatedContact, index });

    } catch (error) {
        console.log("error: ", error);
    }

})


export const deleteContact = createAsyncThunk("contactsList/deleteContact", async (payload, thunkAPI) => {
    await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
    });
    return payload;
})

const contactsListSlice = createSlice({
    name: "contactsList",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getInitialContactsList.fulfilled, (state, action) => {
            state.list = [...action.payload];
        }).addCase(addNewContact.fulfilled, (state, action) => {
            state.list = [action.payload, ...state.list];
            console.log(state.list)
        }).addCase(deleteContact.fulfilled, (state, action) => {
            state.list = state.list.filter((contact, index) => index !== action.payload)
        }).addCase(updateContact.fulfilled, (state, action) => {
            state.list[action.payload.index] = action.payload.updatedContact;
        })
    },
});

export const contactListReducer = contactsListSlice.reducer;
export const contactsListAction = contactsListSlice.actions;

