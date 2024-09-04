import { Donut } from "../types/types";
import useDonuts from "../data/donuts";

const Donuts = () => {
  const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const donuts = useDonuts();

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
      <div className="flex justify-between mb-2">
        <input placeholder="hi" />
        <div className="flex justify-end gap-2">
          <select defaultValue={"asc"} defaultChecked={true}>
            <option value={"asc"}>Ascending</option>
            <option value={"desc"}>Descending</option>
          </select>
          <select defaultValue={"name"} defaultChecked={true}>
            <option>Name</option>
            <option>Quantity</option>
            <option>Price</option>
            <option>Date</option>
          </select>
        </div>
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
              <div className="flex justify-between mt-5">
                <button className="px-3 py-1 text-white bg-black rounded">
                  Edit
                </button>
                <button className="px-3 py-1 text-white bg-red-500 rounded">
                  Delete
                </button>
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
