import React, { useState, useEffect } from "react";
import { Card, Button, InputNumber, Row, Col, message } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  min-height: 100vh;
  background-image: url("https://wallpapercave.com/wp/wp3820409.jpg") !important; /* Path to your background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// Styled Components for layout
const CartContainer = styled.div`
  padding: 20px;
  margin-top: 80px;
  background-color: #f5f5f5;
  border-radius: 70px;
  margin-bottom: 80px;
  margin-left: 5px;
  margin-right: 5px;

  .ant-card {
    margin-bottom: 20px;
    border: black;
  }
  .ant-card-cover img {
    height: 200px;
    object-fit: cover;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center; // centers horizontally
  align-items: center; // centers vertically (if needed)
`;

const CheckoutButton = styled(Button)`
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
  align-items: center;
  &:hover {
    background-color: orange !important;
    color: white !important;
  }
`;

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    try {
      const parsedCart = JSON.parse(savedCart);
      // Check if parsedCart is an array; if not, default to an empty array
      setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      setCartItems([]); // Fallback to an empty array on error
    }
  }, []);

  // Handle quantity change
  const handleQuantityChange = (itemId, value) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === itemId) {
        return { ...item, quantity: value };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle item removal
  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    message.success("Item removed from cart.");
  };

  // Navigate to Checkout page
  const goToCheckout = () => {
    history("/checkout", {
      state: cartItems,
    });
  };

  return (
    <PageContainer>
      <CartContainer>
        <Row gutter={[16, 16]}>
          {cartItems.map((item) => (
            <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={item.name} src={item.imageUrl} />}
                actions={[
                  <Button danger onClick={() => handleRemoveItem(item._id)}>
                    Remove
                  </Button>,
                ]}
              >
                <Card.Meta title={item.name} description={`LKR${item.price}`} />
                <p>
                  <strong>Total Price:</strong> LKR
                  {item.price * (item.quantity || 1)}
                </p>
                <InputNumber
                  min={1}
                  defaultValue={item.quantity || 1}
                  onChange={(value) => handleQuantityChange(item._id, value)}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <Container>
          {cartItems.length > 0 && (
            <CheckoutButton onClick={goToCheckout}>
              Go to Checkout
            </CheckoutButton>
          )}
        </Container>
      </CartContainer>
    </PageContainer>
  );
};

export default MyCart;
