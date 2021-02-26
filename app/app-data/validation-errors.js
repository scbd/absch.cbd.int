define(function () { 'use strict';

	var validationErrors = {
		unknown: "Unknown error",
		mandatory: "Field is mandatory",
		mandatoryAnyOf: "One of the field is mandatory",
		invalidValue: "The value specified is invalid",
		invalidProperty: "This value cannot be specified",
		unspecifiedLocale: "A language is used but not specified in your document",
		unexpectedTerm: "A specified term cannot be used",
		invalidType: "The fields type is invalid"
	};

	return validationErrors;

});
