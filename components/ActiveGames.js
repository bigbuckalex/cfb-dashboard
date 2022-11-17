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
  Image,
  Badge,
} from "@chakra-ui/react"
import { IoMdAmericanFootball } from "react-icons/io"

const getFormattedPeriod = (period) => {
  console.log(period)
  if (period > 4) {
    return `${period - 4} OT`
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

const isHalftime = (game) => {
  return game.clock.slice(3) === "00:00" && game.period === 2
}

const ActiveGames = ({
  gamesData,
  teamsData,
  rankingsData,
  search,
  tvGamesOnly,
}) => {
  return (
    <>
      {gamesData.map(
        (game) =>
          game.status === "in_progress" &&
          (game.tv || tvGamesOnly === "false") &&
          (game.homeTeam.name.toLowerCase().includes(search) ||
            game.awayTeam.name.toLowerCase().includes(search)) && (
            <AccordionItem key={game.id}>
              <h2>
                <AccordionButton>
                  <VStack w="100%">
                    <Flex w="100%" justify="space-between">
                      <Box>
                        <Image
                          alt="Home Team"
                          boxSize="32px"
                          src={
                            teamsData.find(
                              (team) => game.homeTeam.id === team.id
                            ).logos[0]
                          }
                        />
                      </Box>
                      <Icon
                        as={IoMdAmericanFootball}
                        visibility={
                          (game.possession !== "home" || isHalftime(game)) &&
                          "hidden"
                        }
                      />
                      <Box>
                        <Badge variant="outline">{game.tv}</Badge>
                      </Box>
                      <Icon
                        as={IoMdAmericanFootball}
                        visibility={
                          (game.possession !== "away" || isHalftime(game)) &&
                          "hidden"
                        }
                      />
                      <Box>
                        <Image
                          alt="Away Team"
                          ml="auto"
                          boxSize="32px"
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
                        {rankingsData.ranks.find(
                          (ranking) =>
                            ranking.school ===
                            teamsData.find(
                              (team) => game.homeTeam.id === team.id
                            ).school
                        ) && (
                          <Badge mb={1} mr={1}>
                            {rankingsData.ranks.find(
                              (ranking) =>
                                ranking.school ===
                                teamsData.find(
                                  (team) => game.homeTeam.id === team.id
                                ).school
                            )?.rank ?? ""}
                          </Badge>
                        )}
                        {game.homeTeam.name}
                      </Box>
                      <Box w="30%">
                        {game.homeTeam.points}-{game.awayTeam.points}{" "}
                      </Box>
                      <Box textAlign="right" w="45%">
                        {rankingsData.ranks.find(
                          (ranking) =>
                            ranking.school ===
                            teamsData.find(
                              (team) => game.awayTeam.id === team.id
                            ).school
                        ) && (
                          <Badge mb={1} mr={1}>
                            {rankingsData.ranks.find(
                              (ranking) =>
                                ranking.school ===
                                teamsData.find(
                                  (team) => game.awayTeam.id === team.id
                                ).school
                            )?.rank ?? ""}
                          </Badge>
                        )}
                        {game.awayTeam.name}
                      </Box>
                    </Flex>
                  </VStack>
                </AccordionButton>
              </h2>
              <AccordionPanel textAlign="center" pb={4}>
                {isHalftime(game) ? (
                  <Text>Halftime</Text>
                ) : (
                  <h3>
                    {game.clock.slice(3)}
                    {game.clock && " - "}
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
    </>
  )
}

export default ActiveGames
