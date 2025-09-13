import "./globals.css";
import "./styleguide.css";
import "./style.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  return (
    <div className="product-details-page">
      {/* Top Header */}
      {/*<div className="top-header">
        <div className="frame">
          <div className="div">
            <p className="text-wrapper">
              โปรโมชันพิเศษรับซัมเมอร์! ชุดว่ายน้ำลด 50% ทุกแบบ พร้อมส่งฟรีแบบด่วนพิเศษ!
            </p>
            <div className="text-wrapper-2">ช็อปเลย!</div>
          </div>
          <div className="frame-2">
            <div className="text-wrapper-3">ไทย</div>
            <img className="img" src="img/drop-down.svg" alt="Dropdown" />
          </div>
        </div>
      </div>}

      {/* Header */}
      {/*<div className="header">
        <div className="frame-3">
          <div className="logo">
            <div className="exclusive">Agaya</div>
          </div>
          <div className="frame-4">
            <div className="div-wrapper">
              <div className="text-wrapper-4">เปิดร้านค้าใหม่</div>
            </div>
            <div className="div-wrapper">
              <div className="text-wrapper-5">ช่วยเหลือ</div>
            </div>
            <div className="header-2">
              <div className="text-wrapper-6">สมัครใหม่</div>
            </div>
            <div className="header-3">
              <div className="text-wrapper-7">เข้าสู่ระบบ</div>
            </div>
          </div>
        </div>
        <div className="frame-5">
          <div className="search-component-set">
            <div className="frame-6">
              <div className="text-wrapper-8">ค้นหาสินค้าและร้านค้า</div>
              <img className="img" src="img/component-2.svg" alt="Search" />
            </div>
          </div>
          <div className="frame-7">
            <img className="img-2" src="img/wishlist.svg" alt="Wishlist" />
            <div className="with-buy"></div>
            <img className="img-2" src="img/user.svg" alt="User" />
          </div>
        </div>
      </div>*/}

      <div className="line"></div>

      {/* Roadmap */}
      <div className="roadmap">
        <div className="text-wrapper-9">Account</div>
        <img className="line-2" src="img/line-13.svg" alt="line" />
        <div className="text-wrapper-9">Gaming</div>
        <img className="line-2" src="img/line-16.svg" alt="line" />
        <div className="nothing">{product.product.product_name}</div>
      </div>

      {/* Product Images */}
      <div className="image-wrapper">
        <img className="image" src="img/image-63.png" alt="Product" />
      </div>
      <div className="img-wrapper">
        <img className="image-2" src="img/image-57.png" alt="Product" />
      </div>
      <div className="frame-8">
        <img className="image-3" src="img/image-58.png" alt="Product" />
      </div>
      <div className="frame-9">
        <img className="image-4" src="img/image-61.png" alt="Product" />
      </div>
      <div className="frame-10">
        <img className="image-5" src="img/image-59.png" alt="Product" />
      </div>

      {/* Product Info */}
      <div className="text-wrapper-10">{product.product.product_name}</div>
      <div className="text-wrapper-11">${product.product.price}</div>

      <div className="frame-11">
        <div className="div-2">
          <div className="div-3">
            <img className="vector" src="img/vector-8.svg" alt="" />
            <img className="vector" src="img/vector-21.svg" alt="" />
            <img className="vector" src="img/vector-15.svg" alt="" />
            <img className="vector" src="img/vector-22.svg" alt="" />
            <img className="vector" src="img/vector-14.svg" alt="" />
          </div>
          <div className="text-wrapper-9">(150 Reviews)</div>
        </div>
        <div className="frame-12">
          <img className="line-3" src="img/line-17.svg" alt="" />
          <div className="text-wrapper-12">In Stock</div>
        </div>
      </div>

      <p className="playstation">
        PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install &amp;
        mess free removal Pressure sensitive.
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
          <img className="icon-minus" src="img/icon-minus.svg" alt="Minus" />
        </div>
        <div className="frame-21">
          <div className="text-wrapper-20">2</div>
        </div>
        <div className="icon-plus-wrapper">
          <img className="icon-plus" src="img/icon-plus.svg" alt="Plus" />
        </div>
      </div>

      {/* Buy Now Button */}
      <button className="button">
        <div className="text-wrapper-21">Buy Now</div>
      </button>
      <div className="wishlist-wrapper">
        <img className="wishlist" src="img/wishlist.svg" alt="Wishlist" />
      </div>

      {/* Delivery & Return Info */}
      <div className="frame-22">
        <div className="under-line-2"></div>
        <div className="frame-23">
          <img className="img-4" src="img/icon-delivery.svg" alt="Delivery" />
          <div className="frame-24">
            <div className="text-wrapper-22">Free Delivery</div>
            <p className="p">Enter your postal code for Delivery Availability</p>
          </div>
        </div>
        <div className="frame-25">
          <img className="img-4" src="img/icon-return.svg" alt="Return" />
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
  );
};

export default ProductDetailPage;
