const timestamp = 1689835768;
const date = new Date(timestamp * 1000); // Convertir le timestamp en millisecondes en le multipliant par 1000

console.log(String(date));

const datetime =
  date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();

console.log(datetime);
