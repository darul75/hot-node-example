var acorn = require('acorn'),
  path = require('path'),
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
    //console.log(err);
    fine = false;
    return this.callback(err);
  }

  var names = ast.body
      .filter(function(node) { return node.type === 'FunctionDeclaration'; })
      .map(function(node) { return node.id.name; });

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

  /* MATCH
  following declaration

  var router = express.Router();
  const router = express.Router();
  let router = express.Router();
  */
  var routerNamePattern = /(?:var|const|let)\s*(\w+)\s*\=\s*(?:express\.Router)/g;

  /* MATCH
  middleware and HTTP method routes
  */
  var routerLevelPattern = /\.(?:all|get|param|post|delete|post|route|use)\('(\/([\w+\-\*\:]|\/?)*)/g;

  var expressInstanciationPattern = /express\(\)/g;

  var containsExpressInstance = expressInstanciationPattern.test(src);

  /*
  search for require involving express routers or app middlewares
  */
  var requirePattern = /(var\s*)(\w+)* = require\(("|\')([\w+|\.|\/]*)("|\')(\)\;)/g;

  var routerNames = [];

  var routeVariableNameMatch;
  while ((routeVariableNameMatch = routerNamePattern.exec(src)) !== null) {
    routerNames.push(routeVariableNameMatch[1]);
  }

  var routes = [];
  var uses;
  var lastIndex = -1;
  while ((uses = routerLevelPattern.exec(src)) !== null) {
    routes.push(uses[1]);
    if (lastIndex < 0) {
      lastIndex = routerLevelPattern.lastIndex;
    }
  }

  console.log(routerNames);
  console.log(routes);

  var processor = require('./processor');

  if (containsExpressInstance) {
    processor.setExpressResourcePath(resourcePath);
  }

  prependTxt = [    
    'try {',
      '(function () {',
  ];

  appendTxt = [
    '/* EXPRESS HOT LOADER */',
      '}).call(this);',
    '} finally {',
    
    'if (module.hot && ' +JSON.stringify(fine) +') {\n\t',

      'var processor = require(' + JSON.stringify(require.resolve('./processor')) + ');\n\t',
      'var expressFile = ' +JSON.stringify(processor.mainExpressResourcePath) + ';\n\t',
      'var expressReloadApp = require(' + JSON.stringify(require.resolve(processor.mainExpressResourcePath)) + ');\n\t',

      'module.hot.dispose(function(data){\n\t',
          'data.msg = "hot hot";\n\t',
          'console.log("update needed");',
      '});\n',

      'var warning = '+JSON.stringify(containsExpressInstance)+' && '+(routes != null && routes.length > 0) + ';',

      'module.hot.data = {\n\t\t',
        'routerNames: '+JSON.stringify(routerNames)+',\n\t\t',
        'routes: '+JSON.stringify(routes)+',\n\t',
        'warning: warning\n\t',
      '};\n',

      'if (module.hot.data.warning) {',
        'processor.warn();',
      '}',

      'if (module.hot.data.routes.length > 0 && expressReloadApp != null) {;\n\t\t',
        'processor.doReload(expressReloadApp, module.hot.data);',
      '}',

    '}}'
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
