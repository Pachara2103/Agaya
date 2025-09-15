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

export const ProductGrid = ({ products, onShow, onBack }) => {
  return (
    <div class="flex items-center justify-center w-screen mb-20 ">
      <div class="w-[80vw] h-[40vh] p-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 ">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onShow={onShow}
              onBack={onBack}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridProductAndTitle;
