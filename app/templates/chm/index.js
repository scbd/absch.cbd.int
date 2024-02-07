import app from '~/app';

import '../../routes/chm';
import './header';
import './footer';
import './embed-footer';
import templateController, { bootstrapApp} from '../template-controller';

// console.log(templateController);
app.controller('ChmTemplateController', templateController);   
bootstrapApp();

