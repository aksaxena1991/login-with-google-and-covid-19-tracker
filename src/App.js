import React, {Component} from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {history} from './helpers';
import {alertActions} from './actions';
import {PrivateRoute} from './router';
import {HomePage} from './components/home';
import {LoginPage} from './components/login';
import {Registration} from './components/registeration';

class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this
        .props
        .clearAlerts();
    });
  }

  render() {
    const {alert} = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path="/" component={HomePage}/>
                <Route path="/login" component={LoginPage}/>
                < Route path="/register" component={Registration}/>
                <Redirect from="*" to="/"/>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const {alert} = state;
  return {alert};
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

 const connectedApp = connect(mapState, actionCreators)(App);
export {connectedApp as App};
// export default App;