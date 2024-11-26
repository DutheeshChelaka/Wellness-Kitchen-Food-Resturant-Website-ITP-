import React from "react";
import styled from "styled-components";

const TermsOfService = () => {
  return (
    <Container>
      <Title>Terms of Service</Title>
      <Content>
        <p>
          Welcome to Wellness Kitchen. By accessing or using our services, you
          agree to comply with and be bound by the following terms and
          conditions. Please read them carefully before using our website or
          placing an order.
        </p>
        <p>
          We reserve the right to change these terms at any time, and it is your
          responsibility to review them regularly. Continued use of our services
          indicates your acceptance of the updated terms.
        </p>
        {/* Add more sections as needed */}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #fff;
`;

const Content = styled.div`
  font-size: 16px;
  color: #fff;
  line-height: 1.6;
`;

export default TermsOfService;
