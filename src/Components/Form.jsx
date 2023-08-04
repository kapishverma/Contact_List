import React, { useEffect, useState } from 'react';
import css from './css/CallPage.module.css';
import { addNewContact, updateContact } from '../Redux/Reducers/contactsListReduces';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
    // Local state to manage form inputs
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // Access selected contact from the Redux store
    const selectedContact = useSelector((state) => state.selectedContact);

    // Redux dispatch function
    const dispatch = useDispatch();

    // Update form inputs when selected contact changes
    useEffect(() => {
        if (selectedContact && selectedContact.index != null) {
            const { name, phone } = selectedContact.contact;
            setName(name);
            setPhone(phone);
        } else {
            setName("");
            setPhone("");
        }
    }, [selectedContact.index]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Dispatch updateContact or addNewContact based on selected contact
        if (selectedContact.index != null) {
            dispatch(updateContact({ name, phone, index: selectedContact.index }));
        } else {
            dispatch(addNewContact({ name, phone }));
        }
        // Clear form inputs after submission
        setName("");
        setPhone("");
    };

    return (
        <div className={css.addUpdate}>
            <form onSubmit={handleSubmit}>
                {/* Input fields for name and phone */}
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                {/* Submit button with appropriate label based on the action */}
                <button type="submit">
                    {selectedContact.index != null
                        ? <><i className="bi bi-pencil"></i> Update</>
                        : <><i className="bi bi-person-fill-add"></i> Add</>}
                </button>
                {/* Other potential UI elements */}
                {/* <i className="bi bi-person-fill-gear"></i> */}
            </form>
        </div>
    );
}
