import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
// import { AutoComplete } from 'primereact/autocomplete';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';
// import { Spinner } from 'primereact/spinner';
import { Slider } from 'primereact/slider';
import { ListBox } from 'primereact/listbox';
import { RadioButton } from 'primereact/radiobutton';
import { ToggleButton } from 'primereact/togglebutton';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
// import { Accordion, AccordionTab } from 'primereact/accordion';
// import { Panel } from 'primereact/panel';
// import { TabView, TabPanel } from 'primereact/tabview';
// import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { withFormik } from 'formik';
import * as yup from 'yup';
import ErrorFocus from '../../components/Error/ErrorFocus';

const ProductActionPage = (props) => {
  const { itemEditing } = useSelector(state => ({
    itemEditing: state.itemEditing,
  }));

  // console.log(itemEditing);

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const [values, setValues] = useState({
    date: null,
    country: null,
    filteredCountries: null,
    countriesData: [],
    dropdownCity: null,
    selectedNodeKey: null,
    cities: [
      { label: 'Select City', value: null },
      { label: 'New York', value: 'New York' },
      { label: 'Rome', value: 'Rome' },
      { label: 'London', value: 'London' },
      { label: 'Istanbul', value: 'Istanbul' },
      { label: 'Paris', value: 'Paris' },
    ],
    spinnerValue: null,
    checkboxValue: [],
    radioValue: null,
    sliderValue: null,
    toggleButtonValue: null,
    dialogVisible: false,
    dataTableValue: [],
    dataTableSelection: null,
    dataViewValue: [],
    treeData: [],
    picklistSourceCars: [],
    picklistTargetCars: [],
    orderlistCars: [],
    layout: 'list',
    selectedCars: [],
    carOptions: [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' },
    ],
    listBoxCity: null,
    listBoxCities: [
      { label: 'Madrid', value: 'Madrid' },
      { label: 'Geneva', value: 'Geneva' },
      { label: 'Los Angeles', value: 'Los Angeles' },
      { label: 'Monaco', value: 'Monaco' },
      { label: 'Berlin', value: 'Berlin' },
    ],
    selectedType: null,
    types: [
      { label: 'Apartment', value: 'Apartment' },
      { label: 'House', value: 'House' },
      { label: 'Studio', value: 'Studio' },
    ],
    splitButtonItems: [
      { label: 'Update', icon: 'pi pi-refresh' },
      { label: 'Delete', icon: 'pi pi-times' },
      { label: 'Home', icon: 'pi pi-home', url: 'http://www.primefaces.org/primereact' },
    ],
    menuItems: [
      {
        label: 'Options',
        items: [
          { label: 'New', icon: 'pi pi-fw pi-plus', command: () => (window.location.hash = '/fileupload') },
          { label: 'Delete', icon: 'pi pi-fw pi-trash', url: 'http://primetek.com.tr' },
        ],
      },
      {
        label: 'Account',
        items: [
          { label: 'Options', icon: 'pi pi-fw pi-cog', command: () => (window.location.hash = '/') },
          { label: 'Sign Out', icon: 'pi pi-fw pi-power-off' },
        ],
      },
    ],
    panelMenuItems: [
      {
        label: 'Documents',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark',
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video',
              },
            ],
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
          },
          {
            separator: true,
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
      {
        label: 'Manage',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Accounts',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
              },
            ],
          },
        ],
      },
      {
        label: 'Calendar',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
              },
            ],
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (id) {
      dispatch(actGetProductRequest(id));
    }
  }, []);

  useEffect(() => {
    const newValues = {
      id: itemEditing.id,
      name: itemEditing.name,
      price: itemEditing.price,
      status: itemEditing.status,
    };
    setValues(newValues);
  }, [itemEditing]);

  const onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    setValues(values => ({ ...values, [name]: value }));
  };

  const onSave = e => {
    e.preventDefault();
    var { id, txtName, txtPrice, chkbStatus } = this.state;
    var { history } = this.props;
    var product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: chkbStatus,
    };
    if (id) {
      this.props.onUpdateProduct(product);
    } else {
      this.props.onAddProduct(product);
    }
    history.goBack();
  };


  const {
    // values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <div className="p-fluid">
      <div className="p-grid">
        <div className="p-col-12">
          {/* <div className="p-messages p-component p-messages-success" style={{ margin: '0 0 1em 0', display: 'block' }}>
            <div className="p-messages-wrapper">
              <span className="p-messages-icon pi pi-fw pi-2x pi-check"></span>
              <ul>
                <li>
                  <span className="p-messages-detail">Designer API is a theme engine for the complete PrimeReact UI Suite and includes this demo application
                  to test the commonly used components while designing your theme.
                                      </span>
                </li>
              </ul>
            </div>
          </div> */}
          {/* <Messages ref={(el) => this.msgs1 = el} /> */}

          <div className="card card-w-title">
            <h1>Form Elements</h1>
            <form>
              <div className="p-grid">
                <div className="p-col-12 p-md-2">
                  <label htmlFor="input">Input</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <InputText name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name} />
                  {errors.name && touched.name && <small className="p-invalid">Name is not available.</small>}
                </div>
                <div className="p-col-12 p-md-2">
                  <label htmlFor="textarea">Textarea</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <InputTextarea name="email" rows={3} cols={30} autoResize={true} onChange={handleChange}
                    onBlur={handleBlur} value={values.email}></InputTextarea>
                  {errors.email && touched.email && <small className="p-invalid">Email is not available.</small>}
                </div>
                <div className="p-col-12 p-md-2">
                  <label htmlFor="calendar">Calendar</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <Calendar id="calendar" value={values.date} onChange={event => this.setState({ date: event.value })}></Calendar>
                </div>
                {/* <div className="p-col-12 p-md-2">
                <label htmlFor="autocomplete">AutoComplete</label>
              </div>
              <div className="p-col-12 p-md-4">
                <AutoComplete minLength={1} placeholder="Countries" id="autocomplete" field="name" suggestions={this.state.filteredCountries}
                  completeMethod={this.filterCountry} value={this.state.country}
                  onChange={event => this.setState({ country: event.value, filteredCountries: null })}
                />
              </div> */}
                <div className="p-col-12 p-md-2">
                  <label htmlFor="dropdown">Dropdown</label>
                </div>
                <div className="p-col-12 p-md-4">
                  {/* <Dropdown options={this.state.cities} value={values.dropdownCity} onChange={event => this.setState({ dropdownCity: event.value })} autoWidth={false} /> */}
                </div>
                <div className="p-col-12 p-md-2">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <Password id="password" />
                </div>
                <div className="p-col-12 p-md-2">
                  <label htmlFor="mask">Mask</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <InputMask id="mask" mask="99/99/9999" slotChar="dd/mm/yyyy" placeholder="Date" />
                </div>
                {/* <div className="p-col-12 p-md-2">
                <label htmlFor="spinner">Spinner</label>
              </div>
              <div className="p-col-12 p-md-4">
                <Spinner value={this.state.spinnerValue} onChange={event => this.setState({ spinnerValue: event.value })} />
              </div> */}

                <div className="p-col-12 p-md-2">
                  Checkbox
                              </div>
                <div className="p-col-12 p-md-4">
                  {/* <div className="p-grid">
                    <div className="p-col-12">
                      <Checkbox value="Ultima" inputId="cb1" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Ultima') > -1} />
                      <label htmlFor="cb1" className="p-checkbox-label">Ultima</label>
                    </div>
                    <div className="p-col-12">
                      <Checkbox value="Avalon" inputId="cb2" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Avalon') > -1} />
                      <label htmlFor="cb2" className="p-checkbox-label">Avalon</label>
                    </div>
                    <div className="p-col-12">
                      <Checkbox value="Serenity" inputId="cb3" onChange={this.onCheckboxChange} checked={this.state.checkboxValue.indexOf('Serenity') > -1} />
                      <label htmlFor="cb3" className="p-checkbox-label">Serenity</label>
                    </div>
                  </div> */}
                </div>
                <div className="p-col-12 p-md-2">
                  RadioButton
                              </div>
                <div className="p-col-12 p-md-4">
                  {/* <div className="p-grid">
                    <div className="p-col-12">
                      <RadioButton value="Ultima" inputId="rb1" onChange={event => this.setState({ radioValue: event.value })} checked={this.state.radioValue === "Ultima"} />
                      <label htmlFor="rb1" className="p-radiobutton-label">Ultima</label>
                    </div>
                    <div className="p-col-12">
                      <RadioButton value="Avalon" inputId="rb2" onChange={event => this.setState({ radioValue: event.value })} checked={this.state.radioValue === "Avalon"} />
                      <label htmlFor="rb2" className="p-radiobutton-label">Avalon</label>
                    </div>
                    <div className="p-col-12">
                      <RadioButton value="Serenity" inputId="rb3" onChange={event => this.setState({ radioValue: event.value })} checked={this.state.radioValue === "Serenity"} />
                      <label htmlFor="rb3" className="p-radiobutton-label">Serenity</label>
                    </div>
                  </div> */}
                </div>
                <div className="p-col-12 p-md-2">
                  <label htmlFor="slider">Slider</label>
                </div>
                <div className="p-col-12 p-md-4">
                  {/* <Slider id="slider" value={this.state.sliderValue} onChange={event => this.setState({ sliderValue: event.value })} /> */}
                </div>
                <div className="p-col-12 p-md-2">
                  Button
                              </div>
                <div className="p-col-12 p-md-4">
                  <Button label="Edit" icon="pi pi-pencil" />
                </div>
                <div className="p-col-12 p-md-2">
                  SplitButton
                              </div>
                <div className="p-col-12 p-md-4">
                  <SplitButton label="Save" icon="pi pi-plus" model={values.splitButtonItems} />
                </div>
                <div className="p-col-12 p-md-2">
                  <label htmlFor="multiselect">MultiSelect</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <MultiSelect id="multiselect" placeholder="Choose" value={values.selectedCars} options={values.carOptions} onChange={event => this.setState({ selectedCars: event.value })} />
                </div>
                <div className="p-col-12 p-md-2">
                  ToggleButton
                              </div>
                <div className="p-col-12 p-md-4">
                  <ToggleButton checked={values.toggleButtonValue} onChange={event => this.setState({ toggleButtonValue: event.value })} />
                </div>
                <div className="p-col-12 p-md-2">
                  SelectButton
                              </div>
                <div className="p-col-12 p-md-4">
                  <SelectButton value={values.selectedType} options={values.types} onChange={event => this.setState({ selectedType: event.value })} />
                </div>
                <div className="p-col-12 p-md-2">
                  <label htmlFor="listbox">ListBox</label>
                </div>
                <div className="p-col-12 p-md-4">
                  <ListBox value={values.listBoxCity} options={values.listBoxCities} onChange={event => this.setState({ listBoxCity: event.value })} filter={true} />
                </div>
                {/* <div className="p-col-12 p-md-2">
                Dialog
                              </div>
              <div className="p-col-12 p-md-4">
                <Button label="Login" icon="pi pi-external-link" onClick={() => this.setState({ dialogVisible: true })} />
              </div> */}

                <div className="p-col-12 p-md-12">
                  <h1></h1>
                </div>
                <div className="p-col-12 p-md-8">
                </div>
                <div className="p-col-12 p-md-2"  >
                </div>
                <div className="p-col-12 p-md-2" style={{ textAlign: 'right' }}>
                  {isSubmitting && <ProgressSpinner style={{ width: '40px', height: '40px' }} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s" />}
                  {!isSubmitting && <Button type="submit" label="Save" icon="pi pi-check" onClick={handleSubmit} disabled={isSubmitting} />}
                  <ErrorFocus/>
                </div>
              </div>
            </form>
            {/* <Dialog header="Login" visible={this.state.dialogVisible} footer={dialogFooter} onHide={() => this.setState({ dialogVisible: false })}>
              <div className="p-grid">
                <div className="p-col-12">
                  <InputText placeholder="Username" />
                </div>
                <div className="p-col-12">
                  <InputText placeholder="Password" />
                </div>
              </div>
            </Dialog> */}
          </div>

        </div>
      </div>
    </div>
  );
};


const validateSchema = yup.object({
  email: yup.string()
    .required('Required').email('should be email')
    .min(4, 'Min 4'),
  name: yup.string()
    .required()
    .min(8),
  // rating: yup.string()
  //     .required()
  //     .test('is-num-1-5', 'Rating must be a number 1 - 5', (val) => {
  //         return parseInt(val) < 6 && parseInt(val) > 0;
  //     }),
});

const Form = withFormik({
  mapPropsToValues: () => ({ name: '', email: '' }),
  validationSchema: validateSchema,
  handleSubmit(values, { props, setSubmitting }) {
    // const { actAddProductRequest } = props;
    console.log('submit');

    const dispatch = useDispatch();
    console.log('submit2');

    const payload = { email: values.email, name: values.name };
    console.log('submit3');
    dispatch(actAddProductRequest(payload)).then(() => setSubmitting(false))
  },
})(ProductActionPage);

// const mapStateToProps = state => {
//   return {
//     itemEditing: state.itemEditing,
//   };
// };

export default Form;
