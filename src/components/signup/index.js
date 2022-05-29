import axios from 'axios';
import React, { useState } from 'react';
import '../login/index.scss';

const SignUp = () => {
  const regxEmail =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const FORM_DATA = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(FORM_DATA);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({
    error: false,
    msg: '',
  });

  const changeData = (e, type) => {
    const copyFormData = { ...formData };
    if (type === 'name') {
      copyFormData.name = e.target.value;
    }
    if (type === 'email') {
      copyFormData.email = e.target.value;
    }
    if (type === 'password') {
      copyFormData.password = e.target.value;
    }
    if (type === 'confirmPassword') {
      copyFormData.confirmPassword = e.target.value;
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
    const response = await axios.post('http://localhost/signup', data);
    setIsLoading(false);
    if (response.data.error) {
      callError(response.data.error, response.data.msg);
      return false;
    }
  };

  const handleSubmit = () => {
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.password === '' ||
      formData.confirmPassword === ''
    ) {
      callError(true, 'Failed: Please check all the feilds');
      return false;
    }

    if (!regxEmail.test(formData.email)) {
      callError(true, 'Failed: Please enter a valid email');
      return false;
    }

    if (formData.password.length < 8 || formData.confirmPassword.length < 8) {
      callError(true, 'Failed: Enter a strong password above 8 characters.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      callError(true, 'Failed: Password does not match');
      return false;
    }

    // setIsLoading(true);
    callApi(formData);
  };

  return (
    <div className='login'>
      <div className='login-form'>
        <form>
          <h4>SignUp to IDatabase</h4>
          <p>Get started to store your data in a smart and safe way</p>
          {error.error && <p className='login-error'>{error.msg}</p>}
          <input
            onChange={(e) => changeData(e, 'name')}
            value={formData.name}
            placeholder='Name'
            type='text'
          />
          <input
            onChange={(e) => changeData(e, 'email')}
            value={formData.email}
            placeholder='Email'
            type='email'
          />
          <input
            onChange={(e) => changeData(e, 'password')}
            value={formData.password}
            placeholder='Password'
            type='password'
          />
          <input
            onChange={(e) => changeData(e, 'confirmPassword')}
            value={formData.confirmPassword}
            placeholder='Confirm Password'
            type='password'
          />
          <input
            type='button'
            value={isLoading ? 'Loading...' : 'Sign Up'}
            onClick={!isLoading ? handleSubmit : null}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
