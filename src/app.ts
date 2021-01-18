import 'reflect-metadata'
import * as fs from 'fs'
import * as path from 'path'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaViews from 'koa-views'
import KoaStatic from 'koa-static'
import sizeOf from 'image-size'
import Big from 'big.js'

const app = new Koa()

const render = KoaViews(__dirname, {
  extension: 'pug'
})

app.context.render = render()

const router = new KoaRouter()
router
  .get('/', async (ctx) => {
    const { images: pages } = getPageImages()
    await render().call(ctx, 'index.pug', {
      pages,
      ...getBannerImages()
    })
  })
  .get('/config', async (ctx) => {
    await render().call(ctx, 'config.pug', getBannerImages())
  })

app
  // .use(render)
  .use(KoaStatic(__dirname))
  .use(router.routes())
  .use(router.allowedMethods())

app.addListener('error', e => {
  console.log('[app error]', e)
})

app.listen(8456, '0.0.0.0')

function getPageImages (): {
  images: string[]
} {
  const images = fs.readdirSync(path.join(__dirname, 'pages'))
    .map(item => `pages/${item}`)
  return {
    images
  }
}

function getBannerImages (): {
  images: string[],
  height: number | string,
  margin: number | string
} {
  const images = fs.readdirSync(path.join(__dirname, 'images'))
    .map(item => `images/${item}`)
  const height = Big(Math.max(...images.map(item => {
    const { width, height } = sizeOf(path.join(__dirname, item))
    return height * 100 / width
  }))).round(2).toNumber()

  return {
    images,
    height,
    margin: 60
  }
}
