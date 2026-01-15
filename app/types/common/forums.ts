import type { LString } from '../languages'

export interface Portal {
  _id: string
  title: LString
  slug: string
  content: { article: { articleId: string } }
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
