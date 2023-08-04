import { useState } from "react";
import css from "./css/Contact.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../Redux/Reducers/contactsListReduces";
import { selectedContactAction } from "../Redux/Reducers/contactPageReducer";
import { selectedContactSelector } from "../Redux/Selectors";

export default function Contact(props) {
    // Destructure props to get the contact and index
    const { contact, index } = props;
    
    // State to manage the active state of edit mode
    const [active, setActive] = useState(false);
    
    // Get the selected contact from Redux state
    const selectedContact = useSelector(selectedContactSelector);
    
    // Redux dispatch function
    const dispatch = useDispatch();
    
    // Handle delete action
    const handleDelete = (index) => {
        dispatch(deleteContact(index));
        setActive(!active);
    };
    
    // Handle update action
    const handleUpdate = (e) => {
        e.stopPropagation(); // Prevent click from bubbling to the parent div's onClick
        dispatch(selectedContactAction.startUpdatingContact({ contact, index }));
    };

    return (
        <div
            onClick={() => dispatch(selectedContactAction.select(contact))} // Select the contact when clicked
            className={css.container}
            // Apply styles if the clicked contact matches the selected contact
            style={selectedContact === contact ? { transform: "scaleX(1.01)", boxShadow: "0 0 10px 4px black" } : null}
        >
            <div className={css.contactInfo}>
                <div className={css.logo}>{contact.name.charAt(0)}</div>
                <h2>{contact.name}</h2>
            </div>
            <div
                className={css.edit}
                style={{ width: active ? "100px" : "28px", transition: "width 0.1s linear", overflowX: "clip" }}
            >
                {active ? (
                    <div className={css.active}>
                        <div onClick={(e) => handleUpdate(e)}><i className="bi bi-pencil-square"></i></div>
                        <div onClick={() => handleDelete(index)}><i className="bi bi-trash"></i></div>
                        <div onClick={() => setActive(!active)}>
                            <i style={{ color: "red" }} className="bi bi-x-lg"></i>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => setActive(!active)}>
                        <i style={{ color: "yellow" }} className="bi bi-list"></i>
                    </div>
                )}
            </div>
        </div>
    );
}
