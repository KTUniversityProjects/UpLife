const handleError = (err, res, responseText = "Problem with the request.") => {
  res.status(500);
  res.send(responseText);
  console.log(err);
};

const getCurrentTimestamp = () => {
  let date = new Date();
  return (
    date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0]
  );
};

export { handleError, getCurrentTimestamp };
