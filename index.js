const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.screenshot({path: './assests/example.png'});
  await browser.close();
})();


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.pdf({path: './assests/google.pdf', format: 'A4'});
  await browser.close();
})();
