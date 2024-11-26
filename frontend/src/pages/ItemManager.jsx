import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Popconfirm,
  notification,
  InputNumber,
  Checkbox,
  Row,
  Col,
  Upload,
} from "antd";
import { foodItemService } from "../services/food.item.service";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../services/uploadFileService";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #ff9e00;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const SearchInput = styled(Input)`
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  padding: 10px;
  &:hover {
    border-color: #ff8c00;
  }
`;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #ffd699;
    color: #5a3e00;
    font-weight: bold;
    text-align: center;
  }
  .ant-table-tbody > tr > td {
    background-color: #fffaf0;
    color: #4a4a4a;
    text-align: center;
  }
  .ant-pagination-item-active {
    background-color: #ff8c00 !important;
    border-color: #ff8c00 !important;
    a {
      color: white !important;
    }
  }
  border-radius: 8px;
  overflow: hidden;
`;

const AddButton = styled(Button)`
  margin-bottom: 20px;
  margin-left: 7px;
  padding: 10px;
  background-color: #ff8c00;
  border-color: #fff;
  color: white;
  border-radius: 8px;
  &:hover {
    background-color: #ffa700 !important;
    color: white !important;
  }
`;

const GeneratePDFButton = styled(Button)`
  margin-bottom: 20px;
  margin-left: 7px;
  padding: 10px;
  background-color: #ff8c00;
  border-color: #fff;
  color: white;
  border-radius: 8px;
  &:hover {
    background-color: #ffa700 !important;
    color: white !important;
  }
`;

const ItemManager = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFoodItems();
  }, []);

  useEffect(() => {
    setFilteredItems(
      foodItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, foodItems]);

  const fetchFoodItems = async () => {
    try {
      const items = await foodItemService.getAllFoodItems();
      setFoodItems(items);
      setFilteredItems(items); // Initialize filtered items
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch food items.",
      });
    }
  };

  const showModal = (item) => {
    if (item) {
      setEditingItem(item);
      form.setFieldsValue(item);
    } else {
      setEditingItem(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      let imageUrl = "";
      if (values.imageUrl && values.imageUrl.length > 0) {
        imageUrl = await uploadFile(values.imageUrl[0].originFileObj);
      } else {
        imageUrl = editingItem?.imageUrl;
      }

      if (editingItem) {
        // Update food item
        await foodItemService.updateFoodItem(editingItem._id, {
          ...values,
          imageUrl: imageUrl,
        });
        notification.success({
          message: "Success",
          description: "Food item updated successfully.",
        });
      } else {
        // Create new food item
        await foodItemService.createFoodItem({ ...values, imageUrl: imageUrl });
        notification.success({
          message: "Success",
          description: "Food item created successfully.",
        });
      }
      fetchFoodItems();
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to save food item.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await foodItemService.deleteFoodItem(id);
      notification.success({
        message: "Success",
        description: "Food item deleted successfully.",
      });
      fetchFoodItems();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete food item.",
      });
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Foods List", 10, 10);
    doc.autoTable({
      head: [["ID", "Name", "Price", "Cook Time", "Favorite"]],
      body: filteredItems.map((item) => [
        item._id,
        item.name,
        item.price,
        item.cookTime,
        item.favorite ? "Yes" : "No",
      ]),
    });
    doc.save("food-items-report.pdf");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Cook Time",
      dataIndex: "cookTime",
      sorter: (a, b) => a.cookTime.localeCompare(b.cookTime),
    },
    {
      title: "Favorite",
      dataIndex: "favorite",
      render: (text) => <Checkbox checked={text} disabled />,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure you want to delete this food item?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Container>
        <Title>Item Manager</Title>
        <SearchInput
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 16, width: 300 }}
        />
        <AddButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal(null)}
          style={{ marginBottom: 16, marginLeft: 8 }}
        >
          Add Food Item
        </AddButton>
        <GeneratePDFButton
          type="default"
          onClick={generateReport}
          style={{ marginBottom: 16, marginLeft: 8 }}
        >
          Generate Report
        </GeneratePDFButton>
        <StyledTable
          dataSource={filteredItems}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />

        <Modal
          title={editingItem ? "Edit Food Item" : "Add Food Item"}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="ID"
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the food item ID!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the food item name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[
                    {
                      required: true,
                      type: "number",
                      message: "Please enter a valid price!",
                    },
                  ]}
                >
                  <InputNumber min={0} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Cook Time"
                  name="cookTime"
                  rules={[
                    { required: true, message: "Please enter the cook time!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Favorite"
                  name="favorite"
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Origins"
                  name="origins"
                  rules={[
                    { required: true, message: "Please enter the origins!" },
                  ]}
                >
                  <Input placeholder="Comma-separated values" />
                </Form.Item>
              </Col>
              <Col span={12}>
                {!editingItem && (
                  <Form.Item
                    name="imageUrl"
                    label="Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e && e.fileList; // Adjust this line if necessary to manage single file upload.
                    }}
                    rules={[
                      { required: true, message: "Please upload the file!" },
                    ]}
                  >
                    <Upload beforeUpload={() => false} maxCount={1}>
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  </Form.Item>
                )}
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Tags"
                  name="tags"
                  rules={[
                    { required: true, message: "Please enter the tags!" },
                  ]}
                >
                  <Input placeholder="Comma-separated values" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Health Benefits"
                  name="healthBenefits"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the health benefits!",
                    },
                  ]}
                >
                  <Input placeholder="Comma-separated values" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Container>
    </div>
  );
};

export default ItemManager;
