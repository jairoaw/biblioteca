import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Navbar'
import Books from './Books'
import BookCreate from './BookCreate'
import BookUpdate from './BookUpdate'
import BookInfo from "./BookInfo";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Books/>} />
          <Route path='/create' element={<BookCreate/>} />
          <Route path='/update/:id' element={<BookUpdate/>} />
          <Route path='/info/:id' element={<BookInfo/>} />
          
        </Routes>
      </div>
    </Router>
  );
}