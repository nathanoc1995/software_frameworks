import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './App.css';
import {Shop, Checkout} from './Shop.js';

var Info = React.createClass({  

  render: function() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1 text-center">
            <h1 className="lgHd">Information</h1>
            <div className="lgTxt">

            <p>THis application is purely for educational purposes.</p>

           </div>
          </div>
        </div>
      </div>
    );
  } 
  }) ;

ReactDOM.render((
    <Router>
    <div>
      <Route exact path="/" component={Shop}/>
      <Route exact path="/checkout" component={Checkout}/>
      <Route exact path="/info" component={Info}/>
    </div>
  </Router>
), document.getElementById('root')) ;