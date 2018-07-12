var fs = require('fs'),
path = require('path');
fs.copyFileSync(
  path.resolve(__dirname,'./wwwroot/hac-playground/index.html'),
  path.resolve(__dirname,'./wwwroot/hac-playground/404.html'));