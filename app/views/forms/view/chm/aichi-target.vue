<template>
    <div class="viewForm">
        <h2><img v-if="document.icons" class="img-polaroid" v-bind="document.icons[0].url" style="height: 45px; width: 45px" /> {{document.shortTitle |  lstring(review, locale) }}</h2>
    
        <label>Full title</label>
        <div class="km-value km-pre">{{document.title | lstring(locale)}}</div>
    
        <label>Target Number </label>
        <div class="km-value">{{document.number}}</div>
    
        <div v-if="document.strategicGoal">
            <label>Strategic Goal</label>
            <span class="km-value">{{document.strategicGoal | lstring(term, locale)}} </span>
        </div>
    
        <div v-if="document.guide">
            <label>Quick Guide</label>
            <div class="km-value km-pre">{{document.guide| lstring(locale)}}</div>
        </div>
    
        <div v-if="document.strategicPlanIndicators">
            <label>Most Relevant Indicator(s)</label>
            <ul class="km-value">
                <li v-for="doc in strategicPlanIndicators">{{doc.title_t | lstring()}} </li>
            </ul>
        </div>
    
        <div v-if="document.otherStrategicPlanIndicators">
            <label>Other Relevant Indicator(s)</label>
            <ul class="km-value">
                <li v-for="doc in otherStrategicPlanIndicators">{{doc.title_t | lstring(locale)}} </li>
            </ul>
        </div>
        <div v-if="document.progress">
            <label>Status of progress</label>
            <div class="km-value km-pre">{{document.progress | lstring(locale)}}</div>
        </div>
        <div v-if="document.progressLinks">
            <label>Status of progress (attachement)</label>
            <ul class="km-value">
                <li v-for="item in document.progressLinks">
                    <a translation-url target="{{target}}" :href="item.url">{{item.name||item.url}}</a>
                    <i v-if="item.name">({{item.url}})</i>
                </li>
            </ul>
        </div>
    
        <div v-if="champions">
            <legend>Champions</legend>
            <table class="table table-striped">
                <tr v-for="champion in champions">
                    <td>
    
                        <div v-if="champion.description">
                            <label>Target Champions (description)</label>
                            <div class="km-value km-pre">{{champion.description | lstring(locale)}}</div>
                        </div>
    
                        <div v-if="champion.countries">
                            <label>Target Champions (regions)</label>
                            <ul class="km-value">
                                <li v-for="term in champion.countries">{{term | lstring(term, locale)}} </li>
                            </ul>
                        </div>
    
                        <div v-if="champion.organizations">
                            <label>Linked organizations</label>
                            <ul class="km-value" >
                                <li v-for="organization in champion.organizations">
                                    <div view-organization-reference v-model="organization.document" locale="locale"></div>
                                </li>
                            </ul>
                        </div>
    
                        <div v-if="champion.links">
                            <label>Target Champions (link)</label>
                            <ul class="km-value">
                                <li v-for="item in champion.links">
                                    <a translation-url target="{{target}}" :href="item.url">{{item.name||item.url}}</a>
                                    <i v-if="item.name">({{item.url}})</i>
                                </li>
                            </ul>
                        </div>
    
                    </td>
                </tr>
            </table>
        </div>
    
        <div v-if="resources">
            <legend>Resources</legend>
            <table class="table table-striped">
                <tr v-for="resource in resources">
                    <td>
                        <div v-if="resource.description">
                            <label>Link to resources (description)</label>
                            <div class="km-value km-pre">{{resource.description | lstring(locale)}}</div>
                        </div>
    
                        <div v-if="resource.references">
                            <label>Linked references</label>
                            <ul class="km-value">
                                <li v-for="reference in resource.references">
                                    <b>{{reference.document.title|lstring(locale)}}</b>
                                    <div class="km-pre">{{reference.document.summary|lstring(locale)}}</div>
                                </li>
                            </ul>
                        </div>
    
                        <div v-if="resource.links">
                            <label>Link to resources (link)</label>
                            <ul class="km-value">
                                <li v-for="item in resource.links">
                                    <a translation-url target="{{target}}" :href="item.url">{{item.name||item.url}}</a>
                                    <i v-if="item.name">({{item.url}})</i>
                                </li>
                            </ul>
                        </div>
    
                        <div v-if="resource.categories">
                            <label>Link to resources (categories)</label>
                            <ul class="km-value">
                                <li v-for="term in resource.categories">{{term | lstring(term, locale)}} </li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    
    
        <div v-if="document.relevantInformation||document.relevantDocuments">
            <legend>Additional Information</legend>
    
            <div v-if="document.relevantInformation">
                <div class="km-value" ng-bind-html="document.relevantInformation | lstring:locale | markdown"></div>
            </div>
    
            <div v-if="document.relevantDocuments">
                <label>Other relevant website address or attached documents</label>
                <ul class="km-value">
                    <li v-for="item in document.relevantDocuments"><a translation-url target="{{target}}" ng-href="{{item.url}}">{{item.name||item.url}}</a></li>
                </ul>
            </div>
        </div>
    
    </div>
    
</template>

<script setup>
    import { computed } from 'vue';
    import { lstring } from '../kb/filters';



    const props= defineProps ({
      document:     { type: Object, required: true },
      champions:    { type: Object, required: true },
      resources:    { type: Object, required: true },
      organization: { type: Object, required: true }
  })

    const resources = computed(() => {

        resources = document.resources ? JSON.parse(JSON.stringify(document.resources)) : undefined;
        if (resources) {
            for (var idx = 0; idx < resources.length; idx++) {
                loadReferences(resources[idx].references, true);
            }
        }
        return resources;
    })

    const champions = computed(() => {
        champions = document.champions ? JSON.parse(JSON.stringify(document.champions)) : undefined;
        if (champions) {
            for (var idx = 0; idx < champions.length; idx++) {
                loadReferences(champions[idx].organizations);
            }
        }
        return champions;
    })

    const strategicPlanIndicators = computed(() => {
        if(document.strategicPlanIndicators){            
            return await loadFromIndex(document.strategicPlanIndicators);
        }
    })

    const loadFromIndex = function (references){
        var query = {
            q: "identifier_s:("+_.pluck(references, "identifier").join(" ")+")",
            fl: "identifier_s,title_t",
            rows: 99999999
        };

        return $http.get("/api/v2013/index", { params: query, cache:true }).then(function(response) {
            return response.data.response.docs;
        });
    }

	
    const loadReferences = function (targets, infoOnly) {
        if(!targets)
            return;
    
        this.targets.forEach((ref) => {

            var oOptions = { cache: true };

            if (infoOnly)
                oOptions.info = true;

            storage.documents.get(ref.identifier, oOptions)
                .success(function (data) {
                    ref.document = data;
                })
                .error(function (error, code) {
                    if (code == 404 && $scope.allowDrafts == "true") {

                        storage.drafts.get(ref.identifier, oOptions)
                            .success(function (data) {
                                ref.document = data;
                            })
                            .error(function () {
                                ref.document = undefined;
                                ref.error = error;
                                ref.errorCode = code;
                            });
                    }
                    ref.document = undefined;
                    ref.error = error;
                    ref.errorCode = code;
                });
            
            });
    }
           			
</script>