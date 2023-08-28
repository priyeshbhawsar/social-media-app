import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { defaultLoginData, validationMessage } from '../../constant';

import './signin.css'

const Signin = () => {
  const [formData, setFormData] = useState(defaultLoginData);

  const [errors, setErrors] = useState(defaultLoginData);

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      email: !validateEmail(formData.email) ? validationMessage.email : '',
      password: formData.password.trim() === '' ? validationMessage.password : ''
    };

    setErrors(newErrors);

    if (formData.email && formData.password) {
      localStorage.setItem('userDetails', JSON.stringify(formData));
      setFormData({
        email: '',
        password: ''
      });
      navigate('/dashboard');
    }
  };

  return (
    <div>
      <h1>Welcome to Sing in</h1>
      <div className="user-form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="email">Email*:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password*:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signin