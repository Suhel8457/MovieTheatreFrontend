import React from "react";
import { Box, Img, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import logo from "../styleslogin/logo.png";
import "./Header.css";

function Header(props) {
  return (
    <div className="Headers">
      <Box bg="#333545" w="100%" p={4} color="#333545" className="Box">
        <img src={logo} alt="Logo" id="Logo" />
        <div className="navs">
          <div className="movie" width="40%">
            <div className="movieIcon">
              <img src="https://cdn-icons-png.flaticon.com/512/306/306337.png" />
            </div>
            <a href="/"><h1 className="movieNav">Movies</h1></a>
          </div>
          <div className="theater">
            <div className="theaterIcon">
              <img src="https://cdn-icons-png.flaticon.com/512/8227/8227326.png" />
            </div>
            <h1 className="theaterNav">Theaters</h1>
          </div>
        </div>
        <div className="user">
          <Wrap>
            <WrapItem>
              <div className="flexer">
                <Avatar
                  size="lg"
                  name="User"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                />
                <h1 className="username">{props.name}</h1>
              </div>
            </WrapItem>
          </Wrap>
        </div>
      </Box>
    </div>
  );
}

export default Header;
