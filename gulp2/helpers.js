var path = require('path')

function projectPath(...paths) {
  return path.resolve(process.env.INIT_CWD, ...paths);
}

function pathToUrl() {
  // Normalizes Windows file paths to valid url paths
  return path.join.apply(this, arguments).replace(/\\/g, '/')
}

module.exports ={ projectPath }
