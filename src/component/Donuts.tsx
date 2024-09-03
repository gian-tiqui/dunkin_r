import { useEffect } from "react";
import { Donut } from "../types/types";
import useDonutStore from "../store/donutStore";
import apiClient from "../utils/apiClient";
import { DUNKIN } from "../pages/LoginPage";

const Donuts = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const imageUrl = import.meta.env.VITE_IMAGE_URL;
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

  const titleCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="font-mono">
      <div className="mb-2">
        <input placeholder="hi" />
      </div>
      <div className="flex flex-wrap gap-2">
        {donuts.length > 0 ? (
          donuts.map((donut: Donut) => (
            <div key={donut._id} className="p-2 bg-white rounded shadow">
              <img
                className="aspect-[15/9] h-32 bg-neutral-200 rounded mb-3 p-1"
                src={`${imageUrl}/${donut.imageName}`}
              />
              <p className="mb-2 text-lg font-bold text-center">
                {titleCase(donut.name)}
              </p>
              <div className="flex justify-between">
                <p>Quantity:</p>
                <p>{donut.quantity}</p>
              </div>
              <div className="flex justify-between">
                <p>Price:</p>
                <p>P{donut.price}</p>
              </div>
              <div className="flex justify-between">
                <p>Date Added:</p>
                <p>{formatDate(donut.createdAt)}</p>
              </div>
              <div className="flex justify-between">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
};

export default Donuts;
