import { useState, useEffect } from "react";
import axios from "axios";
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
  Switch,
} from "@chakra-ui/react";
import { IoMdRefresh } from "react-icons/io";
import PastGames from "./PastGames";
import ActiveGames from "./ActiveGames";
import FutureGames from "./FutureGames";
import useLocalStorage from "../hooks/useLocalStorage";

const GamesList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [gamesData, setGamesData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [rankingsData, setRankingsData] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useLocalStorage("tab", "now");
  const [tvGamesOnly, setTvGamesOnly] = useLocalStorage("tvGamesOnly", "false");
  const [currentWeek, setCurrentWeek] = useState(null);
  const [allGamesData, setAllGamesData] = useState([]);
  const [gamesCalendar, setGamesCalendar] = useState([]);
  // const [areGamesInProgress, setAreGamesInProgress] = useState(null);

  useEffect(() => {
    axios.get("/api/api").then(
      (result) => {
        setIsLoaded(true);
        setGamesData(result.data[0]);
        setTeamsData(result.data[1]);
        setRankingsData(
          result.data[2][result.data[2].length - 1].polls.findLast(
            (e) =>
              e.poll === "Playoff Committee Rankings" || e.poll === "AP Top 25"
          )
        );
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
    axios.get("/api/api-by-week").then(
      (result) => {
        setGamesCalendar(result.data[0]);
        const currentWeek = result.data[0].find(
          (e) => Date.parse(e.lastGameStart) > Date.now()
        ).week;
        console.log(`currentWeek: ${currentWeek}`);
        setCurrentWeek(currentWeek);
        setAllGamesData(result.data[1]);
      },
      (error) => {
        setError(error);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }
    );
    // setAreGamesInProgress(
    //   gamesData.some((game) => game.status === "in_progress")
    // );
  }, []);

  const refresh = () => {
    setRefreshing(true);
    axios.get("/api/api").then(
      (result) => {
        setGamesData(result.data[0]);
        setRankingsData(
          result.data[2][result.data[2].length - 1].polls.findLast(
            (e) =>
              e.poll === "Playoff Committee Rankings" || e.poll === "AP Top 25"
          )
        );
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      },
      (error) => {
        setError(error);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }
    );
    axios.get("/api/api-by-week").then(
      (result) => {
        const currentWeek = result.data[0].find(
          (e) => Date.parse(e.lastGameStart) > Date.now()
        ).week;
        console.log(`currentWeek: ${currentWeek}`);
        setCurrentWeek(currentWeek);
        setAllGamesData(result.data[1]);
      },
      (error) => {
        setError(error);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }
    );
  };

  const clearSearch = () => {
    setSearch("");
  };

  const returnPlaceholder = (tab) => {
    if (tab === "past") {
      return "Search past games by team";
    }
    if (tab === "now") {
      return "Search games on now by team";
    }
    if (tab === "future") {
      return "Search future games by team";
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <Center h="100vh">
        <Spinner color="blue.500" size="xl" />
      </Center>
    );
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
                    clearSearch();
                    setTab("past");
                  }}
                  w="32%"
                >
                  Past
                </Button>
                <Button
                  variant={tab === "now" ? "solid" : "outline"}
                  onClick={() => {
                    setTab("now");
                    clearSearch();
                  }}
                  w="32%"
                >
                  Now
                </Button>
                <Button
                  variant={tab === "future" ? "solid" : "outline"}
                  onClick={() => {
                    setTab("future");
                    clearSearch();
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
                placeholder={returnPlaceholder(tab)}
              />
              <InputRightElement width="6.5rem">
                <Button mt="2rem" h="1.75rem" size="sm" onClick={clearSearch}>
                  Clear
                </Button>
              </InputRightElement>
            </InputGroup>
            <Switch
              ml={4}
              mb={4}
              isChecked={tvGamesOnly === "true"}
              onChange={() =>
                setTvGamesOnly(tvGamesOnly === "true" ? "false" : "true")
              }
            >
              Televised games only?
            </Switch>
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
              rankingsData={rankingsData}
              search={search}
              tvGamesOnly={tvGamesOnly}
              currentWeek={currentWeek}
              allGamesData={allGamesData}
            />
          )}
          {tab === "now" && (
            <ActiveGames
              gamesData={gamesData}
              teamsData={teamsData}
              rankingsData={rankingsData}
              search={search}
              tvGamesOnly={tvGamesOnly}
            />
          )}
          {tab === "future" && (
            <FutureGames
              gamesData={gamesData}
              teamsData={teamsData}
              rankingsData={rankingsData}
              search={search}
              tvGamesOnly={tvGamesOnly}
              currentWeek={currentWeek}
              allGamesData={allGamesData}
              gamesCalendar={gamesCalendar}
            />
          )}
          <Progress
            visibility={!refreshing && "hidden"}
            size="xs"
            isIndeterminate
          />
          {/* {areGamesInProgress && ( */}
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
          {/* )} */}
        </Accordion>
      </>
    );
  }
};

export default GamesList;
