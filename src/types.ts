export type OnboardingCompletionData = {
  has_seen_onboarding: boolean,
  is_live: boolean
}

export type DeleteObj = {
  show: boolean,
  id: string,
  index: number
}

export type ServicesData = {
  title: string,
  description: string,
  price: string,
  id: string
}

export type TestimonialData = {
  name: string,
  body: string,
  id: string
}

export type Colors = {
  main: string,
  hover: string,
  accent: string
}

export type Metadata = {
  ogTitle: string,
  ogDescription: string,
  ogImageUrl: string,
  ogImageFile: File | null,
  searchTitle: string,
  searchDescription: string
}

export type OgData = {
  ogTitle: string,
  ogDescription: string,
  ogImageUrl: string,
  ogImageFile: File | null
}

export type SearchData = {
  searchTitle: string,
  searchDescription: string
}