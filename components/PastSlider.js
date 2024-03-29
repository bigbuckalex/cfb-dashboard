import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderThumb,
  Tooltip,
} from "@chakra-ui/react";

const PastSlider = ({ currentWeek, selectedWeek, setSelectedWeek }) => {
  const [sliderValue, setSliderValue] = useState(currentWeek);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <Flex direction="column" gap={4} justifyContent="space-around" m={4}>
      <Box maxWidth={700} pl={6} pr={6}>
        <Slider
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
            isOpen={isTooltipOpen}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
      </Box>
      {selectedWeek === currentWeek ? (
        <Text align="center" w="100%">
          {`Week ${selectedWeek} (Current Week)`}
        </Text>
      ) : (
        <Text align="center" w="100%">{`Week ${selectedWeek}`}</Text>
      )}
    </Flex>
  );
};
export default PastSlider;
