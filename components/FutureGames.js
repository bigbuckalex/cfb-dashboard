import {
  Flex,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  Text,
  Image,
  Badge,
} from "@chakra-ui/react"
import Moment from "react-moment"
import NaturalLanguageDay from "./NaturalLanguageDay"

const FutureGames = ({ gamesData, teamsData, search }) => {
  return (
    <>
      {gamesData.map(
        (game) =>
          game.status === "scheduled" &&
          (game.homeTeam.name.toLowerCase().includes(search) ||
            game.awayTeam.name.toLowerCase().includes(search)) && (
            <AccordionItem key={game.id}>
              <h2>
                <AccordionButton>
                  <VStack w="100%">
                    <Flex w="100%">
                      <Box w="45%">
                        <Image
                          boxSize="30px"
                          src={
                            teamsData.find(
                              (team) => game.homeTeam.id === team.id
                            ).logos[0]
                          }
                        />
                      </Box>
                      <Box w="30%" textAlign="center">
                        <Badge>{game.tv}</Badge>
                      </Box>
                      <Box w="45%">
                        <Image
                          ml="auto"
                          boxSize="30px"
                          src={
                            teamsData.find(
                              (team) => game.awayTeam.id === team.id
                            ).logos[0]
                          }
                        />
                      </Box>
                    </Flex>
                    <Flex w="100%">
                      <Box textAlign="left" w="45%">
                        {game.homeTeam.name}
                      </Box>
                      <Box w="30%">
                        <Text>
                          <NaturalLanguageDay date={game.startDate} /> -
                          Kickoff:{" "}
                          <Moment format="h:mma" interval={0}>
                            {game.startDate}
                          </Moment>
                        </Text>
                      </Box>
                      <Box textAlign="right" w="45%">
                        {game.awayTeam.name}
                      </Box>
                    </Flex>
                  </VStack>
                </AccordionButton>
              </h2>
              <AccordionPanel textAlign="center" pb={4}>
                <Text>{`${game.venue.name} - ${game.venue.city}, ${game.venue.state}`}</Text>
              </AccordionPanel>
            </AccordionItem>
          )
      )}
    </>
  )
}

export default FutureGames
