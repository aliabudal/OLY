import { Link } from "react-router-dom";

const TransactionCard = (props: any) => {
  const {transactionProd} = props;

  return (
    <Link to={`/transaction-purchase/${transactionProd}`}>
      <div className="w-full bg-gray-50 shadow-md items-center px-10 py-2 flex justify-between rounded-box">
        <section className="flex gap-5">
          <img 
            src={transactionProd?.product_image} 
            alt="shirt" 
            className="w-28" 
          />
          <div className="flex flex-col">
            <p className="font-normal">{transactionProd?.transaction_id}</p>
            <p className="font-medium">{transactionProd?.Item}</p>
            <p className="font-semibold">{transactionProd?.create_at}</p>
          </div>
        </section>
        <section>
          <div className="flex flex-col items-end text-end gap-2">
            <p className="font-extrabold">{transactionProd?.subtotal}</p>
            <p className="font-bold text-orange-600">{transactionProd?.status}</p>
            <span className="px-4 w-fit rounded-xl border-3 border-customcyan text-red-600 font-bold hover:cursor-pointer duration-300 active:scale-90">
            Cancel</span>
            <p className="font-medium">{transactionProd?.transaction_code}</p>
          </div>
        </section>
        <Link to="/payment-party">
          <div className="flex justify-center border-2 bg-customcyan rounded-2xl p-3 text-white font-bold duration-300 hover:cursor-pointer  active:scale-95">
            Payment
          </div>
        </Link>
      </div>
    </Link>
  );
};
  
export default TransactionCard;
  