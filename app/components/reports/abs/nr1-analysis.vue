
<template>
  <div class="bg-light py-4">
    <div class="container">
      <div class="card border-0 shadow-sm">

        <!-- Header -->
        <div class="card-header bg-white border-0">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h1 class="h4 mb-1">ABS National Reports</h1>
              <p class="text-muted mb-0">
                {{ loading ? 'Loading...' : `Showing ${tableData.length} report${tableData.length !== 1 ? 's' : ''}` }}
              </p>
            </div>

            <button
              @click="exportToExcel"
              :disabled="loading || (tableData.length === 0 && pivotWideRows.length === 0 && pivotLongRows.length === 0)"
              class="btn btn-success d-inline-flex align-items-center"
            >
              <svg class="me-2" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export to Excel
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="card-body text-center py-5">
          <div class="spinner-border text-primary mb-3" role="status" aria-label="Loading"></div>
          <p class="text-muted mb-0">Loading report data...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="card-body">
          <div class="alert alert-danger mb-0" role="alert">
            <h6 class="alert-heading mb-2">Error Loading Data</h6>
            <p class="mb-0">{{ error }}</p>
          </div>
        </div>

        <!-- Tabs + Tables -->
        <div v-else class="card-body">

          <!-- BS5 tabs -->
          <ul class="nav nav-tabs" id="reportTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="detail-tab" data-bs-toggle="tab" data-bs-target="#detail" type="button" role="tab">
                Detail
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pivot-wide-tab" data-bs-toggle="tab" data-bs-target="#pivot-wide" type="button" role="tab">
                Pivot (Wide)
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="comparison-tab" data-bs-toggle="tab" data-bs-target="#comparison" type="button" role="tab">
                Comparison
              </button>
            </li>
          </ul>
          
          <div class="tab-content pt-3">
            <!-- Detail -->
            <div class="tab-pane fade show active" id="detail" role="tabpanel" aria-labelledby="detail-tab">
              <div class="table-responsive">
                <table class="table table-bordered table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th v-for="key in columnKeys" :key="key" class="text-uppercase small text-muted"
                      :style="{ 'min-width': key.indexOf('-Info') > -1 ? '350px' : 'auto' }">
                        <span v-if="key.startsWith('Q.')" data-bs-toggle="tooltip" data-bs-placement="top" 
                        :title="questionMap.get(key)?.title || 'Additional Information'">
                          {{ formatHeaderName(key) }}
                        </span>
                        <span v-else>{{ formatHeaderName(key) }}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, idx) in tableData" :key="idx">
                      <td v-for="key in columnKeys" :key="key" >
                        <span v-if="key === 'status'" class="badge rounded-pill"
                              :class="row[key] === 'Party' ? 'bg-success' : 'bg-secondary'">
                          {{ row[key] }}
                        </span>
                        <span v-else>{{ formatCellValue(row[key]) }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Comparison -->
            <div class="tab-pane fade" id="comparison" role="tabpanel" aria-labelledby="comparison-tab">
              <div class="table-responsive">
                <table class="table table-bordered table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th v-for="key in comparisonColumnKeys" :key="key" class="text-uppercase small text-muted">
                        <span v-if="key.startsWith('Q.')" data-bs-toggle="tooltip" data-bs-placement="top" 
                        :title="questionMap.get(key)?.title || 'Question ' + key.replace('Q.', '')">
                          {{ key.replace('Q.', '') }}
                        </span>
                        <span v-else data-bs-toggle="tooltip" data-bs-placement="top" :title="formatHeaderName(key)">
                          {{ formatHeaderName(key) }}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, idx) in tableData" :key="idx">
                      <td v-for="key in comparisonColumnKeys" :key="key" >
                        <span v-if="key === 'status'" class="badge rounded-pill"
                              :class="row[key] === 'Party' ? 'bg-success' : 'bg-secondary'"
                              data-bs-toggle="tooltip" data-bs-placement="top" :title="`Country Status: ${row[key]}`">
                          {{ row[key] }}
                        </span>
                        <span v-else-if="key.startsWith('Q.')">
                          <span :class="getComparisonCell(row, key).class"
                                data-bs-toggle="tooltip" data-bs-placement="top" :title="getComparisonCell(row, key).tooltip">
                            {{ getComparisonCell(row, key).text }}
                          </span>
                        </span>
                        <span v-else :title="formatCellValue(row[key])" data-bs-toggle="tooltip" data-bs-placement="top">
                          {{ formatCellValue(row[key]) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Pivot Wide -->
            <div class="tab-pane fade" id="pivot-wide" role="tabpanel" aria-labelledby="pivot-wide-tab">
              <div class="table-responsive">
                <table class="table table-bordered table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th v-for="header in pivotWideHeaders" :key="header">{{ header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, idx) in pivotWideRows" :key="idx">
                      <td v-for="header in pivotWideHeaders" :key="header">{{ row[header] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tooltip } from 'bootstrap';
import { ref, computed, onMounted, nextTick } from 'vue';
import * as XLSX from 'xlsx';
import { useI18n } from 'vue-i18n';
import { lstring } from '~/components/kb/filters';
import nr1Translation from '~/app-text/views/forms/edit/abs/edit-national-report-1.json' with {type:'json'};
import { absNationalReport1 } from '~/app-data/abs/report-analyzer/absNationalReport1.js';
import { mergeTranslationKeys } from '~/services/translation-merge.js';
import { useRealm } from '~/services/composables/realm.js';

const realm = useRealm();
const nr1T = mergeTranslationKeys(nr1Translation);

const { locale } = useI18n();

/* ----------------------------- Types ----------------------------- */
interface Country {
  code: string;
  name: { en: string };
  treaties?: { XXVII8b?: { party?: boolean } };
}
interface RegionalGroup {
  identifier: string;
  name: string;
  narrowerTerms?: Array<string>;
}
interface ReportData {
  documentId: string;
  government: { identifier : string };
  Q003?: any; Q004?: any; Q004_a?: any; Q004_b?: any;
  Q005?: any; Q005_a?: any; Q005_b?: any;
  Q007?: any; Q007_a?: any; Q008?: any; Q010_a?: any;
  Q012_a?: any; Q012_b?: any; Q021_b?: any;
}
interface TableRow {
  country: string;
  countryCode: string;
  status: string;
  regionalGroup: string;
  [key: string]: any;
}

/* ---------------------------- Constants -------------------------- */
const REPORT_ANALYZER_API = `${window.scbdApp.apiUrl}/api/v2019/report-analyzer/abs-national-report-1`;
const COUNTRIES_API = `${window.scbdApp.apiUrl}/api/v2013/countries`;
const REGIONAL_API  = `${window.scbdApp.apiUrl}/api/v2013/thesaurus/domains/E6566232-EE63-4C7B-AF8B-46A26CC295A5/terms?relations`;
const PIVOT_API     = `${window.scbdApp.apiUrl}/api/v2013/index/select`;
const REALM_CONFIG  = `${window.scbdApp.apiUrl}/api/v2018/realm-configurations/absch.cbd.int`;

/* -------------------------- Reactive state ----------------------- */
const tableData        = ref<TableRow[]>([]);
const pivotWideHeaders = ref<string[]>([]);
const pivotWideRows    = ref<any[]>([]);
const pivotLongHeaders = ref<string[]>([]);
const pivotLongRows    = ref<any[]>([]);
const loading = ref<boolean>(true);
const error   = ref<string>('');
const questionMap = new Map<string, any>();
const rawValuesMap = new Map<string, any>();

let flatted:any[] = [];
/* --------------------------- Computed ---------------------------- */
const columnKeys = computed(() => {
  const keys = new Set<string>();
  for (const row of tableData.value) {
    Object.keys(row).forEach(k => keys.add(k));
  }
  const preferred = ['country','countryCode','status','regionalGroup','documentId'];
  const rest = Array.from(keys).filter(k => !preferred.includes(k));
  return [...preferred.filter(k => keys.has(k)), ...rest];
});

const comparisonColumnKeys = computed(() => {
  const preferred = ['country', 'countryCode', 'status', 'regionalGroup', 'documentId'];
  const baseQuestions = new Set<string>();
  
  for (const key of columnKeys.value) {
    if (key.startsWith('Q.') && !key.includes('Info')) {
      baseQuestions.add(key);
    }
  }
  
  const sortedQs = Array.from(baseQuestions).sort((a, b) => {
    const parse = (str: string) => str.replace('Q.', '').split('.').map(Number);
    const partsA = parse(a);
    const partsB = parse(b);
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        const valA = partsA[i] || 0;
        const valB = partsB[i] || 0;
        if (valA !== valB) return valA - valB;
    }
    return 0;
  });
  
  return [...preferred, ...sortedQs];
});

/* -------------------------- Utilities ---------------------------- */
function stripHtmlToText(html?: string): string {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || div.innerText || '').trim();
}

function indexCountriesByCode(countries: Country[]) {
  const map = new Map<string, Country>();
  for (const c of countries || []) {
    const iso2 = (c.code || '').toUpperCase();
    if (iso2) map.set(iso2, c);
  }
  return map;
}
function indexRegionalGroups(groups: RegionalGroup[]) {
  const map = new Map<string, string[]>();
  for (const g of groups || []) {
    for (const n of (g.narrowerTerms || [])) {
      const iso2 = (n || '').toUpperCase();
      if (!iso2) continue;
      const arr = map.get(iso2) || [];
      if (!arr.includes(g.name)) arr.push(g.name);
      map.set(iso2, arr);
    }
  }
  return map;
}

function getCountryStatus(country?: Country): string {
  return country?.treaties?.XXVII8b?.party ? 'Party' : 'Non-Party';
}
function formatHeaderName(key: string): string {
  if (key === 'countryCode')   return 'Code';
  if (key === 'regionalGroup') return 'Regional Group';
  if (key === 'documentId')    return 'Document ID';
  if (key === 'status')        return 'Country Status';
  return key.charAt(0).toUpperCase() + key.slice(1);
}
function formatCellValue(value: any): string {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function getComparisonCell(row: TableRow, key: string) {
  const val = formatCellValue(row[key]);
  
  if (key.startsWith('Q.') && !key.includes('Info')) {
    const rawVal = rawValuesMap.get(`${row.documentId}|${key}`);
    const pivotRow = pivotWideRows.value.find(p => p['Government'] === row.countryCode);
    
    // Determine the corresponding Pivot Wide column to compare against
    let pivotColumn = '';
    if (key === 'Q.3') pivotColumn = 'ABS National Focal Point';
    // User can define mapping for remaining questions here, for example:
    else if (key.startsWith('Q.4')) pivotColumn = 'Competent National Authority';
    else if (key.startsWith('Q.5')) pivotColumn = 'Checkpoint';
    else if (key.startsWith('Q.7')) pivotColumn = 'Legislative, Administrative or Policy Measure';
    // else if (key.startsWith('Q.8')) pivotColumn = '';
    else if (key.startsWith('Q.10')) pivotColumn = 'ABS Procedure';
    else if (key.startsWith('Q.12')) pivotColumn = 'Internationally Recognized Certificates of Compliance';
    else if (key.startsWith('Q.21')) pivotColumn = 'Checkpoint Communiqué';  
    const count = pivotRow && pivotColumn && pivotRow[pivotColumn] ? Number(pivotRow[pivotColumn]) : 0;
    
    // Positive values: true, true.some. Else: false
    const isPositive = rawVal === 'true' || rawVal === true || rawVal === 'true.some';
    const isNegative = !isPositive; // else false
if(row['countryCode'] == 'AT'){
  // debugger ;
      if(key.startsWith('Q.21') ){
        console.log(key, row.documentId,pivotColumn, rawVal, isPositive, isNegative, count, row);
      }
    }
    if (isPositive && count === 0) {
      return { text: 'Missing form ABSCH', class: 'bg-warning text-dark px-2 py-1 rounded small', tooltip: 'Missing associated form in ABSCH pivot' };
    }
    if (isNegative && count > 0) {
      return { text: 'Error', class: 'bg-danger text-white px-2 py-1 rounded small', tooltip: 'Discrepancy: Answered negative but records exist in pivot' };
    }
    if ((isPositive && count > 0) || (isNegative && count === 0)) {
      return { text: 'Good', class: 'bg-success text-white px-2 py-1 rounded small', tooltip: 'Data matches with ABSCH pivot records' };
    }
  }
  
  return { text: val, class: '', tooltip: val };
}

// Flatten absNationalReport1 definitions
function flattenQuestions(questions: any[]): any[] {
  const flattened: any[] = [];
  for (const part of questions) {
    for (const question of part.questions) {
      flattened.push({
        ...question,
        partKey: part.key,
        partTitle: part.title,
        partDescription: part.description || null
      });
      if (question.questions) flattened.push(...flattenQuestions(question.questions));
    }
  }
  return flattened;
}

async function getSchemaTitleMap(): Promise<Map<string,string>> {
  const res = await fetch(REALM_CONFIG);
  if (!res.ok) throw new Error('Failed to fetch realm configuration');
  const cfg = await res.json();
  
  const list = cfg[0]?.schemas || [];
  const map  = new Map<string, string>();
  for (const s in list) {
    const key   = s;
    if (!key) continue;
    const title = lstring(list[key]?.title, locale.value) ?? String(key);
    map.set(String(key), String(title));
  }
  return map;
}

async function fetchPivotJson() {
  const body = {
    fq: [`realm_ss:${realm.realm}`,"_state_s:public"],
    q: "NOT virtual_b:* AND schema_s:(focalPoint authority measure absMeasureStatus absProcedure absNationalModelContractualClause absPermit database absCheckpoint absCheckpointCommunique absNationalReport1 absNationalReport)",
    fl: "",
    wt: "json",
    rows: 0,
    facet: true,
    "facet.pivot": "government_s,schema_s",
    "facet.limit": 512,
    "facet.mincount": 1
  };
  const res = await fetch(PIVOT_API, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Failed to fetch pivot data');
  return res.json();
}

type PivotGov = {
  value: string; // ISO2
  count: number;
  pivot?: { value: string; count: number }[];
};

function buildPivotWide(
  pivotRoot: any,
  countriesByIso: Map<string, Country>,
  regionalByIso: Map<string, string[]>,
  schemaTitleMap: Map<string, string>
) {
    const govList: PivotGov[] = pivotRoot?.facet_counts?.facet_pivot?.["government_s,schema_s"] || [];
    
    for (const [iso2, country] of Array.from(countriesByIso.entries())) {
        const exists = govList.find(g => (g.value || '').toUpperCase() === iso2);
        if (exists) continue;
        govList.push({
            value: iso2,
            count: 0,
            pivot: []
        });
    }
  // discover all schema keys
  const schemaSet = new Set<string>();
    for (const g of govList){
        for (const s of (g.pivot || [])){
            schemaSet.add(String(s.value));
        }
    }
  const schemaKeys = Array.from(schemaSet).sort((a,b)=>a.localeCompare(b));

  // build rows
  const rows = govList.map((g) => {
    const iso2 = (g.value || '').toUpperCase();
    const country = countriesByIso.get(iso2);
    const groups  = regionalByIso.get(iso2) || [];

    const obj: Record<string, any> = {
      'Government': iso2,
      'Country Name': country?.name?.en || iso2,
      'Country Status': getCountryStatus(country),
      'Regional Group': groups.join('; ')
    };

    // init all schema columns to 0 (headers use titles)
    for (const sk of schemaKeys) obj[ schemaTitleMap.get(sk) || sk ] = 0;

    // fill counts
    for (const s of (g.pivot || [])) {
      const key   = String(s.value);
      const title = schemaTitleMap.get(key) || key;
      obj[title]  = s.count ?? 0;
    }

    obj['Government Total'] = schemaKeys.reduce((sum, sk) => {
      const title = schemaTitleMap.get(sk) || sk;
      return sum + (Number(obj[title]) || 0);
    }, 0);

    return obj;
  }).sort((a,b)=>a['Country Name'].localeCompare(b['Country Name']));


console.log(schemaKeys, schemaTitleMap)
  const headers = [
    'Government','Country Name','Country Status','Regional Group',
    ...schemaKeys.map(k => schemaTitleMap.get(k) || k),
    'Government Total'
  ];
  return { rows, headers };
}

function flattenPivotLong(
  pivotRoot: any,
  countriesByIso: Map<string, Country>,
  regionalByIso: Map<string, string[]>,
  schemaTitleMap: Map<string, string>
) {
  const out: any[] = [];
  const list = pivotRoot?.facet_counts?.facet_pivot?.["government_s,schema_s"] || [];

  for (const g of list) {
    const iso2 = (g?.value || '').toUpperCase();
    const govTotal = g?.count ?? 0;
    const info = countriesByIso.get(iso2);
    const groups = regionalByIso.get(iso2) || [];
    const nested = g?.pivot || [];

    if (nested.length) {
      for (const s of nested) {
        const key   = String(s.value);
        const title = schemaTitleMap.get(key) || key;
        out.push({
          'Government'      : iso2,
          'Country Name'    : info?.name?.en || iso2,
          'Country Status'  : getCountryStatus(info),
          'Regional Group'  : groups.join('; '),
          'Government Total': govTotal,
          'Schema'          : title,
          'Schema Count'    : s?.count ?? 0
        });
      }
    } else {
      out.push({
        'Government'      : iso2,
        'Country Name'    : info?.name?.en || iso2,
        'Country Status'  : getCountryStatus(info),
        'Regional Group'  : groups.join('; '),
        'Government Total': govTotal,
        'Schema'          : '',
        'Schema Count'    : 0
      });
    }
  }

  return out;
}

const getQuestionByKey = (key: string, type:string) => {
if(type === 'title')
console.log(key)
  return flatted.find(q => q.key === key);
};  
/* ------------------------- Fetch & process ----------------------- */
const fetchData = async () => {
  try {
    loading.value = true;
    error.value   = '';

    // countries + regional groups + realm config + pivot in parallel where possible
    const [countriesRes, regionalRes] = await Promise.all([
      fetch(COUNTRIES_API),
      fetch(REGIONAL_API)
    ]);
    if (!countriesRes.ok) throw new Error('Failed to fetch countries');
    if (!regionalRes.ok)  throw new Error('Failed to fetch regional groups');

    const [countries, regionalGroups] = await Promise.all([
      countriesRes.json() as Promise<Country[]>,
      regionalRes.json()  as Promise<RegionalGroup[]>
    ]);
    const countriesByIso = indexCountriesByCode(countries);
    const regionalByIso  = indexRegionalGroups(regionalGroups);

    // Report API
    const fields = {
      Q003: 1, Q004: 1, Q004_a: 1, Q004_b: 1,
      Q005: 1, Q005_a: 1, Q005_b: 1,
      Q007: 1, Q007_a: 1, Q008: 1, Q010_a: 1,
      Q012_a: 1, Q012_b: 1, Q021_b: 1,
      documentId: 1, government: 1
    };
    const query = {
      government_REL: {
        $in: [
          'D50FE62D-8A5E-4407-83F8-AFCAAF708EA4',
          '5E5B7AA4-2420-4147-825B-0820F7EC5A4B',
          '942E40CA-4C23-4D3A-A0B4-736CD0EFCD54',
          '3D0CCC9A-A0A1-4399-8FA2-41D4D649DB0E',
          '0EC2E5AE-25F3-4D3A-B71F-8019BB62ED4B'
        ]
      }
    };
    const apiUrl = `${REPORT_ANALYZER_API}?f=${encodeURIComponent(JSON.stringify(fields))}&q=${encodeURIComponent(JSON.stringify(query))}&realm=${realm.realm}`;

    const reportRes = await fetch(apiUrl);
    if (!reportRes.ok) throw new Error('Failed to fetch report data');
    const reports: ReportData[] = await reportRes.json();

    // Map report rows -> Detail table
    const processed: TableRow[] = reports.map((report, index) => {
      const iso2 = (report.government?.identifier || '').toUpperCase();
      const country = countriesByIso.get(iso2);

      const row: TableRow = {
        country: country?.name?.en || iso2,
        countryCode: iso2,
        status: getCountryStatus(country),
        regionalGroup: (regionalByIso.get(iso2) || []).join('; ') || 'N/A',
        documentId: report.documentId
      };
      // if(index%2 === 0){
      //   report.Q003.value = 'true';
      // }

      // Add question columns mapped to "Q.<number>" and "Q.<number>-Info"
      Object.keys(report).forEach((key) => {
        if (!key.startsWith('Q')) return;
        const qDef = getQuestionByKey(key);
        if (!qDef) return;

        const formattedNumber = 'Q.' + qDef.number;
        if(!questionMap.has(formattedNumber)){
          questionMap.set(formattedNumber, qDef);
        }
        
        // OPTION type mapping
        if (qDef.type === 'option') {
          const value = (report as any)[key]?.value;
          const label = qDef.options?.find((opt: any) => opt.value === value)?.title || value;
          row[formattedNumber] = label;
          rawValuesMap.set(`${report.documentId}|${formattedNumber}`, value);
          const infoHtml = lstring((report as any)[key]?.details, locale.value);
          row[formattedNumber + '-Info'] = stripHtmlToText(infoHtml);
        }
        // Other types can be added here if needed
      });

      return row;
    });

console.log(rawValuesMap)
    tableData.value = processed;

    // Build pivot sheets
    const [schemaTitleMap, pivotRoot] = await Promise.all([
      getSchemaTitleMap(),
      fetchPivotJson()
    ]);

    const { rows: wideRows, headers: wideHeaders } =
      buildPivotWide(pivotRoot, countriesByIso, regionalByIso, schemaTitleMap);

    pivotWideRows.value    = wideRows.filter(r => tableData.value.some(tr => tr.countryCode === r['Government']));
    pivotWideHeaders.value = wideHeaders;

    const longRows = flattenPivotLong(pivotRoot, countriesByIso, regionalByIso, schemaTitleMap);
    pivotLongRows.value    = longRows.filter(r => tableData.value.some(tr => tr.countryCode === r['Government']));
    pivotLongHeaders.value = [
      'Government','Country Name','Country Status','Regional Group',
      'Government Total','Schema','Schema Count'
    ];

    nextTick(() => {
      initTooltips();
    });

  } catch (err: any) {
    error.value = err?.message || 'Failed to fetch data';
    console.error('Error fetching data:', err);
  } finally {
    loading.value = false;
  }
};

/* ------------------------- Excel export -------------------------- */
const exportToExcel = () => {
  const wb = XLSX.utils.book_new();

  // Detail
  const detailHeaders = Array.from(
    tableData.value.reduce((set, row) => {
      Object.keys(row).forEach(k => set.add(k));
      return set;
    }, new Set<string>())
  );
  const detailSheet = XLSX.utils.json_to_sheet(tableData.value, { header: detailHeaders });
  detailSheet['!cols'] = detailHeaders.map(h => ({ wch: Math.max(12, h.length + 2) }));
  XLSX.utils.book_append_sheet(wb, detailSheet, 'Detail');

  // Pivot Wide
  if (pivotWideRows.value.length) {
    const wideSheet = XLSX.utils.json_to_sheet(pivotWideRows.value, { header: pivotWideHeaders.value });
    wideSheet['!cols'] = pivotWideHeaders.value.map(h => ({ wch: Math.max(16, h.length + 2) }));
    XLSX.utils.book_append_sheet(wb, wideSheet, 'Pivot Wide');
  }

  // Comparison
  if (comparisonColumnKeys.value.length) {
    const compData: any[] = [];
    tableData.value.forEach(row => {
      const rowData: any = {};
      comparisonColumnKeys.value.forEach(key => {
        if (key.startsWith('Q.')) {
          rowData[key] = getComparisonCell(row, key).text;
        } else if (key === 'status') {
          rowData[key] = row[key];
        } else {
          rowData[key] = formatCellValue(row[key]);
        }
      });
      compData.push(rowData);
    });

    const compSheet = XLSX.utils.json_to_sheet(compData, { header: comparisonColumnKeys.value });
    
    // Add styles manually
    const range = XLSX.utils.decode_range(compSheet['!ref'] || '');
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const key = comparisonColumnKeys.value[C];
        if (key && key.startsWith('Q.')) {
          const row = tableData.value[R - 1];
          if (row) {
            const compCell = getComparisonCell(row, key);
            const cellAddr = XLSX.utils.encode_cell({ c: C, r: R });
            const cell = compSheet[cellAddr];
            if (cell) {
              let rgb = '';
              if (compCell.class.includes('bg-success')) rgb = 'C6EFCE'; // Light Green
              else if (compCell.class.includes('bg-danger')) rgb = 'FFC7CE'; // Light Red
              else if (compCell.class.includes('bg-warning')) rgb = 'FFEB9C'; // Light Orange

              if (rgb) {
                cell.s = { fill: { patternType: 'solid', fgColor: { rgb } } };
              }
            }
          }
        }
      }
    }
    
    // Format headers slightly
    const headerRow = comparisonColumnKeys.value.map(k => k.startsWith('Q.') ? k.replace('.', '') : formatHeaderName(k));
    XLSX.utils.sheet_add_aoa(compSheet, [headerRow], { origin: 'A1' });

    compSheet['!cols'] = comparisonColumnKeys.value.map(h => ({ wch: Math.max(16, h.length + 2) }));
    XLSX.utils.book_append_sheet(wb, compSheet, 'Comparison');
  }

  const fileName = `abs-national-reports-${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
};

/* --------------------------- Mount ------------------------------- */
onMounted(() => { 
    flatted = flattenQuestions(absNationalReport1);
    fetchData(); 

    nextTick(() => {
      initTooltips();
      
      // Reinitialize tooltips when tabs change
      const tabElements = document.querySelectorAll('button[data-bs-toggle="tab"]');
      tabElements.forEach(elm => {
        elm.addEventListener('shown.bs.tab', () => {
          setTimeout(initTooltips, 50); // Small timeout to ensure tab is visible before binding sizes
        });
      });
    });
});

function initTooltips() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  Array.from(tooltipTriggerList).forEach(tooltipTriggerEl => {
    // avoid re-initializing if it already exists
    const instance = Tooltip.getInstance(tooltipTriggerEl);
    if (!instance) {
      new Tooltip(tooltipTriggerEl, { boundary: document.body, trigger: 'hover', html: true });
    }
  });
}
</script>

<style scoped>
/* Optional: small tweaks if desired */
</style>
