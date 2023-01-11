import React, { useContext } from "react";
import { PickerOverlay } from "filestack-react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";
import { FilestackAPIKey } from "../../config/keys";

const NewPhoto = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const placeSubmitHandler = async (result) => {
    if (result.filesUploaded) {
      try {
        await sendRequest(
          "http://localhost:5001/api/photos",
          "POST",
          JSON.stringify({
            images: result.filesUploaded[0].url,
            creator: auth.userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
    } else {
      console.log("Error with filestack upload");
    }
  };

  const handlePickerOverlayClose = () => {
    console.log("Only on close");
    history.push(`/${auth.userId}/photos`);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <PickerOverlay
        apikey={FilestackAPIKey}
        onSuccess={() => {}}
        onUploadDone={(res) => {
          placeSubmitHandler(res);
        }}
        pickerOptions={{
          onClose: () => {
            handlePickerOverlayClose();
          },
        }}
      />
    </React.Fragment>
  );
};

export default NewPhoto;
