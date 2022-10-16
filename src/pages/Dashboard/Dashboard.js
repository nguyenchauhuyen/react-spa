import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { useRepository } from './hooks';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { loaders, actions: repoActions, data: repositories } = useRepository();

  const [params, setParams] = useState({
    searchTerm: '',
    pageIndex: 1,
    pageSize: 10,
    sortBy: 'transactionDate',
    sortDirection: 'asc',
  });

  useEffect(() => {
    repoActions.getRepositories(params);
  }, [params]);

  const handleSearch = searchTerm => {
    setParams({ ...params, searchTerm });
  };

  return (
    <div className="p-grid p-fluid dashboard">
      <div className="p-col-12 p-fluid">
        <Panel header="Bank Transactions">
          <div className="p-grid">
            <div className="p-col-4">
              <div className="card">
                <div className="field">
                  <span className="p-float-label">
                    <InputText placeholder="Type your transaction name" onChange={e => handleSearch(e.target.value)} />
                  </span>
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
                  page={2}
                  emptyMessage="No repository found"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                  // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  rowsPerPageOptions={[10, 25, 50]}
                >
                  <Column
                    field="description"
                    header="Transaction"
                    sortable
                    filter
                    filterPlaceholder="Search by name"
                    style={{ width: '60%' }}
                    body={row => <Link to={`/account/${row.id}`}>{row.description}</Link>}
                  ></Column>
                  <Column
                    field="transactionDate"
                    header="Transaction Date"
                    sortable
                    filter
                    dataType="date"
                    style={{ width: '60%' }}
                    body={row => <>{row.transactionDate}</>}
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
