import type { LString } from '../languages'

export interface PortalMenu {
  slug?: string
  title?: LString
  content?: {
    forum?: { forumId?: number }
    article?: { articleId?: string }
    url?: string
  }
  menus?: PortalMenu[]
}

export interface Portal {
  _id: string
  title: LString
  slug: string
  content: { article: { articleId: string } }
  menus?: PortalMenu[]
  article: Article
  url: string
}

interface Image { position: string, size: string, url: string }

export interface Article {
  _id: string
  coverImage: Image
  summary: LString
  title: LString
  content: LString
  meta: { createdOn: string }
  adminTags?: string[]
}
