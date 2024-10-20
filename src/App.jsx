import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import AddProperty from './pages/AddProperty';
import PropertyListing from './pages/PropertyListing';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Container style={{ paddingTop: '20px' }}>
        <Routes>
          <Route path="/" element={<PropertyListing />} />
          <Route path="/add-property" element={<AddProperty />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
