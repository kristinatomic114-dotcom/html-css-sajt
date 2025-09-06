

// Dohvati sve modale
var modals = document.querySelectorAll('.modal');

// Dohvati sve elemente za zatvaranje modala
var closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');

// Dodaj događaj na klik na svako dugme za zatvaranje modala
closeButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var modal = button.closest('.modal'); // Pronađi najbliži roditeljski modal

    // Zatvori modal
    modal.style.display = 'none';
  });
});

// Dodaj događaj na klik bilo gde van moda da bi se zatvorio modal
window.addEventListener('click', function(event) {
  modals.forEach(function(modal) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});


var pitanja=[
  {
      id:1,
      tekstPitanja:"Ovo je tekst prvog pitanja?"
  },
  {
      id:2,
      tekstPitanja:"Ovo drugo pitanje"
  },
  {
      id:3,
      tekstPitanja:"Ovo je pitanje tri"
  }
]
var odgovori=[]

function prikaziPitanja(){
  let prikaz=""
  for (let pitanje of pitanja) {
      prikaz+=`<div class="mb-3">
          <label for="pitanje" class="form-label">${pitanje.tekstPitanja}</label>
          <select class="form-select odgovor-pitanje" data-id="${pitanje.id}">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
      </div>`
      odgovori.push({
          id_pitanja:pitanje.id,
          ocene:[]
      })
  }
  $("#div_pitanja").html(prikaz)
  prikaziOdgovore()
}
function dohvatiTekstPitanjaZaID(id){
  for (let pitanje of pitanja) {
      if(pitanje.id==id){
          return pitanje.tekstPitanja
      }
  }
  return ""
}
function odrediBojuZaProsecnuOcenu(prosecnaOcena){
  if(prosecnaOcena<2.5){
      return "bg-danger text-white"
  }else if(prosecnaOcena<3.5){
      return "bg-warning text-white"
  }else{
      return "bg-success text-white"
  }
}
function prosecnaOcena(niz){
  let suma=0;
  for(let ocena of niz){
      suma+=ocena
  }
  return 1.0*suma/niz.length
}
function prikaziOdgovore(){
  let prikaz=`
  <table class="table table-bordered">
      <thead>
          <tr>
              <th scope="col">#</th>
              <th scope="col">Tekst pitanja</th>
              <th scope="col">Broj odgovora</th>
              <th scope="col">Prosecna ocena</th>
          </tr>
      </thead>
      <tbody>`

      for (let index in odgovori) {
          let odgovor=odgovori[index]
          prikaz+=`<tr class="${odrediBojuZaProsecnuOcenu(prosecnaOcena(odgovor.ocene))}">
              <th scope="col">${parseInt(index)+1}</th>
              <th scope="col">${dohvatiTekstPitanjaZaID(odgovor.id_pitanja)}</th>
              <th scope="col">${odgovor.ocene.length}</th>
              <th scope="col">${prosecnaOcena(odgovor.ocene).toFixed(2)}</th>
          </tr>`
      }
      
          
     prikaz+=`</tbody>
  </table>
  `
  $("#div_rezultati").html(prikaz)
}
function obradiOdgovore(){
  let trenutniOdgovori=$(".odgovor-pitanje")
  for (let odg of trenutniOdgovori) {
      for (let index in odgovori) {
          let odgovor=odgovori[index]
          if(odgovor.id_pitanja==odg.getAttribute("data-id")){
              odgovor.ocene.push(parseInt(odg.value))
          }
      }
  }
  prikaziOdgovore()
  
}
$(document).ready(prikaziPitanja)
$("#snimiOdgovore").on("click",obradiOdgovore)