const APP_URL = "https://script.google.com/macros/s/AKfycbyXzJA1SGNIfHCLJHc_WI6tsEmKqULF2tpaiNDcvkzmWao6soyEkgCZ5niDUuoRSRSm/exec";

const form = document.getElementById('dispoForm');
const btn = document.getElementById('btnSubmit');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btn.disabled = true;
    btn.textContent = "Enviando...";

    const formData = new FormData(form);
    const params = new URLSearchParams();
    
    // 1. Mapeamos el nombre (asegúrate que en HTML sea name="nombre")
    params.append('nombre', formData.get('nombre'));

    // 2. Mapeamos los Checkboxes (Si no está marcado, enviamos "NO")
    const campos = ['Martes_M', 'Martes_T', 'Jueves_M', 'Jueves_T', 'Viernes_M', 'Viernes_T', 'Sabado_M', 'Domingo_M'];
    
    campos.forEach(campo => {
        const valor = formData.get(campo);
        params.append(campo, valor === "on" ? "SÍ" : "NO");
    });

    try {
        await fetch(APP_URL, {
            method: 'POST',
            mode: 'no-cors', 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });

        // Como no-cors no permite leer la respuesta, asumimos éxito tras el fetch
        alert("✅ Disponibilidad enviada. Revisa tu Google Sheet en unos segundos.");
        form.reset();
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error de conexión");
    } finally {
        btn.disabled = false;
        btn.textContent = "ENVIAR DISPONIBILIDAD";
    }
});
