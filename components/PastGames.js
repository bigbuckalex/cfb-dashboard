import {
  Flex,
  Box,
  Icon,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  Text,
  Divider,
} from "@chakra-ui/react"

const PastGames = ({ gamesData }) => {
  return (
    <>
      {gamesData.map(
        (game) =>
          game.status === "completed" && (
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
                <Text>
                  {game.startDate.slice(5, 10)} - Kickoff:{" "}
                  {game.startDate.slice(11, 16)}
                </Text>
                <Text>{`${game.venue.name} - ${game.venue.city}, ${game.venue.state}`}</Text>
              </AccordionPanel>
            </AccordionItem>
          )
      )}
    </>
  )
}

export default PastGames
