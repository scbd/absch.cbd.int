export default {
  language: { column: '0', required: true }, // A
  country: { column: '1', required: true }, // B
  absCNAId: { column: '2', required: true }, // C
  permitEquivalent: { column: '3' }, // D
  dateOfIssuance: { column: '4', required: true }, // E
  dateOfExpiry: { column: '5', required: false }, // F
  provider: {
    schema: {
      type: { column: '6' }, // G
      existing: { column: '7' }, // H
      orgName: { column: '8' }, // I
      acronym: { column: '9' }, // J
      address: { column: '10' }, // K
      city: { column: '11' }, // L
      country: { column: '12' }, // M
      email: { column: '13' } // N
    }
  },
  pic: {
    schema: {
      consent: { column: '14' }, // O
      type: { column: '15' }, // P
      existing: { column: '16' }, // Q
      orgName: { column: '17' }, // R
      acronym: { column: '18' }, // S
      address: { column: '19' }, // T
      city: { column: '20' }, // U
      country: { column: '21' }, // V
      email: { column: '22' } // W
    }
  },
  matEstablished: { column: '23' }, // X
  subjectMatter: { column: '24' }, // Y
  keywords: { column: '25' }, // Z
  specimens: { column: '26' }, // AA
  taxonomies: { column: '27' }, // AB
  usage: { column: '28' }, // AC
  usageDescription: { column: '29' }, // AD
  conditionsThirdPartyTransfer: { column: '30' }, // AE
  permitFiles: { column: '31' }, // AF
  additionalInformation: { column: '32' } // AG
}
