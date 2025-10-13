import { useNavigate } from "react-router-dom";

const showProductDetail = () => {
  const navigate = useNavigate();
  const onShow = (product) => {
    if (product && product._id) {
      navigate(`/productdetail/${product._id}`, {
        state: { product: product },
      });
    } else {
      console.error("Product ID is missing, cannot navigate to detail page.");
    }
  };
  const backToHome = () => {
    window.location.href = "/";
  };
  return { onShow };
};
export default showProductDetail;
