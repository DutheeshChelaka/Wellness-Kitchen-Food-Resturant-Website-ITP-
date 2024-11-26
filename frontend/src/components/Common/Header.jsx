import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../images/Logo.png";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f1f1f1;
  padding: 10px 20px;
`;

const Logo = styled.img`
  width: 100px; // Adjust as needed
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px; // Space between links
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-weight: bold;

  &.active {
    color: orange; // Active link color
  }

  &:hover {
    text-decoration: underline;
  }
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const Header = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Logo src={logo} alt="Wellness Kitchen Logo" />
      <NavLinks>
        <NavLinkStyled to="/" isActive={() => location.pathname === "/"}>
          Home
        </NavLinkStyled>
        {!localStorage.getItem("user") && (
          <NavLinkStyled
            to="/login"
            isActive={() => location.pathname === "/login"}
          >
            Login
          </NavLinkStyled>
        )}

        <NavLinkStyled
          to="/item-manager"
          isActive={() => location.pathname === "/item-manager"}
        >
          Foods
        </NavLinkStyled>
        {localStorage.getItem("user") && (
          <NavLinkStyled
            to="/order-history"
            isActive={() => location.pathname === "/order-history"}
          >
            Order History
          </NavLinkStyled>
        )}

        {localStorage.getItem("user") && (
          <NavLinkStyled
            to="/cart"
            isActive={() => location.pathname === "/cart"}
          >
            My Cart
          </NavLinkStyled>
        )}

        {localStorage.getItem("user") && (
          <NavLinkStyled
            to="/login"
            isActive={() => location.pathname === "/login"}
          >
            Logout
          </NavLinkStyled>
        )}
      </NavLinks>
      <UserIcon>
        <span>👤</span> {/* Replace with an actual user icon if needed */}
      </UserIcon>
    </HeaderContainer>
  );
};

export default Header;
