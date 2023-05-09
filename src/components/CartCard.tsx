import { Link } from "react-router-dom";

const CartCard = (props: any) => {
  const {cartProduct} = props;

  return (
    <Link to={`/my-cart/${cartProduct.id}`}>
      <div className="w-full bg-gray-50 shadow-md items-center px-10 py-2 flex justify-between rounded-box">
        <section className="flex gap-5">
          <img 
            src={cartProduct.image}
            alt="shirt" 
            className="w-28" 
          />
          <div className="flex flex-col py-2">
            <p className="font-semibold">{cartProduct.product_name}</p>
            <p>{cartProduct.seller}</p>
          </div>
        </section>
        <section>
          <div className="flex flex-col items-end gap-2">
            <p className="font-semibold">{cartProduct.amount}</p>
            <div className="rounded-xl text-end w-full">
              <input
                type="number"
                className="rounded-xl w-[4.5rem] px-2 border-2 border-customcyan duration-300 active:scale-90"
              />{cartProduct.quantity}
            </div>
            <span className="px-4 w-fit rounded-xl border-2 border-customcyan text-red-600 font-semibold hover:cursor-pointer duration-300 active:scale-90">
              Remove
            </span>
          </div>
        </section>
      </div>
    </Link>
  );
};

export default CartCard;
