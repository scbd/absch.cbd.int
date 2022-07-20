import app from '~/app';
import angular from 'angular';

import '../../routes/bch';
import './header';
import './footer';
import './embed-footer';
import { templateController, bootstrapApp} from '../template-controller';

// console.log(templateController);
app.controller('BchTemplateController', templateController);   
bootstrapApp();

