import React from "react";

function useFetch(url) {
  const fetchData = async () => {
    try {
      await axios
        .post(url, {
          id: formData.userid,
          password: formData.password,
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200 && response.data == true) {
            setUserName(formData.userid);
            navigate("/userhome");
          } else {
            setErrorResponse("Invalid Credentials");
          }
        })
        .catch((rej) => {
          if (rej.response?.data.statusCode == 500) {
            setErrorResponse(rej.response.data.message);
          } else {
            setErrorResponse(rej.message);
          }
        });
    } catch (err) {
      console.log(err);
      //setErrorResponse(err.response.data.message);
    }
  };

  return <div>useFetch</div>;
}

export default useFetch;
