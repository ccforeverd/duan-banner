import 'reflect-metadata'
import * as fs from 'fs'
import * as path from 'path'
import Koa from 'koa'
import KoaRouter from 'koa-router'

console.log(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))

const app = new Koa()

const router = new KoaRouter()
router.get('/', (ctx) => {
  ctx.body = 'hello world'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8456, '0.0.0.0')
