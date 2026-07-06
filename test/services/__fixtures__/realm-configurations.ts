import type { RealmConfiguration } from '~/types/realm'

// Trimmed-down realm configurations mirroring the shape served by
// /api/v2018/realm-configurations/<host>. Also aliased as the `realmConf`
// module in vitest.config.ts so importing ~/services/realm resolves in tests.
const realmConfigurations: RealmConfiguration[] = [
  {
    realm: 'ABS',
    host: 'absch.cbd.int',
    uIdPrefix: 'ABSCH',
    displayName: 'Access and Benefit-Sharing Clearing-House',
    schemas: {
      contact: {
        type: 'national'
      },
      absNationalAuthority: {
        type: 'national',
        publishingAuthorities: ['NFP-ABS'],
        nationalAuthorizedUser: ['NAU-ABS']
      },
      absPermit: {
        type: 'national',
        nationalAuthorizedUser: ['NAU-ABS-IRCC']
      },
      absCheckpoint: {
        type: 'national'
      },
      modelContractualClause: {
        type: 'reference'
      }
    },
    roles: {
      publishingAuthorities: ['NFP-ABS'],
      nationalAuthorizedUser: ['NAU-ABS', 'User'],
      nationalFocalPoint: ['NFP-ABS'],
      scbdPublishingAuthorities: ['ABS-Admin']
    },
    adminRoles: ['ABS-Administrator']
  },
  {
    realm: 'BCH-TRG',
    host: 'training.bch.cbd.int',
    uIdPrefix: 'BCH',
    displayName: 'Biosafety Clearing-House-TRG',
    protocol: 'Cartagena Protocol',
    protocolShortName: 'BCH',
    schemas: {
      nationalContact: {
        type: 'national'
      },
      biosafetyLaw: {
        type: 'reference'
      }
    },
    roles: {
      publishingAuthorities: ['NFP-BCH'],
      nationalAuthorizedUser: ['NAU-BCH'],
      nationalFocalPoint: ['NFP-BCH']
    },
    adminRoles: ['BCH-Administrator']
  }
]

export default realmConfigurations
