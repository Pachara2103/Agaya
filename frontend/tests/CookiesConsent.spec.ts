import { test, expect } from "./login";
test.describe("Cookies consent", () => {

    test("should not show recommended products when cookies are not accepted", async ({ page }) => {
        const cookiesBanner = await page.locator('#cookies-banner');
        expect(cookiesBanner).toBeVisible();

        await cookiesBanner.getByRole('button', { name: 'ปฏิเสธ' }).click();
        expect(cookiesBanner).not.toBeVisible();

        const recommendedItems = await page.getByText('เเนะนำสำหรับคุณ')
        expect(recommendedItems).not.toBeVisible();
    });

    test("should show recommended products when cookies are accepted", async ({ page }) => {
        const cookiesBanner = await page.locator('#cookies-banner');
        expect(cookiesBanner).toBeVisible();

        await cookiesBanner.getByRole('button', { name: 'ยอมรับ' }).click();
        expect(cookiesBanner).not.toBeVisible();

        const recommendedItems = await page.getByText('เเนะนำสำหรับคุณ')
        await expect(recommendedItems).toBeVisible();
    });


});