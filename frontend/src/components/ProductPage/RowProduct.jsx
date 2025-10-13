import ProductCard from "./ProductCard";
import "./.css";

const RowProduct = ({ products }) => {
  return (
    <div class="flex items-center justify-center w-full">
      <div class="w-full flex flex-row gap-15 overflow-x-auto items-start hide-scrollbar">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const RowProductAndTitle = ({ title, products, details }) => {
  return (
    <div class="flex flex-col gap-5 w-full">
      <div class="flex flex-row gap-5 h-8 items-center">
        <div class="w-4 h-full rounded-[4px] bg-[#DB4444]"></div>
        <p class="text-[14px] font-bold text-[#000]">{title}</p>
      </div>

      <div class="flex gap-5 h-8 items-center">
        <span class="text-3xl text-[#000] font-bold">{details}</span>
      </div>

      <div class="flex items-center justify-center w-full ">
        <RowProduct products={products} />
      </div>
    </div>
  );
};

export default RowProductAndTitle;
