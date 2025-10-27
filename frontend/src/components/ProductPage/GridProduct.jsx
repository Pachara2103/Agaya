import ProductCard from "./ProductCard";

const GridProductAndTitle = ({ title, products, details }) => {
  return (
    <div class="flex flex-col gap-5 w-full ">
      <div class="flex flex-row gap-5 h-8 items-center">
        <div class="w-4 h-full rounded-[4px] bg-[#DB4444]"></div>
        <p class="text-[14px] font-bold text-[#000]">{title}</p>
      </div>

      <div class="flex gap-5 h-8 items-center">
        <span class="text-3xl text-[#000] font-bold">{details}</span>
      </div>

      <div class="flex items-center justify-center w-full ">
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export const ProductGrid = ({ products }) => {
  return (
    <div class="flex items-center justify-center w-full">
      <div class="p-10">
        <div class="grid grid-cols-5 max-[1380px]:grid-cols-4 max-[1200px]:grid-cols-3 min-w-[600px] gap-x-8 gap-y-12 hide-scrollbar">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridProductAndTitle;
