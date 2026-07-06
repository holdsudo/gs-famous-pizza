const { test, expect } = require('@playwright/test');

test('renders premium hero and required proof links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /tried the rest/i })).toBeVisible();
  await expect(page.locator('#hero-scene')).toBeVisible();
  await expect(page.getByRole('link', { name: /Facebook/i }).first()).toHaveAttribute('href', 'https://www.facebook.com/guallpafamouspizza/');
  await expect(page.getByRole('link', { name: /Instagram/i }).first()).toHaveAttribute('href', 'https://www.instagram.com/guallpasfamouspizza/');
  await expect(page.getByRole('link', { name: /Yelp/i })).toHaveAttribute('href', 'https://www.yelp.com/biz/guallpas-famous-pizza-iselin');
  await expect(page.getByRole('link', { name: /Tripadvisor/i })).toHaveAttribute('href', 'https://www.tripadvisor.com/Restaurant_Review-g46526-d5099150-Reviews-Guallpa_s_Famous_Pizza-Iselin_New_Jersey.html');
});

test('menu category switching and cart add flow work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: /Specialty Pies/i }).click();
  await expect(page.getByRole('heading', { name: /^Buffalo Chicken Pizza$/i })).toBeVisible();
  await page.getByRole('button', { name: /Customize Buffalo Chicken Pizza/i }).click();
  await page.getByRole('button', { name: /Add to order/i }).click();
  await expect(page.getByText(/Buffalo Chicken Pizza/i).last()).toBeVisible();
  await expect(page.getByText(/\$12\.75/).last()).toBeVisible();
});

test('checkout validates required fields and creates confirmation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Customize 10" Plain Pan Pizza/i }).click();
  await page.getByRole('button', { name: /Add to order/i }).click();
  await page.getByRole('button', { name: /Checkout/i }).click();
  await page.getByRole('button', { name: /Place order/i }).click();
  await expect(page.getByText(/Add your name and phone/i)).toBeVisible();
  await page.getByLabel(/Name/i).fill('Jason');
  await page.getByLabel(/Phone/i).fill('7325550100');
  await page.getByRole('button', { name: /Place order/i }).click();
  await expect(page.getByRole('heading', { name: /Order received/i })).toBeVisible();
  await expect(page.getByText(/GFP-/).first()).toBeVisible();
});
