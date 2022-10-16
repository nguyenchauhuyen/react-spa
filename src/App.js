import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './styles/styles.scss';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import TransactionDetail from './pages/TransactionDetail/TransactionDetail';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Switch>
        <AuthenticatedRoute path="/" exact component={Dashboard} />
        <AuthenticatedRoute path="/account/:id" component={TransactionDetail} />
        <AuthenticatedRoute path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default App;
