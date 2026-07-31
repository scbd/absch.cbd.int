import type {
  MenuArticleContent, PortalAcl, PortalMenuItem,
  PortalData, PortalDraft, PortalMenuItemData
} from '~/types/portals'

function toAclDraft (acl: Partial<PortalAcl> | undefined): PortalAcl {
  return { enabled: acl?.enabled ?? false, read: acl?.read ?? [], update: acl?.update ?? [] }
}

function toArticleDraft (article: Partial<MenuArticleContent> | undefined): MenuArticleContent {
  return { articleId: article?.articleId ?? '', showCoverImage: article?.showCoverImage ?? false }
}

function toMenuItemDraft (item: PortalMenuItemData): PortalMenuItem {
  const menu: PortalMenuItem = {
    slug: item.slug ?? '',
    title: item.title ?? {},
    isExpanded: item.isExpanded,
    content: item.content,
    url: item.url,
    acl: toAclDraft(item.acl),
    menus: (item.menus ?? []).map(toMenuItemDraft)
  }
  const hasUrl = (menu.url?.url ?? '') !== ''
  if (menu.content === undefined && hasUrl) menu.content = { link: {} }
  return menu
}

export function toPortalDraft (data: PortalData): PortalDraft {
  return {
    slug: data.slug ?? '',
    title: data.title ?? {},
    sortOrder: data.sortOrder ?? 0,
    realms: data.realms ?? [],
    content: { article: toArticleDraft(data.content?.article) },
    menus: (data.menus ?? []).map(toMenuItemDraft),
    acl: toAclDraft(data.acl)
  }
}
