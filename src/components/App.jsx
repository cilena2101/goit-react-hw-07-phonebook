import { useState, useEffect} from "react";

import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { nanoid } from "nanoid";

export const App = () => {
  const [contacts, setContacts ] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);

const formSubmit = ( name, number ) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

const addContact = contacts.some(
      el => (el.name === contact.name.toLowerCase() && el.number === contact.number) ??
      el.number === contact.number
    );

    addContact
      ? alert(`${name} or ${number} is already in contacts`)
      : setContacts([contact, ...contacts])  
        };

  const changeFilterInput = (event) => {
    setFilter(event.target.value );
  };

 const findContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
   setFilter('');  
  };

  return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} changeFilterInput={changeFilterInput} />
        <ContactList
          contacts={findContacts()}
          deleteContact={deleteContact}
        />
      </section>
    );
  };