import { Link } from "react-router-dom";

const SummaryCard = (props: any) => {
    const {summaryproduct} = props;
    
    return (
      <Link to={`/summary/${summaryproduct}`}>
        <div className="w-full bg-gray-50 shadow-md items-center px-10 py-2 flex justify-between rounded-box">
          <section className="flex gap-5">
              <img 
                src={summaryproduct.image} 
                alt="shirt" 
                className="w-28" 
              />
              <div className="flex flex-col py-2">
                  <p className="font-semibold">{summaryproduct.product_name}</p>
                  <p>{summaryproduct.stock}</p>
              </div>
          </section>
          <section>
              <div className="flex flex-col items-end text-end gap-2">
                  <p className="font-semibold">{summaryproduct.price}</p>
              </div>
          </section>
        </div>
      </Link>
    );
  };
  
  export default SummaryCard;
  