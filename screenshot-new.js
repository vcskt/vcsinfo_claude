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
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'screenshot-new.png', fullPage: true });
  console.log('Screenshot taken');
  await browser.close();
})();
