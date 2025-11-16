import { test, expect } from '@playwright/test';

test('search highlighting shows matches and resets on page change', async ({
  page
}) => {
  await page.goto('/');
  const searchInput = page.getByPlaceholder('Search content...');

  await searchInput.fill('Lorem');
  await expect(page.locator('mark').first()).toContainText(/lorem/i);

  await page.getByRole('button', { name: /documents/i }).click();
  await expect(searchInput).toHaveValue('');
});

test('chatbot sends user messages and receives bot replies', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /chat/i }).click();
  const textarea = page.getByPlaceholder('Type your message...');
  await textarea.fill('Hello there');
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.locator('.message-row.user .bubble').last()).toHaveText(
    'Hello there'
  );

  await expect(page.locator('.message-row.bot')).toHaveCount(1, {
    timeout: 5000
  });
});
