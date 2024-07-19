import React from 'react'
import Userheader from '../Components/Userheader'
import UserPost from '../Components/UserPost'

const UserPage = () => {
  return (
    <>
    <Userheader />
    <UserPost likes={123}   replies={481} postImg="/post1.png" postTitle="let's talk ."/>
    <UserPost likes={34}   replies={78} postImg="/post2.png" postTitle="Fuck you ."/>
    <UserPost likes={1889}   replies={482} postImg="/post3.png" postTitle="Can be friends again ."/>
    <UserPost likes={12}   replies={478}  postTitle="let's talk ."/>
    </>
  )
}

export default UserPage
