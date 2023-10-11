//deletecontact.js

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteContact = () => {
  const { id } = useParams();
  const history = useNavigate();

  const handleDelete = async () => {
    try {
      // Make a DELETE request to remove the contact
      await axios.delete(`http://localhost:3000/contacts/${id}`);
      history('/contact-list'); // Redirect to the contact list page after deletion
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  useEffect(() => {
    // Optionally, you can show a confirmation dialog before calling handleDelete
    // This can be done using a modal or a confirmation prompt
    // For simplicity, we're directly calling handleDelete in this example
    handleDelete();
  }, [id, history]);

  return (
    <div>
      <h1>Deleting Contact</h1>
      {/* You can show a loading spinner or message here while deleting */}
    </div>
  );
};

export default DeleteContact;
