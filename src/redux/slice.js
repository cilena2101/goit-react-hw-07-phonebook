import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactsPhonebook: [],
    filter: '',
  },

  reducers: {
    addContact(state, action) {
      state.contactsPhonebook.unshift(action.payload);
    },
    deleteContact(state, action) {
      state.contactsPhonebook = state.contactsPhonebook.filter(
        contact => contact.id !== action.payload
      );
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: 'root',
  storage
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
export const getContacts = state => state.contacts.contactsPhonebook;
export const getFilter = state => state.contacts.filter;