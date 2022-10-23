import Moment from "react-moment"
import {
  Flex,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react"

const PastGames = ({ gamesData, search }) => {
  return (
    <>
      {gamesData.map(
        (game) =>
          game.status === "completed" &&
          (game.homeTeam.name.toLowerCase().includes(search) ||
            game.awayTeam.name.toLowerCase().includes(search)) && (
            <AccordionItem key={game.id}>
              <h2>
                <AccordionButton>
                  <VStack w="100%">
                    <Box w="100%" textAlign="center">
                      Final
                    </Box>
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
                {/* <Text>
                  {game.startDate.slice(5, 10)} - Kickoff:{" "}
                  {game.startDate.slice(11, 16)}
                </Text> */}
                <Text>
                  <Moment format="MM/DD" interval={0}>
                    {game.startDate}
                  </Moment>{" "}
                  - Kickoff:{" "}
                  <Moment format="h:mma" interval={0}>
                    {game.startDate}
                  </Moment>
                </Text>
                <Divider />
                <Text>{`${game.venue.name} - ${game.venue.city}, ${game.venue.state}`}</Text>
              </AccordionPanel>
            </AccordionItem>
          )
      )}
    </>
  )
}

export default PastGames
