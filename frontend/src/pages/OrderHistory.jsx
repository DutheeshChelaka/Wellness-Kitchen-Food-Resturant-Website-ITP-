import React, { useEffect, useState } from "react";
import { orderService } from "../services/order.service";
import {
  Table,
  Tag,
  Typography,
  Card,
  Row,
  Col,
  Spin,
  message,
  Modal,
  Button,
} from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;

const PageContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://wallpapercave.com/wp/wp3820409.jpg") !important; /* Path to your background image */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const OrderHistoryContainer = styled.div`
  background-color: #ffb347; /* Light background */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  padding-top: 0 !important;
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #ffe8cc; /* Light orange header */
    color: #444;
    font-weight: bold;
    text-align: center;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #fff5e1; /* Subtle highlight on hover */
  }

  .ant-table-tbody > tr > td {
    text-align: center;
    padding: 16px;
    font-size: 14px;
  }

  .ant-btn {
    background-color: #ff7f50; /* Coral button */
    border: none;
    color: white;
  }

  .ant-btn:hover {
    background-color: #ff6347 !important; /* Tomato color on hover */
    color: #ffff !important;
  }
`;

const StyledTag = styled(Tag)`
  border-radius: 12px;
  font-size: 12px;
  padding: 2px 8px;
`;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await orderService.getAllOrders();
        const userId = JSON.parse(localStorage.getItem("user"))["_id"];
        const userOrders = allOrders.filter((order) => order.userId === userId);
        setOrders(userOrders);
      } catch (error) {
        message.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewItems = (order) => {
    setSelectedOrder(order);
    setVisible(true);
  };

  const handleModalClose = () => {
    setVisible(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = (orderId) => {
    Modal.confirm({
      title: "Are you sure you want to cancel this order?",
      onOk: async () => {
        try {
          await orderService.updateOrderStatus(orderId, "CANCELED");
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId ? { ...order, status: "CANCELED" } : order
            )
          );
          message.success("Order canceled successfully.");
        } catch (error) {
          message.error("Failed to cancel order.");
        }
      },
    });
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email", // New column for Email
      dataIndex: "email", // Make sure this corresponds to the email field in your orders
      key: "email",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `LKR${text.toFixed(2)}`,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        if (status === "CANCELED") {
          color = "red";
        } else if (status === "SHIPPED") {
          color = "blue";
        }
        return <StyledTag color={color}>{status}</StyledTag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, order) => (
        <>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewItems(order)}
            style={{ marginRight: 8 }}
          >
            View Items
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleCancelOrder(order._id)}
            disabled={order.status === "CANCELED"}
          >
            Cancel Order
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <OrderHistoryContainer>
        <Title level={2} style={{ color: "#fff", textAlign: "center" }}>
          Order History
        </Title>
        {loading ? (
          <Spin size="large" />
        ) : (
          <StyledTable
            dataSource={orders}
            columns={columns}
            rowKey="_id"
            pagination={false}
          />
        )}
        <Modal
          title={`Ordered Items for Order ID: ${selectedOrder?._id}`}
          visible={visible}
          onCancel={handleModalClose}
          footer={null}
        >
          {selectedOrder && selectedOrder.items.length > 0 ? (
            <Row gutter={16}>
              {selectedOrder.items.map((item, index) => (
                <Col span={8} key={index}>
                  <Card hoverable>
                    <Card.Meta
                      title={item.food.name}
                      description={`Quantity: ${
                        item.quantity
                      }, Price: LKR${item.price.toFixed(2)}`}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No items in this order.</p>
          )}
        </Modal>
      </OrderHistoryContainer>
    </PageContainer>
  );
};

export default OrderHistory;
