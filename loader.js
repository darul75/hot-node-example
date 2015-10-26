var acorn = require('acorn');

module.exports = function(source) {
  if (this.cacheable) {
    this.cacheable();
  }

  var ast = acorn.parse(source);
  var names = ast.body
      .filter(function(node) { return node.type === 'FunctionDeclaration'; })
      .map(function(node) { return node.id.name; });

  var resourcePath = this.resourcePath;

  console.log('--------resource --------')
  console.log(resourcePath);
  if (/node_modules/.test(resourcePath)) {
    return this.callback(null, source, map);
  }

  // cleaner
  var src = source.replace(/\r?\n|\r/g, ' ');

  // code generation
  var prependTxt,
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
  var routerLevelPattern = /\.(?:get|post|delete|post)\('(\/([\w+\-\*]|\/?)*)/g;

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

   prependText = [
    /*'var __moduleBindings = ' + JSON.stringify(names) + ';\n',*/
    '/* TEST */',
    'if (module.hot) {\n\t',
      'module.hot.data = {\n\t\t',
        'routerNames: '+JSON.stringify(routerNames)+',\n\t\t',
        'routes: '+JSON.stringify(routes)+',\n\t',
      '};\n',
      'module.hot.dispose(function(data){\n\t',
          'data.msg = "hot hot";\n\t',
      '});\n',
      // accept itself
      /*'if (module.parent == null) {\n\t',
        '\tmodule.hot.accept(function(e){\n\t',
          hotCall,
        '});\n\t',
      '} else {\n\t',*/

      'console.log(module.hot.data);\n\t',

      'if (module.hot.data.routerNames.length > 0 && module.hot.data.routes.length > 0) {;\n\t\t',
      'console.log("PATCHING EXPRESS ROUTES");\n\t',
      //'console.log(app);\n\t',
      'var mainLayers = app._router.stack;\n\t',

      'var idxPathToRemove = [];\n\t',

      'mainLayers.forEach(function(layer, idx) {\n\t',
      
      'var idxMainRouteToRemove = [];\n\t',
      // 'if (typeof layer.handle === "function" ||\n\t',
      'if (typeof layer.handle === "function" || layer.route != null) {\n\t',

          'console.log(layer);\n\t',

          'var stack = layer.route != null && layer.route.stack != null ? layer.route.stack : layer.handle.stack;\n\t',          
          
          'if (stack != null) {\n\t',
            'var idxRoutesToRemove = [];\n\t',
            'stack.forEach(function(subLayer, idx2) {\n\t',
              'console.log(subLayer);\n\t',
              'module.hot.data.routes.forEach(function(path) {\n\t',
                'try {\n\t',                  
                  'var match = subLayer.match(path);\n\t',
                  'if (match) {\n\t',
                    'if (idxMainRouteToRemove.indexOf(idx) < 0) {\n\t',
                      'idxMainRouteToRemove.push(idx);\n\t',
                    '}\n\t',
                    'if (idxRoutesToRemove.indexOf(idx2) < 0) {\n\t',
                      'idxRoutesToRemove.push(idx2);\n\t',
                    '}\n\t',
                  '}\n\t',
                '}\n\t',
                'catch (err) {\n\t',
                  'console.log(err);\n\t',
                '}\n\t',
              '});\n\t',  
              'idxRoutesToRemove.forEach(function(elt, idx) {\n\t',
                'stack.splice(idx, 1);\n\t',
              '});\n\t',
            '});\n\t',            
          
          'console.log(idxMainRouteToRemove);\n\t',
          'idxMainRouteToRemove.forEach(function(elt, idx) {\n\t',
            'layer.handle.stack.splice(idx, 1);\n\t',
          '});\n\t',
            
          '}\n\t',
        '}\n\t',
      '});\n\t',

      /*
        'module.hot.accept('+ depsString +', function() {\n\t',
          'console.log(module.hot.data);\n\t',
          /*hotCall,*/
        /*'});\n',*/

      /*'}\n',*/
    '}}'
  ].join(' ');

  appendText = [
    '/* TEST */',
  ].join(' ');

  var newContent = [
      prependText,
      source,
      appendText
    ].join(separator);

  newContent = [      
      source,
      prependText,
    ].join(separator);  

  // var txt2 = src.slice(0, lastIndex) + prependText + src.slice(lastIndex);

  // console.log(txt2);

  // var newContent = [
  //     txt2
  //   ].join(separator);

  //console.log(newContent);

  return newContent;
  //return this.callback(null, newContent);
}
