"use client";
import Image from "next/image";
import React from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
// import Allpagebanner from "../assets/homepage-images/allpagebanner.jpg";
import { useDispatch, useSelector } from "react-redux";
// import { toggleCart, removeItem, incrementQuantity, decrementQuantity } from "../store/slice/cartslice";
// import SinglePageHeader from "@/Components/singlepageheader/SinglePageHeader";
import Link from "next/link";
import { decrementQuantity, incrementQuantity, removeItem, toggleCart } from "@/store/slice/cartslice";
const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const isOpen = useSelector((state) => state.cart.isOpen);
  
    const handleClose = () => {
      dispatch(toggleCart(false));
    };
  
    const handleRemoveItem = (id, variationId) => {
      dispatch(removeItem({ id, variationId }));
    };
  
    const handleIncrementQuantity = (id, variationId) => {
      dispatch(incrementQuantity({ id, variationId }));
    };
  
    const handleDecrementQuantity = (id, variationId) => {
      dispatch(decrementQuantity({ id, variationId }));
    };
  
    const calculateSubtotal = () => {
      return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
  
  return (
    <>
      {/* <SinglePageHeader  title={"cart page"} pagebanner={Allpagebanner}  /> */}
    <Container className="my-5"  >
    <Row>
      <Col>
       {/* <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            
            {cartItems ? cartItems?.map((cartitems,key)=>(
        <tr>

              <td>
                <Button variant="danger" size="sm"     onClick={() => handleRemoveItem(cartitems.id, cartitems.variationId)}>
                  &times;
                </Button>
              </td>
              
              <td style={{display:"flex",gap:"33%",alignItems:"center"}}>
              <img
                        src={cartitems?.img?.src || cartitems?.img[0]}
                        alt={cartitems?.id}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                <span>{cartitems?.name}</span>
              </td>

              <td>{cartitems?.price * cartitems?.quantity}
              </td>
              
              <td>
                <Button variant="outline-secondary" size="sm"                       onClick={() => handleDecrementQuantity(cartitems.id, cartitems.variationId)}
                >
                  -
                </Button>
                <span className="mx-2">{cartitems.quantity}</span>
                <Button variant="outline-secondary" size="sm"      onClick={() => handleIncrementQuantity(cartitems.id, cartitems.variationId)}>
                  +
                </Button>
              </td>

              <td> {cartitems.price * cartitems.quantity}.00</td>
              
        </tr>
)):null} 
        
          </tbody>
        </Table> */}


        <div className="main-tabl-col">
          <Table striped bordered hover responsive className=" ">
            <thead>
              <tr>
                  <th class="product-remove"></th>
                  <th class="product-name">Product</th>
                  <th class="product-price">Price</th>
                  <th class="product-quantity">Quantity</th>
                  <th class="product-subtotal">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              
              {cartItems ? cartItems?.map((cartitems,key)=>(
          <tr>

                <td class="product-remove" data-title=" "className="table-remove">
                  <Button variant="danger" size="sm"     onClick={() => handleRemoveItem(cartitems.id, cartitems.variationId)}>
                    &times;
                  </Button>
                </td>
                
                <td class="product-name" data-title="Product">
                <img
                          src={cartitems?.img?.src || cartitems?.img[0]}
                          alt={cartitems?.id}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                  <span>{cartitems?.name}</span>
                </td>

                <td class="product-price" data-title="Price">
                  {cartitems?.price * cartitems?.quantity}
                </td>
                
                <td class="product-quantity" data-title="Quantity">

                  <Button variant="outline-secondary cartpg-btn-plus" size="sm" 
                      onClick={() => handleDecrementQuantity(cartitems.id, cartitems.variationId)} >
                    -
                  </Button>

                  <span className="mx-2">{cartitems.quantity}</span>

                  <Button variant="outline-secondary cartpg-btn-minus" size="sm"      
                      onClick={() => handleIncrementQuantity(cartitems.id, cartitems.variationId)}>
                    +
                  </Button>
                </td>

                <td class="product-subtotal" data-title="Subtotal">
                   {cartitems.price * cartitems.quantity}.00</td>
                
          </tr>
  )):null} 
          
            </tbody>
          </Table>
        </div>  

        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder="Coupon code"
            className="me-2"
          />
          <Button variant="dark">Apply coupon</Button>
        </Form>
        {/* <Button variant="warning" className="update-basket-btn">
          Update basket
        </Button> */}
      </Col>
    </Row>

    <Row className="mt-4">
      <Col md={4} className="ms-auto">
        <div className="basket-totals">
          <h5>Basket totals</h5>
          <div className="d-flex">
            <span>Subtotal</span>
            <span>Rs {calculateSubtotal()}.00</span>
          </div>
          <div className="d-flex mt-2">
            <strong>Total</strong>
            <strong>Rs {calculateSubtotal()}.00</strong>
          </div>
          <Button variant="dark" className="proceed-to-checkout w-100 text-white">
            <Link    href="/checkout" className="text-white">
            Proceed to checkout
            </Link>
          
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
  </>
  )
}

export default Cart