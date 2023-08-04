import React, { useEffect, useState } from 'react'
import css from './css/CallPage.module.css';
import { addNewContact, updateContact } from '../Redux/Reducers/contactsListReduces';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const selectedContact = useSelector((state) => state.selectedContact);

    const dispatch = useDispatch();

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


    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedContact.index != null) {
            dispatch(updateContact({ name, phone, index: selectedContact.index }))
        } else {
            dispatch(addNewContact({ name, phone }))
        }
        setName("");
        setPhone("");
    };

    return (
        <div className={css.addUpdate}>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="tel" placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <button type="submit"> {selectedContact.index != null
                    ? <><i className="bi bi-pencil"></i> Update</>
                    : <><i className="bi bi-person-fill-add"></i> Add</>}
                </button>
                {/* <i class="bi bi-person-fill-gear"></i> */}
            </form>
        </div >
    )
}
