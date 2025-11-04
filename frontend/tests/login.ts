import { test as baseTest } from "@playwright/test";

export const test = baseTest.extend({
    page: async ({ page}, use) => {
        await page.goto(`/signin`);
        await page.fill("#email", "basvendor@gmail.com");
        await page.fill("#password", "Bas254821");
        await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
        await page.waitForURL("/");
        await use(page);
    },
});

export { expect } from "@playwright/test";