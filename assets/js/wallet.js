$(document).ready(function () {
    // Animar título
    $("h1").hide().slideDown(800).fadeTo(100, 1);

    // Animar botones
    $("#depositBtn, #withdrawBtn")
        .css({ opacity: 0, transform: "scale(0.9)" })
        .each(function (i) {
            $(this).delay(800 * i).animate({ opacity: 1 }, 300)
                .css({ transform: "scale(1)" });
        });

    var balance = parseInt(localStorage.getItem("saldo")) || 0;

    function updateBalance() {
        $("#balance").text(balance.toLocaleString("es-CL"));
    }
    updateBalance();

    // Formateo en tiempo real moneda local
    $("#amount").on("input", function () {
        let valor = $(this).val();
        valor = valor.replace(/\D/g, ""); // eliminar todo menos números
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // agregar puntos
        $(this).val(valor);
    });

    // Convertir string a número
    function parseCLP(raw) {
        return Number(String(raw).replace(/\./g, ""));
    }

    // Depositar
    $("#depositBtn").click(function () {
        var amount = parseCLP($("#amount").val());

        if (isNaN(amount) || amount <= 0) {
            alert("❌ Ingresa un monto válido");
            return;
        }

        balance += amount;
        updateBalance();

        localStorage.setItem("saldo", balance);

        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
        movimientos.push({ tipo: "deposito", descripcion: "Depósito", monto: amount });
        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        $("#amount").val("");
        alert("✔️ Depósito realizado!");
    });

    // Retirar
    $("#withdrawBtn").click(function () {
        var amount = parseCLP($("#amount").val());

        if (isNaN(amount) || amount <= 0) {
            alert("❌ Ingresa un monto válido");
            return;
        }

        if (amount > balance) {
            alert("❌ Saldo insuficiente");
            return;
        }

        balance -= amount;
        updateBalance();

        localStorage.setItem("saldo", balance);

        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
        movimientos.push({ tipo: "retiro", descripcion: "Retiro", monto: amount });
        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        $("#amount").val("");
        alert("✔️ Retiro exitoso!");
    });
});