import { useState, useEffect } from "react"
import axios from "axios"
import {
  Flex,
  Box,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  Text,
  IconButton,
  Divider,
} from "@chakra-ui/react"
import { IoMdAmericanFootball, IoMdRefresh } from "react-icons/io"

const GamesList = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [gamesData, setGamesData] = useState([])

  useEffect(() => {
    axios.get("/api/api").then(
      (result) => {
        setIsLoaded(true)
        setGamesData(result.data.data)
      },
      (error) => {
        setIsLoaded(true)
        setError(error)
      }
    )
  }, [])

  const getFormattedPeriod = (period) => {
    if (period > 4) {
      return `OT${period - 4}`
    }
    if (period === 1) {
      return "1st Quarter"
    }
    if (period === 2) {
      return "2nd Quarter"
    }
    if (period === 3) {
      return "3rd Quarter"
    }
    if (period === 4) {
      return "4th Quarter"
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <>
        <Accordion w="100%" allowToggle>
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
          {gamesData.map(
            (game) =>
              game.status === "in_progress" &&
              game.tv && (
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <VStack w="100%">
                        <Flex w="100%" justify="space-between">
                          <Icon
                            as={IoMdAmericanFootball}
                            visibility={game.possession !== "home" && "hidden"}
                          />
                          <Box>{game.tv}</Box>
                          <Icon
                            as={IoMdAmericanFootball}
                            visibility={game.possession !== "away" && "hidden"}
                          />
                        </Flex>
                        <Flex w="100%">
                          <Box textAlign="left" w="45%">
                            {game.homeTeam.name}
                          </Box>
                          <Box w="30%">
                            {game.homeTeam.points}-{game.awayTeam.points}{" "}
                          </Box>
                          <Box textAlign="right" w="45%">
                            {game.awayTeam.name}
                          </Box>
                        </Flex>
                      </VStack>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textAlign="center" pb={4}>
                    {game.clock.slice(3) === "00:00" && game.period === 2 ? (
                      <Text>Halftime</Text>
                    ) : (
                      <h3>
                        {game.clock.slice(3)} -{" "}
                        {getFormattedPeriod(game.period)}
                      </h3>
                    )}
                    <Divider />
                    <Text>{game.situation}</Text>
                    <Divider />
                    <Text>{`${game.venue.name} - ${game.venue.city}, ${game.venue.state}`}</Text>
                  </AccordionPanel>
                </AccordionItem>
              )
          )}
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
