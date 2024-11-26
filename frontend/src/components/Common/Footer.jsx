import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-top: 1px solid #ccc;
`;

const FooterText = styled.p`
  color: #333;
  font-size: 14px;
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 Wellness Kitchen. All rights reserved.</FooterText>
      <FooterLinks>
        <FooterLink href="/Privacy-Policy">Privacy Policy</FooterLink>
        <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
        <FooterLink href="/contact-us">Contact Us</FooterLink>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;
