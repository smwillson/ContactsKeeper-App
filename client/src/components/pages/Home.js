import React from "react";
import ContactForm from "../contacts/ContactForm";
import Contacts from "../contacts/Contacts";
import ContactFilter from "../contacts/ContactFilter";

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        {" "}
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
