document.addEventListener("DOMContentLoaded", () => {
    const userIcon = document.querySelector(".user-link");
    const dropdown = document.querySelector(".user-dropdown");
  
    userIcon.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
  
    // Optionnel : fermer le menu quand on clique ailleurs
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".user-menu-container")) {
        dropdown.style.display = "none";
      }
    });
  });

  document.querySelector('.edit-button').addEventListener('click', () => {
    window.location.href='/profil_edit'
  })