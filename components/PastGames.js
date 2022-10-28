import {
  Flex,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  Text,
  Divider,
  Image,
} from "@chakra-ui/react"
import Moment from "react-moment"

const PastGames = ({ gamesData, teamsData, search }) => {
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
                    <Flex w="100%" justify="space-between">
                      <Image
                        boxSize="30px"
                        src={
                          teamsData.find((team) => game.homeTeam.id === team.id)
                            .logos[0]
                        }
                      />
                      <Text w="100%" textAlign="center">
                        Final
                      </Text>
                      <Image
                        ml="auto"
                        boxSize="30px"
                        src={
                          teamsData.find((team) => game.awayTeam.id === team.id)
                            .logos[0]
                        }
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
