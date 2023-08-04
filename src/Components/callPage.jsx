import React from 'react';
import css from './css/CallPage.module.css';

import userImg from "../image/user.png";
import callImg from "../image/call.png";
import messImg from "../image/chat.png";

import Form from './Form';
import { useSelector } from 'react-redux';
import { selectedContactSelector } from '../Redux/Selectors';

export default function CallPage() {
    // Retrieve the selected contact from the Redux store
    const contact = useSelector(selectedContactSelector);

    // Check if contact is null or undefined before accessing its properties
    const contactName = contact ? contact.name : "Name";
    const contactPhone = contact ? contact.phone : "xxxxxxxxxxxxxx";

    return (
        <div className={css.container}>
            {/* Render the Form component */}
            <Form />
            <div className={css.contactDetail}>
                <img src={userImg} alt="User" />
                <div className={css.userInfo}>
                    {/* Display the contact name */}
                    <h1>{contactName}</h1>
                    {/* Display the contact phone number */}
                    <h2>{contactPhone}</h2>
                </div>
                <div className={css.callAndMessage}>
                    <img src={messImg} alt="Chat" />
                    <img src={callImg} alt="Call" />
                </div>
            </div>
        </div>
    );
}
