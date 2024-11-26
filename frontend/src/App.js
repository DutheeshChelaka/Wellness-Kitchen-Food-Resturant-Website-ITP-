import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import OrderHistory from "./pages/OrderHistory";
import OrderManager from "./pages/OrderManager";
import UserHome from "./pages/UserHome";
import Header from "./components/Common/Header";
import styled from "styled-components";
import Register from "./pages/Register";
import UserItems from "./pages/UserItems";
import MyCart from "./pages/MyCart";
import CheckoutView from "./pages/CheckoutView";
import Footer from "./components/Common/Footer";
import PrivacyPolicy from "./pages/Footer_pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/Footer_pages/TermsOfService";
import ContactUs from "./pages/Footer_pages/ContactUs";

const Wrapper = styled.div`
  width: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Wrapper>
              <Header />
              <Content>
                <Login />
              </Content>
              <Footer />
            </Wrapper>
          }
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/item-manager"
          element={
            <Wrapper>
              <Header />
              <Content>
                <UserItems />
              </Content>
              <Footer />
            </Wrapper>
          }
        />
        <Route
          path="/order-history"
          element={
            <Wrapper>
              <Header />
              <Content>
                <OrderHistory />
              </Content>
              <Footer />
            </Wrapper>
          }
        />
        <Route path="/order-manager" element={<OrderManager />} />
        <Route
          path="/checkout"
          element={
            <Wrapper>
              <Header />
              <Content>
                <CheckoutView />
              </Content>
              <Footer />
            </Wrapper>
          }
        />
        <Route
          path="/register"
          element={
            <Wrapper>
              <Header />
              <Content>
                <Register />
              </Content>
              <Footer />
            </Wrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <Wrapper>
              <Header />
              <Content>
                <MyCart />
              </Content>
              <Footer />
            </Wrapper>
          }
        />
        <Route
          path="/"
          element={
            <Wrapper>
              <Header />
              <Content>
                <UserHome />
              </Content>
              <Footer />
            </Wrapper>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <Wrapper>
              <Header />
              <Content>
                <PrivacyPolicy />
              </Content>
              <Footer />
            </Wrapper>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <Wrapper>
              <Header />
              <Content>
                <TermsOfService />
              </Content>
              <Footer />
            </Wrapper>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Wrapper>
              <Header />
              <Content>
                <ContactUs />
              </Content>
              <Footer />
            </Wrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
