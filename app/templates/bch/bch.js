import app from 'app';
import angular from 'angular';

import 'bootstrap';
import 'routes/bch';
import 'ng-breadcrumbs';
import 'toastr';
import 'angular-animate';
import 'angular-loggly-logger';

import 'services/main'; 
import 'components/scbd-branding/main';
import 'components/scbd-angularjs-services/main';
import 'views/directives/route-loading-directive';
import '~/views/directives/docked-side-bar';
import './header';
import './footer';
import '../directives/app-loading';
import { templateController, bootstrapApp} from '../template-controller';

// console.log(templateController);
app.controller('BchTemplateController', templateController);   
bootstrapApp();

