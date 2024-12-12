async function getUniversities() {
  const apiUrl = "http://universities.hipolabs.com/search"; //list of universities API
  
  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);
    const universities = await response.json();

    // Transform data into the desired format
    const formattedUniversities = (universities as Array<{ name: string, country: string }>).map((uni) => ({
      value: uni.name,
      label: uni.name,
      country: uni.country,
    }));

    return formattedUniversities;

  } catch (error) {
    console.error("Error fetching universities:", error);
  }
}

export default getUniversities;



