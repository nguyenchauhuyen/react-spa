import React, { useState, useEffect, useCallback } from 'react';
import { Panel } from 'primereact/panel';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { useFormik } from 'formik';
// import { useRegister } from '../User/hooks';
import styledComponents from 'styled-components';
import { useRepository } from './hooks';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // const { loaders, actions, data: userProfile } = useRegister();
  const { loaders: repoLoaders, shareLinkedInLoaders, actions: repoActions, data: repositories } = useRepository();

  // const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // !repositories.length && repoActions.getRepositories({ username: 'nguyenchauhuyen' });
  }, []);

  // const handleSearchRepos = useCallback(() => {
  //   searchText && repoActions.getRepositories({ username: searchText });
  // }, [searchText]);

  // const handleShareLinkedIn = useCallback(repoId => {
  //   repoActions.shareRepositoryToLinkedIn({ id: repoId });
  // }, []);

  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-fluid">
        <Panel header="Github Repositories">
          <div className="p-grid">
            {/* <div className="p-col-4">
              <div className="card">
                <div className="field">
                  <span className="p-float-label">
                    <InputText placeholder="Type your Github username" onChange={e => setSearchText(e.target.value)} />
                  </span>
                </div>
              </div>
            </div> */}
            {/* <div className="p-col-2">
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
            </div> */}
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
                  <Column
                    field="name"
                    header="Name"
                    sortable
                    filter
                    filterPlaceholder="Search by name"
                    style={{ width: '60%' }}
                    body={row => <Link to={`/account/${row.name}`}>{row.name}</Link>}
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

export default Dashboard;
