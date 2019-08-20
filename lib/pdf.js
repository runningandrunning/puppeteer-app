const browser = require('./puppeteer');
const shellescape = require('shell-escape');
const tmp = require('tmp');
const pdfMerge = require('pdf-merge');
const queneExecAsyncFunc = require('./queue');
const fs = require('fs');


const defaultOptions = {
  format: 'A4'
}

const MAX_QUEUE_LEN = 5

const getUniqueFilename = (() => {
  let cnt = 0
  const pid = process.pid
  return () => {
    if (cnt > 1e18) {
      cnt = 1
    }
    cnt++
    const id = parseInt(`${pid}${Date.now()}`).toString(36)
    return `pdf_${id}_${cnt}`
  }
})

/**
 * 
 * @param { String } url 
 * @param { Object } 
 *  @param { Array } cookie
 *  @param { options } puppeteer pdf options,cover the default setting
 */
async function createPdfBuffer (url, {cookie, options = {}}) {
  const allOptions = Object.assign({}, defaultOptions, options)
  const page = await browser.open(url, { cookie })
  const buff = await page.pdf(allOptions)
  await browser.close()
  return buff
}

async function createPdfFile (url, { cookie, options = {} }) {
  const allOptions = Object.assign({}, defaultOptions, options)
  const page = await browser.open(url, { cookie })

  const filename = shellescape([tmp.tmpNameSync()])
  await page.pdf({
    path: filename,
    ...allOptions
  })
  await page.close()
  return filename
}

async function queueCreatePdfFile (list = []) {
  const result = await queneExecAsyncFunc(createPdfFile, list, { maxLen: MAX_QUEUE_LEN})
  return result
}

async function createPdfFileMergedBuffer (list) {
  const files = await queueCreatePdfFile(list)

  return pdfMerge(files).then((buffer) => {
    return Promise.all(files.map((file) => {
      return new Promise((resolve) => {
        fs.unlink(file, resolve)
      })
    })).then(() => {
      return buffer
    }).catch(error => {
      console.log(error, '===error')
    })
  })
}

module.exports = {
  getUniqueFilename,
  createPdfBuffer,
  createPdfFile,
  queueCreatePdfFile,
  createPdfFileMergedBuffer
}

