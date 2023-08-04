import { useEffect, useState } from "react";
import css from "./css/Contact.module.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../Redux/Reducers/contactsListReduces";
import { selectedContactAction } from "../Redux/Reducers/contactPageReducer";
import { selectedContactSelector } from "../Redux/Selectors";

export default function Contact(props) {

    const { contact, index } = props;
    const [active, setActive] = useState(false)

    const dispatch = useDispatch()
    const selectedContact = useSelector(selectedContactSelector);

    const handleDelete = (index) => {
        dispatch(deleteContact(index));
        setActive(!active)
    }
    const handleUpdate = (e) => {
        e.stopPropagation();
        dispatch(selectedContactAction.startUpdatingContact({ contact, index }))
    }

    return (
        <div onClick={() => dispatch(selectedContactAction.select(contact))} className={css.container}
            style={selectedContact === contact ? { transform: "scaleX(1.01)", boxShadow: "0 0 10px 4px black" } : null}
        >
            <div className={css.contactInfo}>
                <div className={css.logo}>{contact.name.charAt(0)}</div>
                <h2>{contact.name}</h2>
            </div>
            <div className={css.edit}
                style={{ width: active ? "100px" : "28px", transition: "width 0.1s linear", overflowX: "clip" }}
            >
                {active
                    ? <div className={css.active}>
                        <div onClick={(e) => handleUpdate(e)} ><i className="bi bi-pencil-square"></i></div>
                        <div onClick={() => handleDelete(index)} ><i className="bi bi-trash"></i></div>
                        <div onClick={() => setActive(!active)}>
                            <i style={{ "color": "red" }} className="bi bi-x-lg"></i>
                        </div>
                    </div>
                    : <div onClick={() => setActive(!active)}>
                        <i style={{ "color": "yellow" }} className="bi bi-list"></i>
                    </div>}
            </div>
        </div >
    )
}