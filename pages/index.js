import Head from "next/head"
import { VStack } from "@chakra-ui/react"
import GamesList from "../components/GamesList"

export default function Home() {
  return (
    <>
      <Head>
        <title>CFB Now</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <VStack>
        <GamesList />
      </VStack>
    </>
  )
}
