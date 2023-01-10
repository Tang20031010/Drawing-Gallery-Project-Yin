import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const Drawings = () => {
    const [drawings, setDrawings] = useState([]);

    useEffect(()=>{
        const fetchAllDrawings = async () =>{
            try{
                const res = await axios.get("http://localhost:666/drawings");
                if(res.data.status ===201){
                    setDrawings(res.data.data);
                }
            }catch(err){
                console.log("Exception at drawing function!")
                console.log(err);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        };
        fetchAllDrawings()
    },[]);


    const handleDelete = async (id) =>{
        try{
            await axios.delete("http://localhost:666/drawings/" + id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    };




    return (
        <>
        <div> 
            <h1 className = "text-center mt-2">Drawings</h1>
            <Button variant = "btn btn-outline-info">
                <Link to = "/add">
                    Upload new drawing
                </Link>
            </Button>
            <div className = "d-flex justify-content-between align-iteams-center mt-5">
                {drawings.map((drawing)=>(
                    <div key = {drawing.id} className="drawing">
                        <Card style = {{width: "40rem", height: "30rem"}} className = "mb-3">
                            <Card.Img variant = "top" src = {process.env.PUBLIC_URL + drawing.pic} style = {{ width: "300px", textAlign: "center", margin: "auto"}} className = "mt-2" alt = "" />
                            <Card.Body>
                                <Card.Title>{drawing.title}</Card.Title>
                                <Card.Text>{drawing.description}</Card.Text>
                                <Button variant = "danger" onClick={() => handleDelete(drawing.id)}>Delete</Button>
                                <Button variant = "btn btn-outline-primary">
                                    <Link
                                        to={`/update/${drawing.id}`}
                                    >
                                        Update
                                    </Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

        </div>
        </>
    );
};

export default Drawings