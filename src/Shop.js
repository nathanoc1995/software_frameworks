import React from 'react';
import './App.css';
import {loadState,saveState} from './localStorage';
import {store_items,promo_codes} from './data.json';
import Modal from 'react-modal';
import AlertContainer from 'react-alert';
import StripeCheckout from 'react-stripe-checkout';

var allItems = [];
var showingItems = [];
var driver = [];
var iron = [];
var putter = [];
var shoppingBasket = [];
var isOpen = false;
var currentItem = [];
var emptyItem = {
      "_id": 0,
      "category": "", 
      "make": "Your Basket is Empty!",     
      "model": "This is not an item!",     
      "price": 0,     
      "sale": false,      
      "sale_amt": 0,      
      "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/2000px-Red_X.svg.png",
      "qty": 0 
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
        <AlertContainer ref={(a) => msg = a} {...this.alertOptions} />
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

      return {isOpen: isOpen, currentItem: currentItem, selectedOption: 'allItems', showingItems: allItems, allItems: allItems, driver: driver, iron: iron, putter: putter, shoppingBasket: loadState()};
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
    },

    addItemToBasket: function(){

      var itemDetails = [];
      var addCheck = false;
      var openChk = false;
      itemDetails.push(emptyItem);

      var tempBasket = [];
      if(this.state.shoppingBasket !== undefined){

        tempBasket = this.state.shoppingBasket;

        for(var i=0;i<tempBasket.length;i++){
          if(tempBasket[i]._id === this.state.currentItem[0]._id){
            tempBasket[i].qty++;
            addCheck = true;
          }
        }
          if(!addCheck){
            tempBasket.push(this.state.currentItem[0]);
          }
      }else{
        tempBasket.push(this.state.currentItem[0]);
      }

      msg.show('Item added to basket!', { time: 1500});

      this.setState({shoppingBasket: tempBasket, currentItem: itemDetails, isOpen: openChk });
    },

    changeList: function(changeEvent){
      //Category change!!!
      //Pass selected radio button in here, depending on what button is selected you swap out the 
      //showingItems array with the relevant array! 
      //E.G. selected drivers, showingItems = this.state.drivers
      //To change back to full list - showingItems = this.state.allItems

      var selector = changeEvent.target.value.toString();

      switch(selector){

          case "drivers":{
            showingItems = this.state.driver;
            this.setState({selectedOption: 'drivers'});
          };
          break;
          case "irons":{
            showingItems = this.state.iron;
            this.setState({selectedOption: 'irons'});
          };
          break;
          case "putters":{
            showingItems = this.state.putter;
            this.setState({selectedOption: 'putters'});
          };
          break;
          case "allItems":{
            showingItems = this.state.allItems;
            this.setState({selectedOption: 'allItems'});
          };
          break;
          default:{
              showingItems = this.state.allItems;
              this.setState({selectedOption: 'allItems'});
          };
          break;
        }

        this.setState({showingItems: showingItems});

    },



	render(){

    saveState(this.state.shoppingBasket);

    var total =0;
		return(

				 <div>

                  <h1 className="text-center">Shop</h1>



        <div className="row">
        <div className="col-xs-12">

        <div>
        <h5>Categorys:</h5>
        <form>
          <label>
          <input type="radio" value="allItems" 
                      checked={this.state.selectedOption === 'allItems'} 
                      onChange={this.changeList} />
              All Items
          </label>
          &nbsp;
          <label>
          <input type="radio" value="drivers" 
                      checked={this.state.selectedOption === 'drivers'} 
                      onChange={this.changeList} />
              Drivers
          </label>
          &nbsp;
          <label>
          <input type="radio" value="irons" 
                      checked={this.state.selectedOption === 'irons'} 
                      onChange={this.changeList} />
              Irons
          </label>
          &nbsp;
          <label>
          <input type="radio" value="putters" 
                      checked={this.state.selectedOption === 'putters'} 
                      onChange={this.changeList} />
              Putters
          </label>
        </form>
        </div>

        <br/>

        <div className="row">
        <div className="col-xs-12">
          
          {this.state.showingItems.map(function(listValue, _id){
            let boundItemClick = this.showItemDetails.bind(this, listValue);
            //Format this to look better and display the items side by side!
            return (
            <div key={_id}>
            <div className="inlineDisplay">
            <img src={listValue.image_url} width="50" height="50"/>
            <p>{listValue.make} {listValue.model}</p>
            <p>&euro; {listValue.price.toFixed(2)}</p>
            <button className="text-right btn" onClick={boundItemClick}>View Item</button>
            </div>

            <Modal
              isOpen={this.state.isOpen}
              onRequestClose={boundItemClick}
              contentLabel="Modal"
            >
              <h1>{this.state.currentItem[0].make} {this.state.currentItem[0].model}</h1>
              <img src={this.state.currentItem[0].image_url} width="100" height="100"/>
              <h2>&euro; {this.state.currentItem[0].price.toFixed(2)}</h2>
              <button className="text-right btn btn-success" onClick={this.addItemToBasket}>Add to Basket</button>
              &nbsp;&nbsp;
              <button className="text-right btn btn-danger" onClick={boundItemClick}>Close</button>
              <br/>
              <h3>Description - </h3>
              <p>{this.state.currentItem[0].description}</p>
              <br/><br/>
              <small>You may also click the Esc Key to close!</small>
            </Modal>

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

  getInitialState: function() {

    var tempCheck = [];
    var emptyChk = true;

    if(loadState() === undefined){
      tempCheck.push(emptyItem);
      emptyChk = true;
    }else{
      tempCheck = loadState();
      for(var i=0;i<tempCheck.length;i++){
      if(tempCheck.length > 1 && tempCheck[i]._id === 0){
        tempCheck.splice(i,1);
        emptyChk = false;
        }
      else if(tempCheck.length >= 1 && tempCheck[i]._id === 0){
        emptyChk = true;
      }
      }
    }

    return { shoppingBasket: tempCheck, emptyList: emptyChk};
  },

  removeItemCheckout: function(item, e){
    //THis function will removce the item selected. If quantity is more than one it will decriment qty!
    console.log("Item to remove - "+ item._id)

    var tempCheck = [];

    if(loadState() === undefined){}
    else{
      tempCheck = loadState();
      for(var i=0;i<tempCheck.length;i++){
        if(tempCheck[i]._id === item._id){
          if(item.qty !== 1 && item._id !== 0){
            tempCheck[i].qty--;
          }else if(item._id !== 0){
            tempCheck.splice(i,1);
          }
        }   
      }
    }

    if(tempCheck.length === 0 || tempCheck.length === undefined){
      this.clearCheckout();
    }else{
      this.replaceState({shoppingBasket: tempCheck});
    }

  },

  onToken: function(token) {
   this.clearCheckout();
    alert("Thank you, your order is being processed!");
    window.location.assign('/');
  },

  clearCheckout: function(){
    
    var tempCheck = [];
    tempCheck.push(emptyItem);

    this.setState({shoppingBasket: tempCheck, emptyList: true});
  },

	render: function (){

      saveState(this.state.shoppingBasket);

    var totalItemCost = 0;

	return (
		<div className="App">
        <br/>
        
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <div className="row">

                <h1>Checkout!</h1>
                <small>Basket:</small>
                <hr className="checkout"/>

                <div>
                  <ul>
                {this.state.shoppingBasket.map(function(listValue, _id){
                  let boundItemClick = this.removeItemCheckout.bind(this, listValue);
                  var total = (listValue.qty*listValue.price);
                  totalItemCost += total;
                  return (
                  <div key={_id}>
                    <li>
                    <p className="text-left"><img src={listValue.image_url} width="50" height="50"/>
                    &nbsp;-&nbsp;
                    {listValue.make} {listValue.model} &emsp;&emsp;
                    &emsp;&emsp;
                    Qty. <b><i>{listValue.qty}</i></b>  &nbsp;
                    Price - &euro;<b><i>{total.toFixed(2)}</i></b> - &nbsp;&nbsp;
                    <button className="text-right btn btn-danger" onClick={boundItemClick}>X</button>
                    &nbsp;
                    </p>
                    </li>
                    <hr className="checkout"/>
                  </div>
                );
              }, this)}
                  </ul>
                  <div className="text-right">
                  <h3>Total Price - &euro;{totalItemCost.toFixed(2)}</h3>

                  <StripeCheckout
                  disabled = {this.state.emptyList}
              name="O'Connor's Golf Shop"
              description="O'Connor's Online Golf"
              image=""
              ComponentClass="div"
              panelLabel="Make Payment: "
              amount={totalItemCost*100}
              currency="EUR"
              stripeKey="pk_test_UCbXbCNsbdNCk4WfTNuJ0qje"
              locale="auto"
              email="nathanoconnorz@hotmail.com"
              shippingAddress={true}
              billingAddress={true}
              zipCode={false}
              allowRememberMe
              token={this.onToken}
              reconfigureOnUpdate={false}
              >
                <button className="btn btn-primary">
                    Pay with Card
                </button>
              </StripeCheckout>

                  <br/><br/>
                  <button className="text-right btn btn-danger" onClick={this.clearCheckout}>Clear Checkout</button>

                  </div>
                </div>

            </div>
          </div>
        </div>
      </div>

		);
}
});

export {Shop, Checkout}