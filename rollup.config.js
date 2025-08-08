import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
export default {
  input: 'packages/vue/src/index.ts',
  output: [
    {
      name: 'Vue',
      file: './packages/vue/dist/vue.js',
      sourcemap: true,
      format: 'iife'
    }
  ],
  // 插件
  plugins: [
    // ts 支持
    typescript({ sourceMap: true }),
    // 模块导入的路径补全
    resolve(),
    // 将 CommonJS 模块转换为 ES2015
    commonjs()
  ]
}
