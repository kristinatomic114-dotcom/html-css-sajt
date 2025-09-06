// Dodajte sledeći JavaScript kod na dno vašeg JavaScript fajla ili unutar <script> taga

// Dohvati sve modale
var modals = document.querySelectorAll('.modal');

// Dohvati sve dugmiće za otvaranje modala
var modalButtons = document.querySelectorAll('[data-bs-toggle="modal"]');

// Dohvati sve elemente za zatvaranje modala
var closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');

// Dodaj događaj na klik na svako dugme za otvaranje modala
modalButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var target = button.dataset.bsTarget; // Dohvati ciljani modal ID iz atributa data-bs-target

    // Pronađi ciljani modal
    var modal = document.querySelector(target);
    
    // Prikaži modal
    modal.style.display = 'block';
  });
});

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