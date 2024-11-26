import React from "react";
import styled from "styled-components";

const PrivacyPolicy = () => {
  return (
    <Container>
      <Title>Privacy Policy</Title>
      <Content>
        <p>
          At Wellness Kitchen, we are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, and protect your personal
          information when you use our website and services.
        </p>
        <p>
          By using our site, you agree to the collection and use of information
          in accordance with this policy. We may update this policy from time to
          time, and we will notify you of any changes by posting the new policy
          on our website.
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
  color: #fff;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #fff !important;
`;

const Content = styled.div`
  font-size: 16px;
  color: #fff;
  line-height: 1.6;
`;

export default PrivacyPolicy;
