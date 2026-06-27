const playwright = require('@playwright/test');

(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  // Capture console messages
  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });
  
  await page.goto('http://localhost:4200', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshot-with-console.png', fullPage: true });
  console.log('Screenshot saved');
  await browser.close();
})();
