import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import Header from '../header';
import Login from '../login';
import SignUp from '../signup';
import Dashboard from '../Dashboard';

const Routes = ({ signApp, setSignApp }) => {
  const { login, setLogin } = useContext(GlobalContext);

  return (
    <div className='route'>
      {!login ? (
        <div>
          <Header
            showsignup
            setSignApp={setSignApp}
            buttonText={signApp ? 'Sign Up' : 'Login'}
          />
          {signApp && <Login />}
          {!signApp && <SignUp />}
        </div>
      ) : (
        <div>
          <Header
            showsignup
            setSignApp={() => setLogin(null)}
            buttonText='Logout'
          />
          <div className='route-body'>
            <Dashboard />
          </div>
        </div>
      )}
    </div>
  );
};

export default Routes;
