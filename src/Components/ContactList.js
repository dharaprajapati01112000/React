import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the list of contacts from the JSON Server API when the component mounts
    async function fetchContacts() {
      try {
        const response = await axios.get('http://localhost:5000/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }

    fetchContacts();
  }, []);

  const handleDeleteContact = async (contactId) => {
    try {
      // Make a DELETE request to remove the contact by ID
      await axios.delete(`http://localhost:5000/contacts/${contactId}`);

      // Update the state to reflect the removed contact
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Contact List</h1>
      <div className="mb-4 w-1/2 ml-auto ">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <ul className="space-y-4 w-1/2 mx-auto">
        {contacts
          .filter((contact) =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((contact) => (
          <li
            key={contact.id}
            className="bg-white p-4 shadow-md rounded-lg border border-gray-300 flex justify-between items-center"
          >
            <div>
              <strong className="text-blue-500">Name:</strong> {contact.name} <br />
              <strong className="text-blue-500">Email:</strong> {contact.email}
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/edit-contact/${contact.id}`}
                className="bg-teal-700 text-white px-7 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteContact(contact.id)} // Call handleDeleteContact on button click
                className="bg-teal-700 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
