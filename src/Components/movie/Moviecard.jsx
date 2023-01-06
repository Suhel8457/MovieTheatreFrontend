import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Moviecard.css";
import { AiFillStar } from "react-icons/ai";
import EditMovie from "../editmovie/EditMovie";
import Delete from "../delete/Delete";
import { PageNotFound } from "../shared/PageNotFound";
import movieDeployedUrl from "../environment/movieUrl";
import { useNavigate } from "react-router-dom";

export default function Moviecard({ movieStatus, add }) {
    // e.preventDefault();
    const [APIData, setAPIData] = useState([]);
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [modalOpenDelete, setModalOpenDelete] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    // componentDidMount() {
    //   axios.get('http://localhost:3333/items')
    //     .then(response => this.setState({items: response.data}))
    //     .catch(err => {
    //       this.setState({errorMessage: err.message});
    //     })
    // }

    useEffect(() => {
        console.log(movieStatus);
        axios
            // .get(`http://192.168.137.5:9090/movies/${movieStatus}`)
            .get(`${movieDeployedUrl}/${movieStatus}`)
            .then((response) => {
                if (response.status == "226") {
                    setAPIData([]);
                    // alert(response.data);
                    setErrorMsg(response.data);
                } else if (response.status >= 400) {
                    return <PageNotFound />;
                    // setModalOpen(true);
                } else if (movieStatus.charAt(5) === "N") {
                    const getByNameList = [];
                    getByNameList.push(response.data);
                    setAPIData(getByNameList);
                    setErrorMsg("");
                    console.log(response.data);
                } else {
                    setAPIData(response.data);
                    setErrorMsg("");
                    console.log(response.data);
                }
            });
        // .catch(err => {
        //     setErrorMsg("err");
        //     setAPIData()
        // });
    }, [movieStatus]);

    const setDataToLocalStorage = (data) => {
        let {
            // id,
            // movieCode,
            movieName,
            // movieGenre,
            // releaseDate,
            // duration,
            // rating,
            // movieStatus,
            // cast,
            // language,
            // movieUrl,
        } = data;
        // localStorage.setItem("id", id);
        // localStorage.setItem("movieCode", movieCode);
        localStorage.setItem("movieName", movieName);
        // localStorage.setItem("movieGenre", movieGenre);
        // localStorage.setItem("releaseDate", releaseDate);
        // localStorage.setItem("duration", duration);
        // localStorage.setItem("rating", rating);
        // localStorage.setItem("movieStatus", movieStatus);
        // localStorage.setItem("cast", cast);
        // localStorage.setItem("language", language);
        // localStorage.setItem("movieUrl", movieUrl);
    };

    // const getData = () => {
    //   axios
    //     .get(`http://192.168.137.59:9090/movies`)
    //     .then((getData) => {
    //       setAPIData(getData.data);
    //     });
    // };
    function schedulePage() {
        navigate("/UserSideMovieView");
    }

    return (
        <div
            className="mapping-poster"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
        >
            {APIData.map((data) => {
                return (
                    <div
                        className="main-poster">
                        <div className="main-imgtag"
                         onClick={() => {
                            schedulePage();
                            setDataToLocalStorage(data);
                        }}>
                            <img
                                className="movieposter"
                                src={data.movieUrl}
                                alt="sample"
                            ></img>
                        </div>

                        <div className="main-footer">
                            <div className="star">
                                <AiFillStar />
                            </div>
                            <div className="footer-content1">
                                <p>{data.rating}</p>
                            </div>
                            <div className="footer-content2">
                                <p>
                                    {data.votes}
                                    <span> votes</span>
                                </p>
                            </div>
                        </div>

                        <div className="footer-moviename">
                            <div className="moviename">
                                <b>{data.movieName}</b>
                            </div>
                            <div className="certification">
                                {" "}
                                {data.movieCode}
                            </div>
                            <div className="language"> {data.language}</div>
                        </div>

                        <div className="movieCardbuttons">
                            <div className="moviecardbutton1">
                                {add == "ADMIN" ? (
                                    <p>
                                        <button
                                            id="movieCardeditbtn"
                                            onClick={(e) => {
                                                {
                                                    e.preventDefault();
                                                    setDataToLocalStorage(data);
                                                    setModalOpenEdit(true);
                                                    console.log("hellos");
                                                }
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </p>
                                ) : null}
                            </div>
                            <div className="button2">
                                {/* <Link to="/delete"
                > */}
                                {add == "ADMIN" ? (
                                    <p>
                                        <button
                                            id="movieCarddeletebtn"
                                            onClick={(e) => {
                                                {
                                                    e.preventDefault();
                                                    setDataToLocalStorage(data);
                                                    setModalOpenDelete(true);
                                                    console.log("hellos");
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </p>
                                ) : null}
                                {/* </Link> */}
                            </div>
                        </div>
                    </div>
                );
            })}
            {modalOpenEdit && <EditMovie setModalOpen={setModalOpenEdit} />}
            {modalOpenDelete && <Delete setModalOpen={setModalOpenDelete} />}
            {/* <div className="mainCard-errorMessage"> */}
            {/* {modalOpen&&<PageNotFound></PageNotFound>} */}
            <p className="mainCard-errorMessage">{errorMsg}</p>
            {/* </div> */}
        </div>
    );
}
