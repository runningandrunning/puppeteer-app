// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false
//   })
//   const page = await browser.newPage()
//   await page.goto('https://baidu.com', {
//     waitUntil: 'networkidle2'
//   })
//   browser.close()
// })()


const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // // Emulates an iPhone X
//   // await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
//   // await page.setViewport({ width: 375, height: 812 });

//   await page.goto('https://baidu.com');
//   await page.waitForSelector('body');
//   await page.focus('#kw');
//   await page.keyboard.type('Keyboard', { delay: 100 });
//   page.keyboard.type('Keyboard', { delay: 100 });
//   await page.keyboard.press('Enter');
//   await page.screenshot({
//     path: 'example.png'
//   });
//   await browser.close();
// })();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://pptr.dev');
  await page.waitForSelector('title');

  // Executes Navigation API within the page context
  const metrics = await page.evaluate(() => JSON.stringify(window.performance));

  // Parses the result to JSON
  console.info(JSON.parse(metrics));

  await browser.close();
})();