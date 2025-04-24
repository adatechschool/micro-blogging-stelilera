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
        if(!response.ok){
            throw new Error(`Echec tentative de réponse ${response.status}`)
        }
        const result = await response.json()
        console.log('result :', result);
        
    } catch (e){
        console.error('Erreur lors de la soumission :', e.message)
    }
}
document.querySelector('.whatsup').addEventListener('submit', handlePostSubmit)


