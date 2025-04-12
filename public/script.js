// Se connecter 
const handleSubmit = async (e) => {
    try{
        e.preventDefault();

    // récupérer les données de l'utilisateur
    const mail = e.target.mail.value;
    const password = e.target.password.value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ mail, password })
    });

    if(!response.ok){
        throw new Error(`Echec tentative de reponse ${response.status}`);
    }

    const result = await response.json();
    console.log('result :', result)
    } catch (e){
        console.error('Erreur lors de la soumission :', e.message)
    }
};

document.getElementById('dataForm').addEventListener('submit', handleSubmit);