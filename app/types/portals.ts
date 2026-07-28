import type { LString } from './languages'

export interface PortalAcl {
  enabled: boolean
  read: string[]
  update: string[]
}

export interface MenuArticleContent {
  articleId: string
  showCoverImage: boolean
}

export interface MenuForumContent {
  forumId: number | null
}

export interface MenuContent {
  article?: MenuArticleContent
  forum?: MenuForumContent
  forumLoP?: MenuForumContent
  link?: object
}

export interface MenuUrl {
  url?: string
  target?: string
}

export interface PortalMenuItem {
  slug: string
  title: LString
  menus: PortalMenuItem[]
  acl: PortalAcl
  isExpanded?: boolean
  content?: MenuContent
  url?: MenuUrl
}

export interface PortalDraft {
  slug: string
  title: LString
  sortOrder: number
  realms: string[]
  content: { article: MenuArticleContent }
  menus: PortalMenuItem[]
  acl: PortalAcl
}

export interface PortalMenuItemData {
  slug?: string
  title?: LString
  isExpanded?: boolean
  content?: MenuContent
  url?: MenuUrl
  acl?: Partial<PortalAcl>
  menus?: PortalMenuItemData[]
}

export interface PortalData {
  _id?: string
  slug?: string
  title?: LString
  sortOrder?: number
  realms?: string[]
  content?: { article?: Partial<MenuArticleContent> }
  menus?: PortalMenuItemData[]
  acl?: Partial<PortalAcl>
}

export interface PreviewMenu {
  url: string
  title: LString
  isExpanded?: boolean
  hasContent?: boolean
  target?: string
  menus: PreviewMenu[]
}
