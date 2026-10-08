const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:5174');
  
  console.log('Waiting for network...');
  await new Promise(r => setTimeout(r, 2000));
  
  // Click on "Build and Create" or "Retail Analytics Platform"
  // Let's look for "Build and Create"
  const els = await page.$$('h3');
  for (const el of els) {
    const text = await page.evaluate(e => e.textContent, el);
    if (text.includes('Build and Create')) {
      console.log('Clicking Build and Create');
      await el.click();
      await new Promise(r => setTimeout(r, 1000));
      break;
    }
  }

  // Then click "OPEN SOLUTION BUILDER IDE"
  const btns = await page.$$('button');
  for (const el of btns) {
    const text = await page.evaluate(e => e.textContent, el);
    if (text.includes('OPEN SOLUTION BUILDER IDE')) {
      console.log('Clicking OPEN SOLUTION BUILDER IDE');
      await el.click();
      await new Promise(r => setTimeout(r, 2000));
      break;
    }
  }
  
  await browser.close();
})();
