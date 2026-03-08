document.addEventListener('DOMContentLoaded', function() {
    const isLoginPage = document.title.includes('Login');
    
    if (isLoginPage) {
        const form = document.getElementById('login-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (form && emailInput && passwordInput) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const emailCompleto = emailInput.value;
                const usuarioNome = emailCompleto.split('@')[0];
                
                localStorage.setItem('usuarioNome', usuarioNome);
                window.location.href = 'loja.html';
            });
        }
    } else {
        const nome = localStorage.getItem('usuarioNome');
        if (nome) {
            const spanUsuarioNome = document.getElementById('usuario-nome');
            if (spanUsuarioNome) {
                spanUsuarioNome.textContent = nome;
            }
        }


        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) {
            logoutButton.addEventListener('click', function() {
                localStorage.removeItem('usuarioNome');
                localStorage.removeItem('cartCount');
                window.location.href = 'index.html';
            });
        }

        let activeButtons = {
            product1: 0,
            product2: 0,
            product3: 0,
            product4: 0,
            product5: 0,
            product6: 0
        };
        function updateCartCount() {
            const cartCount = Object.values(activeButtons).filter(value => value === 1).length;
            localStorage.setItem('cartCount', cartCount);
            document.getElementById('cart').textContent = cartCount;
        }
        for (let i = 1; i <= 6; i++) {
            document.getElementById(`product${i}`).onclick = function() {
                if (activeButtons[`product${i}`] === 1) {
                    activeButtons[`product${i}`] = 0;
                    document.getElementById(`product${i}`).textContent = 'Buy Now!'; 
                } else {
                    activeButtons[`product${i}`] = 1;
                    document.getElementById(`product${i}`).textContent = 'Remove from Cart';  
                }
            updateCartCount();
            };
        };   
}});


