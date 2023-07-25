// Import necessary modules and hooks
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

// State variable to store drawings data from the backend
const Drawings = () => {
    const [drawings, setDrawings] = useState([]);

    // Fetch drawings data from the backend using useEffect hook
    useEffect(()=>{
        const fetchAllDrawings = async () =>{
            try{
                // Make a GET request to retrieve all drawings data
                const res = await axios.get("http://localhost:666/drawings");
                if(res.data.status ===201){
                    setDrawings(res.data.data);
                }
            }catch(err){
                // Handle errors if any
                console.log("Exception at drawing function!")
                console.log(err);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        };
        // Call the fetchAllDrawings function only once when the component mounts
        fetchAllDrawings()
    },[]);

    // Event handler to delete a drawing
    const handleDelete = async (id) =>{
        try{
            // Make a DELETE request to the backend to delete the drawing with the given ID
            await axios.delete("http://localhost:666/drawings/" + id)
            // Reload the page after successful deletion to update the displayed drawings
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    };



    // Render the drawings page
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