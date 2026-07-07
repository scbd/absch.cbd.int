import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createRealm, initRealm, getRealm } from '~/services/realm'
import type { Realm } from '~/types/realm'
import realmConfigurations from './__fixtures__/realm-configurations'
import scbdJsonSchemas from '~/components/scbd-angularjs-services/filters/schema-name.json' with { type: 'json' }

vi.mock('~/api/realms', () => ({
  default: class {
    async getRealmConfigurationsByHost (): Promise<unknown> {
      return structuredClone(realmConfigurations)
    }
  }
}))

function absRealm (): Realm {
  return createRealm(structuredClone(realmConfigurations), 'absch.cbd.int')
}

function bchRealm (): Realm {
  return createRealm(structuredClone(realmConfigurations), 'training.bch.cbd.int')
}

let warnSpy = vi.spyOn(console, 'warn')

beforeEach(() => {
  vi.restoreAllMocks()
  warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
  vi.spyOn(console, 'info').mockImplementation(() => undefined)
})

describe('createRealm', () => {
  it('selects the configuration matching the host', () => {
    expect(absRealm().value).toBe('ABS')
    expect(bchRealm().value).toBe('BCH-TRG')
  })

  it('falls back to the first configuration for an unknown host', () => {
    const realm = createRealm(structuredClone(realmConfigurations), 'unknown.example.org')

    expect(realm.value).toBe('ABS')
  })

  it('throws when no configuration is available', () => {
    expect(() => createRealm([], 'absch.cbd.int')).toThrow(/Unknown realm for host/)
  })

  it('exposes clearing-house names and protocol defaults', () => {
    const realm = absRealm()

    expect(realm.chShortName).toBe('ABSCH')
    expect(realm.chLongName).toBe('Access and Benefit-Sharing Clearing-House')
    expect(realm.protocol).toBe('Nagoya Protocol')
    expect(realm.protocolShortName).toBe('ABS')
  })

  it('uses the configured protocol when present', () => {
    const realm = bchRealm()

    expect(realm.protocol).toBe('Cartagena Protocol')
    expect(realm.protocolShortName).toBe('BCH')
  })

  it('derives national and reference schema lists', () => {
    const realm = absRealm()

    expect(realm.nationalSchemas.sort()).toEqual(
      ['absCheckpoint', 'absNationalAuthority', 'absPermit', 'contact'].sort()
    )
    expect(realm.referenceSchemas).toEqual(['modelContractualClause'])
  })

  it('merges the scbd schemas into the realm schemas', () => {
    const realm = absRealm()

    expect(realm.scbdSchemas.sort()).toEqual(Object.keys(scbdJsonSchemas).sort())

    for (const key of realm.scbdSchemas) {
      expect(realm.schemas[key]).toBeDefined()
    }
  })
})

describe('realm.is', () => {
  it('matches the realm with boundaries by default', () => {
    const realm = bchRealm()

    expect(realm.is('BCH')).toBe(true)
    expect(realm.is('BCH-TRG')).toBe(true)
    expect(realm.is('BC')).toBe(false)
    expect(realm.is('ABS')).toBe(false)
  })

  it('matches the realm exactly in strict mode', () => {
    const realm = bchRealm()

    expect(realm.is('BCH', true)).toBe(false)
    expect(realm.is('BCH-TRG', true)).toBe(true)
  })
})

describe('realm.getRole', () => {
  it('reads roles from the realm configuration', () => {
    expect(absRealm().getRole('nationalFocalPoint')).toEqual(['NFP-ABS'])
  })

  it('lowercases the first letter and strips the Abs prefix from role names', () => {
    const realm = absRealm()

    expect(realm.getRole('NationalFocalPoint')).toEqual(['NFP-ABS'])
    expect(realm.getRole('AbsNationalFocalPoint')).toEqual(['NFP-ABS'])
  })

  it('prefers the schema role override', () => {
    expect(absRealm().getRole('nationalAuthorizedUser', 'absPermit')).toEqual(['NAU-ABS-IRCC'])
  })

  it('falls back to realm roles when the national schema has no override', () => {
    expect(absRealm().getRole('publishingAuthorities', 'absPermit')).toEqual(['NFP-ABS'])
  })

  it('uses scbd publishing authorities for reference schemas', () => {
    expect(absRealm().getRole('publishingAuthorities', 'modelContractualClause')).toEqual(['ABS-Admin'])
  })

  it('lets any registered user submit requests on reference schemas', () => {
    expect(absRealm().getRole('nationalAuthorizedUser', 'modelContractualClause')).toEqual(['User'])
  })

  it('resolves fallback roles from a schema type', () => {
    expect(absRealm().getRole('publishingAuthorities', undefined, 'reference')).toEqual(['ABS-Admin'])
  })

  it('returns the role name itself when unconfigured, with a warning', () => {
    expect(absRealm().getRole('unknownRole')).toEqual(['unknownRole'])
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('unknownRole role is not configured'))
  })
})

describe('realm.nationalRoles', () => {
  it('unions national schema roles with fallback roles, excluding User', () => {
    expect(absRealm().nationalRoles().sort()).toEqual(
      ['NAU-ABS', 'NAU-ABS-IRCC', 'NFP-ABS'].sort()
    )
  })

  it('scopes schema roles to the given schema', () => {
    expect(absRealm().nationalRoles('absPermit').sort()).toEqual(
      ['NAU-ABS', 'NAU-ABS-IRCC', 'NFP-ABS'].sort()
    )
  })

  it('is also exposed as the obsolete nationalSchemaRoles', () => {
    const realm = absRealm()

    expect(realm.nationalSchemaRoles().sort()).toEqual(realm.nationalRoles().sort())
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('OBSOLETE'))
  })
})

describe('realm.schemaRoles', () => {
  it('unions publishing authorities and national authorized users', () => {
    expect(absRealm().schemaRoles('absNationalAuthority').sort()).toEqual(
      ['NAU-ABS', 'NFP-ABS'].sort()
    )
  })

  it('fills missing schema roles from the fallback roles', () => {
    expect(absRealm().schemaRoles('absPermit').sort()).toEqual(
      ['NAU-ABS-IRCC', 'NFP-ABS'].sort()
    )
  })

  it('returns a single role list when a role name is given', () => {
    expect(absRealm().schemaRoles('absPermit', 'nationalAuthorizedUser')).toEqual(['NAU-ABS-IRCC'])
  })
})

describe('realm.fallbackRoles', () => {
  it('reads national fallbacks from the realm roles', () => {
    expect(absRealm().fallbackRoles('national', 'nationalAuthorizedUser')).toEqual(['NAU-ABS', 'User'])
  })

  it('uses admin roles for reference schemas without scbd publishing authorities', () => {
    expect(bchRealm().fallbackRoles('reference', 'publishingAuthorities')).toEqual(['BCH-Administrator'])
  })

  it('returns the role name for an invalid schema type, with a warning', () => {
    expect(absRealm().fallbackRoles('bogus', 'someRole')).toEqual(['someRole'])
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('invalid schemaType'))
  })
})

describe('getRealm / initRealm', () => {
  it('throws when the realm is accessed before initRealm()', () => {
    expect(() => getRealm()).toThrow(/before initRealm/)
  })

  it('fetches the configurations and seeds the singleton', async () => {
    vi.stubGlobal('window', {
      location: { host: 'training.bch.cbd.int' },
      scbdApp: { host: 'training.bch.cbd.int' }
    })

    await initRealm()

    expect(getRealm().value).toBe('BCH-TRG')

    vi.unstubAllGlobals()
  })
})
