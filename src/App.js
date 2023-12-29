// src/App.js
import React from 'react';
import './App.css';
import Stock from './Stock';
import { StockProvider } from './StockContext'; // Make sure the path is correct


function App() {
  return (
    <StockProvider>
      <div className="App">
        <Stock />
      </div>
    </StockProvider>
  );
}

export default App;
