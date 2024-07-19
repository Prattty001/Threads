import { Avatar, Box, Flex, Text, VStack,Link, Menu, MenuButton, Portal, MenuList, MenuItem, useToast } from '@chakra-ui/react'
import React from 'react'
import { BsInstagram } from 'react-icons/bs'
import { CgMore, CgMoreO } from 'react-icons/cg'


const Userheader = () => {
    const toast = useToast();
    const copyurl =()=>{
const currentUrl  =window.location.href;
//This code snippet copies the current URL of the webpage to the clipboard.
navigator.clipboard.writeText(currentUrl).then(()=>{
    toast({
        title: 'Account created.',
        status: 'success',
        description: "Profile Link copied",
        duration: 3000,
        isClosable: true,
      })
})
    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>Mark Zukerberg</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"small"}>zukerberg</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name='Mark Zukerberh' src='/zuck-avatar.png' size={"xl"} />
                </Box>
            </Flex>
        
        <Text>Co-Founder,excutive chairman and Ceo of the platform</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
<Text color={"gray.light"}>3.2k followers</Text>
<Box w={"1"} h={"1"} bg={"gray.light"} borderRadius={"full"}></Box>
<Link color={"gray.light"}>instagram.com</Link>
            </Flex>
<Flex gap={4}>
<Box  _hover={{ color: "blue.500" }}  // Change the color on hover
                        transition="color 0.3s" >
    <BsInstagram  size={24} cursor={"pointer"}/>
</Box>
<Box  _hover={{ color: "blue.500" }}  // Change the color on hover
                        transition="color 0.3s" >
 <Menu>
    <MenuButton>
    <CgMoreO size={24} cursor={"pointer"}/>
    </MenuButton>
    <Portal>
        <MenuList bg={"gray.dark"}>
            <MenuItem bg={"gray.dark"} onClick={copyurl}>Copy Link</MenuItem>
        </MenuList>
    </Portal>
    
 </Menu>
    
</Box>
</Flex>
        </Flex>

        <Flex w={"full"}>
        {/* here flex 1 meas to shiftiiitt */}
				<Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb='3' cursor={"pointer"}>
					<Text fontWeight={"bold"}> Threads</Text>
				</Flex>
				<Flex
					flex={1}
					borderBottom={"1px solid gray"}
					justifyContent={"center"}
					color={"gray.light"}
					pb='3'
					cursor={"pointer"}>
					<Text fontWeight={"bold"}> Replies</Text>
				</Flex>
			</Flex>
        </VStack>
    )
}

export default Userheader
