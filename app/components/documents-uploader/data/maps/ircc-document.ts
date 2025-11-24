export default {
  language: { column: 'A', required: true },
  country: { column: 'B', required: true },
  absCNAId: { column: 'C', required: true },
  permitEquivalent: { column: 'D' },
  dateOfIssuance: { column: 'E', required: true },
  dateOfExpiry: { column: 'F', required: false },
  provider: {
    schema: {
      type: { column: 'G' },
      existing: { column: 'H' },
      orgName: { column: 'I' },
      acronym: { column: 'J' },
      address: { column: 'K' },
      city: { column: 'L' },
      country: { column: 'M' },
      email: { column: 'N' }
    }
  },
  pic: {
    schema: {
      consent: { column: 'O' },
      type: { column: 'P' },
      existing: { column: 'Q' },
      orgName: { column: 'R' },
      acronym: { column: 'S' },
      address: { column: 'T' },
      city: { column: 'U' },
      country: { column: 'V' },
      email: { column: 'W' }
    }
  },
  matEstablished: { column: 'X' },
  subjectMatter: { column: 'Y' },
  keywords: { column: 'Z' },
  specimens: { column: 'AA' },
  taxonomies: { column: 'AB' },
  usage: { column: 'AC' },
  usageDescription: { column: 'AD' },
  conditionsThirdPartyTransfer: { column: 'AE' },
  permitFiles: { column: 'AF' },
  additionalInformation: { column: 'AG' }
}
