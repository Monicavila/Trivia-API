const container = document.getElementById("Local");
function fillInfo(fecha, duration) {
  const infModal = document.getElementById("infoModal");
  infModal.innerHTML = `<div><span class="fw-bold">Date:</span> ${fecha}</div>
  <div><span class="fw-bold">Time:</span> ${duration}</div>`;
  const modal = new bootstrap.Modal(document.getElementById("modalInfo"));
  modal.show();
}

function listTop() {
  const top10 = JSON.parse(localStorage.getItem("top10"));
  for (let key in top10) {
    const Name = top10[key].palyer;
    const Score = top10[key].goodAnswers.average;
    const Incio = moment(top10[key].time.inicio, "LTS");
    const Fin = moment(top10[key].time.fin, "LTS");
    const Fecha = top10[key].fecha;
    const Duration = moment.duration(Fin.diff(Incio));
    container.innerHTML += `<div class="row text-white bg-secondary border-bottom">
      <div class="col-7 col-md-6 text-center paddingLR0">${Name}</div>
      <div class="col-3 col-md-2 text-center paddingLR0">${Score}</div>
      <div class="col-2 col-md-2 text-center d-none d-md-block paddingLR0">
        ${Duration._data.hours}:${Duration._data.minutes}:${Duration._data.seconds}
      </div>
      <div class="col-3 col-md-2 text-center d-none d-md-block paddingLR0">
        ${Fecha}
      </div>
      <div class="col-2 text-center d-md-none paddingLR0"><button onclick="fillInfo('${Fecha}', '${Duration._data.hours}:${Duration._data.minutes}:${Duration._data.seconds}')" type="button" class="btn btn-secondary" data-bs-target="#modalInfo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
    </svg></button></div>
      </div>`;
  }
}

listTop();
window.fillInfo = fillInfo;
