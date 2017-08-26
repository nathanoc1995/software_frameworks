# Assignment 1 - ReactJS app - O'Connors Golf Shop

Student: Nathan O'Connor

## Brief Overview

This application is designed to be a simple online golf shop. The applications first opening screen is the main screen which shows the user what clubs are on sale, the user view a product and another window will appear with that product a lot larger, the user can then add that product to their basket if they so wish or can cancel and carry on shopping.
The Home screen also has a filter by radio buttons which can allow the user filter by product Category to allow them to get the product that they wish.

Once the user is finished ordering from the home screen he/she can press the menu and redirect to either to information page which just gives the reason for this application, or can be redirected to the shopping basket where all of the products purchased are already in the basket.

The user can then either remove items from the cart and if they wish to remove all items at once they can clear all items at once using the "clear items" button or if there is nothing in the cart it will appear as empty, if the user is happy to continue with there purchase they can pay.

This buttons brings up a test mode payment method where the user can enter shipping address and then payment details and it is processed as a test metheod, the user is then redirected to the home page again.

The pages Shop, Basket and Payment Method are stateful as they keep track and save and changes or actions that the user may do.

The other information page is stateless as it only had text and no input.


~Features Include

-Select products to purchase
-Purchases are confirmed and added to the shopping basket
-Stateful shopping basket

## Installation requirements.

import Modal from 'react-modal';
import AlertContainer from 'react-alert';
import StripeCheckout from 'react-stripe-checkout';
-ReactJS
-Bootstrap
-react-modal
-react-alert
-react-stripe-checkout

## Data Model.

I used a JSON file for the products

Products- 

![][image1]

## App Component Design.

Below shows the design of the app components and how they interact with one another.

![][image2]

## UI Design.

The following images show the UI design and use of the application.

Adding products to basket, confirmation and payment.

Viewing Products - 

![][image3]

Product Ordered
![][image4]
Basket - 

![][image5]

Payment - 

![][image6]
Below shows the basic information page, contact page and the navigation bar.

Info page - 

![][image8]

Nav bar - 

![][image7]

## Routing.

+ / - Landing page/Shop Page
+ / Viewing Product Confirming producrt and adding to basket
+ /Basket - Add/Remove Items and payment of products
+ /Info - Basic information page on applications purpose


## Extra features

This application uses React Alert for notifying the user of changes and giving confirmations. 

This applicaion also uses Stripe Checkout for taking the users name, address and payment.

## Independent learning.

The use of the above mentioned extra features were learned independintly. The implimentation of React Alert for notifications and the implimentation of a Stripe Checkout for the user of taking user information and payment and the Modal for a lightbox to appear of the product before confirming product.



[image1]: ./1.JPG
[image2]: ./2.JPG
[image3]: ./3.JPG
[image4]: ./4.png
[image5]: ./basket.JPG
[image6]: ./payment.JPG
[image7]: ./nav.JPG
[image8]: ./info.JPG
