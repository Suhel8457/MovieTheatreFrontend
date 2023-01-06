import {
  ChakraProvider,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Header from "./Header";
import Theater from "./Theater";
import Filter from "./Filter";
import Footer from "./Footer";
import logo from "../styleslogin/logo.png";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import AddTheater from "./AddTheater";
import theaterBase from "../sch_environment/theaterBaseUrl";
import baseUrl from "../environment/baseUrl";

function Provider(props) {
  var name = props.userName;
  // var userType = "USER";
  var TheaterName = "GalaxE Movie Theater";
  var TheaterDesc = "4DX, Nexus (Formerly Forum), Koramangala";
  var TheaterDetails =
    "Nexus Mall, 21-22, Adugodi Main Road, Koramangala, Chikku Lakshmaiah Layout, Bengaluru, Karnataka 560095, India";
  const [APIdata, setAPIdata] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [value, setValue] = useState("kiru");
  const [isEmpty, setIsEmpty] = useState(false);
  const [errors, setErrors] = useState("Loading Data ...");

  const [role, setRole] = useState("");
  useEffect(() => {
    handleProfileSettings();
  }, []);
  async function handleProfileSettings(e) {
    const response = await axios.get(
      `${baseUrl}/user/settings/${localStorage.getItem(
        "email"
      )}/${localStorage.getItem("password")}`
    );
    console.log(response.data);
    console.log(response.data.userName);
    setRole(response.data.role);
    name = response.data.userName;
    // localStorage.setItem("firstName",response.data.firstName);
    // localStorage.setItem("lastName",response.data.lastName);
    // localStorage.setItem("mobileNumber",response.data.mobileNumber);
    // localStorage.setItem("gender",response.data.gender);
  }
  const userType = role;



  // var apiString = "http://localhost:9090/theatre/"+{filterType}+"/"+{value};
  useEffect(() => {
    setAPIdata([]);

    console.log(filterType);

    if (filterType == "All" || filterType == "Filter") {
      axios
        .get(`${theaterBase}All`)
        .then((response) => {
          if (response.status == "200") {
            console.log(response);
            setAPIdata(response.data);
            setIsEmpty(true);
          } else if (response.status == "404") {
            console.log(response.data);
            setIsEmpty(false);
            setErrors(response.data);
          } else {
            console.log(response.data);
            setIsEmpty(false);
            setErrors(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsEmpty(false);
          setErrors(error.message);
          if (error.response != null) {
            setErrors(error.response.data);
          }
        });
    } else if (
      filterType == "city" ||
      filterType == "name" ||
      filterType == "address"
    ) {
      axios
        .get(`${theaterBase}${filterType}/${value}`)
        .then((response) => {
          if (response.status == "200") {
            console.log(response);
            setAPIdata(response.data);
            setIsEmpty(true);
          } else if (response.status == "404") {
            console.log(response.data);
            setIsEmpty(false);
            setErrors(response.data);
          } else {
            console.log(response.data);
            setIsEmpty(false);
            setErrors(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsEmpty(false);
          setErrors(error.message);
          if (error.response != null) {
            setErrors(error.response.data);
          }
        });
    }
  }, [filterType]);

  const SearchFilter = () => {
    console.log("Came back to Provider");
  };

  return (
    <>
      <ChakraProvider>
        <Header name={name} />
        <Filter
          userType={userType}
          setValue={setValue}
          setFilterType={setFilterType}
        />
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={8}
          align="center"
          margin="0% 5%"
        >
          {/* {console.log(APIdata)} */}
          {isEmpty ? (
            APIdata?.map((data) => {
              return (
                <div>
                  <GridItem colSpan={1}>
                    <Theater
                      userType={userType}
                      TheaterName={data?.name}
                      TheaterDesc={data?.address.addressLine1}
                      TheaterDetails={
                        data?.address.addressLine1 +
                        " " +
                        data?.address.addressLine2 +
                        " " +
                        data?.address.city +
                        " " +
                        data?.address.state +
                        " " +
                        data?.address.country +
                        " " +
                        data?.address.pincode
                      }
                      TheaterDetailsOnCard={
                        data?.address.addressLine1 +
                        " " +
                        data?.address.addressLine2 +
                        " " +
                        data?.address.city
                      }
                      logo={data?.imgUrl}
                    />
                  </GridItem>
                </div>
              );
            })
          ) : (
            <Alert status="warning" margin="10% 2%">
              <AlertIcon />
              {errors}
            </Alert>
          )}
        </Grid>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default Provider;
