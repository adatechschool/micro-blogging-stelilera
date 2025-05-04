// S'inscrire sur snappy 
//const urlApi = process.env.API_URL

const handleSubmit = async (e) => {
    try{
        e.preventDefault();

    const inputName = document.querySelector('.username');
    console.log('input :', inputName)
    

    const formData = new FormData(e.target);
    const name = formData.get('username');
    const lastname = formData.get('lastname'); // Correct
    const mail = formData.get('email');
    const password = formData.get('password');

    console.log('password :', password);

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ name, lastname, mail, password })
    });

    if(!response.ok){
        throw new Error(`Echec tentative de reponse ${response.status}`);
    }

    const result = await response.json();
    console.log('result :', result);

    window.location.href = '/login'
    } catch (e){
        console.error('Erreur lors de la soumission :', e.message)
    }
};

document.getElementById('data-form').addEventListener('submit', handleSubmit);