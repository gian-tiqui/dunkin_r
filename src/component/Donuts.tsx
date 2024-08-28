import axios from "axios";
import { useEffect } from "react";

const Donuts = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchDonuts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/donuts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("dunkin")}`,
          },
        });
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDonuts();
  }, [apiUrl]);

  return <div>donuts</div>;
};

export default Donuts;
