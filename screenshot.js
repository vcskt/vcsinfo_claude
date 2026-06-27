const playwright = require('@playwright/test');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  console.log('Screenshot saved as screenshot.png');
  await browser.close();
})();
