export default function handleError(
  err,
  res,
  responseText = "Problem with the request"
) {
  res.send(responseText);
  console.log(err);
}
