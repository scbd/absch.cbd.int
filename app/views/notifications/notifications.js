export default ['$scope', '$filter', '$location', 'searchService', 'solr', '$routeParams',
  function controller($scope, $filter, $location, searchService, solr, $routeParams) {

    const redirectToNotification = async () => {
      const query = {
        query: `symbol_s:(${solr.escape($routeParams.id)})`,
        fields: "id,identifier_s,uniqueIdentifier_s"
      };

      try {
        const data = await searchService.list(query);
        const notification = data.data.response.docs[0];
        const uniqueID = notification ? await $filter("uniqueID")(notification) : undefined;        

        const path = uniqueID
          ? `/database/NT/${uniqueID}`
          : `/notification/${$routeParams.id}`;

        $location.path(path);
      } catch (error) {
        console.error("Error loading notification:", error);
        $location.path(`/notification/${$routeParams.id}`);
      }
    };

    redirectToNotification();
  }
];
