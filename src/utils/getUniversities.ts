import axios from 'axios';

const API_URL = 'https://api-quality.seekrsgroup.com/v1/auth/get-universities'; // Replace with your actual API endpoint

const getUniversities = async () => {
  try {
    const response = await axios.get(API_URL);
    // Assuming the response data is an array of universities
    const universities = response.data;

    //console.log("uni list", universities);
    // Transform data into the desired format
    const formattedUniversities = (universities as Array<{ name: string}>).map((uni) => ({
      value: uni.name,
      label: uni.name,
    }));
    return formattedUniversities; // Adjust this based on the actual structure of your API response
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};

export default getUniversities;



