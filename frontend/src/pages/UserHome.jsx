import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh; /* Changed from height to min-height */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding-bottom: 3rem; /* Added padding to avoid overlap with footer */
  background: #ffb347;
`;

const VideoContainer = styled.div`
  width: 300vh;
  height: 100vh; /* Adjust as needed */
  overflow: hidden; /* This will hide any overflow */
  position: relative; /* Relative positioning to allow absolute positioning for inner elements */
`;

const Video = styled.video`
  width: auto;
  height: auto; /* Keep height auto to maintain aspect ratio */
  min-height: 100%; /* Ensure it fills the container */
  object-fit: cover; /* Cover the area, cropping as needed */
  object-position: center; /* Center the video */
  position: absolute; /* Allows video to fill the parent container */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center the video */
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 1;
`;

const Title = styled.h1`
  color: white;
  font-size: 3.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
  position: absolute; /* Position the title absolutely */
  top: 25%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Offset to truly center */
  z-index: 2;
  margin-bottom: 1rem;
  animation: fadeIn 2s ease-in-out;
`;

const IntroText = styled.p`
  color: white;
  font-size: 1.2rem;
  text-align: center;
  width: 80%;
  max-width: 800px;
  line-height: 1.6;
  z-index: 2;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  animation: fadeIn 3s ease-in-out;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  background-color: orange;
  color: white;
  border-color: white;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: fadeIn 4s ease-in-out;

  &:hover {
    background-color: #cf6d1b;
    transform: scale(1.05);
  }
`;

const UserHome = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const videoRef = useRef(null); // Create a reference to the video element

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 20; // Set the start time (in seconds) from where the video should start
    }
  }, []); // Run on mount

  const handleButtonClick = () => {
    navigate("/item-manager"); // Navigate to /item-manager
  };

  return (
    <Wrapper>
      <VideoContainer>
        <Video ref={videoRef} autoPlay loop muted>
          <source src="homeVV.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
      </VideoContainer>
      <Overlay />
      <Title>Wellness Kitchen</Title>
      <IntroText>
        Welcome to Wellness Kitchen – Your Ultimate Destination for Healthy
        Eating! At Wellness Kitchen, we believe that eating well should be easy,
        enjoyable, and accessible to everyone. Our online platform brings you a
        wide variety of delicious and nutritious meals, carefully crafted to
        support your health and well-being. Whether you're managing specific
        health conditions, following a diet plan, or simply looking to make
        healthier food choices, our menu has something for everyone. With a
        focus on fresh ingredients, balanced nutrition, and expert preparation,
        we are committed to delivering meals that nourish your body and delight
        your taste buds. Order now and experience the convenience of healthy
        eating delivered straight to your doorstep!
      </IntroText>
      <Button onClick={handleButtonClick}>Explore Menu</Button>
    </Wrapper>
  );
};

export default UserHome;
