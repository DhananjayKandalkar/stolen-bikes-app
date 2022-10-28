import { useEffect, useReducer, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Text,
  Button,
  Input,
  VStack,
  Flex,
  Image,
  Stack,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { reducer } from "./Actions/reducer";
import { callApi, getSuccess, getError } from "./Actions/action";
import Card from "./component/Card";
import logo from "./Assets/logo1.png";
import { FaCalendarAlt } from "react-icons/fa";
import Pagination from "./component/Pagination";

const initialArg = {
  data: [],
  loading: false,
  error: null,
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialArg);
  const [page, setPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const { data, loading, error } = state;

  const indexOfLastRecord = page * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  useEffect(() => {
    dispatch(callApi());
    axios
      .get(`https://bikeindex.org/api/v3/search?location=Berlin`)
      .then((response) => dispatch(getSuccess(response.data.bikes)))
      .catch((error) => dispatch(getError(error)));
  }, [page]);

  return (
    <Box className="App">
      <VStack>
        <Flex gap="2rem">
          <Image boxSize="100px" src={logo} />
          <Heading as="h1" size="3xl">
            Police Department Of Berlin
          </Heading>
        </Flex>
        <Heading as="h3" size="lg">
          Stolen Bikes
        </Heading>
      </VStack>
      <HStack m="4rem 0">
        <Input placeholder="Search case descriptions" />
        <Input placeholder="from" />
        <Box fontSize="2rem">
          <FaCalendarAlt />
        </Box>
        <Input placeholder="to" />
        <Box fontSize="2rem">
          <FaCalendarAlt />
        </Box>
        <Button
          onClick={() => alert("Sorry! searching unser progress")}
          colorScheme="teal"
          variant="solid"
          px="2rem"
        >
          Find Cases
        </Button>
      </HStack>

      <Box m="2rem" textAlign="right">
        <Text color="blue">Total Cases : {data.length} </Text>
      </Box>

      {loading ? (
        <Text color="green.400" m="2rem" fontSize="2rem">
          Loading...
        </Text>
      ) : error ? (
        <Text color="red.400" m="2rem" fontSize="2rem">
          {error}
        </Text>
      ) : currentRecords ? (
        <Stack spacing="2rem">
          {currentRecords
            ?.filter((el) => el)
            .map((elem) => {
              return (
                <Card
                  key={elem.id}
                  avatar={elem.large_img}
                  title={elem.title}
                  status={elem.status}
                  year={elem.year}
                  desc={elem.description}
                  date={elem.date_stolen}
                  location={elem.stolen_location}
                  frame_colors={elem.frame_colors}
                />
              );
            })}
        </Stack>
      ) : (
        <Text color="blue" m="2rem" fontSize="2rem">
          Empty State
        </Text>
      )}
      <Box my="3rem" border="1px solid grey"></Box>
      <Center>
        <Pagination
          totalPages={nPages}
          currentPage={page}
          handlePageChange={(page) => setPage(page)}
        />
      </Center>
    </Box>
  );
}

export default App;
