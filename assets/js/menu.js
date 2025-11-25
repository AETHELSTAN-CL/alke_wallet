document.addEventListener("DOMContentLoaded", function () {
    // Formato moneda local
    function formatCurrency(num) {
        return '$' + Number(num).toLocaleString('es-CL');
    }

    // Inicializa saldo si no existe
    if (!localStorage.getItem("saldo")) {
        localStorage.setItem("saldo", 0);
    }

    // Mostrar saldo al cargar
    document.getElementById("saldoDisplay").textContent = formatCurrency(localStorage.getItem("saldo"));

    // Función de redirección con mensaje
    function redirigirConMensaje(url, texto) {
        const msg = document.getElementById("menuMsg");
        msg.innerHTML = `<i class="fa-solid fa-user-check text-success"></i> Ingresando a ${texto}...`;
        setTimeout(() => window.location.href = url, 1200);
    }

    // Eventos para los botones
    document.querySelector('a[href="wallet.html"]').addEventListener("click", function (e) {
        e.preventDefault();
        redirigirConMensaje("wallet.html", "Depósito");
    });

    document.querySelector('a[href="sendmoney.html"]').addEventListener("click", function (e) {
        e.preventDefault();
        redirigirConMensaje("sendmoney.html", "Enviar Dinero");
    });

    document.querySelector('a[href="transactions.html"]').addEventListener("click", function (e) {
        e.preventDefault();
        redirigirConMensaje("transactions.html", "Últimos movimientos");
    });
    // Animaciones jQuery
    $(document).ready(function () {
        $("#tituloBanca")
            .css({ opacity: 0, position: "relative", top: "-50px" })
            .animate({ opacity: 1, top: "0px" }, 800);
    });
    // Animación al aparecer los botones
    $(".wallet-card")
        .css({ opacity: 0, position: "relative", top: "20px" })
        .each(function (i) {
            $(this).delay(i * 150).animate(
                { opacity: 1, top: "0px" },
                500
            );
        });
});