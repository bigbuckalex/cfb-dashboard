import { useState, useEffect } from "react";
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
  SkeletonCircle,
  Slider,
  SliderTrack,
  SliderThumb,
  Tooltip,
} from "@chakra-ui/react";
import Moment from "react-moment";
import NaturalLanguageDay from "./NaturalLanguageDay";
import AwayAtHome from "./AwayAtHome";

const FutureGames = ({
  gamesData,
  teamsData,
  rankingsData,
  search,
  tvGamesOnly,
  currentWeek,
  allGamesData,
  gamesCalendar,
}) => {
  const [futureGamesData, setFutureGamesData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [sliderValue, setSliderValue] = useState(currentWeek);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    getFutureGamesData(selectedWeek);
  }, [selectedWeek]);

  const getFutureGamesData = (selectedWeek) => {
    selectedWeek ? setSelectedWeek(selectedWeek) : setSelectedWeek(currentWeek);
    selectedWeek
      ? setFutureGamesData(
          allGamesData.filter((game) => game.week === selectedWeek)
        )
      : setFutureGamesData(
          allGamesData.filter((game) => game.week === currentWeek)
        );
  };

  return (
    <>
      <Flex mr={2} ml={2}>
        {selectedWeek === currentWeek ? (
          <Text align="center" w="110px" mr={4} ml={2}>
            Now
          </Text>
        ) : (
          <Text
            align="center"
            w="110px"
            mr={4}
            ml={2}
          >{`Week ${selectedWeek}`}</Text>
        )}
        <Slider
          mr={4}
          ml={0}
          defaultValue={currentWeek}
          focusThumbOnChange={false}
          size="lg"
          max={gamesCalendar.length}
          min={currentWeek}
          onChangeStart={() => setIsTooltipOpen(true)}
          onChange={(val) => setSliderValue(val)}
          onChangeEnd={(val) => {
            setSelectedWeek(val);
            setTimeout(() => {
              setIsTooltipOpen(false);
            }, 200);
          }}
        >
          <SliderTrack></SliderTrack>
          <Tooltip
            mr={1}
            ml={1}
            backgroundColor="white"
            color="black"
            hasArrow
            placement="top"
            label={`Week ${sliderValue}`}
            isOpen={isTooltipOpen}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </Flex>
      <AwayAtHome />
      {selectedWeek === currentWeek
        ? gamesData.map(
            (game) =>
              game.status === "scheduled" &&
              (game.tv || tvGamesOnly === "false") &&
              (game.homeTeam.name.toLowerCase().includes(search) ||
                game.awayTeam.name.toLowerCase().includes(search)) && (
                <AccordionItem key={game.id}>
                  <h2>
                    <AccordionButton>
                      <VStack w="100%">
                        <Flex w="100%">
                          <Box w="45%">
                            <Image
                              alt="Away Team"
                              boxSize="32px"
                              fallback={<SkeletonCircle />}
                              src={
                                teamsData.find(
                                  (team) => game.awayTeam.id === team.id
                                ).logos[0]
                              }
                            />
                          </Box>
                          <Box w="30%" textAlign="center">
                            <Badge variant="outline">{game.tv}</Badge>
                          </Box>
                          <Box w="45%">
                            <Image
                              alt="Home Team"
                              ml="auto"
                              boxSize="32px"
                              fallback={<SkeletonCircle ml="auto" />}
                              src={
                                teamsData.find(
                                  (team) => game.homeTeam.id === team.id
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
                          <Box w="30%">
                            <Text>
                              <NaturalLanguageDay date={game.startDate} />
                              {": "}
                              <Moment format="h:mma" interval={0}>
                                {game.startDate}
                              </Moment>
                            </Text>
                          </Box>
                          <Box textAlign="right" w="45%">
                            {rankingsData.ranks.find(
                              (ranking) =>
                                ranking.school ===
                                teamsData.find(
                                  (team) => game.homeTeam.id === team.id
                                ).school
                            ) && (
                              <Badge mb={1} mr={1}>
                                {
                                  rankingsData.ranks.find(
                                    (ranking) =>
                                      ranking.school ===
                                      teamsData.find(
                                        (team) => game.homeTeam.id === team.id
                                      ).school
                                  )?.rank
                                }
                              </Badge>
                            )}
                            {game.homeTeam.name}
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
          )
        : futureGamesData.map(
            (game) =>
              (game.home_team.toLowerCase().includes(search) ||
                game.away_team.toLowerCase().includes(search)) && (
                <AccordionItem key={game.id}>
                  <h2>
                    <AccordionButton>
                      <VStack w="100%">
                        <Flex w="100%">
                          <Box w="45%">
                            <Image
                              alt="Away Team"
                              boxSize="32px"
                              fallback={<SkeletonCircle />}
                              src={
                                teamsData.find(
                                  (team) => game.away_id === team.id
                                ).logos[0]
                              }
                            />
                          </Box>
                          <Box w="45%">
                            <Image
                              alt="Home Team"
                              ml="auto"
                              boxSize="32px"
                              fallback={<SkeletonCircle ml="auto" />}
                              src={
                                teamsData.find(
                                  (team) => game.home_id === team.id
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
                                  (team) => game.away_id === team.id
                                ).school
                            ) && (
                              <Badge mb={1} mr={1}>
                                {rankingsData.ranks.find(
                                  (ranking) =>
                                    ranking.school ===
                                    teamsData.find(
                                      (team) => game.away_id === team.id
                                    ).school
                                )?.rank ?? ""}
                              </Badge>
                            )}
                            {game.away_team}
                          </Box>
                          <Box w="30%">
                            <Text>
                              <NaturalLanguageDay date={game.start_date} />
                              {": "}
                              {game.start_time_tbd ? (
                                "TBA"
                              ) : (
                                <Moment format="h:mma" interval={0}>
                                  {game.start_date}
                                </Moment>
                              )}
                            </Text>
                          </Box>
                          <Box textAlign="right" w="45%">
                            {rankingsData.ranks.find(
                              (ranking) =>
                                ranking.school ===
                                teamsData.find(
                                  (team) => game.home_id === team.id
                                ).school
                            ) && (
                              <Badge mb={1} mr={1}>
                                {
                                  rankingsData.ranks.find(
                                    (ranking) =>
                                      ranking.school ===
                                      teamsData.find(
                                        (team) => game.home_id === team.id
                                      ).school
                                  )?.rank
                                }
                              </Badge>
                            )}
                            {game.home_team}
                          </Box>
                        </Flex>
                      </VStack>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textAlign="center" pb={4}>
                    <Text>{game.venue}</Text>
                  </AccordionPanel>
                </AccordionItem>
              )
          )}
    </>
  );
};

export default FutureGames;
