import React, { Component } from 'react';
// import ProductList from './../../components/ProductList/ProductList';
import './ProductListPage.scss';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { ProgressBar } from 'primereact/progressbar';
import { ContextMenu } from 'primereact/contextmenu';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchProductsRequest, actDeleteProductRequest } from '../../actions/productActions';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: null,
      selectedCustomers: null,
      globalFilter: null,
      selectedRepresentatives: null,
      dateFilter: null,
      selectedStatus: null,
    };

    this.menuModel = [
      { label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewProduct(this.state.selectedProduct) },
      { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.deleteProduct(this.state.selectedProduct) },
    ];
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  onDelete = id => {
    this.props.onDeleteProduct(id);
  };

  renderHeader() {
    return (
      <div className="table-header">
        List of Products
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={e => this.setState({ globalFilter: e.target.value })}
            placeholder="Global Search"
          />
        </span>
      </div>
    );
  }

  activityBodyTemplate(rowData) {
    return (
      <>
        <span className="p-column-title">Activity</span>
        <ProgressBar value={rowData.activity} showValue={false} />
      </>
    );
  }

  // actionBodyTemplate() {
  //     return (
  //         <Button type="button" icon="pi pi-cog" className="p-button-secondary"></Button>
  //     );
  // }

  statusBodyTemplate(rowData) {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span className={classNames('customer-badge', 'status-' + rowData.status)}>{rowData.status}</span>
      </>
    );
  }

  nameBodyTemplate(rowData) {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.title}
      </>
    );
  }

  countryBodyTemplate(rowData) {
    let { name, code } = rowData.country;

    return (
      <>
        <span className="p-column-title">Country</span>
        <img
          src="showcase/demo/images/flag_placeholder.png"
          alt={name}
          className={classNames('flag', 'flag-' + code)}
        />
        <span style={{ verticalAlign: 'middle', marginLeft: '.5em' }}>{name}</span>
      </>
    );
  }

  representativeBodyTemplate(rowData) {
    const src = 'showcase/demo/images/avatar/' + rowData.representative.image;

    return (
      <>
        <span className="p-column-title">Representative</span>
        <img alt={rowData.representative.name} src={src} width="32" style={{ verticalAlign: 'middle' }} />
        <span style={{ verticalAlign: 'middle', marginLeft: '.5em' }}>{rowData.representative.name}</span>
      </>
    );
  }

  dateBodyTemplate(rowData) {
    return (
      <>
        <span className="p-column-title">Date</span>
        <span>{rowData.date}</span>
      </>
    );
  }

  renderRepresentativeFilter() {
    return (
      <MultiSelect
        className="p-column-filter"
        value={this.state.selectedRepresentatives}
        options={this.representatives}
        onChange={this.onRepresentativeFilterChange}
        itemTemplate={this.representativeItemTemplate}
        placeholder="All"
        optionLabel="name"
        optionValue="name"
      />
    );
  }

  representativeItemTemplate(option) {
    const src = 'showcase/demo/images/avatar/' + option.image;

    return (
      <div className="p-multiselect-representative-option">
        <img alt={option.name} src={src} width="32" style={{ verticalAlign: 'middle' }} />
        <span style={{ verticalAlign: 'middle', marginLeft: '.5em' }}>{option.name}</span>
      </div>
    );
  }

  onRepresentativeFilterChange(event) {
    this.dt.filter(event.value, 'representative.name', 'in');
    this.setState({ selectedRepresentatives: event.value });
  }

  renderDateFilter() {
    return (
      <Calendar
        value={this.state.dateFilter}
        onChange={this.onDateFilterChange}
        placeholder="Registration Date"
        dateFormat="yy-mm-dd"
        className="p-column-filter"
      />
    );
  }

  onDateFilterChange(event) {
    if (event.value !== null) this.dt.filter(this.formatDate(event.value), 'date', 'equals');
    else this.dt.filter(null, 'date', 'equals');

    this.setState({ dateFilter: event.value });
  }

  filterDate(value, filter) {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === this.formatDate(filter);
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  renderStatusFilter() {
    return (
      <Dropdown
        value={this.state.selectedStatus}
        options={this.statuses}
        onChange={this.onStatusFilterChange}
        itemTemplate={this.statusItemTemplate}
        showClear
        placeholder="Select a Status"
        className="p-column-filter"
      />
    );
  }

  statusItemTemplate(option) {
    return <span className={classNames('customer-badge', 'status-' + option)}>{option}</span>;
  }

  onStatusFilterChange(event) {
    this.dt.filter(event.value, 'status', 'equals');
    this.setState({ selectedStatus: event.value });
  }

  actionBodyTemplate(rowData) {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteProduct(rowData)}
        />
      </>
    );
  }

  onRowReorder = e => {
    this.setState({ products: e.value }, () => {
      // this.toast.show({severity:'success', summary: 'Rows Reordered', life: 3000});
    });
  };

  render() {
    var { products } = this.props;
    const header = this.renderHeader();
    const representativeFilter = this.renderRepresentativeFilter();
    const dateFilter = this.renderDateFilter();
    const statusFilter = this.renderStatusFilter();

    return (
      <div className="datatable-doc-demo">
        <ContextMenu
          model={this.menuModel}
          ref={el => (this.cm = el)}
          onHide={() => this.setState({ selectedProduct: null })}
        />

        <div className="card">
          {/* <h1>Product List</h1> */}
          <DataTable
            value={products}
            header={header}
            rowHover
            paginator
            rows={10}
            emptyMessage="No customers found"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            selection={this.state.selectedCustomers}
            onSelectionChange={e => this.setState({ selectedCustomers: e.value })}
            contextMenuSelection={this.state.selectedProduct}
            onContextMenuSelectionChange={e => this.setState({ selectedProduct: e.value })}
            onRowReorder={this.onRowReorder}
            onContextMenu={e => this.cm.show(e.originalEvent)}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
          >
            <Column rowReorder style={{ width: '3em' }} />
            <Column selectionMode="multiple" style={{ width: '3em' }} />
            <Column field="id" header="Code" sortable filter></Column>
            <Column
              field="title"
              header="Name"
              body={this.nameBodyTemplate}
              sortable
              filter
              filterPlaceholder="Search by name"
            ></Column>
            <Column field="body" header="Body"></Column>
            <Column body={this.actionBodyTemplate} style={{ width: '150px' }}></Column>
          </DataTable>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest());
    },
    onDeleteProduct: id => {
      dispatch(actDeleteProductRequest(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
