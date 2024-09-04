import { useEffect } from "react";
import { DUNKIN } from "../pages/LoginPage";
import useDonutStore from "../store/donutStore";
import apiClient from "../utils/apiClient";

const useDonuts = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const { donuts, setDonuts } = useDonutStore();

  useEffect(() => {
    const fetchDonuts = async () => {
      if (donuts.length == 0) {
        try {
          const response = await apiClient.get(`${apiUrl}/api/v1/donuts`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(DUNKIN)}`,
            },
          });
          setDonuts(response.data.data.donuts);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchDonuts();
  }, [apiUrl, donuts.length, setDonuts]);

  return donuts;
};

export default useDonuts;
