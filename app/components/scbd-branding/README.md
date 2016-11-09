
# scbd-angularjs-branding   

A collection of AngularJS directives used to create consistent branding among SCBD sites.


Assumed dependancies: app(as angular project), requirejs, requiretext, requirecss, fontawsome, bootstrap, bootstrap-theme.  It is also assumed that all projects using this app will be storing their bower_components
in /app/libs/.

Motivation for this could be any of the following:

- central repo for all shared scbd site branding
- less man hours maintaining updating individual projects


# Installation

Install via Bower:

```bash
bower install scbd-angularjs-branding
```


# Usage

Add the package to use to your boot.js file's requirejs plugins config:
See: https://github.com/scbd/plevra.cbd.int/blob/master/app/boot.js
```javascript
packages: [
      { name: 'scbd-branding', main: 'main', location : 'libs/scbd-angularjs-branding' },
]
```


To use the package's directives components in your scbd project simply define as shown below:

```javascript
define(['app',
'scbd-branding/header',
'scbd-breanding/footer'], function(app, $) {
    app.controller('TemplateController', ['$scope', '$rootScope', '$window', '$location', 'authentication',  'realm', function($scope, $rootScope, $window, $location, authentication,  realm) {
```

and you're good to go.



# Directive Structure

each directive has a corresponding template and css file

```javascript
-header
  |--account
      |--login
  |--accounts-validation
  |--locale
  |--xuser-notifications-icon
-xuser-notifications
-footer
```

