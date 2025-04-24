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

  const handlePostSubmit = async (e) => {
    try{
        e.preventDefault();
        const post = e.target.post.value.trim();
        if(!post) return
        console.log(post);
        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                text: post,
                image: null
            }),
        })
        console.log('response :', response)
        if(!response.ok){
            throw new Error(`Echec tentative de réponse ${response.status}`)
        }
        const result = await response.json()
        console.log('result :', result);
        
    } catch (e){
        console.error('Erreur lors de la soumission :', e.message)
    }
}
document.querySelector('.post-button').addEventListener('submit', handlePostSubmit)