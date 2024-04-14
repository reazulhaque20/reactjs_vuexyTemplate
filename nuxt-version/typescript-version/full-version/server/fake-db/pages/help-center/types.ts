// 👉 Help center
export interface HelpCenterSubcategoryArticlesType {
  slug: string
  title: string
  content: string
}
export interface HelpCenterAllCategoryArticlesType {
  title: string
  icon: string
  articles: { title: string }[]
}
export interface HelpCenterSubcategoriesType {
  icon: string
  slug: string
  title: string
  articles: HelpCenterSubcategoryArticlesType[]
}
export interface HelpCenterCategoriesType {
  icon: string
  slug: string
  title: string
  avatarColor: string
  subCategories: HelpCenterSubcategoriesType[]
}
export interface HelpCenterArticlesOverviewType {
  img: string
  slug: string
  title: string
  subtitle: string
}

export interface HelpCenterArticleType {
  title: string
  lastUpdated: string
  productContent: string
  productImg: string
  checkoutContent: string
  checkoutImg: string
  articleList: string[]
}
