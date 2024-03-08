import { isProduction } from "./isProduction"

export const getDomain = () => {
  const prodUrl = "https://sopra-fs24-adevan-client.oa.r.appspot.com"
  const devUrl = "https://sopra-fs24-jukic-nedim-server.oa.r.appspot.com"

  return isProduction() ? prodUrl : devUrl
}
