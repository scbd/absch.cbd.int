export default ['$scope', '$filter', '$location', 'searchService', 'solr', '$routeParams',
  function controller($scope, $filter, $location, searchService, solr, $routeParams) {

    const redirectToNotification = async () => {
      const query = {
        query: `symbol_s:(${solr.escape($routeParams.id)})`,
        fields: "id,identifier_s,title_s,acronym_s,reference_s, symbol_s, uniqueIdentifier_s,schema:schema_s"
      };

      try {
        const data = await searchService.list(query);
        const notification = data.data.response.docs[0];

        if (notification) {
          const uniqueID = await $filter("uniqueID")(notification);
          $location.path(`/database/NT/${uniqueID}`);
        }
      } catch (error) {
        console.error("Error loading notification:", error);
      }
    };

    redirectToNotification();
  }
];
