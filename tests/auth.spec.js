import { test, expect } from '@playwright/test';

const { email, pass, generateRandomPassword } = require("../user");

test('Successful authorization on the website', async ({ page }) => {
	await page.goto('https://netology.ru/?modal=sign_in');
	await page.screenshot({ path: 'screenshots/successfulfullpage.png', fullPage: true });
	await page.getByText('Войти по почте').click();
	await page.screenshot({ path: 'screenshots/successfulauthpage.png', fullPage: true });
	await page.getByRole('textbox', { name: 'Email' }).click();
	await page.getByRole('textbox', { name: 'Email' }).fill(email);
	await page.screenshot({ path: 'screenshots/successfulfillemail.png', fullPage: true });
	await page.getByRole('textbox', { name: 'Пароль' }).click();
	await page.getByRole('textbox', { name: 'Пароль' }).fill(pass);
	await page.screenshot({ path: 'screenshots/successfulfullpass.png', fullPage: true });
    await page.getByTestId('login-submit-btn').click();
	await page.screenshot({ path: 'screenshots/successfulprofilepage.png', fullPage: true });

    await expect(page).toHaveURL("https://netology.ru/profile");
	await expect(page.locator("h2")).toContainText("Мое обучение");
});

test('Unsuccessful authorization on the website', async ({ page }) => {
    const randomPassword = generateRandomPassword();

	await page.goto('https://netology.ru/?modal=sign_in');
	await page.screenshot({ path: 'screenshots/unsuccessfulfullpage.png', fullPage: true });
	await page.getByText('Войти по почте').click();
	await page.screenshot({ path: 'screenshots/unsuccessfulauthpage.png', fullPage: true });
	await page.getByRole('textbox', { name: 'Email' }).click();
	await page.getByRole('textbox', { name: 'Email' }).fill(email);
	await page.screenshot({ path: 'screenshots/unsuccessfulfillemail.png', fullPage: true });
	await page.getByRole('textbox', { name: 'Пароль' }).click();
	await page.getByRole('textbox', { name: 'Пароль' }).fill(randomPassword);
	await page.screenshot({ path: 'screenshots/unsuccessfulfullpass.png', fullPage: true });
    await page.getByTestId('login-submit-btn').click();
	await page.screenshot({ path: 'screenshots/errorpage.png', fullPage: true });
    
    await expect(page.getByTestId('login-error-hint')).toBeVisible();
    await expect(page.getByTestId('login-error-hint')).toContainText('Вы ввели неправильно логин или пароль.');
});