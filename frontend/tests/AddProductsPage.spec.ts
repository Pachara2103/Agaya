import { test, expect } from "./login";

test.describe("Add product", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('ร้านค้าของฉัน').click();
    await page.goto(`/seller-page`);
    await page.getByText("เพิ่มสินค้าใหม่").click();

  });

  test("should be able to add product when all information is valid", async ({ page }) => {
    await page.locator('input[type="file"]').setInputFiles("tests/images/games.png");
    await page.fill("#name", "product A"); 
    await page.locator("#category").selectOption("เสื้อผ้า");
    await page.fill("#description", "สินค้ามือสอง");
    await page.fill("#price", "10");
    await page.fill("#stock", "10");
  
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe("เพิ่มสินค้าสำเร็จ");
      await dialog.accept(); 
    });

    await page.getByRole("button", { name: "บันทึก" }).click();
  });

  test("should not be able to add product when invalid information is provided", async ({ page }) => {
    await page.locator('input[type="file"]').setInputFiles("tests/images/games.png");
    await page.fill("#name", "product A");
    await page.locator("#category").selectOption("เสื้อผ้า");
    await page.fill("#description", "สินค้ามือสอง");
    await page.fill("#price", "-10");
    await page.fill("#stock", "10");

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).not.toBe("เพิ่มสินค้าสำเร็จ");
      await dialog.accept();
    });

    await page.getByRole("button", { name: "บันทึก" }).click();
  });

  test("should not be able to add product when all information is not provided", async ({ page }) => {

    await page.locator('input[type="file"]').setInputFiles("tests/images/games.png");
    // await page.fill("#name", "product A");
    await page.locator("#category").selectOption("เสื้อผ้า");
    await page.fill("#description", "สินค้ามือสอง");
    await page.fill("#price", "-10");
    await page.fill("#stock", "10");

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      await dialog.accept();
    });

    await page.getByRole("button", { name: "บันทึก" }).click();
  });

  test("should not be able to add product when image is not provided", async ({ page }) => {

    // await page.locator('input[type="file"]').setInputFiles("tests/images/games.png");
    await page.fill("#name", "product A");
    await page.locator("#category").selectOption("เสื้อผ้า");
    await page.fill("#description", "สินค้ามือสอง");
    await page.fill("#price", "-10");
    await page.fill("#stock", "10");

    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toBe("กรุณาเพิ่มรูปภาพสินค้า");
      await dialog.accept();
    });

    await page.getByRole("button", { name: "บันทึก" }).click();
  });

});

