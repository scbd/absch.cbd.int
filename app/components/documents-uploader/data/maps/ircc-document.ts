export default {
  language: { column: '0', required: true, languageKey: 'generalInfo' }, // A
  country: { column: '1', required: true, languageKey: 'country' }, // B
  absCNAId: { column: '2', required: true, languageKey: 'issuingAuthority' }, // C
  permitEquivalent: { column: '3', languageKey: 'detailsPermit' }, // D
  dateOfIssuance: { column: '4', required: true, languageKey: 'dateOfIssuance' }, // E
  dateOfExpiry: { column: '5', required: true, languageKey: 'dateOfExpiry' }, // F
  provider: {
    schema: {
      type: { column: '6', required: true, languageKey: 'theProvider' }, // G
      existing: { column: '7', languageKey: 'uniqueIdentifier' }, // H
      orgName: { column: '8', required: true, languageKey: 'nameOfTheOrganization' }, // I
      acronym: { column: '9', required: true, languageKey: 'acronym' }, // J
      address: { column: '10', languageKey: 'address' }, // K
      city: { column: '11', languageKey: 'city' }, // L
      country: { column: '12', required: true, languageKey: 'country' }, // M
      email: { column: '13', required: true, languageKey: 'email' } // N
    }
  },
  pic: {
    schema: {
      consent: { column: '14', languageKey: 'picGranted' }, // O
      type: { column: '15', required: true, languageKey: 'entitiesConfidential' }, // P
      existing: { column: '16', languageKey: 'uniqueIdentifier' }, // Q
      orgName: { column: '17', required: true, languageKey: 'firstName' }, // R
      acronym: { column: '18', required: true, languageKey: 'acronym' }, // S
      address: { column: '19', languageKey: 'address' }, // T
      city: { column: '20', languageKey: 'city' }, // U
      country: { column: '21', required: true, languageKey: 'country' }, // V
      email: { column: '22', required: true, languageKey: 'email' } // W
    }
  },
  matEstablished: { column: '23', languageKey: 'mutuallyInformation' }, // X
  subjectMatter: { column: '24', required: true, languageKey: 'subjectMatter' }, // Y
  keywords: { column: '25', languageKey: 'keywords' }, // Z
  specimens: { column: '26', languageKey: 'specimens' }, // AA
  taxonomies: { column: '27', languageKey: 'taxonomy' }, // AB
  usage: { column: '28', required: true, languageKey: 'usages' }, // AC
  usageDescription: { column: '29', languageKey: 'usagesDescription' }, // AD
  conditionsThirdPartyTransfer: { column: '30', languageKey: 'thirdPartyTransferCondition' }, // AE
  permitFiles: { column: '31', languageKey: 'documentation' }, // AF
  additionalInformation: { column: '32', languageKey: 'additionalInformation' } // AG
}
