import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import styled from 'styled-components';

const LoginForm = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {}, []);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      date: null,
      country: null,
      accept: false,
    },
    validate: data => {
      let errors = {};

      if (!data.name) {
        errors.name = 'Name is required.';
      }

      if (!data.email) {
        errors.email = 'Email is required.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Invalid email address. E.g. example@email.com';
      }

      if (!data.password) {
        errors.password = 'Password is required.';
      }

      if (!data.accept) {
        errors.accept = 'You need to agree to the terms and conditions.';
      }

      return errors;
    },
    onSubmit: data => {
      setFormData(data);
      setShowMessage(true);

      formik.resetForm();
    },
  });

  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <FormWrapper>
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '30vw' }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without
            activation. Please check <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Login</h5>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({ 'p-invalid': isFormFieldValid('email') })}
                />
                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>
                  Email*
                </label>
              </span>
              {getFormErrorMessage('email')}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Password
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  toggleMask={false}
                  className={classNames({ 'p-invalid': isFormFieldValid('password') })}
                  header={passwordHeader}
                  footer={passwordFooter}
                />
                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>
                  Password*
                </label>
              </span>
              {getFormErrorMessage('password')}
            </div>

            <Button type="submit" label="Login" className="mt-2" />
          </form>
        </div>
      </div>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  .card {
    min-width: 450px;
  }
  .card form {
    margin-top: 2rem;
  }
  .card .field {
    margin-bottom: 1.5rem;
  }
  @media screen and (max-width: 960px) {
    .card {
      width: 80%;
    }
  }
  @media screen and (max-width: 640px) {
    .card {
      width: 100%;
      min-width: 0;
    }
  }
`;

export default LoginForm;
