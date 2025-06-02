import React, { useEffect } from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos(props) {
  const { userId } = useParams();
  // const photos = models.photoOfUserModel(userId);
  const [photos, setPhotos] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    props.setTopBar("User Photos | Advanced Features");
  }, [props.setTopBar])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8081/api/photo/photosOfUser/${userId}`)
      const data = await res.json();
      setPhotos(data)
      console.log(photos)
    }
    fetchData()
  }, [userId])

  function formatDate(datetime) {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  const handleIncrement = () => {
    if (current < photos.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handleDecrement = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  if (!photos) {
    return <Typography>Loading...</Typography>;
  }

  const photo = photos[current];

  return (
    <Typography variant="body1">
      {/* This should be the UserPhotos view of the PhotoShare app. Since it is
      invoked from React Router the params from the route will be in property
      match. So this should show details of user:
      {user.userId}. You can fetch the model for the user
      from models.photoOfUserModel(userId): */}
      {props.advanced ? (
        <>
          <div>
            <button onClick={handleDecrement} disabled={current === 0}>
              Prev
            </button>
            <button
              onClick={handleIncrement}
              disabled={current === photos.length - 1}
            >
              Next
            </button>
          </div>
          <img src={require(`../../images/${photo.file_name}`)} alt="user upload" />
          <p>Date time: {formatDate(String(photo.date_time))}</p>
          {photo.comments && photo.comments.length > 0 && (
            <>
              <h3>Comments</h3>
              {photo.comments.map((comment) => (
                <div key={comment._id}>
                  <p>Date time: {formatDate(String(comment.date_time))}</p>
                  <p>first_name:&nbsp;
                    <Link to={`/users/${comment.user._id}`}>
                      <span>{comment.user.first_name}</span>
                    </Link></p>
                  <p>Comment: {comment.comment}</p>
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        photos.map((item) => (
          <div key={item._id}>
            <img src={require(`../../images/${item.file_name}`)} alt="user upload" />
            <p>Date time: {formatDate(String(item.date_time))}</p>
            <h3>Comments</h3>
            {item.comments && item.comments.map((comment) => (
              <div key={comment._id}>
                <p>Date time: {formatDate(String(comment.date_time))}</p>
                <Link to={`/users/${comment.user._id}`}>
                  <p>{comment.user.first_name}</p>
                </Link>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </Typography>
  );
}

export default UserPhotos;
