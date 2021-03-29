const visit = require('unist-util-visit')
const sizeOf = require('image-size')
const fs = require('fs-extra')
const path = require('path')
const { isWebUri } = require('valid-url')
const fixBr = require('./fix-br-in-svg')

module.exports = (options) => (tree) => {
  const root = process.cwd()

  visit(
    tree,
    // only visit p tags that contain an img element
    (node) => node.type === 'image',
    (node) => {
      if (isWebUri(node.url)) {
        // console.log('Resolved image with web url: ', node.url)
        return
      } else if (path.isAbsolute(node.url)) {
        // Image has absolute path
        const absolutePath = path.join(root, 'public', node.url)
        if (path.extname(node.url) === '.svg') {
          fixBr(absolutePath) // replace <br> with <br /> in svg to fix a bug in mermaid-cli
        }
        if (fs.existsSync(absolutePath)) {
          // Convert original node to next/image
          const dimensions = sizeOf(absolutePath)
          node.type = 'jsx'
          node.value = `<Image
          alt={\`${node.alt}\`}
          src={\`${node.url}\`}
          width={${dimensions.width}}
          height={${dimensions.height}}
      />`
          // console.log('Resolved image with absolute path: ', node.url)
        }
      } else {
        // Image has relative path
        const staticPath = path.join('/static', 'images', options.slug, node.url)
        const destPath = path.join(root, 'public', 'static', 'images', options.slug, node.url)
        if (!fs.existsSync(destPath)) {
          // Image not present in the static folder -> Copy image to destination
          let assetFolderResolvedPath = path.resolve(path.dirname(options.sourcePath), node.url)

          if (fs.existsSync(assetFolderResolvedPath)) {
            // console.log('Resolved image with relative path in asset folder: ', node.url)
            fs.copySync(assetFolderResolvedPath, destPath)
          } else {
            assetFolderResolvedPath = path.resolve(
              options.sourcePath.split('.').slice(0, -1).join('.'),
              node.url
            )
            if (fs.existsSync(assetFolderResolvedPath))
              fs.copySync(assetFolderResolvedPath, destPath)
          }
        } else {
          // console.log('Resolved image with relative path in static folder: ', node.url)
        }
        if (path.extname(node.url) === '.svg') {
          fixBr(destPath) // replace <br> with <br /> in svg to fix a bug in mermaid-cli
        }
        // Convert original node to next/image
        const dimensions = sizeOf(destPath)
        node.type = 'jsx'
        node.value = `<Image
          alt={\`${node.alt}\`}
          src={\`${staticPath}\`}
          width={${dimensions.width}}
          height={${dimensions.height}}
      />`
      }
    }
  )
}
