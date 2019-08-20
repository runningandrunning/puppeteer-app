const Router = require('koa-router');
const router = new Router();
const nodeUrl = require('url');
const findCookie = require('./utils/find-cookie')
const pdf = require('./lib/pdf.js');
const createPdfBuffer = pdf.createPdfBuffer;
const createPdfFile = pdf.createPdfFile;
const createPdfFileMergedBuffer = pdf.createPdfFileMergedBuffer;
const koaBody = require('koa-body');

router.get('/pdf/create/download', async (ctx, next) => {
  const { url, cookie, pdfOptions } = ctx.request.query;
  const filename = encodeURIComponent(ctx.request.query.filename || 'newpdf');
  const hostname = nodeUrl.parse(url).hostname;
  const pdfBuffer = await createPdfBuffer(url, {
    cookie: findCookie(ctx, hostname, cookie),
    pdfOptions
  });

  ctx.set({
    'Content-Type': 'application/pdf' 
  })

  ctx.body = pdfBuffer
});

router.get('/pdf/create/filename', async (ctx, next) => {
  const { url, cookie, pdfOptions } = ctx.request.query;
  // const filename = encodeURIComponent(ctx.request.query.filename || 'newpdf');
  const hostname = nodeUrl.parse(url).hostname;
  const filename = await createPdfFile(url, {
    cookie: findCookie(ctx, hostname, cookie),
    pdfOptions
  });
  ctx.set({
    'Content-Type': 'application/json' 
  })
  ctx.body = {
    "filename": filename
  }
})

router.post('/pdf/create/files', koaBody(), async (ctx, next) => {
  let { cookie, pdfOptions, list = '' } = ctx.request.body
  const filename = encodeURIComponent(ctx.request.body.filename || 'collectionofpdf')
  list = ctx.request.body.url.split(',').map(item => ({ url: item }))
  const queryList = list.map((item) => {
    const hostname = nodeUrl.parse(item.url).hostname
    return [
      item.url,
      {
        cookie: findCookie(ctx, hostname, item.cookie || cookie || '') || [],
        pdfOptions: item.pdfOptions || pdfOptions
      }
    ]
  })
  const pdfBuffer = await createPdfFileMergedBuffer(queryList)
  ctx.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment;filename="${filename}.pdf"`,
    'Content-Length': `pdfBuffer.length`
  })
  ctx.body = pdfBuffer
})

module.exports = router;