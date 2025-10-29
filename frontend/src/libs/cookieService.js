import Cookies from "js-cookie";
import { getProducts, getProductsById } from './productService';

export const getRecommendations = async () => {
    try {
        const res = await getProducts();
        const allProducts = res.data;
        const viewedItemsCookie = Cookies.get("viewedItems");

        if (!viewedItemsCookie) {
            return null;
        }
        let viewedItems = [];
        viewedItems = viewedItemsCookie.split(" ").filter(Boolean);

        if (viewedItems.length === 0) {
            return null;
        }
        const latestProduct = await getProductsById(viewedItems[0]);
        const targetCategory = latestProduct.data.type;
        const recommendations = allProducts.filter(item => item.type == targetCategory);
        if (recommendations.length == 0) { return null; }
        return recommendations;
    } catch (err) {
        throw err;
    }

}

export const trackView = async (productId) => {
    try {
        const userCookie = Cookies.get("viewedItems");
        const viewedItemsCookie = Cookies.get("viewedItems");
        let viewedItems;


        if (viewedItemsCookie) {
            // ใช้ .filter(Boolean) เพื่อกำจัดช่องว่างเปล่า
            // (เผื่อกรณีมี "123  456" หรือ " 123 ")
            viewedItems = viewedItemsCookie.split(" ").filter(Boolean);
            viewedItems = viewedItems.filter(id => id !== productId);
            viewedItems.unshift(productId);
            const limitedHistory = viewedItems.slice(0, 5); //5 items

            Cookies.set('viewedItems', limitedHistory.join(" "), {
                expires: 30,
                path: '/'
            });

        } else {
            Cookies.set('viewedItems', `${productId} `, {
                expires: 30,
                path: '/'
            });
        }

    } catch (err) {
        console.log(err)
    }
};