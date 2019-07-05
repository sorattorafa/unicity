import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

//Components of Simple Users
import CreateUser from "./components/simpleuser/create-user.component";
import ProfileSimpleuser from "./components/simpleuser/profile-simpleuser";
import EditSimpleuser from "./components/simpleuser/edit-simpleuser.component";
import SimpleusersList from "./components/simpleuser/list-simpleuser";
import DeleteSimpleuser from "./components/simpleuser/delete-simpleuser";
import MenuSimpleUser from "./components/simpleuser/menu-user"; 

//Components of Reports
import CreateReport from "./components/report/create-report";
import ViewReport from "./components/report/view-report";
import ViewReportCompany from "./components/report/view-report-company"; 
import ListReports from "./components/report/list-reports";  
import ListReportsByuser from "./components/report/list-reports-byuser"; 
import ListReportsByCompanyuser from "./components/report/list-reports-by-companyuser"; 
import EditReport from  "./components/report/edit-report";

// Components of Admin Users
import CreateAdminUser from "./components/adminuser/create-adminuser";
import ListAdminUser from "./components/adminuser/list-adminuser";

// Components of Company Users
import CreateCompanyUser from "./components/companyuser/create-companyuser";
import ProfileCompanyUser from "./components/companyuser/profile-companyuser";
import EditCompanyUser from "./components/companyuser/edit-companyuser";
import ViewCompanyUser from "./components/companyuser/view-companyuser";
import ListCompanyUsers from "./components/companyuser/list-companyusers";

// Components of Categories
// import CreateCategory from "./components/categories/create-category";

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
          <Route path="/profilesimpleuser/:id" component={ ProfileSimpleuser } />
          <Route path="/edit/:id" component={ EditSimpleuser } />
          <Route path="/listusers" component={ SimpleusersList } />  
          <Route path="/menusimpleuser/:id" component={ MenuSimpleUser } />  
          <Route path="/delete/:id" component={ DeleteSimpleuser } />
          <Route path="/createreport" component={ CreateReport } />
          <Route path="/viewreport/:id" component={ ViewReport } />   
          <Route path="/viewreportcompany/:id" component={ ViewReportCompany } />  
          <Route path="/editreport/:id" component={ EditReport } /> 
          <Route path="/listreport" component={ ListReports } /> 
          <Route path="/listreportbyuser/:id" component={ ListReportsByuser } /> 
          <Route path="/listreportbycompanyuser/:id" component={ ListReportsByCompanyuser } />
          <Route path="/createadminuser" component={ CreateAdminUser } />
          <Route path="/listadminusers" component={ ListAdminUser } />
          <Route path="/createcompanyuser" component={ CreateCompanyUser } />
          <Route path="/profilecompanyuser/:id" component={ ProfileCompanyUser } />
          <Route path="/editcompanyuser/:id" component={ EditCompanyUser } />
          <Route path="/viewcompanyuser/:id" component={ ViewCompanyUser } /> 
          <Route path="/listcompanyusers" component={ ListCompanyUsers } /> 
          {/* <Route path="/createcategory" component={ CreateCategory } /> */}
          <Route path = "/map/" exact component = { ReportMap } />
          <Route path = "/" exact component = { PublicHome } />

          {/* <Route path = "*" component = { NotFound } /> */}
        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;
