'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var hasha = _interopDefault(require('hasha'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));

var algorithms = {
	'md5': true,
	'sha1': true,
	'sha256': true,
	'sha512': true
};

var defaultOptions = {
	algorithm: 'sha1',
	replace: false
};

var msg = {
	noTemplate: '[Hash] Destination filename must contain `[hash]` template.',
	noAlgorithm: '[Hash] Algorithm can only be one of: md5, sha1, sha256, sha512',
	noManifest: '[Hash] Manifest filename must be a string',
	noManifestKey: '[Hash] Key for manifest filename must be a string'
};

var pattern = /\[hash(?::(\d+))?\]/;

function hasTemplate(dest) {
	return pattern.test(dest);
}

function generateManifest(input, output) {
	return JSON.stringify(( obj = {}, obj[input] = output, obj ));
	var obj;
}

function formatFilename(dest, hash) {
	var match = pattern.exec(dest);
	var length = match && match[1];
	var hashResult = hash;
	if (length) {
		hashResult = hash.substr(0, +length);
	}
	return dest.replace(pattern, hashResult);
}

function mkdirpath (dest) {
	var dir = path.dirname(dest);
	try {
		fs.readdirSync(dir);
	} catch ( err ) {
		mkdirpath( dir );
		fs.mkdirSync( dir );
	}
}

function logError(msg) {
	throw new Error(msg);
}

export const hash = (opts)=> {
	if ( opts === void 0 ) opts = {};

	var options = Object.assign({}, defaultOptions, opts);

	return {
		name: 'hash',
		resolveId(id, importer) {
			console.log(a,b,c);
		},
		augmentChunkHash: (a,b, c)=>{
			console.log(a,b,c);
		},
		generateBundle: (a,b,c)=>{
			console.log(a,b,c);
		},
		writeBundle : function(bundle, data) {
			var destinationOption = options.output ? options.output.file : options.dest;
			var builtFile = bundle.file || bundle.dest;

			if(!destinationOption || !hasTemplate(destinationOption)) {
				logError(msg.noTemplate);
				return false;
			}

			if(!algorithms[options.algorithm]) {
				logError(msg.noAlgorithm);
				return false;
			}

			if(options.manifest && typeof options.manifest !== 'string') {
				logError(msg.noManifest);
				return false;
			}

			if(options.manifestKey && typeof options.manifestKey !== 'string') {
				logError(msg.noManifestKey);
				return false;
			}

			var hash = hasha(data.code, options);
			var fileName = formatFilename(destinationOption, hash);

			if(options.replace) {
				fs.unlinkSync(builtFile);
			}

			if(options.manifest) {
				var manifest = generateManifest(options.manifestKey || builtFile, fileName);
				mkdirpath(options.manifest);
				fs.writeFileSync(options.manifest, manifest, 'utf8');
			}

			mkdirpath(fileName);

			var code = data.code;
			if (bundle.sourcemap) {
				var basename = path.basename(fileName);
				data.map.file = basename;

				var url;
				if (bundle.sourcemap === 'inline') {
					url = data.map.toUrl();
				} else {
					url = basename + '.map';
					fs.writeFileSync(fileName + '.map', data.map.toString());
				}

				code += "\n//# sourceMappingURL=" + url;
			}

			fs.writeFileSync(fileName, code, 'utf8');

			if(options.callback && typeof options.callback === 'function') {
				options.callback(fileName);
			}
		}
	};
}

