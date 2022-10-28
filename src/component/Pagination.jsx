import React from "react";
import { Button, Box, HStack } from "@chakra-ui/react";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  let pages = new Array(totalPages).fill(0).map((a, i) => (
    <Button
      variant="solid"
      colorScheme='green'
      disabled={currentPage === i + 1}
      key={i + 1}
      onClick={() => handlePageChange(i + 1)}
    >
      {i + 1}
    </Button>
  ));

  return <HStack>{pages}</HStack>;
};

export default Pagination;
