import { useNavigate } from "react-router-dom";
import { FC, ReactNode } from "react";

interface CardProps {
  id: number;
  image?: string;
  name?: string;
  address?: string;
  price?: number;
}

const ProductCard: FC<CardProps> = ({ id, image, name, address, price }) => {
  const navigate = useNavigate();

  function onClickDetail() {
    navigate(`/detail-product/${id}`);
  }

  return (
    <div
      className="card card-compact w-full h-full bg-customcyan shadow-xl p-3 duration-300 hover:cursor-pointer hover:scale-105 active:scale-100 rounded-box"
      onClick={() => onClickDetail()}
    >
      <figure className="pb-3 w-full">
        <img
          src={image}
          alt="image"
          className="rounded-xl duration-300 bg-gray-100 hover:scale-105 h-52 w-full"
        />
      </figure>
      <h2
        className="p-2 text-customcyan rounded-lg text-lg font-extrabold bg-gray-100
      "
      >
        {name}
      </h2>
      <p className="px-2 pt-2 pb-1">{address}</p>
      <p className="px-2 font-semibold">{price} RON</p>
    </div>
  );
};

export default ProductCard;
