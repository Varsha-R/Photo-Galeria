import React, { useEffect, useState, useContext } from "react";

import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context.js";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import PhotoItems from "./PhotoItems";

const UserPhotos = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [galleryImages, setGalleryImages] = useState();
  // Gives access to the userId stored in the URL
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/photos/user/${auth.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        let allPhotos = responseData.photos;
        let galleryImagesArray = [];
        allPhotos.forEach((photo, index) => {
          galleryImagesArray.push({ img: photo.images[0] });
        });
        setGalleryImages(galleryImagesArray);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, auth]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && galleryImages && (
        <PhotoItems galleryImages={galleryImages} />
      )}
    </React.Fragment>
  );
};

export default UserPhotos;
