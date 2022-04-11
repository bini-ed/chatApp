import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
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
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
