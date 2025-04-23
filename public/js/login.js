const handleSubmit = async (e) => {
    try{
        e.preventDefault();
    // récupérer les données de l'utilisateur
    const mail = e.target.email.value;
    const password = e.target.password.value;
    console.log(password);
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
    window.location.href = '/';
    } catch (e){
        console.error('Erreur lors de la soumission :', e.message)
    }
};

document.querySelector('.login-form').addEventListener('submit', handleSubmit);

const handleLogout = async (e) => {
    try {
        e.preventDefault();

        const response = await fetch('/logout', { // Appelle la route de déconnexion
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Échec de la déconnexion ${response.status}`);
        }

        console.log('Déconnexion réussie');
        window.location.href = '/login'; // Redirige vers la page de connexion

    } catch (e) {
        console.error('Erreur lors de la déconnexion :', e.message);
    }
};

document.querySelector(".logout-button").addEventListener('click', handleLogout)
