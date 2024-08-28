import axios from "axios";
import { useEffect } from "react";
import { Donut } from "../types/types";
import useDonutStore from "../store/donutStore";

const Donuts = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const { donuts, setDonuts } = useDonutStore();

  useEffect(() => {
    const fetchDonuts = async () => {
      if (donuts.length == 0) {
        try {
          const response = await axios.get(`${apiUrl}/api/v1/donuts`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("dunkin")}`,
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

  return (
    <div>
      {donuts.length > 0 ? (
        donuts.map((donut: Donut) => (
          <img src={`${imageUrl}/${donut.imageName}`} key={donut._id} />
        ))
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default Donuts;
