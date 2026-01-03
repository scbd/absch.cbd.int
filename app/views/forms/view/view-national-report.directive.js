import app from '~/app';
import { reactive } from 'vue'
import template from "text!./view-national-report.directive.html";
import NationalReportSection from '~/components/common/document-report/national-report-section.vue'

app.directive("viewNationalReport", [function () {
	return {
		restrict: "EA",
		template: template,
		replace: true,
		scope: {
			reportQuestions: "=",
			document: "=",
			locale: "=",
			target: "@linkTarget",
		},
		link: function ($scope) {
      $scope.vueComponent = {
        components: { NationalReportSection },
      }
      $scope.makeReactive = (value) => reactive(value)
		}
	};
}]);
