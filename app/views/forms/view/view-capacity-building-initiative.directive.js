<div id="Record" class="record panel panel-default">
	<div class="panel-heading bg-orange" ng-show="display('header')">
		<h4>
			<span ng-bind="::document.header.schema|schemaName"></span>
			<span class="color-black">(<span ng-bind="::(document.header.schema|schemaShortName)"></span>)</span>
		</h4>
    </div>
	<div class="record-body panel-body">

		<document-date></document-date> <br>

			     
        <div ng-show="document.title">
			<label>
				<span>Title of the initiative</span>
			</label>
			<div compare-val>
			<km-value-ml value="document.title" locales="locale"></km-value-ml>
			</div>
		</div>

		<div ng-show="document.projectNumber">
			<label>Project number or identifier</label>
			<div compare-val>
			<km-value-ml value="document.projectNumber" locales="locale"></km-value-ml>
			</div>
		</div>

		<div ng-if="document.projectDocument">
			<label>Website address(es)</label>
			<div compare-val>
			<km-link-list class="km-value" ng-model="document.projectDocument"></km-link-list>
			</div>
		</div>
		
		<div ng-if="document.contacts">
			<label>Contact person(s)</label>
			<div class="km-value" compare-val="contacts">
			<div ng-repeat="contact in document.contacts">
				<div view-record-reference ng-model="contact" locale="locale"></div>
			</div>
			</div>
		</div>
		

		<div ng-show="document.geographicScope">
			<label>Geographic Scope</label>
			<div compare-val>
			<km-value-ml value="document.geographicScope | term:locale" locales="locale"></km-value-ml>
			</div>
		</div>

		<div ng-show="document.countryRegions">
			<label>Geographical or political/economic group(s) and/or country(ies)</label>
			<div class="km-value" compare-val>
                <ul  class="list">
                    <li ng-repeat="val in document.countryRegions" ng-bind="val | term:locale"></li>
                </ul>
            </div>
		</div>

<!--		<div ng-show="document.geographicScope.customValue">-->
<!--			<label>Jurisdiction Custom value</label>-->
<!--			<div compare-val>-->
<!--			<km-value-ml value="document.geographicScope.customValue" locales="locale"></km-value-ml>-->
<!--			</div>-->
<!--		</div>-->

<!--		<div ng-show="document.geographicScope && document.geographicScope.community">-->
<!--			<label>Community</label>-->
<!--			<div compare-val>-->
<!--			<km-value-ml value="document.geographicScope.community" locales="locale"></km-value-ml>-->
<!--			</div>-->
<!--		</div>-->
		<!-- Need to verify from backend -->
		<div ng-show="document.geographicScope.countries">
			<label>Countries</label>
			<div class="km-value" compare-val="geographicScope.countries">
				<ul  class="list">
					<li ng-repeat="val in document.geographicScope.countries" ng-bind="val | term:locale"></li>
				</ul>
			</div>
		</div>

		<div ng-show="document.status">
			<label>Status</label>
			<div compare-val>
			<km-value-ml value="document.status | term:locale" locales="locale"></km-value-ml>
			</div>
		</div>
		
		<div ng-show="(document.startDate && document.endDate) || document.durationPeriod || document.durationText">
			<div class="row" ng-show="document.startDate && document.endDate">
				<div class="col-md-6">
					<label>Start date</label>
					<div compare-val>
					<km-value-ml value="document.startDate | date : 'longDate'" locales="locale"></km-value-ml>
					</div>
				</div>
				<div class="col-md-6">
					<label>End date</label>
					<div compare-val>
					<km-value-ml value="document.endDate | date : 'longDate'" locales="locale"></km-value-ml>
					</div>
				</div>
			</div>
			<label ng-show="document.durationPeriod || document.durationText">Duration</label>
			<div class="row" ng-show="document.durationPeriod || document.durationText">
				<div class="col-md-6">
					<div compare-val>
						<km-value-ml value="document.durationPeriod" locales="locale"></km-value-ml>
					</div>
				</div>
				<div class="col-md-6">
					<km-value-ml value="document.durationText" locales="locale"></km-value-ml>
				</div>
			</div>
		</div>


		<div ng-show="document.activityScope">
			<label>Type of capacity development initiative</label>
			<km-value-ml value="document.activityScope | term:locale" locales="locale"></km-value-ml>
		</div>
		<div>
			<label>Is this part of a larger project or programme</label>
			<div compare-val>
				<div class="km-value km-pre" ng-if="document.capacityBuildingType.isProjectProgramme">Yes</div>
			</div>
			<div compare-val>
				<div class="km-value km-pre" ng-if="!document.capacityBuildingType.isProjectProgramme">No</div>
			</div>

			<div ng-show="document.broaderProjects">
				<div compare-val>
				<km-value-ml value="document.broaderProjects | term:locale" locales="locale"></km-value-ml>
				</div>
			</div>
		</div>
		<div ng-show="document.isImplementedByAgencies || document.isExecutededByAgencies || document.isCollaboratededByPartners">

			<div ng-show="document.isImplementedByAgencies && document.implementingAgencies">
				<label>Implementing agency(ies) or organization(s)</label>
				<div class="km-value" compare-val="implementingAgencies">
				<div ng-repeat="contact in document.implementingAgencies">
					<div view-record-reference ng-model="contact" locale="locale"></div>
				</div>
			</div>
			</div>

			<div ng-show="document.isImplementedByAgencies && document.executingAgencies">
				<label>Executing agency(ies) or organization(s)</label>
				<div class="km-value" compare-val="executingAgencies">
				<div ng-repeat="contact in document.executingAgencies">
					<div view-record-reference ng-model="contact" locale="locale"></div>
				</div>
			</div>
			</div>

			<div ng-show="document.collaboratingPartners && document.collaboratingPartners">
				<label>Collaborating partner(s)</label>
				<div class="km-value" compare-val="collaboratingPartners">
				<div ng-repeat="contact in document.collaboratingPartners">
					<div view-record-reference ng-model="contact" locale="locale"></div>
				</div>
			</div>
			</div>
		</div>

<!--		<div ng-if="isABS && document.contacts">-->
<!--			<label>Contact person(s)</label>-->
<!--			<div class="km-value" compare-val="contacts">-->
<!--			<div  ng-repeat="contact in document.contacts">-->
<!--				<div view-record-reference ng-model="contact" locale="locale"></div>-->
<!--			</div>-->
<!--			</div>-->
<!--		</div>-->

<!--		<div ng-if="isABS && document.projectDocument">-->
<!--			<label>Project document or document describing the initiative</label>-->
<!--			<div compare-val>-->
<!--			<km-link-list class="km-value" ng-model="document.projectDocument"></km-link-list>-->
<!--			</div>-->
<!--		</div>-->

		<legend>Detailed information</legend>

		<div ng-show="document.description">
			<label>Short description of the initiative, including its goals and objectives</label>
			<div compare-val>
			<km-value-ml value="document.description" locales="locale" html></km-value-ml>
			</div>
		</div>
		<div ng-show="document.categories">
			<label>Category(ies) of capacity-building activities</label>
			<div class="km-value" compare-val="categories">
				<ul class="list">
					<li ng-repeat="val in document.categories" ng-bind="val | term:locale"></li>
				</ul>
			</div>
		</div>
		<div ng-show="document.targetGroups">
			<label>Main target group(s)/beneficiary(ies)</label>
			<div class="km-value" compare-val="targetGroups">
				<view-terms-hierarchy ng-model="document.targetGroups" locale="locale" term-domain="cbiAudience" on-terms-loaded="onTargetGroupsTerms(terms)"></view-terms-hierarchy>
			</div>
		</div>


<!--		<div ng-show="document.cpbThematicAreas">-->
<!--			<label>General thematic area</label>-->
<!--			<div class="km-value" compare-val="cpbThematicAreas">-->
<!--				<view-terms-hierarchy ng-model="document.cpbThematicAreas" locale="locale" term-domain="cpbThematicAreas" on-terms-loaded="onThematicAreasTerms(terms)"></view-terms-hierarchy>-->
<!--			</div>-->
<!--		</div>-->


		<div ng-show="document.cbdSubjects || document.aichiTargets">

			<legend>Information on the thematic coverage of the initiative</legend>

			<div ng-show="document.cbdSubjects">
				<label>Related CBD subject area(s)</label>
				<div class="km-value">
<!--					<ul class="list">-->
<!--						<li ng-repeat="term in document.cbdSubjects">{{term | term:locale}}</li>-->
<!--					</ul>-->
					<view-terms-hierarchy ng-model="document.cbdSubjects" locale="locale" term-domain="cbdSubjects" on-terms-loaded="onCbdSubjectsTerms(terms)"></view-terms-hierarchy>
				</div>
			</div>

			<div ng-show="document.aichiTargets && isABS">
					<label>Aichi target(s)</label>
					<div class="km-value">
						<view-terms-hierarchy ng-model="document.aichiTargets" locale="locale" term-domain="aichiTargets" on-terms-loaded="onAichiTargetsTerms(terms)"></view-terms-hierarchy>
<!--						<ul class="list">-->
<!--							<li ng-repeat="term in document.aichiTargets">{{term | term:locale}}</li>-->
<!--						</ul>-->
					</div>
			</div>
		</div>

		<div ng-show="document.absKeyAreas">
			<legend>ABS thematic areas</legend>

			<label>Key areas and strategic measures for capacity-building and development</label>
			<div class="km-value" compare-val="absKeyAreas">
				<ul class="list">
					<li ng-repeat="val in document.absKeyAreas" ng-bind="val | term:locale"></li>
				</ul>
			</div>
		</div>

		<div ng-show="document.cpbThematicAreas">
			<legend>Biosafety thematic areas</legend>
			<label>General thematic area</label>
			<div class="km-value" compare-val="cpbThematicAreas">
				<view-terms-hierarchy ng-model="document.cpbThematicAreas" locale="locale" term-domain="cpbThematicAreas" on-terms-loaded="onThematicAreasTerms(terms)"></view-terms-hierarchy>
			</div>
		</div>


		<div ng-show="document.fundingSourceTypes || document.coreFundingSources || document.coFinancingSources || document.totalBudget">
			<legend>Information on funding</legend>

			<div ng-show="document.fundingSourceTypes">
				<label>Type(s) of funding source</label>
				<div class="km-value" compare-val="fundingSourceTypes">
					<ul class="list">
						<li ng-repeat="val in document.fundingSourceTypes" ng-bind="val | term:locale"></li>
					</ul>
				</div>
			</div>
			<div ng-show="document.fundingSourceTypes.customValue">
				<label>Please provide further information on funding</label>
				<div class="km-value" compare-val="">
					<km-value-ml value="document.fundingSourceTypes.customValue" locales="locale" html></km-value-ml>
				</div>
			</div>
			<div ng-show="document.coreFundingSources">
				<label>Primary funding-source(s)</label>
				<div class="km-value" compare-val="coreFundingSources">
				<div ng-repeat="contact in document.coreFundingSources">
					<div view-record-reference ng-model="contact" locale="locale"></div>
				</div>
				</div>
			</div>

			<div ng-show="document.coFinancingSources">
				<label>Co-financing source(s)</label>
				<div class="km-value" compare-val>
				<div ng-repeat="contact in document.coFinancingSources">
					<div view-record-reference ng-model="contact" locale="locale"></div>
				</div>
				</div>
			</div>

			<div ng-show="document.totalBudget">
				<label>Total budget (amount, in US dollars)</label>
				<div compare-val>
				<km-value-ml value="document.totalBudget | currency:'USD$'" locales="locale"></km-value-ml>
				</div>
			</div>

		</div>
			<div ng-show="document.resultsAchievements || document.resultsOutputs || document.bestPractices">
				<legend>Capacity-building outcomes</legend>

				<div ng-show="document.resultsAchievements">
					<label>Results</label>
					<div compare-val>
					<km-value-ml value="document.resultsAchievements" locales="locale" html></km-value-ml>
					</div>
				</div>

				<div ng-show="document.resultsOutputs">
					<label>Main outputs</label>
					<div compare-val>
					<km-link-list class="km-value" ng-model="document.resultsOutputs"></km-link-list>
					</div>
				</div>

				<div ng-show="document.bestPractices">
					<label>Best practices and lessons learned</label>
					<div compare-val>
					<km-value-ml value="document.bestPractices" locales="locale" html></km-value-ml>
					</div>
				</div>

        <div ng-show="document.resultsReference">
          <label>Results reference</label>
          <div class="km-value" compare-val>
            <div ng-repeat="contact in document.resultsReference">
              <div view-record-reference ng-model="contact" locale="locale"></div>
            </div>
          </div>
        </div>

<!--		<div ng-show="document.absKeyAreas">-->
<!--			<legend>Access and Benefit Sharing Clearing-House (ABS-CH)</legend>-->

<!--			<label>Key areas and strategic measures for capacity-building and development</label>-->
<!--			<div class="km-value" compare-val="absKeyAreas">-->
<!--				<ul class="list">-->
<!--					<li ng-repeat="val in document.absKeyAreas" ng-bind="val | term:locale"></li>-->
<!--				</ul>-->
<!--			</div>-->
<!--		</div>-->

		<div ng-show="document.relevantInformation||document.relevantDocuments">
			<legend>Additional Information</legend>

			<div ng-show="document.relevantInformation">
				<div compare-val>
				<km-value-ml value="document.relevantInformation" locales="locale" html></km-value-ml>
			</div>
			</div>

			<div ng-show="document.relevantDocuments">
				<label>Other relevant website address or attached documents</label>
				<div compare-val>
				<km-link-list class="km-value" ng-model="document.relevantDocuments"></km-link-list>
				</div>
			</div>
		</div>
		<div>
			<view-referenced-records ng-model="document.header.identifier"></view-referenced-records>
		</div>

	</div>
	</div>
	<div document-metadata class="panel-footer" ></div>

</div>
