// Register.js
import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import styled from "styled-components";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://wallpapercave.com/wp/wp3820394.jpg") !important; /* Path to your background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const RegisterContainer = styled.div`
  width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffe4cc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: #f09c42;
  border: none;
  color: #fff;
  width: 100%;
  font-size: 16px;
  height: 45px;
  &:hover {
    background-color: #ffb74d !important;
    color: #fff !important;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
`;

const LoginLink = styled.p`
  font-size: 14px;
  color: #333;
  margin-top: 10px;
  a {
    color: #f09c42;
    text-decoration: none;
  }
`;

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await userService.createUser(values);
      message.success("Registration successful!");

      form.resetFields();
      navigate("/");
    } catch (error) {
      message.error(error || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <RegisterContainer>
        <Title>Sign-Up</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            label="Health Conditions"
            name="healthConditions"
            rules={[{ required: true, message: "Please select a condition" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select your health conditions"
              allowClear
            >
              <Option value="Diabetes">Diabetes</Option>
              <Option value="Asthma">Asthma</Option>
              <Option value="Hypertension">Hypertension</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <StyledButton htmlType="submit" loading={loading}>
              Sign-Up
            </StyledButton>
          </Form.Item>
        </Form>

        <LoginLink>
          Already have an account? <a href="/login">Login</a>
        </LoginLink>
      </RegisterContainer>
    </PageContainer>
  );
};

export default Register;
