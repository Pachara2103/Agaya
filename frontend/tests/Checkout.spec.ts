import { test, expect } from "./login";
import { mockItems } from './mock-data';

const addToPath = "http://localhost:5000/api/v1/agaya/addto/*";
const getFinalPrice = "http://localhost:5000/api/v1/agaya/products/*"

test.describe("Cart page -> Place an order", () => {
    let item1: any;
    let item2: any;
    let selectIcon: any;

    test.beforeEach(async ({ page }) => {
        await page.route(addToPath, (route) => {
            const method = route.request().method();
            if (method === "GET") {
                route.fulfill({ status: 200, json: mockItems });
            } else if (method === "DELETE") {
                route.fulfill({ status: 200, json: mockItems.slice(0, 1) });
            } else {
                route.continue();
            }
        });

        await page.route(getFinalPrice, (route) => {
            const method = route.request().method();
            if (method === "GET") {
                const url = new URL(route.request().url());
                const parts = url.toString().split('/');
                const product_id = parts[parts.length - 1];
                route.fulfill({ status: 200, json: {data: mockItems.filter(item => item.productId._id == product_id)[0]?.productId} });
            } else {
                route.continue();
            }
        });
        await page.goto(`/cart`)

        item1 = page.locator("#cart_row").filter({ hasText: "game" });
        item2 = page.locator("#cart_row").filter({ hasText: "joy" });
        selectIcon = "button[class*='relative p-1 rounded-full']";

        await expect(item1).toBeVisible();
        await expect(item2).toBeVisible();
    });


    test("should back to cart page when the 'Cancel Order' button is pressed", async ({ page }) => {
        const totalPrice = page.locator("#total-price");
        await item1.locator(selectIcon).click();
        await expect(totalPrice).toHaveText("300.00 ฿");

        await page.locator("#proceed-to-checkout").click();
        await page.waitForURL("**/checkout")

        await expect(page.getByRole("button", { name: "Cancel Order" })).toBeVisible();
        await page.getByRole("button", { name: "Cancel Order" }).click();
        await expect(page).toHaveURL("/cart")
    });

    test("should not be able to place an order when the address is empty", async ({ page }) => {
        const totalPrice = page.locator("#total-price");
        await item1.locator(selectIcon).click();
        await expect(totalPrice).toHaveText("300.00 ฿");

        await page.locator("#proceed-to-checkout").click();
        await page.waitForURL("**/checkout")

        await expect(page.getByRole("button", { name: "Place Order" })).toBeVisible();
        await page.getByRole("button", { name: "Place Order" }).click();

        const errorMsg = 'p[class*="text-red-500"]';
        await expect(page.locator(errorMsg)).toHaveText("กรุณาเลือกที่อยู่สำหรับจัดส่ง");
    });


    test("should place an order successfully when the address is selected and the 'Place Order' button is pressed", async ({ page }) => {
        const mockAddresses = [{ _id: "addr-1", name: "test name", address: "test address" },];
        const mockOrder =
            [{
                order: { cartId: "cart-abc", customerId: "customer A", vendorId: "vendor B", _id: "test-order", },
                transaction: { _id: "1", orderId: "10", paymentMethod: 'cod', amount: 3 }
            }]

        await page.route("http://localhost:5000/api/v1/Agaya/address/*/addresses", (route) => {
            if (route.request().method() === "GET") route.fulfill({ status: 200, json: mockAddresses, });
        });

        await page.route("http://localhost:5000/api/v1/Agaya/orders/checkout", (route) => {
            if (route.request().method() === "POST") route.fulfill({ status: 200, json: { data: mockOrder } });
        });

        const totalPrice = page.locator("#total-price");
        await item1.locator(selectIcon).click();
        await expect(totalPrice).toHaveText("300.00 ฿");

        await page.locator("#proceed-to-checkout").click();
        await page.waitForURL("**/checkout")

        const addAdressButton = page.getByRole("button", { name: "+ ที่อยู่ใหม่" });
        const parentDiv = addAdressButton.locator("..");
        const address = parentDiv.locator("select");
        await address.selectOption("test name - test address"); //select address

        page.once("dialog", async (dialog) => {
            expect(dialog.message()).toBe("สั่งซื้อสินค้าสำเร็จ!");
            await dialog.accept();
        });

        await expect(page.getByRole("button", { name: "Place Order" })).toBeVisible();
        await page.getByRole("button", { name: "Place Order" }).click();

        await expect(page).toHaveURL(/confirm-order/);
        await expect(page.locator('#place-order-success')).toBeVisible();

    });

});