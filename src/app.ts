import * as fs from 'fs'
import * as path from 'path'

console.log(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))

