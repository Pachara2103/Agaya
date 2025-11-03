import ProductCard from "./ProductCard";

const GridProductAndTitle = ({ title, products, details }) => {
  return (
    <div class="flex flex-col gap-5 w-full ">
      <div class="flex flex-row gap-5 h-8 items-center">
        <div class="w-4 h-full rounded-[4px] bg-[#DB4444]"></div>
        <p class="text-[14px] font-bold text-[#000]">{title}</p>
      </div>

      <div class="flex gap-5 h-8 items-center">
        <span class="text-2xl md:text-3xl text-[#000] font-bold">{details}</span>
      </div>

      <div class="flex items-center justify-center w-full ">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export const ProductGrid = ({ products }) => {
  return (
    <div class="w-full">
      <div class="p-5 md:p-10">
        <div class="grid grid-cols-2 min-[620px]:grid-cols-3  min-[1240px]:grid-cols-4 min-[1400px]:grid-cols-5 gap-x-5 gap-y-5 hide-scrollbar">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridProductAndTitle;
