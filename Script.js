// REEMPLAZA esta URL con la que te de Google Apps Script al publicar
const APP_URL = "https://script.google.com/macros/s/AKfycbzCJhZ4f9kBKWoIm-H05zuWe0RHkf1lUvOwXaAYYv30CXRRWEya8WEGj1Wlk6-McNRuEg/exec";
;

const form = document.getElementById('dispoForm');
const btn = document.getElementById('btnSubmit');
const feedback = document.getElementById('feedback');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI de carga
    btn.disabled = true;
    btn.textContent = "Enviando...";
    feedback.classList.remove('d-none', 'alert-success', 'alert-danger');
    feedback.classList.add('alert', 'alert-info');
    feedback.textContent = "Guardando en Google Sheets...";

    const formData = new FormData(form);

    try {
        const response = await fetch(APP_URL, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            feedback.classList.replace('alert-info', 'alert-success');
            feedback.textContent = "✅ ¡Enviado con éxito!";
            form.reset();
        } else {
            throw new Error("Error en el servidor");
        }
    } catch (error) {
        feedback.classList.replace('alert-info', 'alert-danger');
        feedback.textContent = "❌ Error al enviar los datos.";
        console.error(error);
    } finally {
        btn.disabled = false;
        btn.textContent = "ENVIAR DISPONIBILIDAD";
    }
});
