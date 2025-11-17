import { API_URL } from "../src/services/api";
import { test, expect } from "./login";
import { mockItems } from './mock-data';

const addToPath = `${API_URL}/addto/*`;

test.describe("Cart page -> Change quantity", () => {
    let gameItem: any;
    const mockItems_Qty3 = mockItems.slice(0, 1);

    test.beforeEach(async ({ page }) => {
        gameItem = page.locator("#cart_row").filter({ hasText: "game" });
    });

    test("should decrease quantity if 1 <= new quantity <= 99999", async ({ page }) => {

        await page.route(addToPath, (route) => {
            const method = route.request().method();
            if (method === "GET") {
                route.fulfill({ status: 200, json: mockItems_Qty3 });
            }
            else if (method === "PUT") {
                route.fulfill({ status: 200, json: [{ ...mockItems_Qty3[0], quantity: 2 }] });
            }
        });
        await page.goto(`/cart`);

        await expect(gameItem.locator("#quantity")).toHaveValue("3");

        await gameItem.locator("#decrease_quantity").click();
        await expect(gameItem.locator("#quantity")).toHaveValue("2");

    });


    test("should disable decrease button when quantity = 1", async ({ page }) => {
        await page.route(addToPath, (route) => {
            const method = route.request().method();
            if (method === "GET") {
                route.fulfill({ status: 200, json: [{ ...mockItems_Qty3[0], quantity: 1 }] });
            }
        });
        await page.goto(`/cart`);

        await expect(gameItem.locator("#quantity")).toHaveValue("1");
        await expect(gameItem.locator("#decrease_quantity")).toBeDisabled();
    });

    test("should add quantity if 1 <= new quantity <= 99999", async ({ page }) => {
        await page.route(addToPath, (route) => {
            const method = route.request().method();
            if (method === "GET") {
                route.fulfill({ status: 200, json: mockItems_Qty3 });
            }
            else if (method === "PUT") {
                route.fulfill({ status: 200, json: [{ ...mockItems_Qty3[0], quantity: 4 }] });
            }
        });
        await page.goto(`/cart`);

        await expect(gameItem.locator("#quantity")).toHaveValue("3");

        await gameItem.locator("#add_quantity").click();
        await expect(gameItem.locator("#quantity")).toHaveValue("4");
    });

    test("should disable add button when quantity = 99999", async ({ page }) => {
        await page.route(addToPath, (route) => {
            const method = route.request().method();
            if (method === "GET") {
                route.fulfill({ status: 200, json: [{ ...mockItems_Qty3[0], quantity: 99999 }] });
            }
        });
        await page.goto(`/cart`);

        await expect(gameItem.locator("#quantity")).toHaveValue("99999");
        await expect(gameItem.locator("#add_quantity")).toBeDisabled();
    });

    test("should change quantity if 1 <= new input quantity <= 99999", async ({ page }) => {
        await page.route(addToPath, (route) => {
            const method = route.request().method();
            if (method === "GET") {
                route.fulfill({ status: 200, json: mockItems_Qty3 });
            }
            else if (method === "PUT") {
                route.fulfill({ status: 200, json: [{ ...mockItems_Qty3[0], quantity: 5 }] });
            }
        });
        await page.goto(`/cart`);


        await expect(gameItem.locator("#quantity")).toHaveValue("3");

        await gameItem.locator("#quantity").fill("5")
        await expect(gameItem.locator("#quantity")).toHaveValue("5");
    });

    test("should set quantity to 1 if new input quantity is empty or <= 0", async ({ page }) => {
        await page.route(addToPath, (route) => {
            const method = route.request().method();
            if (method === "GET") {
                route.fulfill({ status: 200, json: mockItems_Qty3 });
            }
            else if (method === "PUT") {
                route.fulfill({ status: 200, json: [{ ...mockItems_Qty3[0], quantity: 1 }] });
            }
        });
        await page.goto(`/cart`);


        await expect(gameItem.locator("#quantity")).toHaveValue("3");

        await gameItem.locator("#quantity").fill("0")
        await expect(gameItem.locator("#quantity")).toHaveValue("1");
    });

    test("should set quantity to 99999 if new input quantity > 99999", async ({ page }) => {
        await page.route(addToPath, (route) => {
            const method = route.request().method();
            if (method === "GET") {
                route.fulfill({ status: 200, json: mockItems_Qty3 });
            }
            else if (method === "PUT") {
                route.fulfill({ status: 200, json: [{ ...mockItems_Qty3[0], quantity: 99999 }] });
            }
        });
        await page.goto(`/cart`);

        await expect(gameItem.locator("#quantity")).toHaveValue("3");

        await gameItem.locator("#quantity").fill("99999")
        await expect(gameItem.locator("#quantity")).toHaveValue("99999");
    });

});


test.describe("Cart page -> Delete product from cart", () => {
    let gameItem: any;
    let confirmModal: any;

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
        await page.goto(`/cart`);
        gameItem = page.locator("#cart_row").filter({ hasText: "game" });
        confirmModal = "div[class*='fixed inset-0']";

    });
    test("should delete the product from the cart when the confirm delete button is pressed", async ({ page }) => {
        await gameItem.locator("#delete").click();

        await expect(page.locator(confirmModal)).toBeVisible();
        await page.getByRole("button", { name: "ยืนยัน" }).click();

        await expect(page.locator(confirmModal)).not.toBeVisible();
        await expect(gameItem).toHaveCount(0);
    });


    test("should not delete the product from the cart when the back button is pressed", async ({ page }) => {
        await gameItem.locator("#delete").click();

        await expect(page.locator(confirmModal)).toBeVisible();
        await page.getByRole("button", { name: "ย้อนกลับ" }).click();

        await expect(page.locator(confirmModal)).not.toBeVisible();
        await expect(gameItem).toHaveCount(1);
    });

});


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

        await page.route("http://localhost:5000/api/v1/agaya/products/*", (route) => {
            const method = route.request().method();
            if (method === "GET") {
                const url = new URL(route.request().url());
                const parts = url.toString().split('/');
                const product_id = parts[parts.length - 1];
                const foundItem = mockItems.find(item => item.productId._id == product_id);
                route.fulfill({ status: 200, json: { data: foundItem?.productId } });
            } else {
                route.continue();
            }
        });

        await page.goto(`/cart`);

        item1 = page.locator("#cart_row").filter({ hasText: "game" });
        item2 = page.locator("#cart_row").filter({ hasText: "joy" });
        selectIcon = "button[class*='relative p-1 rounded-full']";

        await expect(item1).toBeVisible();
        await expect(item2).toBeVisible();
    });


    test("should not go to the checkout page when no product is selected", async ({ page }) => {
        page.once("dialog", async (dialog) => {
            expect(dialog.message()).toBe("กรุณาเลือกสินค้าอย่างน้อย 1 ชิ้น");
            await dialog.accept();
        });

        await page.locator("#proceed-to-checkout").click();
    });


    test("should go to the checkout page when the product is selected and the 'ดำเนินการชำระเงิน' button is pressed", async ({ page }) => {
        const totalPrice = page.locator("#total-price");
        await item1.locator(selectIcon).click();
        await expect(totalPrice).toHaveText("300.00 ฿");

        await item2.locator(selectIcon).click();
        await expect(totalPrice).toHaveText("500.00 ฿"); // toHaveValue(): ใช้กับ <input>, <select>, <textarea> | toHaveText(): ใช้กับ <span>, <div>, <p>, <button>

        await page.locator("#proceed-to-checkout").click();
        await page.waitForURL("**/checkout")
        await expect(page.getByRole("button", { name: "Place Order" })).toBeVisible();
    });


});