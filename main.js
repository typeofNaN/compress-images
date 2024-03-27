const fs = require('fs')
const images = require('images')

const inDirPath = 'images/'
const outDirPath = 'compress/'

/**
 * @description 压缩图片
 * @param { string } path 目标图片文件夹路径
 * @param { string } quality 压缩质量 0 - 100 默认30
 */
function compressImage(path, quality = 30) {
  fs.readdir(path, (err, files) => {
    if (err) {
      throw Error('error:\n' + err)
    }

    files.forEach(file => {
      fs.stat(path + file, (error, stat) => {
        if (error) {
          throw Error(error)
        }

        // 如果是文件夹，则递归
        if (stat.isDirectory()) {
          compressImage(path + file)
        } else {
          // 读出所有的图片文件
          if (file.indexOf('.png') >= 0 || file.indexOf('.jp') >= 0) {
            const name = path + file
            const outName = outDirPath + file
            
            console.log(`文件${name}正在压缩...`)
            images(name).save(outName, { quality })
            console.log(`文件${name}压缩成功！`)
          }
        }
      })
    })
  })
}

compressImage(inDirPath)