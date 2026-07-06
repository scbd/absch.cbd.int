// RequireJS module defined in app/boot.js: the realm configurations fetched
// from /api/v2018/realm-configurations/<host> before the app bundle runs.
declare module 'realmConf' {
  import type { RealmConfiguration } from '~/types/realm'

  const realmConfigurations: RealmConfiguration[]
  export default realmConfigurations
}
