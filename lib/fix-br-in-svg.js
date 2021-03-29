const replace = require('replace-in-file')

// replace <br> with <br /> in svg to fix a bug in mermaid-cli
module.exports = (svgFile) => {
  try {
    replace.sync({
      files: svgFile,
      from: /<br>/g,
      to: '<br />',
    })
  } catch (error) {
    console.error(error, 'occured when replacing <br> in', svgFile)
  }
}
