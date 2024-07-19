import { Avatar, Divider, Flex,Image,Text } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import Actions from '../Components/Actions'
import { Button } from '@chakra-ui/react'
import Comment from '../Components/Comment'

const Postpage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
    <Flex>
      <Flex w={"full"} alignItems={"center"} gap={3}>
<Avatar src='/zuck-avatar.png' size={"md"} name='Mark Zukerberg' />
<Flex>  
  <Text fontSize={"small"} fontWeight={"bold"} >
markzukerberg
  </Text>
  <Image src='/verified.png' w={"4"} h={"4"} ml={"4"} />
</Flex>
      </Flex>

      <Flex gap={3} alignItems={"center"} >
<Text color={"gray.light"}>
  1d
</Text>
<BsThreeDots />
      </Flex>
    </Flex>

    <Text my={"3"}>
      Let's talk about Threads
    </Text>
    <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
    <Image src={"/post1.png"} w={"full"} />
    </Box>
    <Flex gap={3} my={3} cursor={"pointer"}>
        <Actions liked={liked} setLiked={setLiked}  />
      </Flex>
      <Flex gap={2} alignItems="center">
        <Text color="gray.light" fontSize="sm">
          12 replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius="full" bg="gray.light"></Box>
        <Text color="gray.light" fontSize="sm">
         {238 + (liked ? 1:0)}  likes
        </Text>
      </Flex>
      <Divider  my={4}/>
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize="2xl" color="gray.light">
            👋
          </Text>
          <Text color={"gray.light"}>Get the app to like,reply and share</Text>
        </Flex>
        <Button>GET</Button>
      </Flex>
      <Divider my={4}/>
      <Comment
        comments="great"
        createdAt="2d"
        likes="400"
        username="Jhondoe"
        avatar="https://bit.ly/sage-adebayo"
      />
      <Comment
        comments="nice"
        createdAt="8d"
        likes="34"
        username="Ramesh"
        avatar="https://bit.ly/prosper-baba"
      />
      <Comment
        comments="awesome"
        createdAt="3h"
        likes="3900"
        username="Ram"
        avatar="https://bit.ly/kent-c-dodds"
      ></Comment>
    </>
  )
}

export default Postpage
