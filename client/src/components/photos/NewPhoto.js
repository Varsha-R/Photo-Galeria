import React, { useContext } from "react";
import { PickerOverlay } from "filestack-react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import ErrorModal from "../shared/UIElements/ErrorModal";
import LoadingSpinner from "../shared/UIElements/LoadingSpinner";

const NewPhoto = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const placeSubmitHandler = async (result) => {
    if (result.filesUploaded) {
      try {
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/photos",
          "POST",
          JSON.stringify({
            images: result.filesUploaded[0].url,
            creator: auth.userId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
      } catch (err) {}
    } else {
      console.log("Error with filestack upload");
    }
  };

  const handlePickerOverlayCancel = () => {
    history.push("/photos");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <PickerOverlay
        apikey={process.env.REACT_APP_FILESTACK_API_KEY}
        onSuccess={() => {}}
        onUploadDone={(res) => {
          placeSubmitHandler(res);
        }}
        pickerOptions={{
          onCancel: () => {
            handlePickerOverlayCancel();
          },
          accept: "image/*",
        }}
      />
    </React.Fragment>
  );
};

export default NewPhoto;
