export interface User {
  id: string
  name: string
  username: string
  professionalHeadline: string
  imageUrl: string
  picture: string
  skills?: Skill[]
  experiences?: Experience[]
  education?: Education[]
  person?: {
    name: string
    picture: string
    location?:{
      name: string
      country: string
    }
    summaryOfBio?: string
  }
}


export interface Skill {
  name: string
  weight: number
}

export interface Experience {
  id: string
  name: string
  category: string
  organizations: Organization[]
}

export interface Organization {
  name: string
  picture: string
}

export interface Education {
  id: string
  name: string
  category: string
  organizations: Organization[]
}

export interface SearchResponse {
  results: User[]

}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}