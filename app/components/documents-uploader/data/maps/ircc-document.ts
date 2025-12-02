export default {
  language: { column: '0', required: true, translationKey: 'generalInfo' }, // A
  country: { column: '1', required: true, translationKey: 'country' }, // B
  absCNAId: { column: '2', required: true, translationKey: 'issuingAuthority' }, // C
  permitEquivalent: { column: '3', translationKey: 'detailsPermit' }, // D
  dateOfIssuance: { column: '4', required: true, translationKey: 'dateOfIssuance' }, // E
  dateOfExpiry: { column: '5', required: true, translationKey: 'dateOfExpiry' }, // F
  provider: {
    schema: {
      type: { column: '6', required: true, translationKey: 'theProvider' }, // G
      existing: { column: '7', translationKey: 'uniqueIdentifier' }, // H
      orgName: { column: '8', required: true, translationKey: 'nameOfTheOrganization' }, // I
      acronym: { column: '9', required: true, translationKey: 'acronym' }, // J
      address: { column: '10', translationKey: 'address' }, // K
      city: { column: '11', translationKey: 'city' }, // L
      country: { column: '12', required: true, translationKey: 'country' }, // M
      email: { column: '13', required: true, translationKey: 'email' } // N
    }
  },
  pic: {
    schema: {
      consent: { column: '14', translationKey: 'picGranted' }, // O
      type: { column: '15', required: true, translationKey: 'entitiesConfidential' }, // P
      existing: { column: '16', translationKey: 'uniqueIdentifier' }, // Q
      orgName: { column: '17', required: true, translationKey: 'firstName' }, // R
      acronym: { column: '18', required: true, translationKey: 'acronym' }, // S
      address: { column: '19', translationKey: 'address' }, // T
      city: { column: '20', translationKey: 'city' }, // U
      country: { column: '21', required: true, translationKey: 'country' }, // V
      email: { column: '22', required: true, translationKey: 'email' } // W
    }
  },
  matEstablished: { column: '23', translationKey: 'mutuallyInformation' }, // X
  subjectMatter: { column: '24', required: true, translationKey: 'subjectMatter' }, // Y
  keywords: { column: '25', translationKey: 'keywords' }, // Z
  specimens: { column: '26', translationKey: 'specimens' }, // AA
  taxonomies: { column: '27', translationKey: 'taxonomy' }, // AB
  usage: { column: '28', required: true, translationKey: 'usages' }, // AC
  usageDescription: { column: '29', translationKey: 'usagesDescription' }, // AD
  conditionsThirdPartyTransfer: { column: '30', translationKey: 'thirdPartyTransferCondition' }, // AE
  permitFiles: { column: '31', translationKey: 'documentation' }, // AF
  additionalInformation: { column: '32', translationKey: 'additionalInformation' } // AG
}
