
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditContact = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [contact, setContact] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch the contact details based on the ID from the JSON Server API
    async function fetchContact() {
      try {
        const response = await axios.get(`http://localhost:5000/contacts/${id}`);
        setContact(response.data);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    }

    fetchContact();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update the contact details
      await axios.put(`http://localhost:5000/contacts/${id}`, contact);
      history('/contact-list'); // Redirect to the contact list page after updating
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 w-1/2">
      <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contact.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-teal-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
