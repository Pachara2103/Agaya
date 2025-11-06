import { useState, useEffect } from 'react';
import { createProduct, updateProduct, uploadProductImage, deleteProduct } from '../libs/productService';
import { getCategories } from '../libs/categoryService';

export const useProductForm = ({ product, isEdit, setPageSelected }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [promotion, setPromotion] = useState('');
  const [haspromotion, setHasPromotion] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [confirmdelete, setConfirmDelete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allcategory, setAllCategory] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    if (name.length > 200) return 'ชื่อสินค้าต้องมีความยาวไม่เกิน 200 ตัวอักษร';
    return '';
  };

  const validateDescription = (description) => {
    if (description.length > 200) return 'รายละเอียดสินค้าต้องมีความยาวไม่เกิน 200 ตัวอักษร';
    return '';
  };

  const validatePrice = (price) => {
    if (!/^\d*\.?\d+$/.test(price)) return 'กรุณากรอกราคาเป็นตัวเลขที่ถูกต้อง';
    const priceValue = parseFloat(price);
    if (priceValue < 0 || priceValue > 99999999) return 'ราคาสินค้าต้องอยู่ระหว่าง 0 ถึง 99,999,999';
    return '';
  };

  const validateStock = (stock) => {
    if (!/^\d+$/.test(stock)) return 'กรุณากรอกจำนวนคลังเป็นตัวเลขจำนวนเต็ม';
    const stockValue = parseInt(stock, 10);
    if (stockValue < 0 || stockValue > 99999) return 'จำนวนสินค้าในคลังต้องอยู่ระหว่าง 0 ถึง 99,999';
    return '';
  };

  const validatePromotion = (promotion) => {
    if (!/^\d+$/.test(promotion)) return 'โปรโมชั่นต้องเป็นตัวเลขจำนวนเต็ม';
    const promotionValue = parseInt(promotion, 10);
    if (promotionValue < 1 || promotionValue > 99) return 'โปรโมชั่นต้องอยู่ระหว่าง 1 ถึง 99';
    return '';
  };

  const validateImage = (file) => {
    if (!file && !isEdit) return 'กรุณาเลือกรูปภาพ';
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) return 'รองรับไฟล์ .jpeg, .png, .jpg เท่านั้น';
    }
    return '';
  };

  const validateDates = (startDate, endDate) => {
    if (haspromotion) {
      if (!startDate || !endDate) return 'กรุณาเลือกวันที่เริ่มต้นและสิ้นสุดโปรโมชั่น';
      if (new Date(startDate) >= new Date(endDate)) return 'วันที่เริ่มต้นต้องมาก่อนวันที่สิ้นสุด';
    }
    return '';
  };

  const getThaiDate = (date) => {
    const utcDate = new Date(date);
    const thaiDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
    return thaiDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (product) {
      setName(product.productName || '');
      setDescription(product.productDescription || '');
      setCategory(product.type || '');
      setPrice(product.price?.toString() || '');
      setStock(product.stockQuantity?.toString() || '');
      if (product.promotion?.active) {
        setHasPromotion(true);
        setPromotion(product.promotion.promoDiscount?.toString() || '');
        setStartDate(product.promotion.startDate ? getThaiDate(product.promotion.startDate) : '');
        setEndDate(product.promotion.endDate ? getThaiDate(product.promotion.endDate) : '');
      }
    }
    const getCategoryData = async () => {
      const categorydata = await getCategories();
      setAllCategory(categorydata.data || []);
    };
    getCategoryData();
  }, [product]);

  const handleFileSelect = (file) => {
    const imageError = validateImage(file);
    if (imageError) {
      setErrors((prev) => ({ ...prev, image: imageError }));
      setSelectedFile(null);
    } else {
      setErrors((prev) => ({ ...prev, image: '' }));
      setSelectedFile(file);
    }
  };

  const handleDeleteProduct = async () => {
    return await deleteProduct(product._id);
  };

  const submit = async () => {
    const newErrors = {
      name: validateName(name),
      description: validateDescription(description),
      price: validatePrice(price),
      stock: validateStock(stock),
      image: validateImage(selectedFile),
      dates: validateDates(startDate, endDate),
      ...(haspromotion && { promotion: validatePromotion(promotion) }),
    };

    if (Object.values(newErrors).some(error => error !== '')) {
      setErrors(newErrors);
      return;
    }

    if (!name || !category || !description || !price || !stock) {
      alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    setIsLoading(true);
    try {
      let imageUrl = isEdit && product.image ? product.image[0] : null;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const uploadRes = await uploadProductImage(formData);
        if (uploadRes.success) {
          imageUrl = uploadRes.imageUrl;
        } else {
          throw new Error('Image upload failed');
        }
      }

      const productData = {
        productName: name,
        type: category,
        productDescription: description,
        price: parseFloat(price) || 0,
        stockQuantity: parseInt(stock, 10) || 0,
        image: imageUrl ? [imageUrl] : (product?.image || []),
        promotion: haspromotion
          ? { active: true, promoDiscount: parseInt(promotion, 10), startDate, endDate }
          : { active: false, promoDiscount: 0, startDate: null, endDate: null },
      };

      const res = isEdit ? await updateProduct(product._id, productData) : await createProduct(productData);

      if (res.success) {
        alert(isEdit ? 'อัพเดตสินค้าสำเร็จ' : 'เพิ่มสินค้าสำเร็จ');
        setPageSelected('สินค้าของฉัน');
      } else {
        alert(res.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่');
      }
    } catch (e) {
      console.error(e);
      alert('เกิดข้อผิดพลาด: ' + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    states: { name, category, description, price, stock, promotion, haspromotion, startDate, endDate, confirmdelete, selectedFile, allcategory, isloading, errors },
    setters: { setName, setCategory, setDescription, setPrice, setStock, setPromotion, setHasPromotion, setStartDate, setEndDate, setConfirmDelete, setErrors },
    handlers: { handleFileSelect, handleDeleteProduct, submit, validateName, validateDescription, validatePrice, validateStock, validatePromotion },
  };
};
