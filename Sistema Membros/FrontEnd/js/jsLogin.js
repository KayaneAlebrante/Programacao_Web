document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('floatingInput').value;
        const senha = document.getElementById('floatingPassword').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Você está logado!");
                localStorage.setItem('token', result.token);
                window.location.href = "main.html";
            } else {
                throw new Error(result.mensagem);
            }
        } catch (error) {
            alert(error.message);
        }
    });
});
