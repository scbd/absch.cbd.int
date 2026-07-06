import type { RealmConfiguration } from '~/types/realm'

export default class RealmsApi {
  constructor (options?: unknown)
  getRealmConfigurationsByHost (host: string): Promise<RealmConfiguration[]>
  getRealmConfigurations (realmEnvironment?: string): Promise<RealmConfiguration[]>
  getRealmConfiguration (realm?: string): Promise<RealmConfiguration | undefined>
  getOwnerRealm (identifier: string): Promise<string | undefined>
}
