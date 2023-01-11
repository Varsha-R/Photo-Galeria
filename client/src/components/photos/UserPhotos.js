import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import PhotoItems from "./PhotoItems";

const UserPhotos = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [galleryImages, setGalleryImages] = useState();
  // Gives access to the userId stored in the URL
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5001/api/photos/user/${userId}`
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
  }, [sendRequest, userId]);

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
