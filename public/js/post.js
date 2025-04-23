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
                image: null,
                user_id: userId,
            }),
        })
        if(!response.ok){
            throw new Error(`Echec tentative de réponse ${response.status}`)
        }
        const result = await response.json()
        console.log('result :', result);
        
    // template du feed
    const template = document.querySelector('#post-template')
    const clone = template.content.cloneNode(true)
    const userId = document.body.dataset.userId

    clone.querySelector('.legend-feed').textContent = post

    const date = new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    clone.querySelector('.feed-date').textContent = date
    clone.querySelector('.username-feed').textContent = result.users.username

    document.querySelector('.feed').prepend(clone)

    e.target.reset()

    } catch (e){
        console.error('Erreur lors de la soumission :', e.message)
    }
}
document.querySelector('.whatsup').addEventListener('submit', handlePostSubmit)


// card
function renderPost(post) {
    const template = document.querySelector('#post-template');
    const clone = template.content.cloneNode(true);
  
    clone.querySelector('.legend-feed').textContent = post.text;
    clone.querySelector('.username-feed').textContent = post.users?.username || 'Utilisateur';
    clone.querySelector('.feed-date').textContent = new Date(post.createdAt).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  
    if (post.image) {
      clone.querySelector('.feed-picture').src = post.image;
    } else {
      clone.querySelector('.feed-picture').remove();
    }
  
    document.querySelector('.feed').prepend(clone);
  }

const response = await fetch('/posts');
const posts = await response.json();

posts.forEach(post => {
  renderPost(post);
});

  