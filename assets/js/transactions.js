$(document).ready(function () {
    const movimientosList = $("#movimientosList");

    // Obtener movimientos reales de localStorage
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    // Limpiar la lista por si hay elementos fijos
    movimientosList.empty();

    // Agregar movimientos
    movimientos.forEach(mov => {
        let icon = '';
        if (mov.tipo === 'deposito') icon = '<i class="fa-solid fa-circle-arrow-down list-icon"></i>';
        else if (mov.tipo === 'retiro') icon = '<i class="fa-solid fa-arrow-up list-icon"></i>';
        else icon = '<i class="fa-solid fa-arrow-right list-icon"></i>';

        movimientosList.append(`
            <li class="list-group-item">
                ${icon} ${mov.descripcion}: $${mov.monto.toLocaleString('es-CL')}
            </li>
        `);
    });
    function renderMovimientos(filtro = "todos") {
        movimientosList.empty();
        movimientos.forEach(mov => {
            if (filtro !== "todos" && mov.tipo !== filtro) return;

            let icon = '';
            if (mov.tipo === 'deposito') icon = '<i class="fa-solid fa-circle-arrow-down list-icon"></i>';
            else if (mov.tipo === 'retiro') icon = '<i class="fa-solid fa-arrow-up list-icon"></i>';
            else icon = '<i class="fa-solid fa-arrow-right list-icon"></i>';

            movimientosList.append(`
            <li class="list-group-item">
                ${icon} ${mov.descripcion}: $${mov.monto.toLocaleString('es-CL')}
            </li>
        `);
        });
    }

    // Inicialmente mostrar todos
    renderMovimientos();

    // Filtrar al cambiar selección
    $("#filtroMovimiento").change(function () {
        renderMovimientos(this.value);
    });
    // ---- Animación solo del icono ----
    $("#iconTitulo")
        .css({
            opacity: 0,
            transform: "scale(0.5)"
        })
        .animate(
            { opacity: 1 },
            {
                duration: 700,
                step: function (now, fx) {
                    // zoom suave
                    let scale = 0.5 + (now * 0.5);
                    $(this).css("transform", "scale(" + scale + ")");
                }
            }
        );

    // Animación del título 
    $("#tituloMov")
        .css({
            opacity: 0,
            position: "relative",
            top: "-40px"   //  desde arriba
        })
        .delay(150)
        .animate(
            {
                opacity: 1,
                top: "0px" // baja a su posición normal
            },
            700
        );
});