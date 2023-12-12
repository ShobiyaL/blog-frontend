import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';
const CategoryCard = ({ category }) => {
  return (
    <Box>
      <SimpleGrid
        spacing={4}
        // height={200}
        // templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
      >
        <Card
          display='flex'
          justifyContent='center'
          alignItems='center'
          h={120}
          flexWrap='wrap'
          variant='filled'
        >
          <CardBody>
            <Text textAlign='center'>{category}</Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </Box>
  );
};

export default CategoryCard;
