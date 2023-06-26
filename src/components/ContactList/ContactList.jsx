import './ContactList.module.css';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/filterSlice';
import {
  useFetchContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsSlice';
import { Loader } from 'components/Loader/Loader';

export const ContactList = () => {
  const filter = useSelector(getFilter);
  const { data: contacts, isFetching } = useFetchContactsQuery();
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const findContacts = () => {
     if (contacts) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };

  const filteredContacts = findContacts();

  return (
    <div className='listContacts'>
      {isFetching && <Loader/>}
      {contacts && (
        <ul >
          {filteredContacts.map(({ id, name, phone }) => {
            return (
              <li key={id}>
                <div className='contact-item'>
                  <h3>{name}:</h3>
                  <p>{phone}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    deleteContact(id);
                  }}
                >
                  {isLoading ? '...' : 'Delete'}
                </button>            
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};