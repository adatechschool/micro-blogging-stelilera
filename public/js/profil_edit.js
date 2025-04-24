document.addEventListener('DOMContentLoaded', () => {
  const editProfileBtn = document.getElementById('editProfileBtn');
  const profilePictureInput = document.getElementById('profilePictureInput');

  const editCoverPhotoBtn = document.getElementById("editCoverPhotoBtn");
  const coverPhotoInput = document.getElementById("coverPhotoInput");

  const editBioBtn = document.getElementById('editBioBtn');
  const bioText = document.getElementById('bio-text');
  const bioInput = document.getElementById('bioInput');
  const validateBtn = document.querySelector('.bio-footer .validate');

  editProfileBtn.addEventListener('click', () => {
    profilePictureInput.click();
  });
  editCoverPhotoBtn.addEventListener('click', () => {
    coverPhotoInput.click();
  });
  editBioBtn.addEventListener('click', () => {
    bioInput.value = bioText.textContent.trim();
    bioText.style.display = 'none';
    bioInput.style.display = 'block';
    validateBtn.style.display = 'inline-block';
    bioInput.focus();
  });

  validateBtn.addEventListener('click', () => {
    const newBio = bioInput.value.trim();
    const profilePhoto = profilePictureInput.files[0];
    const coverPhoto = coverPhotoInput.files[0];
    if(!newBio){
      alert('La biographie ne peut pas etre vide.');
      return;
    }
    const formData = new FormData();
    formData.append('bio',newBio);
    
    fetch('/profil_edit',{
      method: 'POST',
      body: formData
    })
    .then(response=>response.json())
    .then(data=>{
      if(data.success) {
        bioText.textContent = newBio;
        bioInput.style.display = 'none';
        bioText.style.display = 'block';
        validateBtn.style.display = 'none';
        alert('Biographie mise à jour avec succès !');
      }else{
        throw new Error('Erreur coté serveur');
    }
})
.catch(error=>{
  console.error('Erreur lors de la mise à jour de la biographie :', error);
      alert('Une erreur est survenue lors de la mise à jour.');
});
});
});