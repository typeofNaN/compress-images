const images = require('images')
const fs = require('fs')

const path = 'images'

function exp(path) {
  fs.readdir(path, (err, files) => {
    if (err) {
      console.log('error:\n' + err)
      return
    }

    files.forEach((file) => {
      fs.stat(path + '/' + file, (err, stat) => {
        if (err) {
          console.log(err)
          return
        }
        // 如果是文件夹，则递归
        if (stat.isDirectory()) {
          exp(path + '/' + file)
        } else {
          // 读出所有的图片文件
          if (file.indexOf('.png') >= 0 || file.indexOf('.jp') >= 0) {
            console.log('文件名:' + path + '/' + file)
            const name = path + '/' + file
            const outName = 'compress/' + file

            images(name)
              .save(outName, {
                quality: 30
              })
          }
        }
      })
    })
  })
}
exp(path)