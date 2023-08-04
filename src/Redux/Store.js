import { configureStore } from "@reduxjs/toolkit";
import { contactListReducer } from "./Reducers/contactsListReduces";
import { selectedContactReducer } from "./Reducers/contactPageReducer";

const store = configureStore({
    reducer: {
        contactsList: contactListReducer,
        selectedContact: selectedContactReducer
    }
})

export default store;