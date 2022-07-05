import app from "app";

import { default as template } from './verify-email';
import unauthorizedAccessT from '~/app-text/views/shared/403.json';


export { default as template } from './403.html';

export default ["$scope", "translationService", function ($scope, translationService) {
    translationService.set('unauthorizedAccessT', unauthorizedAccessT);
  
}];
