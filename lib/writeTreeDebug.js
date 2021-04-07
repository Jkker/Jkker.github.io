const fs = require('fs-extra')

module.exports = ({ slug, prefix }) => (tree) => {
  fs.writeFileSync(
    `${prefix ? prefix + '-' : ''}${slug}-unist-tree.json`,
    JSON.stringify(tree, null, 2)
  )
}
