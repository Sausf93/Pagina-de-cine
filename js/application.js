var nombrePelicula, numeroVotos, votos, prueba;
var arrayPeliculas = new Array();

Datos = function (nombrePelicula, numeroVotos) {
    this.nombrePelicula = nombrePelicula;
    this.numeroVotos = numeroVotos;

};

function formulario(img, nombrePelicula, sinopsis) {
    window.location.href = "pages/Formulario.html";
    localStorage.setItem("imagen", img);
    localStorage.setItem("nombre", nombrePelicula);
    localStorage.setItem("sinopsis", sinopsis);
}

function paginaDos() {


    var imagen = localStorage.getItem("imagen");
    var nombrePel = localStorage.getItem("nombre");
    var sinop = localStorage.getItem("sinopsis");
    $("#pelicula").append("<h2>" + nombrePel + "</h2>");
    $("#pelicula").append("<hr></hr>");
    $("#pelicula").append("<img src='" + imagen + "'>");
    $("#pelicula").append("<p>" + sinop + "</p>");
    $("#submit").on('click', function () {

        if (JSON.parse(localStorage.getItem("Peliculas")) == null) {
            votos = 0;
        } else {
            if (votos == null) {
                votos = 0;
            }
            prueba = JSON.parse(localStorage.getItem("Peliculas"));
            for (var h in prueba) {
                if (prueba[h].nombrePelicula == nombrePel) {
                    prueba[h].numeroVotos += 1;
                    votos = null;
                }
            }

        }
        if (votos == 0) {
            var objeto = new Datos();
            objeto.nombrePelicula = nombrePel;
            objeto.numeroVotos = votos + 1;
        }
        if (prueba != null) {
            arrayPeliculas = prueba;
        }
        if (objeto != null) {
            arrayPeliculas.push(objeto);
        }

        localStorage.setItem("Peliculas", JSON.stringify(arrayPeliculas));
        window.location.href = "estadisticas.html";
    });
}

function volver() {
    window.location.href = "../index.html";
}
var DonutOqueso, tipoGrafico = true;


function estadisticas() {

    if (tipoGrafico == true) {
        google.charts.load("current", {
            packages: ["corechart"]
        });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var pelis = JSON.parse(localStorage.getItem("Peliculas"));
            var arrayGrafico = [
                ["Nombre pelicula", "numero de votos"]
            ];
            pelis.forEach(function (e) {
                arrayGrafico.push([e.nombrePelicula, e.numeroVotos]);
            });
            var data = google.visualization.arrayToDataTable(arrayGrafico);

            var options = {
                title: 'Grafico de votaciones a las peliculas',
                pieHole: DonutOqueso,
            };

            var chart = new google.visualization.PieChart(document.getElementById('graficos'));
            chart.draw(data, options);
        }
    } else {
        google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChartdos);
      function drawChartdos() {
        var pelis = JSON.parse(localStorage.getItem("Peliculas"));
        var arrayGrafico = [
            ["Nombre pelicula", "numero de votos"]
        ];
        pelis.forEach(function (e) {
            arrayGrafico.push([e.nombrePelicula, e.numeroVotos]);
        });
        var data = google.visualization.arrayToDataTable(arrayGrafico);

        var options = {
          title: 'Lengths of dinosaurs, in meters',
          legend: { position: 'none' },
        };

        var chart = new google.visualization.Histogram(document.getElementById('graficos'));
        chart.draw(data, options);
        }

    }
}

function donut() {
    DonutOqueso = 0.4;
    tipoGrafico = true;
    estadisticas();
}

function queso() {
    DonutOqueso = 0;
    tipoGrafico = true;
    estadisticas();
}

function histograma() {
    tipoGrafico = false;
    estadisticas();
}