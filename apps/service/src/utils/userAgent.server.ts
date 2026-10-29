import { headers } from "next/headers"
import { userAgent } from "next/server"

export const isMacOS = async () => {
  const userAgentParsed = userAgent({
    headers: await headers()
  })

  return !!userAgentParsed.os.name?.toLowerCase().includes("mac")
}
