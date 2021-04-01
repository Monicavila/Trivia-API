const name = sessionStorage.getItem("triviaPlayerName");
const goodAnswers = sessionStorage.getItem("goodAnswers");
let startTime = sessionStorage.getItem("inicio");
let endTime = sessionStorage.getItem("fin");
startTime = moment(startTime);
endTime = moment(endTime);
const duration = moment.duration(endTime.diff(startTime));

console.log("duracion", duration);
