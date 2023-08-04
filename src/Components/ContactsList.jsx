import React, { useEffect } from 'react'
import css from "./css/ContactsList.module.css"
import Contact from './Contact'
import { getInitialContactsList } from '../Redux/Reducers/contactsListReduces'
import { useDispatch, useSelector } from 'react-redux'
import { contactsListSelector } from '../Redux/Selectors'

export default function ContactsList() {

    const dispatch = useDispatch();
    const list = useSelector(contactsListSelector);


    useEffect(() => {
        dispatch(getInitialContactsList());
    }, []);

    return (
        <div className={css.container}>
            {list && list.map((contact, index) => <Contact key={index} contact={contact} index={index} />)}
        </div>
    )
}
