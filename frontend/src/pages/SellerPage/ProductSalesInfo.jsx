const ProductSalesInfo = ({
  states, setters, handlers
}) => {
  const { price, stock, haspromotion, promotion, startDate, endDate, errors } = states;
  const { setPrice, setStock, setHasPromotion, setPromotion, setStartDate, setEndDate, setErrors } = setters;
  const { validatePrice, validateStock, validatePromotion } = handlers;

  const handlePromotion = (value) => {
    setHasPromotion(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-100 sm:w-270 mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        ข้อมูลการขาย
      </h3>
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-6">
        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">
            <span className="text-red-500">*</span> ราคาสินค้า
          </label>
          <input
            id="price"
            type="number"
            placeholder="ราคา (0 - 99,999,999)"
            className="border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              const error = validatePrice(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, price: error }));
            }}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>
        <div>
          <label className="text-sm text-gray-600">
            <span className="text-red-500">*</span> คลังสินค้า
          </label>
          <input
            id="stock"
            type="number"
            step="1"
            placeholder="คลัง (0 - 99,999)"
            className="border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2"
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
              const error = validateStock(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, stock: error }));
            }}
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
        </div>
        <div className="col-span-2">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <span className="text-red-500">*</span> โปรโมชั่น
            <div className="flex flex-row gap-2 items-center">
              <button className={`w-4 h-4 rounded-full border-2 border-gray-500 cursor-pointer ml-4 ${haspromotion ? "bg-green-500" : ""}`}
                onClick={() => handlePromotion(true)}  >
              </button>
              <p>Yes</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <button className={`w-4 h-4 rounded-full border-2 border-gray-500 cursor-pointer ml-4 ${haspromotion ? "" : "bg-green-500"}`}
                onClick={() => handlePromotion(false)}  >
              </button>
              <p>No</p>
            </div>
          </label>
          <div className="grid grid-cols-10 gap-x-2">
            <div className="col-span-3">
              <input
                id="promotion"
                type="number"
                step="1"
                placeholder="ส่วนลด (1-99)%"
                disabled={!haspromotion}
                className={`border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2 ${haspromotion ? '' : 'bg-gray-200'}`}
                value={haspromotion ? promotion : ''}
                onChange={(e) => {
                  setPromotion(e.target.value);
                  const error = validatePromotion(e.target.value);
                  setErrors((prevErrors) => ({ ...prevErrors, promotion: error }));
                }}
              />
              {errors.promotion && <p className="text-red-500 text-sm">{errors.promotion}</p>}
            </div>
            <div className="col-span-3">
              <input
                id="startDate"
                type="date"
                placeholder="Start Date"
                disabled={!haspromotion}
                className={`border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2 ${haspromotion ? '' : 'bg-gray-200'}`}
                value={haspromotion ? startDate : ''}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-span-3">
              <input
                id="endDate"
                type="date"
                placeholder="End Date"
                disabled={!haspromotion}
                className={`border-3 border-[#c6c6c6] text-[#656565] w-full p-4 outline-none mt-2 ${haspromotion ? '' : 'bg-gray-200'}`}
                value={haspromotion ? endDate : ''}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {errors.dates && <p className="text-red-500 text-sm">{errors.dates}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSalesInfo;
