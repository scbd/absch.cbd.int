import app from '~/app'; 
app.directive("viewLinkedRecords", function() {
    return {
        restrict: "EAC",
        replace: false,
        scope: {
            internalDocumentInfo: "=",
        },
        controller: ['$scope', function($scope) {
            // Controller logic if needed
        }],
        link: function(scope, element, attrs) {
            
			async function getIdentifiers(data) {
				let result = [];
			
				function extractIdentifiers(obj) {
					for (let key in obj) {
						if (obj.hasOwnProperty(key)) {
							if (Array.isArray(obj[key])) {
								let identifiers = obj[key]
									.map(item => item.identifier)
									.filter(identifier => identifier);
			
								if (identifiers.length > 0) {
									result.push({ [key]: new Set(identifiers) });
								}
							} else if (typeof obj[key] === 'object' && obj[key] !== null) {
								extractIdentifiers(obj[key]);
							}
						}
					}
				}
			
				extractIdentifiers(data.body);
				return result;
			}

            scope.$watch('internalDocumentInfo', async function(newVal, oldVal) {
                if (newVal !== oldVal) {  
					     console.log("newVal:", newVal);
					const ids = await getIdentifiers(newVal);
					     console.log("ids ids all:", ids);
                }
            }, true); 
        },
    
    };
});


 