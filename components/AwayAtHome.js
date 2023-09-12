import { Flex, Text, AccordionItem } from "@chakra-ui/react";

const AwayAtHome = () => {
  return (
    <AccordionItem>
      <h2>
        <Flex p={4} w="100%" justify="space-between">
          <Flex textAlign="left" direction="column">
            <Text>Away</Text>
          </Flex>
          <Flex textAlign="center">
            <Text>@</Text>
          </Flex>
          <Flex textAlign="right" direction="column">
            <Text>Home</Text>
          </Flex>
        </Flex>
      </h2>
    </AccordionItem>
  );
};
export default AwayAtHome;
