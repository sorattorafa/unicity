import React, {Component} from 'react';
import { Layout } from 'antd';

import './footer.css';

const { Footer } = Layout;

export default class UniFooter extends Component {
  render() {
    return (
      <Footer className = "ant-layout-footer " style = {{ textAlign: 'center', Color: "white" }}></Footer>
    );
  }
}