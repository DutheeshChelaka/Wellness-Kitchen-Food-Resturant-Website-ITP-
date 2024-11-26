import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, message, Spin, Radio } from "antd";
import styled from "styled-components";
import { orderService } from "../services/order.service";
import { useNavigate, useLocation } from "react-router-dom";
import MyMap from "../components/Map/Map.js"; // Adjust the import if necessary

const PageContainer = styled.div`
  min-height: 100vh;
  background-image: url("https://wallpapercave.com/wp/wp3820409.jpg") !important; /* Path to your background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const CheckoutContainer = styled.div`
  padding: 30px;
  max-width: auto;
  margin: 100px;
  background-color: #f5f5f5;
  border-radius: 100px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  padding: 100px;
  margin-bottom: 150px;
`;

const StyledButton = styled(Button)`
  background-color: #ffae42;
  border-radius: 70px;
  border: none;
  color: #fff;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 20%;
  height: 60px;
  text-size: 10px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: orange !important;
    color: white !important;
  }
`;

const CheckoutView = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState(""); // State for email
  const [position, setPosition] = useState([6.9271, 79.9614]); // Default position
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state;

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item?.price * (item.quantity ?? 1),
    0
  );

  useEffect(() => {
    console.log("Current address state:", address); // Debug log
  }, [address]); // Log when the address state changes

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const orderData = {
        name: values.name,
        email, // Include email in the order data
        address: address || values.address,
        addressLatLng: {
          lat: position[0],
          lng: position[1],
        },
        paymentMethod: values.paymentMethod,
        totalPrice,
        items: cartItems.map((item) => ({
          food: item._id,
          price: item.price,
          quantity: item.quantity,
        })),
        userId: JSON.parse(localStorage.getItem("user"))["_id"],
      };

      await orderService.createOrder(orderData);
      message.success("Order placed successfully!");
      localStorage.removeItem("cart");

      navigate("/order-history");
    } catch (error) {
      message.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <CheckoutContainer style={{ marginBottom: "100px" }}>
        <h2
          style={{
            color: "orange",
            textAlign: "center",
            paddingBottom: "50px",
            fontSize: "16px",
          }}
        >
          Checkout
        </h2>
        {/* Include MyMap component */}
        <MyMap setAddress={setAddress} setPosition={setPosition} />{" "}
        {/* Pass setPosition if needed */}
        <Spin spinning={loading}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                placeholder="Enter your email"
                value={email} // Use state for controlled input
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input
                placeholder="Enter your address"
                value={address} // Use state for controlled input
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Payment Method"
              name="paymentMethod"
              rules={[
                { required: true, message: "Please select a payment method" },
              ]}
            >
              <Radio.Group>
                <Radio value="Cash on Delivery">Cash on Delivery</Radio>
                <Radio value="Card">Card</Radio>
              </Radio.Group>
            </Form.Item>

            <Row>
              <Col span={12}>
                <p>
                  <strong>Total Price:</strong> LKR{totalPrice?.toFixed(2)}
                </p>
              </Col>
            </Row>

            <StyledButton htmlType="submit" loading={loading}>
              Place Order
            </StyledButton>
          </Form>
        </Spin>
      </CheckoutContainer>
    </PageContainer>
  );
};

export default CheckoutView;
