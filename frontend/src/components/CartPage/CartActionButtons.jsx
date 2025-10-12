export const CartActionButtons = ({ onReturnToShop, onUpdateCart }) => (
  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
    <button
      onClick={onReturnToShop}
      className="w-full sm:w-auto border border-gray-400 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
    >
      Return to shop
    </button>
    <button
      onClick={onUpdateCart}
      className="w-full sm:w-auto border border-gray-400 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
    >
      Update cart
    </button>
  </div>
);