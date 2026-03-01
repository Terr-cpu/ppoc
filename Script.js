const APP_URL = "https://script.google.com/macros/s/AKfycbxmoMhbbY6qN-rXdz5N8KFKZQLQbvaHIkUEZNPBFL4HBP0Jxn62SeRO058CqyENYQZE/exec"; // Pega aquí la URL de la nueva implementación

const form = document.getElementById('dispoForm');
const btn = document.getElementById('btnSubmit');
const feedback = document.getElementById('feedback'); // Asegúrate que este ID existe en tu HTML

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Estado de carga
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.className = "mt-3 alert alert-info";
    feedback.textContent = "Procesando envío...";
    feedback.classList.remove('d-none');

    const formData = new FormData(form);
    const params = new URLSearchParams();
    
    // Mapeamos el nombre (asegúrate que en HTML el input sea name="nombre")
    params.append('nombre', formData.get('nombre'));

    // Lista de checkboxes
    const campos = ['Martes_M', 'Martes_T', 'Jueves_M', 'Jueves_T', 'Viernes_M', 'Viernes_T', 'Sabado_M', 'Domingo_M'];
    
    campos.forEach(campo => {
        const valor = formData.get(campo);
        params.append(campo, valor === "on" ? "SÍ" : "NO");
    });

    try {
        await fetch(APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Necesario para Google Apps Script
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });

        // MENSAJE DE ÉXITO
        feedback.className = "mt-3 alert alert-success fw-bold";
        feedback.textContent = "✅ ¡Disponibilidad enviada con éxito!";
        form.reset();
        
        // El mensaje desaparece tras 5 segundos
        setTimeout(() => { feedback.classList.add('d-none'); }, 5000);

    } catch (error) {
        feedback.className = "mt-3 alert alert-danger";
        feedback.textContent = "❌ Error al enviar. Inténtalo de nuevo.";
    } finally {
        btn.disabled = false;
        btn.textContent = "ENVIAR DISPONIBILIDAD";
    }
});
