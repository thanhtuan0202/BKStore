import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import LoginForAdmin from './containers/HomeTemplate/LoginAdmin';
import DanhSachPage from './containers/HomeTemplate/DanhSachDonHang';
import HomePage from './containers/HomeTemplate/HomePage';

import QuanLyPage from './containers/HomeTemplate/QuanLyTaiKhoan';
import SanPhamPage from './containers/HomeTemplate/SanPham';
import PageNotFound from './containers/PageNotFound';
import Navbar from './containers/HomeTemplate/_components/Navbar';
import DetailDonHangPage from './containers/HomeTemplate/DetailDonHang';
import CreateAccount from './containers/HomeTemplate/QuanLyTaiKhoan/create-account';

class App extends React.Component {

  withAuth = (WrappedComponent) => {
    const isAuthenticated = !!localStorage.getItem('admin');
  
    return class extends React.Component {
      render() {
        if (isAuthenticated) {
          return (
            <>
            <Navbar/>
            <WrappedComponent {...this.props} />
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }
    };
  };
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ this.withAuth(HomePage) } />
        <Route path='/login' component={ LoginForAdmin } />

        <Route path='/san-pham' component={ this.withAuth(SanPhamPage)  } />

        <Route path='/quan-ly' component={ this.withAuth(QuanLyPage) } />

        <Route path='/danh-sach' component={ this.withAuth(DanhSachPage)  } />
        <Route path='/create-account' component={ this.withAuth(CreateAccount)  } />

        <Route path='/detail/:id' component={ this.withAuth(DetailDonHangPage)} />

        <Route path='*' component={ this.withAuth(PageNotFound) } />
      </Switch>
      <Switch>
        <Route exact path='/login' component={ LoginForAdmin } />
      </Switch>
    </BrowserRouter>
    );
  }
}
export default App;
