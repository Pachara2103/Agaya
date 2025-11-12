import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrdersByVendor } from '../services/orderService';
import { getVendorId } from '../services/userService';
import { getTransactionByOrderId } from '../services/transactionService';

const useDashboardData = () => {
  const [toShipCount, setToShipCount] = useState(0);
  const [shippingCount, setShippingCount] = useState(0);
  const [disputedCount, setDisputedCount] = useState(0);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [productsSoldCount, setProductsSoldCount] = useState(0);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [bestSellerSales, setBestSellerSales] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    if (user && user._id) {
      getVendorId(user._id).then(vendorId => {
        if (vendorId) {
          getOrdersByVendor(vendorId)
            .then(response => {
              if (response.success) {
                const orders = response.data.orders;

                const toShip = orders.filter(order => order.orderTracking.length === 1).length;
                const shipping = orders.filter(order => {
                  const latestStatus = order.orderTracking[order.orderTracking.length - 1].statusKey;
                  return ['PICKED_UP', 'IN_TRANSIT', 'FAILED_ATTEMPT'].includes(latestStatus);
                }).length;
                const disputed = orders.filter(order => {
                  const latestStatus = order.orderTracking[order.orderTracking.length - 1].statusKey;
                  return ['REFUNDED', 'APPROVED', 'RETURN_SHIPPED', 'DISPUTED', 'CANCELLED'].includes(latestStatus);
                }).length;

                const completedOrders = orders.filter(order => order.orderTracking[order.orderTracking.length - 1].statusKey === 'COMPLETED');
                
                Promise.all(completedOrders.map(order => getTransactionByOrderId(order._id)))
                  .then(transactions => {
                    const revenue = transactions.reduce((acc, transaction) => {
                      return acc + (transaction.data ? transaction.data.amount : 0);
                    }, 0);
                    setTotalRevenue(revenue);
                  });

                const soldCount = completedOrders.reduce((acc, order) => {
                    return acc + order.contains.reduce((itemAcc, item) => itemAcc + item.quantity, 0);
                }, 0);

                const productSales = {};
                completedOrders.forEach(order => {
                  order.contains.forEach(item => {
                    if (productSales[item.productId]) {
                      productSales[item.productId].totalQuantity += item.quantity;
                    } else {
                      productSales[item.productId] = {
                        name: item.name,
                        image: item.image,
                        totalQuantity: item.quantity,
                      };
                    }
                  });
                });

                let bestSeller = null;
                let maxQuantity = 0;
                for (const productId in productSales) {
                  if (productSales[productId].totalQuantity > maxQuantity) {
                    maxQuantity = productSales[productId].totalQuantity;
                    bestSeller = productSales[productId];
                  }
                }

                setBestSellerProduct(bestSeller);
                setBestSellerSales(maxQuantity);

                setToShipCount(toShip);
                setShippingCount(shipping);
                setDisputedCount(disputed);
                setTotalOrdersCount(orders.length);
                setProductsSoldCount(soldCount);
              }
            })
            .catch(error => {
              console.error("Error fetching vendor orders:", error);
            });
        }
      });
    }
  }, [user]);

  return {
    toShipCount,
    shippingCount,
    disputedCount,
    totalOrdersCount,
    totalRevenue,
    productsSoldCount,
    bestSellerProduct,
    bestSellerSales,
  };
};

export default useDashboardData;
