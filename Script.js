const GAS_URL = "https://script.google.com/macros/s/AKfycbzCJhZ4f9kBKWoIm-H05zuWe0RHkf1lUvOwXaAYYv30CXRRWEya8WEGj1Wlk6-McNRuEg/exec";

const days = [
  "Martes Mañana","Martes Tarde",
  "Jueves Mañana","Jueves Tarde",
  "Viernes Mañana","Viernes Tarde",
  "Sábado Mañana","Domingo Mañana"
];

function createToggle(label, container){
  const div=document.createElement("div");
  div.className="toggle";
  div.innerText=label;
  div.onclick=()=>div.classList.toggle("active");
  container.appendChild(div);
}

const baseGrid=document.getElementById("baseGrid");
days.forEach(day=>createToggle(day,baseGrid));

function addException(){
  const container=document.getElementById("exceptionsContainer");

  const wrapper=document.createElement("div");
  wrapper.className="card";

  const week=document.createElement("input");
  week.type="week";
  week.className="week-input";

  const grid=document.createElement("div");
  grid.className="availability-grid";

  days.forEach(day=>createToggle(day,grid));

  wrapper.appendChild(week);
  wrapper.appendChild(grid);
  container.appendChild(wrapper);
}

function submitForm(){
  const nombre=document.getElementById("nombre").value.trim();
  const email=document.getElementById("email").value.trim();

  if(!nombre||!email){
    showToast("Completa los datos personales");
    return;
  }

  const base=[...document.querySelectorAll("#baseGrid .active")]
    .map(el=>el.innerText);

  const exceptions=[];
  document.querySelectorAll("#exceptionsContainer .card")
    .forEach(card=>{
      const semana=card.querySelector(".week-input").value;
      const disp=[...card.querySelectorAll(".active")]
        .map(el=>el.innerText);
      if(semana) exceptions.push({semana,disp});
    });

  const payload={
    nombre,
    email,
    base,
    exceptions
  };

  fetch(GAS_URL,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(payload)
  })
  .then(res=>res.json())
  .then(()=>{
    showToast("Disponibilidad enviada correctamente ✔");
  })
  .catch(()=>{
    showToast("Error al enviar");
  });
}

function showToast(msg){
  const toast=document.getElementById("toast");
  toast.innerText=msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),3000);
}
