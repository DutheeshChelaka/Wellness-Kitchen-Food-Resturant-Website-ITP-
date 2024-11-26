import React, { useEffect, useState } from "react";
import {
  Modal,
  Card,
  Row,
  Col,
  Button,
  message,
  Image,
  Slider,
  Input,
  Checkbox,
} from "antd";
import styled from "styled-components";
import { foodItemService } from "../services/food.item.service";

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

// Styled Components for layout
const ItemGrid = styled.div`
  padding: 40px;
  background-color: #ffae42;
  min-height: 100vh;
`;

const StyledButton = styled(Button)`
  margin-top: 15px;
  background-color: #e88831;
  border: none;
  color: #fff;
  border-radius: 20px;
  padding: 5px 20px;

  &:hover {
    background-color: #ffb74d !important;
    color: white !important;
  }
`;

const AddToCartButton = styled(Button)`
  margin-top: 15px;
  background-color: orange;
  border: none;
  color: #fff;
  width: 100%;
  border-radius: 20px;
  font-weight: bold;
  padding: 10px;

  &:hover {
    background-color: #ffb74d !important;
    color: white !important;
  }
`;

const SearchInput = styled(Input)`
  margin-bottom: 20px;
  border-radius: 80px;
  border-color: #fff;
  box-shadow: #fff;
  width: 100%;
  height: 50px;

  &:focus {
    border-color: #fff;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
`;

const PriceSlider = styled(Slider)`
  margin-bottom: 30px;

  .ant-slider-rail {
    background-color: #fff;
  }

  .ant-slider-track {
    background-color: #32cd32;
  }

  .ant-slider-handle {
    border: 2px solid #ffa500;
    background-color: #fff;
  }
`;

const TagFilterContainer = styled.div`
  margin-bottom: 30px;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
`;

const TagCheckbox = styled(Checkbox)`
  margin: 0 10px;
`;

const UserItems = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]); // New state for selected tags

  useEffect(() => {
    foodItemService.getAllFoodItems().then((res) => {
      setFoodItems(res);
      setFilteredItems(res);
    });
  }, []);

  // Handle price range change
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    filterItems(searchTerm, value, selectedTags);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterItems(term, priceRange, selectedTags);
  };

  // Handle tag selection change
  const handleTagChange = (checkedValues) => {
    setSelectedTags(checkedValues);
    filterItems(searchTerm, priceRange, checkedValues);
  };

  // Filter items based on search term, price range, and selected tags
  const filterItems = (term, priceRange, tags) => {
    const filtered = foodItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(term.toLowerCase());
      const matchesPrice =
        item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesTags = tags.length
        ? tags.some((tag) => item.tags.includes(tag))
        : true; // Check for tags
      return matchesSearch && matchesPrice && matchesTags;
    });
    setFilteredItems(filtered);
  };

  // Handle modal open
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  // Add item to cart
  const addToCart = (item) => {
    // Safely parse cart data from localStorage or initialize as an empty array
    let cart = JSON.parse(localStorage.getItem("cart"));

    // Ensure cart is an array even if data in localStorage is corrupted or missing
    if (!Array.isArray(cart)) {
      cart = [];
    }

    // Check if item already exists in the cart
    const exists = cart.find((cartItem) => cartItem._id === item._id);

    if (exists) {
      message.error("Item is already in the cart");
    } else {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      message.success("Item added to the cart");
    }
  };

  // Extract unique tags from food items
  const uniqueTags = Array.from(
    new Set(foodItems.flatMap((item) => item.tags || []))
  );

  return (
    <PageContainer>
      <ItemGrid>
        <SearchInput
          style={{ marginBottom: "5px" }}
          placeholder="Search food items..."
          value={searchTerm}
          onChange={handleSearchChange}
          allowClear
        />

        <h2 style={{ color: "#fff", fontSize: "15px" }}>Price Range</h2>
        <PriceSlider
          style={{ marginBottom: "50px" }}
          range
          value={priceRange}
          min={0}
          max={2000}
          onChange={handlePriceRangeChange}
          step={10}
          marks={{
            0: "LKR 0",
            500: "LKR 500",
            1000: "LKR 1000",
            1500: "LKR 1500",
            2000: "LKR 2000",
          }}
        />

        {/* Tag Filter */}
        <TagFilterContainer>
          <h2
            style={{
              color: "#fff",
              fontSize: "15px",
              marginRight: "20px",
            }}
          >
            Health Conditions
          </h2>
          <Checkbox.Group
            options={uniqueTags.map((tag) => ({ label: tag, value: tag }))}
            onChange={handleTagChange}
            style={{
              backgroundColor: "#fff",
              borderRadius: "50px",
              paddingLeft: "15px",
              paddingRight: "15px",
              alignItems: "center",
              color: "orange",
            }}
          >
            {uniqueTags.map((tag) => (
              <TagCheckbox key={tag} value={tag}>
                {tag}
              </TagCheckbox>
            ))}
          </Checkbox.Group>
        </TagFilterContainer>

        <Row gutter={[24, 24]}>
          {filteredItems.map((item) => (
            <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<img alt={item.name} src={item.imageUrl} />}
                onClick={() => handleItemClick(item)}
              >
                <Card.Meta
                  style={{ marginBottom: "9px" }}
                  title={item.name}
                  description={`LKR ${item.price}`}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Item Details Modal */}
        <Modal
          visible={isModalVisible}
          title={selectedItem?.name}
          onCancel={handleCancel}
          footer={[
            <StyledButton key="close" onClick={handleCancel}>
              Close
            </StyledButton>,
          ]}
        >
          {selectedItem && (
            <div>
              <Image src={selectedItem.imageUrl} />
              <p>
                <strong>Price:</strong> LKR {selectedItem.price}
              </p>
              <p>
                <strong>Cook Time:</strong> {selectedItem.cookTime}
              </p>
              <p>
                <strong>Health Benefits:</strong>{" "}
                {selectedItem.healthBenefits.join(", ")}
              </p>
              <p>
                <strong>Origins:</strong> {selectedItem.origins.join(", ")}
              </p>
              <p>
                <strong>Tags:</strong> {selectedItem.tags.join(", ")}
              </p>

              {/* Add to Cart Button */}
              <AddToCartButton onClick={() => addToCart(selectedItem)}>
                Add to Cart
              </AddToCartButton>
            </div>
          )}
        </Modal>
      </ItemGrid>
    </PageContainer>
  );
};

export default UserItems;
