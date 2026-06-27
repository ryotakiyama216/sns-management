import { DEFAULT_PROFILE } from "./constants"

export const storage = {
  getProfile: (): string => {
    if (typeof window === "undefined") return DEFAULT_PROFILE
    return localStorage.getItem("pe_profile") || DEFAULT_PROFILE
  },
  setProfile: (v: string) => {
    localStorage.setItem("pe_profile", v)
  },
  getNotionToken: (): string => {
    if (typeof window === "undefined") return ""
    return localStorage.getItem("pe_notion_token") || ""
  },
  getNotionDb: (): string => {
    if (typeof window === "undefined") return ""
    return localStorage.getItem("pe_notion_db") || ""
  },
  setNotion: (token: string, db: string) => {
    localStorage.setItem("pe_notion_token", token)
    localStorage.setItem("pe_notion_db", db)
  },
}
