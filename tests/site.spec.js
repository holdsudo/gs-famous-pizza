const { test, expect } = require('@playwright/test');

test('renders premium hero and required proof links', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Famous pizza, engineered to order/i })).toBeVisible();
  await expect(page.locator('#hero-scene')).toBeVisible();
  await expect(page.getByRole('link', { name: /Facebook/i })).toHaveAttribute('href', 'https://www.facebook.com/guallpafamouspizza/');
  await expect(page.getByRole('link', { name: /Instagram/i })).toHaveAttribute('href', 'https://www.instagram.com/guallpasfamouspizza/');
  await expect(page.getByRole('link', { name: /Yelp/i })).toHaveAttribute('href', 'https://www.yelp.com/biz/guallpas-famous-pizza-iselin');
  await expect(page.getByRole('link', { name: /Tripadvisor/i })).toHaveAttribute('href', /tripadvisor\.com\/Restaurant_Review/);
});

test('menu category switching and cart add flow work', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Subs/i }).click();
  await expect(page.getByRole('heading', { name: /Chicken Parm Hero/i })).toBeVisible();
  await page.getByRole('button', { name: /Customize Chicken Parm Hero/i }).click();
  await page.getByRole('button', { name: /Add to order/i }).click();
  await expect(page.getByText(/Chicken Parm Hero/i).last()).toBeVisible();
  await expect(page.getByText(/\$11\.50/)).toBeVisible();
});

test('checkout validates required fields and creates confirmation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Customize Famous Cheese Pie/i }).click();
  await page.getByRole('button', { name: /Add to order/i }).click();
  await page.getByRole('button', { name: /Checkout/i }).click();
  await page.getByRole('button', { name: /Place mock order/i }).click();
  await expect(page.getByText(/Add your name and phone/i)).toBeVisible();
  await page.getByLabel(/Name/i).fill('Jason');
  await page.getByLabel(/Phone/i).fill('7325550100');
  await page.getByRole('button', { name: /Place mock order/i }).click();
  await expect(page.getByRole('heading', { name: /Order received/i })).toBeVisible();
  await expect(page.getByText(/GFP-/)).toBeVisible();
});
