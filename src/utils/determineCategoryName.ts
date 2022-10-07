export default function determineCategoryName(slug: string): string {
  switch (slug) {
    case 'bridge':
      return 'BridgePools'

    case 'community':
      return 'CommunityPools'

    default:
      return ''
  }
}
