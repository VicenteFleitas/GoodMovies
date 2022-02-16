export function timestampToTime(timestamp) {
  // set dates
  let day = new Date(timestamp).getDate();
  let month = new Date(timestamp).getMonth() + 1;
  let year = new Date(timestamp).getFullYear();
  let seconds = new Date(timestamp).getSeconds();
  let minutes = new Date(timestamp).getMinutes();
  let hour = new Date(timestamp).getHours();
  // reconvert numbers
  seconds = ("0" + seconds).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  // return
  return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
}
