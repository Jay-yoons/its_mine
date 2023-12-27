function formatDatetime(datetime) {
  const dateParts = datetime.split("T")[0].split("-");
  const timeParts = datetime.split("T")[1].split(":");
  
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  
  const hour = timeParts[0];
  const minute = timeParts[1];
  
  const formattedDatetime = `${year}.${month}.${day} ${hour}:${minute}`;
  
  return formattedDatetime;
}

export default formatDatetime;