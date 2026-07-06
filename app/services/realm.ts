import _ from 'lodash'
import scbdJsonSchemas from '~/components/scbd-angularjs-services/filters/schema-name.json' with { type: 'json' }
import type { Realm, RealmConfiguration, RealmSchema } from '~/types/realm'

export function createRealm (configurations: RealmConfiguration[], host: string): Realm {
  const foundConfig = configurations.find((configuration) => configuration.host === host) ?? configurations[0]

  if (foundConfig === undefined) {
    throw new Error(`Unknown realm for host: ${host}`)
  }

  const realmConfig = foundConfig

  // the configurations come from the API; `realm` can be missing despite the type
  const realmValue = realmConfig.realm as string | undefined

  if (realmValue === undefined || realmValue === '') {
    // eslint-disable-next-line no-console -- behavior kept from the ng implementation
    console.info('Realm NOT_FOUND!!!!')
  }

  const nationalSchemas = Object.entries(realmConfig.schemas)
    .filter(([, schema]) => schema.type === 'national')
    .map(([key]) => key)

  const referenceSchemas = Object.entries(realmConfig.schemas)
    .filter(([, schema]) => schema.type === 'reference')
    .map(([key]) => key)

  const scbdSchemas = Object.entries(scbdJsonSchemas).map(([key, schema]) => {
    realmConfig.schemas[key] = schema
    return key
  })

  function is (realm: string, strict?: boolean): boolean {
    // MATCH realm exactly (strict) or with boundaries eg: ABS, ABS-*, BCH, BCH-*
    const realmRe = strict === true
      ? new RegExp(`^${escapeRegExp(realm)}($)`)
      : new RegExp(`^${escapeRegExp(realm)}(\\b|$)`)

    return realmRe.test(realmConfig.realm)
  }

  function resolveRoles (patchedRoleName: string, schema?: string, schemaType?: string): string[] | undefined {
    if (schema !== undefined) {
      const schemaDetails = lookup(realmConfig.schemas, schema)

      if (schemaDetails === undefined) {
        throw new Error(`Unknown schema: ${schema}`)
      }

      // if roles are not overridden then apply fallback roles National/Reference
      return asRoles(schemaDetails[patchedRoleName]) ?? fallbackRoles(schemaDetails.type, patchedRoleName)
    }

    if (schemaType !== undefined) {
      return fallbackRoles(schemaType, patchedRoleName)
    }

    return lookup(realmConfig.roles, patchedRoleName)
  }

  function getRole (roleName: string, schema?: string, schemaType?: string): string[] {
    const roles = resolveRoles(patchRoleName(roleName), schema, schemaType)

    if (roles === undefined) {
      // eslint-disable-next-line no-console -- behavior kept from the ng implementation
      console.warn(`${roleName} role is not configured for realm ${realmConfig.realm}, please update realm-configuration`)
    }

    return roles ?? [roleName]
  }

  function nationalSchemaEntries (schema?: string): Array<[string, RealmSchema]> {
    if (schema !== undefined) {
      const specificSchema = lookup(realmConfig.schemas, schema)

      if (specificSchema !== undefined) {
        return [[schema, specificSchema]]
      }
    }

    return Object.entries(realmConfig.schemas)
  }

  function nationalRoles (schema?: string): string[] {
    const nationalFallbackRoles = _(realmConfig.roles)
      .map((roles, key) => {
        if (_.includes(['publishingAuthorities', 'nationalAuthorizedUser', 'nationalFocalPoint'], key)) {
          return roles
        }

        return undefined
      })
      .flatten().compact().uniq().value()

    const nationalSchemaRoles = _(nationalSchemaEntries(schema))
      .map(([key, schemaDetails]) => {
        if (schemaDetails.type === 'national' && key !== 'contact') {
          return _.union(schemaDetails.publishingAuthorities ?? [], schemaDetails.nationalAuthorizedUser ?? [])
        }

        return undefined
      })
      .flatten().compact().uniq().value()

    return _(nationalSchemaRoles).union(nationalFallbackRoles)
      .flatten().compact().uniq().without('User', 'user').value()
  }

  function nationalSchemaRoles (schema?: string): string[] {
    // eslint-disable-next-line no-console -- behavior kept from the ng implementation
    console.warn('OBSOLETE: use realm.nationalRoles();')

    return nationalRoles(schema)
  }

  function collectSchemaRoles (schemaDetails: RealmSchema, roleName?: string): string[] {
    if (roleName !== undefined) {
      return asRoles(schemaDetails[roleName]) ?? fallbackRoles(schemaDetails.type, roleName) ?? []
    }

    return _.union(
      schemaDetails.publishingAuthorities ?? fallbackRoles(schemaDetails.type, 'publishingAuthorities') ?? [],
      schemaDetails.nationalAuthorizedUser ?? fallbackRoles(schemaDetails.type, 'nationalAuthorizedUser') ?? []
    )
  }

  function schemaRoles (schema: string, roleName?: string): string[] {
    const schemaDetails = lookup(realmConfig.schemas, schema)

    if (schemaDetails === undefined) {
      throw new Error(`Unknown schema: ${schema}`)
    }

    return _(collectSchemaRoles(schemaDetails, roleName)).flatten().compact().uniq().value()
  }

  function fallbackRoles (schemaType: string | undefined, roleName: string): string[] | undefined {
    if (schemaType === 'national') {
      return lookup(realmConfig.roles, roleName)
    } else if (schemaType === 'reference') {
      if (roleName === 'publishingAuthorities') { // For all other type SCBD should be Admin
        return realmConfig.roles['scbdPublishingAuthorities'] ?? realmConfig.adminRoles
      } else {
        return ['User'] // Any registered user can submit request
      }
    } else {
      // eslint-disable-next-line no-console -- behavior kept from the ng implementation
      console.warn(`${String(schemaType)} is invalid schemaType for role ${roleName}`)
    }

    return [roleName]
  }

  return {
    ...realmConfig,

    value: realmConfig.realm,
    uIdPrefix: realmConfig.uIdPrefix,
    schemas: realmConfig.schemas,
    roles: realmConfig.roles,

    chShortName: realmConfig.uIdPrefix,
    chLongName: realmConfig.displayName,
    protocol: realmConfig.protocol ?? 'Nagoya Protocol',
    protocolShortName: realmConfig.protocolShortName ?? 'ABS',

    nationalSchemas,
    referenceSchemas,
    scbdSchemas,

    is,
    getRole,
    nationalRoles,
    nationalSchemaRoles,
    schemaRoles,
    fallbackRoles
  }
}

let realmInstance: Realm | null = null

// Fetches the realm configurations that boot.js used to load as the
// `realmConf` RequireJS module; must complete before angular bootstraps
// (see bootstrapApp in app/templates/template-controller.js).
export async function initRealm (): Promise<void> {
  const { default: RealmsApi } = await import('~/api/realms')
  const configurations = await new RealmsApi().getRealmConfigurationsByHost(window.scbdApp?.host ?? '')

  realmInstance = createRealm(configurations, window.location.host)
}

export function getRealm (): Realm {
  if (realmInstance === null) {
    throw new Error('realm accessed before initRealm()')
  }

  return realmInstance
}

function lookup<T> (map: Record<string, T>, key: string): T | undefined {
  return map[key]
}

function asRoles (value: string[] | string | Record<string, string> | undefined): string[] | undefined {
  if (Array.isArray(value)) {
    return value
  }

  return undefined
}

function escapeRegExp (text: string): string {
  return text.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
}

function patchRoleName (roleName: string): string {
  const stripped = roleName.replace(/^Abs/i, '')

  return stripped.charAt(0).toLowerCase() + stripped.substring(1)
}
