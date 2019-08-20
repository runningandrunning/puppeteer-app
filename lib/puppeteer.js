const puppeteer = require('puppeteer');

class Browser {
  constructor (option) {
    this.option = {}
  }

  async launch () {
    if (!this.browser) {
      this.browser = await puppeteer.launch(this.option)
      this.browser.once('disconnected', () => {
        this.browser = undefined
      })
    }
    return this.browser
  }

  async open (url, { cookie }) {
    await this.launch()
    const page = await this.browser.newPage()
    // 缓存状态下多页面可能出现异常
    await page.setCacheEnabled(false)
    if (cookie) {
      const cookies = Array.isArray(cookie) ? cookie : [ cookie ]
      await page.setCookie(...cookies)
    }

    await page.goto(url, {
      waitUntil: 'networkidle0'
    })
    return page
  }

  async close () {
    if (!this.browser) {
      return
    }
    this.browser.close()
  }
}

const browser = new Browser({
  headless: true
})

process.on('exit', () => {
  browser.close()
})

module.exports = browser
