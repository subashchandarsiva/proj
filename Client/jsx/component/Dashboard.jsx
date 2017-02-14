import React from 'react';
import ReactDOM from 'react-dom';
import {Grid,Row,Col} from 'react-flexbox-grid/lib';
import List_Dashboard from './List_Dashboard.jsx';
import DashNavbar from './DashNavbar.jsx';
import Paper from 'material-ui/Paper';
//import Displaybox from './displaybox.jsx';
const style = {

  paper:{height: 600,
  width: 800,
  margin: '50px 0 0 150px',
  textAlign: 'center',
  display: 'inline-block',
}
};

class Dashboard extends React.Component {

  render()
  {
    return (
      <div>
        <DashNavbar />
        <Grid style={{width:'100%'}}>
                <Row>
                  <Col xs={12} sm={3} md={2} lg={2}>   <List_Dashboard/> </Col>
                  <Col xs={6} sm={6} md={8} lg={10}> <Paper style={style.paper}>{this.props.children}</Paper> </Col>
                </Row>
              </Grid>
      </div>
    );
  }
}

export default Dashboard;