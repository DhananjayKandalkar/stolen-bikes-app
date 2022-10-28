import React from "react";
import { Flex, Heading, HStack, Image, Text, Stack } from "@chakra-ui/react";



const Card = ({ avatar, title, desc, date, location, year, status,frame_colors}) => {
  return (
    <Flex gap="2rem" border="2px solid black">
      <Image boxSize="150px" src={avatar} fallbackSrc='https://via.placeholder.com/150' />
      <Stack spacing="1rem">
        <Text color="blue.400" textDecoration='underline' fontSize={{sm: '1rem', lg: '1.3rem'}} >
          {`${status} ${title} (${frame_colors?.map(el => el)})`}
        </Text>
        <Text>{desc}</Text>
        <HStack>
          <Text>{date}</Text>
          <Text>{location}</Text>
          <Text></Text>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default Card;