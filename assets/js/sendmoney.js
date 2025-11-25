document.addEventListener("DOMContentLoaded", function () {
    // Variables principales
    const saldoDisplay = document.getElementById("saldoDisplay");
    const sendAmount = document.getElementById("sendAmount");
    const btnEnviar = document.getElementById("btnEnviar");
    const contactList = document.getElementById("contactList");
    let selectedContact = null;

    // Cargar contactos guardados
    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];

    // Si no hay contactos guardados, inicializa con los default
    if (contactos.length === 0) {
        contactos = [
            { name: "John Doe", cbu: "123456789", alias: "john.doe", bank: "ABC Bank" },
            { name: "Jane Smith", cbu: "987654321", alias: "jane.smith", bank: "XYZ Bank" }
        ];
        localStorage.setItem("contactos", JSON.stringify(contactos));
    }

    // Mostrar contactos guardados en pantalla
    contactos.forEach(contacto => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
        <div class="contact-info">
            <span class="contact-name">${contacto.name}</span>
            <span class="contact-details">
                CBU: ${contacto.cbu} <br>
                Alias: ${contacto.alias} <br>
                Banco: ${contacto.bank}
            </span>
        </div>
    `;
        contactList.appendChild(li);
        li.addEventListener("click", () => manejarSeleccion(li));
    });

    // Helpers
    function parseMonto(str) {
        return Number(str.replace(/[.,\s]/g, ''));
    }

    function formatCurrency(num) {
        return '$' + num.toLocaleString('es-CL');
    }

    function actualizarSaldo() {
        const saldo = Number(localStorage.getItem("saldo")) || 0;
        saldoDisplay.textContent = formatCurrency(saldo);
    }

    actualizarSaldo();

    // Función para seleccionar contacto
    function manejarSeleccion(li) {
        contactList.querySelectorAll("li").forEach(item => item.classList.remove("selected-contact"));
        li.classList.add("selected-contact");
        selectedContact = li.querySelector(".contact-name").textContent;
    }

    // Aplicar evento a contactos existentes
    contactList.querySelectorAll("li").forEach(li => li.addEventListener("click", () => manejarSeleccion(li)));

    // Agregar nuevo contacto desde modal
    document.getElementById("newContactForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("newName").value;
        const cbu = document.getElementById("newCBU").value;
        const alias = document.getElementById("newAlias").value;
        const bank = document.getElementById("newBank").value;

        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            <div class="contact-info">
                <span class="contact-name">${name}</span>
                <span class="contact-details">CBU: ${cbu} <br>Alias: ${alias} <br>Banco: ${bank}</span>
            </div>
        `;
        contactList.appendChild(li);
        li.addEventListener("click", () => manejarSeleccion(li));

        contactos.push({ name, cbu, alias, bank });
        localStorage.setItem("contactos", JSON.stringify(contactos));

        bootstrap.Modal.getInstance(document.getElementById("contactModal")).hide();
        e.target.reset();
    });

    // Botón enviar dinero
    btnEnviar.addEventListener("click", () => {
        let monto = parseMonto(sendAmount.value);
        let saldo = Number(localStorage.getItem("saldo")) || 0;

        if (monto <= 0 || isNaN(monto)) {
            alert("Ingresa un monto válido.");
            return;
        }
        if (monto > saldo) {
            alert("❌ Saldo insuficiente.");
            return;
        }
        if (!selectedContact) {
            alert("❌ Selecciona un contacto.");
            return;
        }

        saldo -= monto;
        localStorage.setItem("saldo", saldo);
        actualizarSaldo();

        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
        movimientos.push({
            tipo: "envio",
            descripcion: `Envío a ${selectedContact}`,
            monto: monto
        });
        localStorage.setItem("movimientos", JSON.stringify(movimientos));

        alert(`✔️ Dinero enviado: ${formatCurrency(monto)} a ${selectedContact}`);

        sendAmount.value = '';
        selectedContact = null;
        contactList.querySelectorAll("li").forEach(li => li.classList.remove("selected-contact"));
    });

    // Filtrar contactos
    document.getElementById("searchContact").addEventListener("input", function () {
        const filter = this.value.toLowerCase();
        contactList.querySelectorAll("li").forEach(li => {
            const name = li.querySelector(".contact-name").textContent.toLowerCase();
            li.style.display = name.includes(filter) ? "" : "none";
        });
    });

    // Formateo moneda local en tiempo real con jQuery
    const sendAmountInput = $("#sendAmount");
    sendAmountInput.on("input", function () {
        let value = $(this).val();
        value = value.replace(/\D/g, "");
        if (value) {
            $(this).val(Number(value).toLocaleString("es-CL"));
        } else {
            $(this).val("");
        }
    });

    // Autocompletado jQuery - Solo contactos nuevos no contactos default
    $("#searchContact").on("input", function () {
        const texto = $(this).val().toLowerCase();
        $("#suggestions").empty();

        if (texto.length === 0) {
            $("#suggestions").hide();
            return;
        }

        contactos.forEach(contacto => {
            if (contacto.name.toLowerCase().includes(texto)) {
                $("#suggestions").show();
                $("#suggestions").append(`
                    <button class="list-group-item list-group-item-action suggestion-item">
                        ${contacto.name}
                    </button>
                `);
            }
        });
    });

    $(document).on("click", ".suggestion-item", function () {
        const nombre = $(this).text();
        $("#searchContact").val(nombre);
        $("#suggestions").hide();
    });
});