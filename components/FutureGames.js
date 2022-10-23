import {
  Flex,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VStack,
  Text,
} from "@chakra-ui/react"

const FutureGames = ({ gamesData }) => {
  return (
    <>
      {gamesData.map(
        (game) =>
          game.status === "scheduled" && (
            <AccordionItem key={game.id}>
              <h2>
                <AccordionButton>
                  <VStack w="100%">
                    <Box w="100%" textAlign="center">
                      {game.tv ?? "Not Broadcast"}
                    </Box>
                    <Flex w="100%">
                      <Box textAlign="left" w="45%">
                        {game.homeTeam.name}
                      </Box>
                      <Box w="30%">
                        <Text>
                          {game.startDate.slice(5, 10)} - Kickoff:{" "}
                          {game.startDate.slice(11, 16)}
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
