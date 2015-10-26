// http://stackoverflow.com/questions/10265832/determine-npm-modules-used-from-a-running-node-js-application

//var npm = require('npm');

/*npm.load(function(err, npm) {
    npm.commands.ls([], true, function(err, data, lite) {
        console.log(data); //or lite for simplified output
    });
});*/

var acorn = require('acorn');

function dataBuilder(t) {
  return {
    name: t[2],
    path: t[4],
    fns : []
  };
}

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

  var prependTxt,
      appendTxt,
      separator = '\n\n';

  /* MATCH
  var router = express.Router();
  const router = express.Router();
  let router = express.Router();
  */
  var routerNamePattern = /(?:var|const|let)\s*(\w+)\s*\=\s*(?:express\.Router)/g;

  //var appLevelPattern
  var usePattern = /\.use\('((\/|[\w+\-\*]|\/?)*)/g;
  var restPattern = /\.(?:get|post|delete|post)\('((\/|[\w+\-\*]|\/?)*)/g;
  //var functionCallPattern = /(nameFunction[(\w\,\s)]+)/;
  var src = source.replace(/\r?\n|\r/g, ' ');

  var requiresData = [];
  var requires;
  var fns;

  var routeNames = [];

  var routeVariableNameMatch;
  while ((routeVariableNameMatch = routerNamePattern.exec(src)) !== null) {
    routeNames.push(routeVariableNameMatch[1]);
  }

  console.log(routeNames);
  console.log('route names');

  var results = [];
  var uses;
  while ((uses = usePattern.exec(src)) !== null) {
    results.push(uses[1]);
  }

  var rests;
  while ((rests = restPattern.exec(src)) !== null) {
    results.push(rests[1]);
  }

  console.log(results);

  console.log(requiresData);

   prependText = [
    /*'var __moduleBindings = ' + JSON.stringify(names) + ';\n',*/
    '/* TEST */',
    'if (module.hot) {\n\t',
      'module.hot.data = {hotCall: '+JSON.stringify(results)+'};\n',
      'module.hot.dispose(function(data){\n\t',
          'data.msg = "hot hot";\n\t',
      '});\n\t',
      // accept itself
      /*'if (module.parent == null) {\n\t',
        '\tmodule.hot.accept(function(e){\n\t',
          hotCall,
        '});\n\t',
      '} else {\n\t',*/

      'console.log(module.hot.data);\n\t',

      'if (testJulien != null) { \n\t',

      'var mainLayers = app._router.stack;\n\t',

      'var idxPathToRemove = [];\n\t',

      'mainLayers.forEach(function(layer, idx) {\n\t',

      'if (typeof layer.handle === "function" ||\n\t',
          'layer.route != null && module.hot.data.hotCall.indexOf(layer.route.path) >= 0) {\n\t',

          'var stack = layer.route != null && layer.route.stack != null ? layer.route.stack : layer.handle.stack;\n\t',

          'if (stack != null) {\n\t',
            'var idxRoutesToRemove = [];\n\t',
            'stack.forEach(function(subLayer, idx2) {\n\t',

            'var test = layer.route != null && module.hot.data.hotCall.indexOf(layer.route.path) >= 0 ? path : pathRoute;\n\t',

            'try {\n\t',
                  'var match = subLayer.match(test);\n\t',
                  'if (match) {\n\t',
                    'var idxToRemove = subLayer.route != null && module.hot.data.hotCall.indexOf(subLayer.route.path) >= 0 === path ? idx : idx2;\n\t',
                    'console.log("route removed " + idx);\n\t',
                    'idxRoutesToRemove.push(idx);\n\t',
                  '}\n\t',
              '}\n\t',
              'catch (err) {\n\t',
                  'console.log(err);\n\t',
              '}\n\t',
            '});\n\t',

            'idxRoutesToRemove.forEach(function(elt, idx) {\n\t',
              'stack.splice(idx, 1);\n\t',
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

  //console.log(newContent);

  return newContent;
  //return this.callback(null, newContent);
}
