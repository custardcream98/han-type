import { headers } from "next/headers"
import { userAgent } from "next/server"

export const isMacOS = () => {
  const userAgentParsed = userAgent({
    headers: headers()
  })

  return !!userAgentParsed.os.name?.toLowerCase().includes("mac")
}
