import React, { useState } from 'react';
import Header from './components/header';
import GlobalProvider from './context';
import Routes from './components/Routes';

const App = () => {
  const [signApp, setSignApp] = useState(true);

  return (
    <GlobalProvider>
      <div>
        <Routes signApp={signApp} setSignApp={setSignApp} />
      </div>
    </GlobalProvider>
  );
};

export default App;
