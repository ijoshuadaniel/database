import React, { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context';
import './index.scss';

const Login = () => {
  const { setLogin, login } = useContext(GlobalContext);

  const regxEmail =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const FORM_DATA = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({
    error: false,
    msg: '',
  });

  const changeData = (e, type) => {
    const copyFormData = { ...formData };
    if (type === 'email') {
      copyFormData.email = e.target.value;
    }
    if (type === 'password') {
      copyFormData.password = e.target.value;
    }
    setFormData(copyFormData);
  };

  const callError = (error, msg) => {
    setError({
      error,
      msg,
    });
    setTimeout(() => {
      setError({
        error: false,
        msg: null,
      });
    }, 3000);
  };

  const callApi = async (data) => {
    setIsLoading(false);
    const response = await axios.post('http://localhost/login', data);
    if (response.data.error) {
      return callError(response.data.error, response.data.msg);
    }
    if (response.data.success) {
      setLogin(response.data.data);
    }
  };

  const handleSubmit = () => {
    if (formData.email === '' || formData.password === '') {
      callError(true, 'Failed: Please check all the feilds');
      return false;
    }

    if (!regxEmail.test(formData.email)) {
      callError(true, 'Failed: Please enter a valid email');
      return false;
    }

    if (formData.password.length < 8) {
      callError(true, 'Failed: Enter a strong password above 8 characters.');
      return false;
    }
    callApi(formData);
  };

  return (
    <div className='login'>
      <div className='login-form'>
        <form>
          <h4>Login to IDatabase</h4>
          {error.error && <p className='login-error'>{error.msg}</p>}
          <input
            placeholder='Email'
            type='email'
            value={formData.email}
            onChange={(e) => changeData(e, 'email')}
          />
          <input
            placeholder='Password'
            type='password'
            value={formData.password}
            onChange={(e) => changeData(e, 'password')}
          />
          <input
            type='button'
            value={isLoading ? 'Loading...' : 'Login'}
            onClick={!isLoading ? handleSubmit : null}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
