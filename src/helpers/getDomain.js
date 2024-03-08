import { isProduction } from "./isProduction"

export const getDomain = () => {
  const prodUrl = "https://sopra-fs24-jukic-nedim-server.oa.r.appspot.com"
  const devUrl = "http://localhost:8080"

  return isProduction() ? prodUrl : devUrl
}
