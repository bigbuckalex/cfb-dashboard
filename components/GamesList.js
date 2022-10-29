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
  Input,
  InputGroup,
  InputRightElement,
  Progress,
} from "@chakra-ui/react"
import { IoMdRefresh } from "react-icons/io"
import PastGames from "./PastGames"
import ActiveGames from "./ActiveGames"
import FutureGames from "./FutureGames"
import useLocalStorage from "../hooks/useLocalStorage"

const GamesList = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [gamesData, setGamesData] = useState([])
  const [teamsData, setTeamsData] = useState([])
  const [search, setSearch] = useState("")
  const [tab, setTab] = useLocalStorage("now")

  useEffect(() => {
    axios.get("/api/api").then(
      (result) => {
        console.log(result.data)
        setIsLoaded(true)
        setGamesData(result.data[0])
        setTeamsData(result.data[1])
      },
      (error) => {
        setIsLoaded(true)
        setError(error)
      }
    )
  }, [])

  const refresh = () => {
    setRefreshing(true)
    axios.get("/api/api").then(
      (result) => {
        setGamesData(result.data[0])
        setTimeout(() => {
          setRefreshing(false)
        }, 1000)
      },
      (error) => {
        setError(error)
        setTimeout(() => {
          setRefreshing(false)
        }, 1000)
      }
    )
  }

  const clearSearch = () => {
    setSearch("")
  }

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
        <Accordion w="100%" maxWidth={700} allowToggle>
          <AccordionItem>
            <h2>
              <Flex p={4} w="100%" justify="space-between">
                <Button
                  variant={tab === "past" ? "solid" : "outline"}
                  onClick={() => {
                    clearSearch()
                    setTab("past")
                  }}
                  w="32%"
                >
                  Past
                </Button>
                <Button
                  variant={tab === "now" ? "solid" : "outline"}
                  onClick={() => {
                    setTab("now")
                    clearSearch()
                  }}
                  w="32%"
                >
                  Now
                </Button>
                <Button
                  variant={tab === "future" ? "solid" : "outline"}
                  onClick={() => {
                    setTab("future")
                    clearSearch()
                  }}
                  w="32%"
                >
                  Future
                </Button>
              </Flex>
            </h2>
          </AccordionItem>
          <AccordionItem>
            <InputGroup size="md">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                w="calc(100% - 2rem)"
                m={4}
                pr="4.5rem"
                placeholder="Search by team"
              />
              <InputRightElement width="6.5rem">
                <Button mt="2rem" h="1.75rem" size="sm" onClick={clearSearch}>
                  Clear
                </Button>
              </InputRightElement>
            </InputGroup>
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
          <Progress
            visibility={!refreshing && "hidden"}
            size="xs"
            isIndeterminate
          />
          {tab === "past" && (
            <PastGames
              gamesData={gamesData}
              teamsData={teamsData}
              search={search}
            />
          )}
          {tab === "now" && (
            <ActiveGames
              gamesData={gamesData}
              teamsData={teamsData}
              search={search}
            />
          )}
          {tab === "future" && (
            <FutureGames
              gamesData={gamesData}
              teamsData={teamsData}
              search={search}
            />
          )}
          <Progress
            visibility={!refreshing && "hidden"}
            size="xs"
            isIndeterminate
          />
          <AccordionItem>
            <h2>
              <Box p={4} w="100%" textAlign="right">
                <IconButton
                  onClick={refresh}
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
