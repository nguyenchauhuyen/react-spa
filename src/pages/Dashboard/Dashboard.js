import React, { useState, useEffect, useCallback } from 'react';
import { Panel } from 'primereact/panel';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
import { useRegister } from '../Register/hooks';
import styledComponents from 'styled-components';
import { useRepository } from './hooks';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Dashboard = () => {
  const { loaders, actions, data: userProfile } = useRegister();
  const { loaders: repoLoaders, shareLinkedInLoaders, actions: repoActions, data: repositories } = useRepository();

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    !repositories.length && repoActions.getRepositories({ username: 'nguyenchauhuyen' });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: userProfile.name,
      email: userProfile.email,
      date: new Date(userProfile.date),
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

      return errors;
    },
    onSubmit: data => {
      actions.registerAccount(data);
    },
  });

  const isFormFieldValid = name => !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = name => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  const handleSearchRepos = useCallback(() => {
    searchText && repoActions.getRepositories({ username: searchText });
  }, [searchText]);

  const handleShareLinkedIn = useCallback(repoId => {
    repoActions.shareRepositoryToLinkedIn({ id: repoId });
  }, []);

  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-fluid">
        <Panel header="Your Profile">
          <div className="p-grid">
            <div className="p-col-4">
              <FormWrapper className="flex justify-content-center">
                <div className="card">
                  <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          autoFocus
                          className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                        />
                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>
                          Name*
                        </label>
                      </span>
                      {getFormErrorMessage('name')}
                    </div>
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
                        <Calendar
                          id="date"
                          name="date"
                          value={formik.values.date}
                          onChange={formik.handleChange}
                          dateFormat="dd/mm/yy"
                          mask="99/99/9999"
                          showIcon
                        />
                        <label htmlFor="date">Birthday</label>
                      </span>
                    </div>

                    <Button type="submit" label="Update" className="mt-2" loading={loaders.isLoading} />
                  </form>
                </div>
              </FormWrapper>
            </div>
          </div>
        </Panel>
      </div>
      <div className="p-col-12 p-fluid">
        <Panel header="Github Repositories">
          <div className="p-grid">
            <div className="p-col-4">
              <div className="card">
                <div className="field">
                  <span className="p-float-label">
                    <InputText placeholder="Type your Github username" onChange={e => setSearchText(e.target.value)} />
                  </span>
                </div>
              </div>
            </div>
            <div className="p-col-2">
              <div className="card">
                <div className="field">
                  <Button
                    type="button"
                    label="Load Repos"
                    className="mt-2"
                    loading={repoLoaders.isLoading}
                    onClick={handleSearchRepos}
                  />
                </div>
              </div>
            </div>
            <div className="p-col-12">
              <div className="card">
                <DataTable
                  value={repositories}
                  rowHover
                  paginator
                  rows={10}
                  emptyMessage="No repository found"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  rowsPerPageOptions={[10, 25, 50]}
                >
                  <Column field="id" header="ID" style={{ width: '150px' }}></Column>
                  <Column
                    field="name"
                    header="Name"
                    sortable
                    filter
                    filterPlaceholder="Search by name"
                    style={{ width: '60%' }}
                  ></Column>
                  <Column
                    body={row => (
                      <Button
                        icon="pi pi-linkedin"
                        iconPos="left"
                        label={`Share LinkedIn ${row.counter ? '+' + row.counter : ''}`}
                        className="p-button-info"
                        loading={shareLinkedInLoaders.isLoading && shareLinkedInLoaders.request.id === row.id}
                        disabled={shareLinkedInLoaders.isLoading}
                        onClick={() => {
                          handleShareLinkedIn(row.id);
                        }}
                      />
                    )}
                    style={{ width: '150px' }}
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

const FormWrapper = styledComponents.div`
  .card {
    min-width: 450px;
  }
  .card form {
    margin-top: 2rem;
  }
  .card .field {
    margin-bottom: 1.5rem;
  }
  .mt-2 {
    margin-top: 8px;
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

export default Dashboard;
