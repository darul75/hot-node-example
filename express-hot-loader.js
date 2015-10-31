var acorn = require('acorn'),
  path = require('path'),
  isExpressRouting = require('./isExpressRouting'),
  SourceNode = require('source-map').SourceNode,
  SourceMapConsumer = require('source-map').SourceMapConsumer,
  makeIdentitySourceMap = require('./makeIdentitySourceMap');

module.exports = function(source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  var resourcePath = this.resourcePath,
    filename = path.basename(resourcePath);

  if (/[\\/]express-hot-loader[\\/]/.test(resourcePath)) {
    return this.callback(null, source, map);
  }

  var fine = true;

  // parse source
  try {
    var ast = acorn.parse(source);
  }
  catch (err) {
    fine = false;
    return this.callback(err);
  }

  /* USE PARSING ?
  var names = ast.body.filter(function(node) {
        return node.type === 'FunctionDeclaration';
      }).map(function(node) {
        return node.id.name;
      });
  */

  console.log('--------resource --------');
  console.log(resourcePath);
  if (/node_modules/.test(resourcePath)) {
    return this.callback(null, source, map);
  }

  // cleaner
  var src = source.replace(/\r?\n|\r/g, ' ');

  // code generation
  var prependTxt = [],
      appendTxt,
      separator = '\n\n';

  var check = isExpressRouting.check(src);

  var processor = require('./processor');

  if (check.containsExpressInstance) {
    processor.setExpressResourcePath(resourcePath);
  }

  prependTxt = [
    'var processor = require(' + JSON.stringify(require.resolve('./processor')) + ');',
    '// INJECT EXPRESS APP',
    'var expressFile = ' +JSON.stringify(processor.mainExpressResourcePath) + ';\n\t',
    'var app = require(' + JSON.stringify(require.resolve(processor.mainExpressResourcePath)) + ');\n\t',
  ];

  appendTxt = [         

    'if (module.hot && ' +JSON.stringify(fine) +') {\n\t',      
      'module.hot.dispose(function(data){\n\t',          
          'if (module.hot.data.routes.length > 0 && app != null) {;\n\t\t',
            'processor.doReload(app, module.hot.data);',
          '}',
      '});\n',

      'var warning = '+JSON.stringify(check.containsExpressInstance)+' && '+(check.routes != null && check.routes.length > 0) + ';',

      'module.hot.data = {\n\t\t',
        'routerNames: '+JSON.stringify(check.routerNames)+',\n\t\t',
        'routes: '+JSON.stringify(check.routes)+',\n\t',
        'warning: warning\n\t',
      '};\n',

      'if (module.hot.data.warning) {',
        'processor.warn();',
      '}',

    '}'    
  ].join(' ');

  //appendTxt = [''];

  if (this.sourceMap === false) {
    return this.callback(null, [
      prependTxt,
      source,
      appendTxt
    ].join(separator));
  }

  if (!map) {
    map = makeIdentitySourceMap(source, this.resourcePath);
  }

  node = new SourceNode(null, null, null, [
    new SourceNode(null, null, this.resourcePath, prependTxt),
    SourceNode.fromStringWithSourceMap(source, new SourceMapConsumer(map)),
    new SourceNode(null, null, this.resourcePath, appendTxt)
  ]).join(separator);

  result = node.toStringWithSourceMap();

  this.callback(null, result.code, result.map.toString());
}
