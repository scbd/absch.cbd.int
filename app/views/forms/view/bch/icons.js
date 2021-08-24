import app from 'app';
import template from 'text!./icons.html';

app.directive('bchIcons', function(){
    return {
        restrict: 'EAC',
        replace: false,
        template: template,
    }
});

export const iconFields = {
    lmo         : 'traitsDiseasesResistance_b,traitsHerbicidesResistance_b,traitsPhysiologyChanges_b,traitsQualityChanges_b,traitsMedicalProduction_b,traitsOther_b',
    decision    : 'scopeRelease_b,scopeFood_b,scopeFeed_b,scopeProcessing_b,scopeConfined_b,scopeOther_b,scopePharmaceutical_b,scopeTransit_b',
    organisms   : 'animals_b,bacteria_b,fungi_b,plants_b,viruses_b' //CNA, LAW
};