import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactContext";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        type: "Personal",
        id: "5e9fb39fda1cde56b4d8985d",
        name: "Sir Boo Fluffington",
        email: "boo@gmail.com",
        phone: "123-400-7870",
      },
      {
        type: "professional",
        id: "5e9fb345da1cde56b4d8985c",
        name: "Nacho Tacocat",
        email: "nacho@gmail.com",
        phone: "123-456-7870",
      },

      {
        type: "professional",
        id: "5e9fb345da1cde56b4d8966c",
        name: "Purrbles",
        email: "pshiela@gmail.com",
        phone: "123-456-7870",
      },
    ],
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // add contact

  //delete contact

  //set current contact

  //clear current contact

  //update contact

  //filer contacts

  //clear filters

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
