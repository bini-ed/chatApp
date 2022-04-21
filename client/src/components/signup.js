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

import { registerUser } from "../services/userService";

function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    pic: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };
  const handleImage = async ({ currentTarget: input }) => {
    setLoading(true);
    if (input.files[0] === undefined) {
      toast({
        title: "Please select an image 1",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    if (
      input.files[0].type === "image/jpeg" ||
      input.files[0].type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", input.files[0]);
      data.append("upload_preset", "MERN-Chat_App");
      data.append("cloud_name", "chombe");

      fetch("https://api.cloudinary.com/v1_1/chombe/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser({ ...user, pic: data.url.toString() });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.data ? err.data.response : err.message);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, pic } = user;
    setLoading(true);
    if (!name || !email || !password || !pic) {
      toast({
        title: "Please fill the required fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    try {
      await registerUser(user).then((res) => {
        toast({
          title: "Registration successfull",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("userInfo", res.headers["x-auth-token"]);
        setLoading(false);

        history.push("/chat");
      });
    } catch (errors) {
      toast({
        title: errors.response ? errors.response.data : errors.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
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
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp;
