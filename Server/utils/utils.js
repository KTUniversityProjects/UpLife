export default function handleError(
  err,
  res,
  responseText = "Problem with the request."
) {
  res.status(500);
  res.send(responseText);
  console.log(err);
}


