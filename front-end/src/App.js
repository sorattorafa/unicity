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
import CreateReport from "./components/report/create-report";

//components of admin user
import CreateAdminUser from "./components/adminuser/create-adminuser";

//components of company user
import CreateCompanyUser from "./components/companyuser/create-companyuser";

//components of categories
import CreateCategory from "./components/categories/create-category";

 
class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <Switch>
          <Route path="/createuser" component={ CreateUser } />
          <Route path="/createreport" component={ CreateReport } />   
          <Route path="/edit/:id" component={ EditSimpleuser } />
          <Route path="/listusers" component={ SimpleusersList } />  
          <Route path="/delete/:id" component={ DeleteSimpleuser } /> 
          <Route path="/createadminuser" component={ CreateAdminUser } /> 
          <Route path="/createcompanyuser" component={ CreateCompanyUser } />  
          <Route path="/createcategory" component={ CreateCategory } />
          <Route path = "/" exact component = { CreateAdminUser } />

          {/* <Route path = "*" component = { NotFound } /> */}
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
