import { useState, useEffect } from "react"
import axios from "axios"
import {
  Flex,
  Box,
  Accordion,
  AccordionItem,
  IconButton,
  Spinner,
  Center,
  Button,
} from "@chakra-ui/react"
import { IoMdRefresh } from "react-icons/io"
import PastGames from "./PastGames"
import ActiveGames from "./ActiveGames"
import FutureGames from "./FutureGames"
import useLocalStorage from "../hooks/useLocalStorage"

const GamesList = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [gamesData, setGamesData] = useState([])
  const [tab, setTab] = useLocalStorage("now")

  useEffect(() => {
    axios.get("/api/api").then(
      (result) => {
        setIsLoaded(true)
        setGamesData(result.data)
      },
      (error) => {
        setIsLoaded(true)
        setError(error)
      }
    )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return (
      <Center h="100vh">
        <Spinner color="blue.500" size="xl" />
      </Center>
    )
  } else {
    return (
      <>
        <Accordion w="100%" allowToggle>
          <AccordionItem>
            <h2>
              <Flex p={4} w="100%" justify="space-between">
                <Button
                  variant={tab === "past" ? "solid" : "outline"}
                  onClick={() => setTab("past")}
                  w="32%"
                >
                  Past
                </Button>
                <Button
                  variant={tab === "now" ? "solid" : "outline"}
                  onClick={() => setTab("now")}
                  w="32%"
                >
                  Now
                </Button>
                <Button
                  variant={tab === "future" ? "solid" : "outline"}
                  onClick={() => setTab("future")}
                  w="32%"
                >
                  Future
                </Button>
              </Flex>
            </h2>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <Flex p={4} w="100%" justify="space-between">
                <Flex textAlign="left" direction="column">
                  <Box>Home</Box>
                </Flex>
                <Flex textAlign="right" direction="column">
                  <Box>Away</Box>
                </Flex>
              </Flex>
            </h2>
          </AccordionItem>
          {tab === "past" && <PastGames gamesData={gamesData} />}
          {tab === "now" && <ActiveGames gamesData={gamesData} />}
          {tab === "future" && <FutureGames gamesData={gamesData} />}

          <AccordionItem>
            <h2>
              <Box p={4} w="100%" textAlign="right">
                <IconButton
                  onClick={() => window.location.reload()}
                  aria-label="refresh"
                  icon={<IoMdRefresh />}
                />
              </Box>
            </h2>
          </AccordionItem>
        </Accordion>
      </>
    )
  }
}

export default GamesList
