import React from 'react';
import './App.css';
import {loadState,saveState} from './localStorage';
import {store_items,promo_codes} from './data.json';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

var allItems = [];
var driver = [];
var iron = [];
var putter = [];
var shoppingBasket = [];
var isOpen = false;
var currentItem = [];
var emptyItem = {
      "_id": 0,
      "category": "", 
      "make": "",     
      "model": "",     
      "price": 0,     
      "sale": false,      
      "sale_amt": 0,      
      "image_url": "" 
    }
var msg;


var Shop = React.createClass({

  getInitialState() {
    return { shoppingBasket: shoppingBasket };
  },
	render: function (){

	return (
		<div className="App">
        <br/>

        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <div className="row">

                  <ShopListing/>  

            </div>
          </div>
        </div>
      </div>

		);
}
});


var ShopListing = React.createClass({

	getInitialState: function() {

        isOpen = false;
        currentItem.push(emptyItem);

          for (var i = 0; i < store_items.length; i++) {

            allItems.push(store_items[i]);

        switch(store_items[i].category){

          case "driver":{
            driver.push(store_items[i]);
          };
          break;
          case "iron":{
            iron.push(store_items[i]);
          };
          break;
          case "putter":{
            putter.push(store_items[i]);
          };
          break;
          default:{};
          break;
        }
      }
      return {isOpen: isOpen, currentItem: currentItem, allItems: allItems, driver: driver, iron: iron, putter: putter, shoppingBasket: loadState()};
      },


       clearSearch: function(){
      this.refs.searchField.value="";
      this.onSearch("");
    },

    showItemDetails: function(item, e){

      var checkOpen = !this.state.isOpen;
      var itemDetails = [];

      if(checkOpen){
        itemDetails.push(item);
      }else{
        itemDetails.push(emptyItem);
      }

      this.setState({currentItem: itemDetails, isOpen: checkOpen });
      this.forceUpdate();
    },

    addItemToBasket: function(){

      console.log(this.state.currentItem[0]);

      
       
    },



	render(){

    var total =0;
		return(

				 <div>

        <div className="col-xs-4">
                  <h1 className="text-center">Shop</h1>



        <div className="row">
        <div className="col-xs-12">
        <br/>

        <div>
          
          {this.state.allItems.map(function(listValue, _id){
            let boundItemClick = this.showItemDetails.bind(this, listValue);
            //Format this to look better and display the items side by side!
            return (
            <div key={_id}>
            <br/><br/><br/>
            <div className="row ">
            <div className="col-xs-4">
            <img src={listValue.image_url} width="50" height="50"/>
            <p>{listValue.make} {listValue.model}</p>
            <p>&euro; {listValue.price.toFixed(2)}</p>
            <button className="text-right btn" onClick={boundItemClick}>View Item</button>

            <Modal
              isOpen={this.state.isOpen}
              onRequestClose={boundItemClick}
              contentLabel="Modal"
            >
              <h1>{this.state.currentItem[0].make} {this.state.currentItem[0].model}</h1>
              <img src={this.state.currentItem[0].image_url} width="100" height="100"/>
              <h2>&euro; {this.state.currentItem[0].price.toFixed(2)}</h2>
              <button className="text-right btn" onClick={this.addItemToBasket}>Add to Basket</button>
            </Modal>

            </div>

            
            </div>
            </div>
            );
          }, this)}


        </div>

        </div>
        </div>

        </div>

        </div>

			);
	}
});


var Checkout = React.createClass({

	render: function (){

	return (
		<div className="App">
        <br/>
        
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <div className="row">

                <h1>Test Check</h1>   

            </div>
          </div>
        </div>
      </div>

		);
}
});

//module.exports = { sh1: Shop, sh2: Checkout}

export {Shop, Checkout}