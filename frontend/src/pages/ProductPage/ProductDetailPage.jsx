import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addProductToCart,
  getOrCreateCartByUserId,
} from "../../services/cartService";
import { getMe } from "../../services/authService";
import Cookies from "js-cookie";
import { useCart } from "../../context/CartContext";
import { trackView } from "../../services/cookieService";
import { isOwnerOfProduct } from "../../services/reviewReportService.js";
import {
  ProductImageGallery,
  ProductDetailsPanel,
} from "./ProductSubComponents";
import { getProductsById } from "../../services/productService";
import ProductReviews from "./ProductReviews.jsx";

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { refreshCart } = useCart(); // Get refreshCart from useCart

  const initialProduct = location.state?.product;
  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(!initialProduct);
  const [isError, setIsError] = useState(false);
  const [isOwner, setIsOwner] = useState(null);

  const fetchProductData = async (productId) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await getProductsById(productId);

      const apiProduct = res.data;
      // console.log(productId)
      // console.log(apiProduct);

      if (apiProduct && apiProduct._id) {
        setProduct({
          _id: apiProduct._id,
          productName: apiProduct.productName,
          productDescription: apiProduct.productDescription,
          price: apiProduct.price,
          rating: apiProduct.rating || 0,
          stockQuantity: apiProduct.stockQuantity || 0,
          image: apiProduct.image,
          promotion: apiProduct.promotion || {
            active: false,
            discountPercentage: 0,
          },
          numberOfReviews: apiProduct.numberOfReviews || 0,
          vendorId: apiProduct.vendorId,
        });
      } else {
        setProduct(null);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setIsError(true);
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  const checkOwner = async (vendorId) => {
    const ownerStatus = await isOwnerOfProduct(vendorId);
    setIsOwner(ownerStatus);
    //console.log("isOwnerOfProduct:", ownerStatus);
  };

  useEffect(() => {
    if (localStorage.getItem("cookieConsent") == "given") {
      trackView(id);
      // console.log("track view ", id);
    }
  }, []);

  useEffect(() => {
    if (!product && id) {
      fetchProductData(id);
    } else if (!id) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(
    product?.image?.[0] || "https://via.placeholder.com/500x500"
  );

  useEffect(() => {
    if (product) {
      setSelectedImage(
        product.image?.[0] || "https://via.placeholder.com/500x500"
      );
      checkOwner(product.vendorId);
    }
  }, [product]);

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stockQuantity));
  };
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    console.log(`Added ${quantity} of ${product.productName} to cart!`);
    const token = Cookies.get("token");
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนทำการเพิ่มสินค้าลงในตะกร้า");
      // ในอนาคต เราอาจจะใช้เป็นเพิ่ม cart ได้ทั้งๆที่ไม่ login
      // น่าจะมีวิธีอยู่แต่เดี๋ยวค่อยทำ
      navigate("/signin");
      return;
    }
    if (!product) {
      console.error("Product data is missing.");
      return;
    }

    try {
      const meResponse = await getMe();
      const currentUserId = meResponse.data?._id;

      if (!currentUserId) {
        throw new Error("User authentication failed (No ID found)");
      }

      const cart = await getOrCreateCartByUserId(currentUserId);
      const cartId = cart._id;

      console.log(`Cart ID found: ${cartId}`);
      const result = await addProductToCart(product._id, cartId, quantity);

      console.log("Added to cart successfully:", result);
      alert(`${quantity} of ${product.productName} added to cart!`);
      refreshCart();
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      alert(`Failed to add to cart: ${error.message}. Please log in again.`);
    }
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} of ${product.productName} now!`);
  };

  const prevPageName = location.state?.from || "Result";
  const prevPagePath = location.state?.fromPath || "/";

  if (isLoading) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Loading product details...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold text-red-600">
          Product Not Found or Error Loading
        </h1>
        <button
          onClick={() => navigate("/")}
          className="mt-4 p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="p-16">
        <div className="text-sm text-gray-500 mb-8 flex items-center space-x-1">
          {/* Home */}
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-red-600 transition"
          >
            Home
          </span>

          <span className="text-black">/</span>
          <span className="text-black transition">{prevPageName}</span>

          <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-none">
            {product.productName}
          </span>
        </div>
        <div className="container mx-auto px-4 md:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProductImageGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
            <ProductDetailsPanel
              product={product}
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
          <div className="mt-20">
            <div className="container mx-auto px-4 md:px-8">
              <ProductReviews productId={product._id} isOwner={isOwner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
