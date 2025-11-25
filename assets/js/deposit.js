document.addEventListener("DOMContentLoaded", function () {
    
    // Formato miles y moneda local
    function parseMonto(str) {
        return Number(str.replace(/[.,\s]/g, ''));
    }

    function formatCurrency(num) {
        return '$' + num.toLocaleString('es-CL');
    }

    const btn = document.getElementById("btnDepositar");
    const depositMsg = document.getElementById("depositMsg");

    btn.addEventListener("click", () => {
        const input = document.getElementById("depositAmount");
        let monto = parseMonto(input.value);

        if (monto <= 0 || isNaN(monto)) {
            depositMsg.style.color = "red";
            depositMsg.innerHTML = '<i class="fa-solid fa-circle-exclamation me-1"></i> Ingrese un monto válido.';
            return;
        }

        // Saldo actual
        let saldo = Number(localStorage.getItem("saldo")) || 0;
        saldo += monto;
        localStorage.setItem("saldo", saldo);

        // Guardar movimientos
        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
        movimientos.push({ tipo: "deposito", descripcion: "Depósito", monto: monto }); // sin acento
        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        depositMsg.style.color = "green";
        depositMsg.innerHTML = `<i class="fa-solid fa-circle-check me-1"></i> Depósito realizado: ${formatCurrency(monto)}. Actualizando saldo...`;

        setTimeout(() => window.location.href = "menu.html", 1500);
    });

});