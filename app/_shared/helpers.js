exports.sendMessage = (res, message, status) => {
  return res.send({ message, status });
};

exports.sendData = (res, data, status) => {
  return res.send({ data, status });
};

exports.sendError = (res, message, status) => {
  return res.status(500).send({ message, status });
};

exports.currentDate = () => {
  return (
    today.getFullYear() +
    "-" +
    pad(today.getMonth() + 1) +
    "-" +
    pad(today.getDate()) +
    "T" +
    pad(today.getHours()) +
    ":" +
    pad(today.getMinutes()) +
    ":" +
    pad(today.getSeconds()) +
    "." +
    (today.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
    "Z"
  );
};

exports.compareDates = () => {
  const startDay =
    today.getFullYear() +
    "-" +
    pad(today.getMonth() + 1) +
    "-" +
    pad(today.getDate()) +
    "T00:00:00.000Z";

  const endDay =
    today.getFullYear() +
    "-" +
    pad(today.getMonth() + 1) +
    "-" +
    pad(today.getDate() + 1) +
    "T00:00:00.000Z";

  return { startDay, endDay };
};

exports.calculateAge = (birth_date) => {
  const from = birth_date.split("-");
  const birthdateTimeStamp = new Date(from[0], from[1] - 1, from[2]);
  return Math.floor((new Date() - birthdateTimeStamp) / 31557600000);
};

const today = new Date(
  new Date().toLocaleString("en-US", {
    timeZone: "America/Tijuana",
  })
);

const pad = (number) => (number < 10 ? "0" + number : number);
