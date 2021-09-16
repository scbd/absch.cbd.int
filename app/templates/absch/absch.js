import app from 'app';
import _ from 'lodash';
import moment from 'moment';
import angular from 'angular';
import 'toastr';
import 'bootstrap';
import 'angular-loggly-logger';
import 'angular-animate';

import 'routes/absch';
import 'services/main';
import 'components/scbd-branding/main';
import 'views/directives/route-loading-directive';
import '../directives/app-loading';
import '../directives/cbd-footer';
import './footer';
import './header';
import { templateController, bootstrapApp} from '../template-controller';

app.controller('AbschTemplateController', templateController);

bootstrapApp();