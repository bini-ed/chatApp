import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    pic: "",
  });
  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };
  const handleImage = ({ currentTarget: input }) => {
    setUser({ ...user, pic: input.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <VStack spacing="5px">
      <FormControl id="name">
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          placeholder="Enter Your Name"
          onChange={(e) => handleChange(e)}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter Your Email"
          onChange={(e) => handleChange(e)}
        ></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Enter Your Password"
          onChange={(e) => handleChange(e)}
        ></Input>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Profile Pic</FormLabel>
        <Input
          name="pic"
          type="file"
          placeholder="Enter Your Profile Pic"
          onChange={(e) => handleImage(e)}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 10 }}
        onClick={(e) => handleSubmit(e)}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp;
