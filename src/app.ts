import 'reflect-metadata'
import * as fs from 'fs'
import * as path from 'path'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaViews from 'koa-views'

console.log(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))

const app = new Koa()

const router = new KoaRouter()
router.get('/', async (ctx) => {
  // ctx.body = 'hello world'
  await render().call(ctx, 'banner.pug', {
    youAreUsingPug: true
  })
})

const render = KoaViews(__dirname, {
  extension: 'pug'
})

app.context.render = render()

app
  // .use(render)
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8456, '0.0.0.0')
