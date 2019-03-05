import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'
import license from 'rollup-plugin-license'
import filesize from 'rollup-plugin-filesize'
import standard from 'rollup-plugin-standard'
import { uglify } from 'rollup-plugin-uglify'

let packageJSON = require('./package.json')

const config = {
  name: packageJSON.name,
  author: packageJSON.author
}

const distFolder = 'dist'
const bundleName = 'ElementVisibilityWatcher'
const globalVariableName = 'ElementVisibilityWatcher'

let defaultConfig = [{
  input: 'src/index.js',
  plugins: [
    standard(),
    resolve({
      extensions: ['.js'],
      browser: true
    }),
    commonjs({
      include: 'node_modules/**'
    }),
    buble({
      objectAssign: 'Object.assign'
    }),
    license({
      sourceMap: true,
      cwd: '.',
      banner: {
        file: path.join(__dirname, 'build.inputs/banner.txt'),
        encoding: 'utf-8',
        data () {
          return config
        }
      }
    }),
    uglify({
      output: {
        comments: function (node, comment) {
          if (comment.type === 'comment2') {
            // multiline comment
            return /@preserve|@license|@cc_on/i.test(comment.value)
          }
          return false
        }
      }
    }),
    filesize()
  ],
  output: [
    {
      sourcemap: true,
      file: path.join(distFolder, `/${bundleName}.js`),
      name: globalVariableName,
      format: 'umd'
    }
  ],
  watch: {
    chokidar: true
    // clearScreen: true,
    // include: 'src/**'
  }
}]

export default commandLineArgs => {
  return defaultConfig
}
