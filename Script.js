const APP_URL = "https://script.google.com/macros/s/AKfycbyXzJA1SGNIfHCLJHc_WI6tsEmKqULF2tpaiNDcvkzmWao6soyEkgCZ5niDUuoRSRSm/exec"; // Reemplaza con tu URL

const form = document.getElementById('dispoForm');
const btn = document.getElementById('btnSubmit');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btn.disabled = true;
    btn.textContent = "Enviando...";

    const formData = new FormData(form);
    const data = {};
    
    // Convertimos FormData a un objeto y manejamos los checkboxes
    formData.forEach((value, key) => {
        data[key] = value === "on" ? "SÍ" : value;
    });

    // Añadimos explícitamente "NO" a los campos no marcados
    const campos = ['Martes_M', 'Martes_T', 'Jueves_M', 'Jueves_T', 'Viernes_M', 'Viernes_T', 'Sabado_M', 'Domingo_M'];
    campos.forEach(campo => {
        if (!data[campo]) data[campo] = "NO";
    });

    try {
        // Usamos URLSearchParams para que Apps Script lo reciba en e.parameter
        const params = new URLSearchParams(data);
        
        await fetch(APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Importante para evitar bloqueos de CORS
            body: params
        });

        alert("✅ Disponibilidad enviada correctamente");
        form.reset();
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Hubo un error al enviar");
    } finally {
        btn.disabled = false;
        btn.textContent = "ENVIAR DISPONIBILIDAD";
    }
});
