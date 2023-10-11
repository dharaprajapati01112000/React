//app.js code
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ContactList from './Components/ContactList';
import AddContact from './Components/AddContact';
import EditContact from './Components/EditContact';
import DeleteContact from './Components/DeleteContact';

const App = () => {

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <nav className="bg-teal-700 p-4">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/contact-list"
                className="text-white hover:underline"
              >
                Contact List
              </Link>
            </li>
            <li>
              <Link
                to="/add-contact"
                className="text-white hover:underline"
              >
                Add Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* <Switch> */}
        <Routes>
          <Route path="/contact-list" element={<ContactList />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/edit-contact/:id" element={<EditContact />} />
          <Route path="/delete-contact/:id" element={<DeleteContact />} />
        {/* </Switch> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
