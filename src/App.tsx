import React from 'react';
import SearchSection from './pages/SearchSection';
import './style.css';
import { SearchProvider } from './context/searchContext';

function App() {
  return (
    <div className='App'>
      <SearchProvider>
        <SearchSection />
      </SearchProvider>
    </div>
  );
}

export default App;
