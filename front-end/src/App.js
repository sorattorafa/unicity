import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import { Map, TileLayer, Marker} from 'react-leaflet';
// import { Card, CardText, Button} from 'reactstrap';
// import "bootstrap/dist/css/bootstrap.min.css";
import CreateUser from "./components/simpleuser/create-user.component";
import EditSimpleuser from "./components/simpleuser/edit-simpleuser.component";
import SimpleusersList from "./components/simpleuser/list-simpleuser";
import DeleteSimpleuser from "./components/simpleuser/delete-simpleuser";

//components of reports
import CreateReport from "./components/report/create-report";
import ViewReport from "./components/report/view-report";

// List reports
import ListReports from "./components/report/list-reports";

// Admin user's component
import CreateAdminUser from "./components/adminuser/create-adminuser";

// Company user's component
import CreateCompanyUser from "./components/companyuser/create-companyuser";
import ListCompanyUsers from "./components/companyuser/list-companyusers";

// Categories' component
import CreateCategory from "./components/categories/create-category";

// Map's component
import ReportMap from "./components/map/map";

// Homes
import PublicHome from "./components/home/publichome";

 
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/createuser" component={ CreateUser } />
          <Route path="/createreport" component={ CreateReport } />
          <Route path="/viewreport/:id" component={ ViewReport } />  
          <Route path="/edit/:id" component={ EditSimpleuser } />
          <Route path="/listusers" component={ SimpleusersList } />  
          <Route path="/delete/:id" component={ DeleteSimpleuser } /> 
          <Route path="/createadminuser" component={ CreateAdminUser } /> 
          <Route path="/createcompanyuser" component={ CreateCompanyUser } />
          <Route path="/listcompanyusers" component={ ListCompanyUsers } />  
          <Route path="/createcategory" component={ CreateCategory } />
          <Route path="/listreport" component={ ListReports } />
          <Route path = "/map" exact component = { ReportMap } />
          <Route path = "/" exact component = { PublicHome } />

          {/* <Route path = "*" component = { NotFound } /> */}
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
