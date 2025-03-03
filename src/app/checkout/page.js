"use client";
import React, { useState, useEffect } from 'react';
// import SinglePageHeader from "@/Components/singlepageheader/SinglePageHeader";
// import Allpagebanner from "../assets/homepage-images/allpagebanner.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { useRouter } from 'next/navigation';
import CheckoutButton from '@/Components/checkountbutton/StripeCheckoutForm';
import StripeCheckout from '@/Components/checkountbutton/StripeCheckoutForm';

const Checkout = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [price,setPrice]=useState()
    const router=useRouter()
    const [orderData, setOrderData] = useState({
      billing: {
        first_name: "",
        last_name: "",
        address_1: "",
        city: "",
        state: "",
        postcode: "",
        country: "AF",
        email: "",
        phone: "",
      },
      payment_method: "cod", // Default payment method
      payment_method_title: "Cash on Delivery",
      set_paid: true,
      line_items: [],
    });

  // Automatically open the first accordion if there are order items
  useEffect(() => {
    if (cartItems.length > 0) {
      setActiveIndex(0);
      const lineItems = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price:item.price,
      }));
      setOrderData((prevData) => ({ ...prevData, line_items: lineItems }));
    } else {
      setActiveIndex(null);
    }
  }, [cartItems]);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      billing: {
        ...prevData.billing,
        [id]: value,
      },
    }));
  };
  const handlePlaceOrder = async () => {
    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/order`, // Replace with your WooCommerce API URL
        orderData,
      
      );
      console.log("Order placed successfully:", response.data);
      router.push(`/thankyou/${response?.data?.orderId}`)
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle accordion
  };
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const pricemain=orderData?.line_items?.map((e)=>e?.price)

  return (
    <>
      {/* <SinglePageHeader title={"CheckOut"} pagebanner={Allpagebanner} /> */}
    
      <div className='checkoutpage-sec py-5' suppressHydrationWarning>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='cont-wrapper-checkout'>
                <div className='cont-inf'>
                  <h2> Contact information</h2>
                  <p className='py-2'>We'll use this email to send you details and updates about your order.</p>
                  <input
                    type="email"
                    className='form-control'
                    id="email"
                    onChange={handleInputChange}
                    value={orderData.billing.email}
                    required
                    placeholder="Email Address"
                  />                  <p>You are currently checking out as a guest.</p>
                </div>

                <div className='bill-address'>
                  <h2> Billing address</h2>
                  <p className='py-2'>Enter the billing address that matches your payment method.</p>
                  <select size="1" className="wc-blocks-components-select__select" id="billing-country" aria-invalid="false" autocomplete="country">
                    <option value="AF">Afghanistan</option>
                    {/* ... other options */}
                    <option value="ZW">Zimbabwe</option>
                  </select>

                  <div className="name-col">
                  <input
                      type="text"
                      className='form-control'
                      id="first_name"
                      onChange={handleInputChange}
                      value={orderData.billing.first_name}
                      required
                      placeholder="First Name"
                    />                  <input
                    type="text"
                    className='form-control'
                    id="last_name"
                    onChange={handleInputChange}
                    value={orderData.billing.last_name}
                    required
                    placeholder="Last Name"
                  />
                  </div>

                  <input
                    type="email"
                    className='form-control'
                    id="email"
                    onChange={handleInputChange}
                    value={orderData.billing.email}
                    required
                    placeholder="Email Address"
                  />                   <span role="button" tabindex="0">+ Add flat, suite, etc.</span>

                  <div className="name-col">
                  <input
                      type="text"
                      className='form-control'
                      id="city"
                      onChange={handleInputChange}
                      value={orderData.billing.city}
                      required
                      placeholder="City"
                    />                    <select
                    className="form-control"
                    id="country"
                    onChange={handleInputChange}
                    value={orderData.billing.country}
                  >                      {/* States list */}
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                    </select>
                  </div>

                  <div className="name-col">
                  <input
                      type="text"
                      className='form-control'
                      id="postcode"
                      onChange={handleInputChange}
                      value={orderData.billing.postcode}
                      required
                      placeholder="Postcode"
                    />                 
   <input
                      type="text"
                      className='form-control'
                      id="phone"
                      onChange={handleInputChange}
                      value={orderData.billing.phone}
                      required
                      placeholder="Phone"
                    />
                                      </div>
                </div>

                <div className='payment-op'>
                  <h2>Payment options</h2>

                  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className=" payment-tabs m-3">
                    
                      <Tab  title="Cheque payments" eventKey="cheque">
                       <p className="pb-3"> Please send a cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                      </Tab>

                      <Tab eventKey="profile" title="Cash on delivery"                     defaultActiveKey="cod"
                      onSelect={(key) =>
                        setOrderData((prevData) => ({
                          ...prevData,
                          payment_method: key,
                          payment_method_title:
                            key === "cod" ? "Cash on Delivery" : "Cheque Payment",
                        }))   }
                      >
                      <p className="pb-3">  Pay with cash upon delivery.</p>
                      </Tab>
                      <Tab eventKey="card" title="Credit/Debit Card"                     defaultActiveKey="card"
                      onSelect={(key) =>
                        setOrderData((prevData) => ({
                          ...prevData,
                          payment_method: key,
                          payment_method_title:
                            key === "card" ? "card" : "Cheque Payment",
                        }))   }
                      >
                 <p>Pay securely with your card.</p>

                 <StripeCheckout amount={pricemain } />
                 
                                       </Tab>
                      
                   </Tabs>

                 
                  <span>By proceeding with your purchase you agree to our Terms and Conditions and Privacy Policy</span>
                  <div className="place-order-btn py-3">
                  <button type="button" onClick={handlePlaceOrder}>
                      Place Order
                    </button>
                                      </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="checkout-cart">
                <div className="accordion" id="accordionExample">
                  {/* Accordion Item 1 (Order Summary) */}
                  <div className="accordion-item">
                    <h2 className="Order-header">
                      <button
                        className={`accordion-button ${activeIndex === 0 ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => handleToggle(0)}
                        aria-expanded={activeIndex === 0 ? 'true' : 'false'}
                        aria-controls="collapseOne"
                      >
                        Order Summary
                      </button>
                    </h2>

                    <div
                      id="collapseOne"
                      className={`accordion-collapse collapse ${activeIndex === 0 ? 'show' : ''}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body-cart">
                        <div className="container">
                          {cartItems.length > 0 ? (
                            cartItems.map((cartitems, index) => (
                              <div key={index} className="row checkout-cart-row mb-4">
                                <div className="col-12">
                                  <div className="item-cart-col">
                                    <div className="order-summary-item-image">
                                      <div className="order-summary-item_quantity">
                                        <span aria-hidden="true">{ cartitems?.quantity}</span>
                                      </div>
                                      <img
                                          src={cartitems?.img?.src || cartitems?.img[0]}
                                          alt={cartitems?.id}
                                          width={80}
                                          height={80}
                                      />
                                    </div>
                                    <div className="item-title">
                                      <span><b>{cartitems?.name}</b></span>
                                      <span>Rs:{cartitems?.price}</span>
                                      <span>Variation: {cartitems?.variationName}</span>
                                    </div>

                                    <div className="item-price">
                                      <span>Rs {calculateSubtotal()}.00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No items in the order summary.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion Item 2 (Coupon) */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${activeIndex === 1 ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => handleToggle(1)}
                        aria-expanded={activeIndex === 1 ? 'true' : 'false'}
                        aria-controls="collapseTwo"
                      >
                        Add a coupon
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className={`accordion-collapse collapse ${activeIndex === 1 ? 'show' : ''}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="coupon-field">
                          <input
                            type="text"
                            id="couponInput"
                            autoComplete="off"
                            aria-label="Enter code"
                            aria-invalid="false"
                            value=""
                          />
                          <button>
                            <span>Apply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary Total */}
                <div className="subt-total">
                  <span>Subtotal</span>
                  <span>Rs {calculateSubtotal()}.00</span>
                </div>

                <div className="subt-total">
                  <span><b>Total</b></span>
                  <span><b>Rs {calculateSubtotal()}.00</b></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
