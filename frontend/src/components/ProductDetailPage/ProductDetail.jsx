import "./styleguide.css";
import "./style.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";

const ProductDetailPage = () => {

  const {id} = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => { 
    const fetchProduct = async () => {
        try {
          console.log("Fetching product:",id);
          const res = await fetch(`http://localhost:5000/api/v1/Agaya/products/${id}`);
          if (!res.ok) {
            throw new Error("Failed to fetch product");
          }
          const data = await res.json();
          setProduct(data);
        } catch (err) {
          console.error(err);
        }
    }

    fetchProduct();

  }, [id]);
  
  if (!product) return <p>Loading...</p>;
  if(!product.product.rating) product.product.rating = 0;
  console.log("Image[0] : ",product.product.image[0]);

  return (
    <div className="app-container">
      <div className="product-details-page" style={{ flex: 1 }}>
        <div className="line" style={{ flex: 1 }}></div>
        {/* Roadmap */}
        <div className="roadmap">
          <div className="text-wrapper-9">Account</div>
          {product.product.type && <img className="line-2" src="https://i.postimg.cc/qB5QkPqq/slash2.webp" alt="line" />}
          {product.product.type && <div className="text-wrapper-9">{product.product.type}</div>}
          <img className="line-2" src="https://i.postimg.cc/qB5QkPqq/slash2.webp" alt="line" />
          <div className="nothing">{product.product.product_name}</div>
        </div>

        {/* Product Images */}
        <div className="image-wrapper">
          {product.product.image?.[0] && (
            <img className="image" src={product.product.image[0]} alt="Product" />
          )}
        </div>
        {product.product.image?.[1] && (<div className="img-wrapper">
          <img className="image-2" src={product.product.image[1]} alt="Product" />
        </div>)}
        {product.product.image?.[2] && (<div className="frame-8">
          <img className="image-3" src={product.product.image[2]} alt="Product" />
        </div>)}
        {product.product.image?.[3] && (<div className="frame-9">
          <img className="image-4" src={product.product.image[3]} alt="Product" />
        </div>)}
        {product.product.image?.[4] && (<div className="frame-10">
          <img className="image-5" src={product.product.image[4]} alt="Product" />
        </div>)}

        {/* Product Info */}
        <div className="text-wrapper-10">{product.product.product_name}</div>
        <div className="text-wrapper-11">${product.product.price.toFixed(2)}</div>

        <div className="frame-11">
          <div className="div-2">
            <div className="div-3">
              <div className="text-wrapper-9">{product.product.rating.toFixed(1)}&nbsp;</div>
              <img className="vector" src="https://i.postimg.cc/JhyD1223/star-new2-f3fdd7b8.png" alt="aa" />
            </div>
            <div className="text-wrapper-9">(150 Reviews)</div>
          </div>
          <div className="frame-12">
            <img className="line-3" src="img/line-17.svg" alt="" />
            <div className="text-wrapper-12">{product.product.stock_quantity} In Stock</div>
          </div>
        </div>

        <p className="playstation">
          {product.product.product_description}
        </p>

        {/* Product Options: Colors */}
        <div className="frame-13">
          <div className="text-wrapper-13">Colours:</div>
          <div className="div-2">
            <div className="img-3">
              <div className="overlap-group">
                <div className="ellipse"></div>
                <div className="ellipse-2"></div>
              </div>
            </div>
            <div className="ellipse-3"></div>
          </div>
        </div>

        {/* Product Options: Size */}
        <div className="frame-14">
          <div className="text-wrapper-14">Size:</div>
          <div className="frame-15">
            <div className="frame-16">
              <div className="text-wrapper-15">XS</div>
            </div>
            <div className="frame-17">
              <div className="text-wrapper-16">S</div>
            </div>
            <div className="frame-18">
              <div className="text-wrapper-17">M</div>
            </div>
            <div className="frame-17">
              <div className="text-wrapper-18">L</div>
            </div>
            <div className="frame-19">
              <div className="text-wrapper-19">XL</div>
            </div>
          </div>
        </div>

        <div className="under-line"></div>

        {/* Quantity Selector */}
        <div className="frame-20">
          <div className="icon-minus-wrapper">
            <img className="icon-minus" src="https://i.postimg.cc/Dz08yM8f/minus-vector-icon.jpg" alt="Minus" />
          </div>
          <div className="frame-21">
            <div className="text-wrapper-20">2</div>
          </div>
          <div className="icon-plus-wrapper">
            <img className="icon-plus" src="https://i.postimg.cc/HxKWxYFB/pinpng-com-plus-sign-png-523438.png" alt="Plus" />
          </div>
        </div>

        {/* Buy Now Button */}
        <button className="button">
          <div className="text-wrapper-21">Buy Now</div>
        </button>
        <div className="wishlist-wrapper">
          <img className="wishlist" src="https://i.postimg.cc/mZtSHw6t/heart.png" alt="Wishlist" />
        </div>

        {/* Delivery & Return Info */}
        <div className="frame-22">
          <div className="under-line-2"></div>
          <div className="frame-23">
            <img className="img-4" src="https://i.postimg.cc/50pk220T/13-09-2025-21-41-04-REC.png" alt="Delivery" />
            <div className="frame-24">
              <div className="text-wrapper-22">Free Delivery</div>
              <p className="p">Enter your postal code for Delivery Availability</p>
            </div>
          </div>
          <div className="frame-25">
            <img className="img-4" src="https://i.postimg.cc/5N5QYQ1X/circle.png" alt="Return" />
            <div className="frame-24">
              <div className="text-wrapper-22">Return Delivery</div>
              <p className="free-days">
                <span className="span">Free 30 Days Delivery Returns. </span>{" "}
                <span className="text-wrapper-23">Details</span>
              </p>
            </div>
          </div>
        </div> 
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
