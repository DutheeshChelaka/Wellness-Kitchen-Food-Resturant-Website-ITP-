// GeoServices.js
export const reverseGeocode = async (latitude, longitude) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.display_name; // or adjust based on the response
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error; // Propagate the error
  }
};
