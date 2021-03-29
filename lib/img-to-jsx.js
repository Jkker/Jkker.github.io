const visit = require('unist-util-visit')
const sizeOf = require('image-size')
const fs = require('fs-extra')
const path = require('path')

module.exports = (options) => (tree) => {
  // console.log(tree)
  // fs.writeFileSync(`tree.json`, JSON.stringify(tree, null, 2))
  visit(
    tree,
    // only visit p tags that contain an img element
    (node) => node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
    (node) => {
      const imageNode = node.children.find((n) => n.type === 'image')
      console.log('\ncwd：', process.cwd())
      console.log('src: ', options.sourcePath)
      console.log('imageNode.url: ', imageNode.url)
      const assetFolderPath = options.sourcePath.split('.').slice(0, -1).join('.')
      if (path.isAbsolute(imageNode.url)) {
        console.log(imageNode.url, 'is Absolute path! ')
        const absolutePath = path.join(process.cwd(), 'public', imageNode.url)
        if (fs.existsSync(absolutePath)) {
          // Image exist in static folder already
          console.log('abs: ', absolutePath)
          console.log('dim: ', sizeOf(absolutePath))
          const dimensions = sizeOf(absolutePath)

          // Convert original node to next/image
          imageNode.type = 'jsx'
          imageNode.value = `<Image
          alt={\`${imageNode.alt}\`}
          src={\`${imageNode.url}\`}
          width={${dimensions.width}}
          height={${dimensions.height}}
      />`

          // Change node type from p to div to avoid nesting error
          node.type = 'div'
          node.children = [imageNode]
        }
      } else {
        console.log(imageNode.url, 'is relative path! ')

        const resolvedPath = path.resolve(assetFolderPath, imageNode.url)
        if (fs.existsSync(resolvedPath)) {
          console.log(`${imageNode.url} resolved in ${assetFolderPath} !`)

          // Copy file to public/static folder
          const destPath = path.join(
            process.cwd(),
            'public',
            'static',
            'images',
            options.slug,
            imageNode.url
          )
          fs.copySync(resolvedPath, destPath)
          console.log('copy file', imageNode.url, 'to', destPath)

          // Image exist in static folder already
          const dimensions = sizeOf(destPath)
          console.log(dimensions)
          // Convert original node to next/image
          imageNode.type = 'jsx'
          imageNode.value = `<Image
          alt={\`${imageNode.alt}\`}
          src={\`${destPath}\`}
          width={${dimensions.width}}
          height={${dimensions.height}}
      />`

          // Change node type from p to div to avoid nesting error
          node.type = 'div'
          node.children = [imageNode]
        }
      }
    }
  )
}
