import app from 'app';
import angular from 'angular';

import 'routes/absch';
import './footer';
import './header';
import { templateController, bootstrapApp} from '../template-controller';

app.controller('AbschTemplateController', templateController);

bootstrapApp();