$(document).ready(function () {

            // Función para mostrar alertas Bootstrap
            function mostrarAlerta(tipo, mensaje) {
                $("#alertaLogin").html(`
            <div class="alert alert-${tipo} alert-dismissible fade show mt-3" role="alert">
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `);
            }

            // Evento del botón LOGIN
            $("#btnLogin").click(function () {
                const email = $("#email").val().trim();
                const pass = $("#password").val().trim();

                const validEmail = "admin";
                const validPass = "12345";

                if (email === validEmail && pass === validPass) {

                    mostrarAlerta("success", "✔️ Inicio de sesión correcto. Redirigiendo...");

                    setTimeout(() => {
                        window.location.href = "menu.html";
                    }, 1500);

                } else {
                    mostrarAlerta("danger", "❌ Usuario o contraseña incorrectos.");
                }
            });

        });