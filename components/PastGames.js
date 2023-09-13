import { useState, useEffect } from "react";
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

const PastGames = ({
  gamesData,
  teamsData,
  rankingsData,
  search,
  tvGamesOnly,
  currentWeek,
  allGamesData,
}) => {
  const [pastGamesData, setPastGamesData] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [sliderValue, setSliderValue] = useState(currentWeek);
  const [isToolTipOpen, setIsTooltipOpen] = useState(false);

  useEffect(() => {
    getPastGamesData(selectedWeek);
  }, [selectedWeek]);

  const getPastGamesData = (selectedWeek) => {
    selectedWeek ? setSelectedWeek(selectedWeek) : setSelectedWeek(currentWeek);
    selectedWeek
      ? setPastGamesData(
          allGamesData.filter((game) => game.week === selectedWeek)
        )
      : setPastGamesData(
          allGamesData.filter((game) => game.week === currentWeek)
        );
  };

  return (
    <>
      <Flex mr={2} ml={2}>
        <Slider
          mr={0}
          ml={6}
          mb={4}
          defaultValue={currentWeek}
          focusThumbOnChange={false}
          size="lg"
          max={currentWeek}
          min={1}
          onChangeStart={() => setIsTooltipOpen(true)}
          onChange={(val) => setSliderValue(val)}
          onChangeEnd={(val) => {
            setSelectedWeek(val);
            setTimeout(() => {
              setIsTooltipOpen(false);
            }, 100);
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
            isOpen={isToolTipOpen}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
        {selectedWeek === currentWeek ? (
          <Text align="center" w="110px" mr={4} ml={2}>
            Now
          </Text>
        ) : (
          <Text
            align="center"
            w="110px"
            mr={2}
            ml={4}
          >{`Week ${selectedWeek}`}</Text>
        )}
      </Flex>
      <AwayAtHome />
      {selectedWeek === currentWeek
        ? gamesData.map(
            (game) =>
              game.status === "completed" &&
              (game.tv || tvGamesOnly === "false") &&
              (game.homeTeam.name.toLowerCase().includes(search) ||
                game.awayTeam.name.toLowerCase().includes(search)) && (
                <AccordionItem key={game.id}>
                  <h2>
                    <AccordionButton>
                      <VStack w="100%">
                        <Flex w="100%" justify="space-between">
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
                          <Text w="100%" textAlign="center">
                            Final
                          </Text>
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
                            {game.awayTeam.points}-{game.homeTeam.points}{" "}
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
                        </Flex>
                      </VStack>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textAlign="center" pb={4}>
                    <Text>
                      <NaturalLanguageDay date={game.startDate} /> - Kickoff:{" "}
                      <Moment format="h:mma" interval={0}>
                        {game.startDate}
                      </Moment>
                    </Text>
                    <Divider />
                    <Text>{`${game.venue.name} - ${game.venue.city}, ${game.venue.state}`}</Text>
                  </AccordionPanel>
                </AccordionItem>
              )
          )
        : pastGamesData.map(
            (game) =>
              game.week === selectedWeek &&
              (game.home_team.toLowerCase().includes(search) ||
                game.away_team.toLowerCase().includes(search)) && (
                <AccordionItem key={game.id}>
                  <h2>
                    <AccordionButton>
                      <VStack w="100%">
                        <Flex w="100%" justify="space-between">
                          <Image
                            alt="Away Team"
                            boxSize="32px"
                            fallback={<SkeletonCircle />}
                            src={
                              teamsData.find((team) => game.away_id === team.id)
                                .logos[0]
                            }
                          />
                          <Text w="100%" textAlign="center">
                            Final
                          </Text>
                          <Image
                            alt="Home Team"
                            ml="auto"
                            boxSize="32px"
                            fallback={<SkeletonCircle ml="auto" />}
                            src={
                              teamsData.find((team) => game.home_id === team.id)
                                .logos[0]
                            }
                          />
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
                            {game.away_points}-{game.home_points}{" "}
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
                                {rankingsData.ranks.find(
                                  (ranking) =>
                                    ranking.school ===
                                    teamsData.find(
                                      (team) => game.home_id === team.id
                                    ).school
                                )?.rank ?? ""}
                              </Badge>
                            )}
                            {game.home_team}
                          </Box>
                        </Flex>
                      </VStack>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textAlign="center" pb={4}>
                    <Text>
                      <NaturalLanguageDay date={game.start_date} /> - Kickoff:{" "}
                      <Moment format="h:mma" interval={0}>
                        {game.start_date}
                      </Moment>
                    </Text>
                    <Divider />
                    <Text>{game.venue}</Text>
                  </AccordionPanel>
                </AccordionItem>
              )
          )}
    </>
  );
};

export default PastGames;
