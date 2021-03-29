const visit = require('unist-util-visit')
const sizeOf = require('image-size')
const fs = require('fs-extra')
const path = require('path')

module.exports = (options) => (tree) => {
  const root = process.cwd()
  visit(
    tree,
    // only visit p tags that contain an img element
    (node) => node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
    (node) => {
      const imageNode = node.children.find((n) => n.type === 'image')
      if (path.isAbsolute(imageNode.url)) {
        const absolutePath = path.join(root, 'public', imageNode.url)
        if (fs.existsSync(absolutePath)) {
          // Convert original node to next/image
          const dimensions = sizeOf(absolutePath)
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
        const resolvedPath = path.resolve(
          options.sourcePath.split('.').slice(0, -1).join('.'),
          imageNode.url
        )
        if (fs.existsSync(resolvedPath)) {
          // Copy file to public/static folder
          const destPath = path.join(
            root,
            'public',
            'static',
            'images',
            options.slug,
            imageNode.url
          )
          fs.copySync(resolvedPath, destPath)

          // path of image in /public/static folder
          const staticPath = path.join('/static', 'images', options.slug, imageNode.url)

          // Convert original node to next/image
          const dimensions = sizeOf(destPath)
          imageNode.type = 'jsx'
          imageNode.value = `<Image
          alt={\`${imageNode.alt}\`}
          src={\`${staticPath}\`}
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
