import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../services/userService";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(user);
      localStorage.setItem("userInfo", data);
      history.push("/chat");
    } catch (error) {
      toast({
        title: error.response ? error.response.data : error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  return (
    <VStack>
      <FormControl id="email">
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter Your Email"
          onChange={(e) => handleChange(e)}
        ></Input>
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => handleChange(e)}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 10 }}
        onClick={(e) => handleSubmit(e)}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
