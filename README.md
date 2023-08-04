> # [Contact List](https://react-contact-list-using-redux.onrender.com/ "Want to try? Hit this link")
![](media/1.png)

**Welcome to the Contact List App, a sophisticated application built using React.js and Redux Toolkit. This powerful combination allows you to effortlessly perform CRUD operations on your contacts, offering an intuitive way to manage your contact list effectively.**

>## Key Features
* **Create:** Generate new contacts with ease and seamlessly integrate them into your list.
* **Read:** Access a comprehensive overview of contacts stored in our simulated database.
* **Update:** Effortlessly modify existing contact details to keep your list accurate.
* **Delete:** Remove unnecessary contacts from your list, maintaining its relevance.

>## Getting Started
When the page loads, the dispatch(getInitialContactsList()) function is automatically triggered, fetching and displaying the initial contacts.

  ---

>## Contact List

On the left side of the page, you'll find an organized list of all your contacts. This interface empowers you to manage your contacts effortlessly by deleting them or initiating edits.

---
>## Contact Page
The right side of the page features an intuitive form designed to facilitate two core actions:

* **Add New Contact:** Input a contact's name and phone number seamlessly, creating a new entry in your list.

* **Update Contact:** Easily edit the details of existing contacts using the same form.

A sample UI element on this page provides a visual representation, displaying the contact's name and phone number.

---

>## Framework and Technology
This Contact List App is meticulously crafted using React.js, a widely adopted JavaScript library for building user interfaces. The state management is powered by Redux Toolkit, ensuring efficient data handling and seamless updates.

---

>## Folder Structure
* **node_modules**
* **public**
  * **index.html**
* **src**
   * **Components**
      * **css**
         * **CallPage.module.css**
         * **Contact.module.css**
         * **ContactsList.module.css**
      * **callPage.jsx**
      * **Contact.jsx**
      * **ContactsList.jsx**
      * **Form.jsx**
   * **image**
      * **...**
   * **Redux**
      * **Reducers**
         * **contactPageReducer.js**
         * **ContactsListReducers**
      * **Selectors.js**
      * **Store.js**
   * **App.js**
   * **index.css**
   * **index.js**
* **package.json**
