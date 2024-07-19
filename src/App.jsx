import { Button, Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./Pages/UserPage";
import Postpage from "./Pages/Postpage";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
function App() {
  return (
    <Container maxW='620px'>
      <Header />
      <Routes>
        <Route path="/" element ={<HomePage/>}/>
        <Route path="/auth" element ={<AuthPage/>}/>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<Postpage />} />
      </Routes>
    </Container>
  );
}

export default App;
