import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import { Map, TileLayer, Marker} from 'react-leaflet';
// import { Card, CardText, Button} from 'reactstrap';
// import "bootstrap/dist/css/bootstrap.min.css";

//Components of Simple Users
import CreateUser from "./components/simpleuser/create-user.component";
import EditSimpleuser from "./components/simpleuser/edit-simpleuser.component";
import SimpleusersList from "./components/simpleuser/list-simpleuser";
import DeleteSimpleuser from "./components/simpleuser/delete-simpleuser";

//Components of Reports
import CreateReport from "./components/report/create-report";
import ViewReport from "./components/report/view-report";
import ListReports from "./components/report/list-reports";

// Components of Admin Users
import CreateAdminUser from "./components/adminuser/create-adminuser";

// Components of Company Users
import CreateCompanyUser from "./components/companyuser/create-companyuser";
import ViewCompanyUser from "./components/companyuser/view-companyuser";
import ListCompanyUsers from "./components/companyuser/list-companyusers";

// Components of Categories
import CreateCategory from "./components/categories/create-category";

// Components of Map
import ReportMap from "./components/map/map";

// Homes
import PublicHome from "./components/home/publichome";

 
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/createuser" component={ CreateUser } />
          <Route path="/edit/:id" component={ EditSimpleuser } />
          <Route path="/listusers" component={ SimpleusersList } />  
          <Route path="/delete/:id" component={ DeleteSimpleuser } />
          <Route path="/createreport" component={ CreateReport } />
          <Route path="/viewreport/:id" component={ ViewReport } /> 
          <Route path="/listreport" component={ ListReports } />
          <Route path="/createadminuser" component={ CreateAdminUser } />
          <Route path="/createcompanyuser" component={ CreateCompanyUser } />
          <Route path="/viewcompanyuser/:id" component={ ViewCompanyUser } /> 
          <Route path="/listcompanyusers" component={ ListCompanyUsers } /> 
          <Route path="/createcategory" component={ CreateCategory } />
          <Route path = "/map" exact component = { ReportMap } />
          <Route path = "/" exact component = { PublicHome } />

          {/* <Route path = "*" component = { NotFound } /> */}
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
