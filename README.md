absch.cbd.int
=============

[![Dependency Status](https://david-dm.org/scbd/absch.cbd.int.svg)](https://david-dm.org/scbd/absch.cbd.int)

# About 
The absch.cbd.int project is hosting two Clearing-House Mechanism for the Conventions two Protocols (Nagoya and Biosafety Protocol).
The project is built using AngularJs with RequireJS. Recently the project code was migrated to es6 syntax to benefit from nex syntax.
Internally Rollup is used to build and compile the new syntax back to AMD format for browser compatibility.

The Secretariat has also chosen VueJs framework for its future development. To allow AngularJs based projects to use VueJS, the Secretariat has build a bridge library angular-vue (https://github.com/scbd/angular-vue) which allows integration of vue into angularjs to the smallest level for eg. Button.

# Installation
``` 
#Using Yarn:
yarn install

# Or, clean install:
npm run-script clean-reinstall  
```

# Steps to run project.
The project requires two command to run the project 
1. rollup build
    `yarn dev` with watch `yarn build` to build
2. run server
    `node server` which requires two mandatory env variables `CLEARINGHOUSE`,  `CLEARINGHOUSE_HOST`

## All available env variables 
| Name                      | Value                             | Description |
|---                        |---                                |---          |
|CLEARINGHOUSE              |  ABS/BCH                          | |
|CLEARINGHOUSE_HOST         |  absch.cbd.int/bch.cbd.int        | |
|COMPRESS                   |  true/false                       | only used for dev |
|API_URL                    |  api.cbd.int / api.cbddev.xyz     | |
|CDN_URL                    |  https://cdn.jsdelivr.net/        | |
|TAG / VERSION              |  (Branch/commit)                  | |
|PORT                       |  2010                             | |
|GOOGLE_ANALYTICS_CODE      |  ****                             | |
|                           |                                   | |

# Run in vscode
Use below vscode launch.json configuration to run the project. using the compounds configuration both commands can be run together.
```
{
	"version": "0.1.0",
	"compounds": [
		{
			"name": "Launch BCH",
			"configurations": ["Launch BCH", "watch vue dev"]
		},
		{
			"name": "Launch ABS",
			"configurations": ["Launch ABS", "watch vue dev"]
		}
	],
	"configurations": [	
		{
			"name": "Launch ABS",
			"console": "integratedTerminal",
			"internalConsoleOptions": "neverOpen",
			"request": "launch",
			"runtimeArgs": [
				"run-script",
				"start"
			],
			"runtimeExecutable": "npm",
			"skipFiles": [
				"<node_internals>/**"
			],
			"type": "pwa-node",
			"env": {"CLEARINGHOUSE":"absch", "CLEARINGHOUSE_HOST":"absch.local"
			}
		}, 
		{
			"name": "Launch BCH",
			"console": "integratedTerminal",
			"internalConsoleOptions": "neverOpen",
			"request": "launch",
			"runtimeArgs": [
				"run-script",
				"start"
			],
			"runtimeExecutable": "npm",
			"skipFiles": [
				"<node_internals>/**"
			],
			"type": "pwa-node",
			"env": {
					"CLEARINGHOUSE":"bch", 
					"CLEARINGHOUSE_HOST":"bch.local",
			}
		}
	]
}

```

# Run in docker
`docker run --name absch -e "CLEARINGHOUSE=absch" -e "CLEARINGHOUSE_HOST=absch.local" -d -p 8000:8000 scbd/absch.cbd.int`