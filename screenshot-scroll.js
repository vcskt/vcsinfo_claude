const playwright = require('@playwright/test');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[ERROR] ${msg.text()}`);
    }
  });
  
  await page.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-scroll.png', fullPage: true });
  console.log('Full page screenshot taken');
  await browser.close();
})();
