define(['app'], function(app) {

  app.factory('countriescommonjs', [
    function() {

      return {
        isPartyToCBD : function(entity) {
          //$scope.selected_circle = "party";
          return entity && entity.treaties.XXVII8.party != null;
      },

        isInbetweenParty :function(entity) {
          //$scope.selected_circle = "inbetweenParties";
        //   console.log(entity);
          return entity && (entity.isInbetweenParty ||
              ( entity.treaties
                && moment().diff(moment(entity.treaties.XXVII8b.deposit), 'days') < 90));
      },

        isSignatory : function(entity) {
          //$scope.selected_circle = "signatory";
          return entity && entity.treaties.XXVII8b.signature != null;
      },

        isRatified : function(entity) {
          //$scope.selected_circle = "ratified";
          return entity && (entity.treaties.XXVII8b.instrument == "ratification" ||
            entity.treaties.XXVII8b.instrument == "accession" ||
            entity.treaties.XXVII8b.instrument == "acceptance" || entity.treaties.XXVII8b.instrument == "approval");
        },

        isNonParties : function(entity) {
          //$scope.selected_circle = "nonParties";
          return !(entity && (entity.treaties.XXVII8b.instrument == "ratification" ||
            entity.treaties.XXVII8b.instrument == "accession" ||
            entity.treaties.XXVII8b.instrument == "acceptance" || entity.treaties.XXVII8b.instrument == "approval"));
        }
      }
    }
  ]);
});
