export interface RealmSchema {
  [key: string]: string[] | string | Record<string, string> | undefined
  type?: string
  title?: Record<string, string>
  publishingAuthorities?: string[]
  nationalAuthorizedUser?: string[]
  nationalFocalPoint?: string[]
}

export interface RealmConfiguration {
  [key: string]: unknown
  realm: string
  host?: string
  uIdPrefix?: string
  displayName?: string
  protocol?: string
  protocolShortName?: string
  schemas: Record<string, RealmSchema>
  roles: Record<string, string[] | undefined>
  adminRoles?: string[]
}

export interface Realm {
  [key: string]: unknown
  value: string
  uIdPrefix?: string
  schemas: Record<string, RealmSchema>
  roles: Record<string, string[] | undefined>
  chShortName?: string
  chLongName?: string
  protocol: string
  protocolShortName: string
  nationalSchemas: string[]
  referenceSchemas: string[]
  scbdSchemas: string[]
  is: (realm: string, strict?: boolean)=> boolean
  getRole: (roleName: string, schema?: string, schemaType?: string)=> string[]
  nationalRoles: (schema?: string)=> string[]
  nationalSchemaRoles: (schema?: string)=> string[]
  schemaRoles: (schema: string, roleName?: string)=> string[]
  fallbackRoles: (schemaType: string | undefined, roleName: string)=> string[] | undefined
}
