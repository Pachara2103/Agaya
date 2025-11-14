import ProductCard from "./ProductCard";
import "./.css";

const RowProduct = ({ products }) => {
  return (
    <div className="w-full">
      <div className="w-full grid grid-flow-col auto-cols-[200px] md:gap-x-10 lg:gap-x-15 overflow-x-auto hide-scrollbar">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

const RowProductAndTitle = ({ title, products, details }) => {
  return (
    <div className="flex flex-col gap-3 md:gap-5 w-full">
      <div className="flex flex-row gap-5 h-8 items-center">
        <div className="w-4 h-full rounded-[4px] bg-[#DB4444]"></div>
        <p className="text-[14px] font-bold text-[#000]">{title}</p>
      </div>

      <div className="flex gap-5 h-8 items-center">
        <span className="text-2xl md:text-3xl text-[#000] font-bold">{details}</span>
      </div>

      <div className="flex items-center justify-center w-full ">
        <RowProduct products={products} />
      </div>
    </div>
  );
};

export default RowProductAndTitle;
