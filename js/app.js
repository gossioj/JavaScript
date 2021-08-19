
  //New comment
  var Calculadora = (function inicialización()
  {
    var operacion = {
      Num1: "",
      Num2: "",
      Operador: "",
      Resultado: "",
      PrecesarIgual: false,
      ValorCalculado: false
    }

    var ClickPresionar = function (e) {
      var elemento = document.getElementById(e.target.id);
      if (e.target.parentElement.className == "col1") {
        elemento.style.width = "74.99px";
        elemento.style.height = "61.9px";
      }
      else
      {
        if (e.target.parentElement.className == "col2") {
          elemento.style.width = "89.5%";
          elemento.style.height = "99%";
        }else{
          elemento.style.width = "21.5%";
          elemento.style.height = "61.91px";
        }
      }
    };

    var ClickSoltar = function(e) {
      var elemento = document.getElementById(e.target.id);
      if (e.target.parentElement.className == "col1") {
        elemento.style.width = "29%";
        elemento.style.height = "62.91px";
      }
      else
      {
        if (e.target.parentElement.className == "col2") {
          elemento.style.width = "90%";
          elemento.style.height = "100%";
        }else{
          elemento.style.width = "22%";
          elemento.style.height = "62.91px";
        }
      }
    };


    var IngresarNumero = function (e) {
      var pantalla = ObtenerTeclaEspecifica("display");
      var encontroPunto = pantalla.innerHTML.indexOf(".");
      var cantidadNumeros = pantalla.innerHTML.length;

      if (cantidadNumeros > 8) {
        return;
      }

      var na = parseFloat(pantalla.innerHTML);
      if (String(na) == "NaN") {
        pantalla.innerHTML = 0;
      }

      if (e.currentTarget.id == "punto") {
        if (encontroPunto == -1) {
          pantalla.innerHTML = pantalla.innerHTML + ".";
          operacion.ValorCalculado = false;
        }
      }else{

        if (pantalla.innerHTML != "0") {
            pantalla.innerHTML = pantalla.innerHTML + e.currentTarget.id;
            operacion.ValorCalculado = false;
        }else
        {
            pantalla.innerHTML = e.currentTarget.id;
            operacion.ValorCalculado = false;
        }
      }
    };

    var AgregarEventos = function (elementosTecla, evento, metodo) {
      var cantidad  = elementosTecla.length;
      if (cantidad == undefined) {
        elementosTecla.addEventListener(evento, metodo);
      }else {
        for (var i = 0; i < cantidad; i++) {
            elementosTecla[i].addEventListener(evento, metodo);
          }
      }
    };

    var ObtenerElementosTeclas = function () {
      return document.querySelectorAll(".tecla");
    };

    var ObtenerTeclaNumeros = function () {
      var elementos = [11];
      for (i = 0; i < 10; i++) {
          elementos[i] =  document.getElementById(String(i));
      }

      var teclaPunto = ObtenerTeclaEspecifica("punto");
      elementos[10] = teclaPunto;
      return elementos;
    };

    var ObtenerTeclaEspecifica = function (id) {
        return document.getElementById(id);
    }

    var LimpiarPantalla = function () {
      var pantalla = ObtenerTeclaEspecifica("display");
      pantalla.innerHTML = "0";
      LimpiarObjetoOperacion();
    }

    var AgregarSigno = function () {
      var pantalla = ObtenerTeclaEspecifica("display");
      var cantidadNumeros = pantalla.innerHTML.length;

      if (pantalla.innerHTML != "0") {
          var encontroSignoNegativo = pantalla.innerHTML.indexOf("-");
        if (encontroSignoNegativo == -1) {
          pantalla.innerHTML = "-" + pantalla.innerHTML;
        }else
        {
          var valorEntero  = pantalla.innerHTML.substr(1, cantidadNumeros -1);
          pantalla.innerHTML = valorEntero;
        }
      }
    }

    var Operacion = function (id, operador) {
        var elementoTag = ObtenerTeclaEspecifica(String(id));
        elementoTag.onclick = function () {
        var pantalla = ObtenerTeclaEspecifica("display");
        if (operacion.PrecesarIgual == true) {
          LimpiarObjetoOperacion();
        }

        GuardarSegundoValorPor(pantalla);
        ProcesarOperacion();
        GuardarPrimerValor(pantalla);
        GuardarOperador(operador, pantalla);
      }
    };

    var GuardarSegundoValorPor = function () {
       if (operacion.Operador != "") {
         var pantalla = ObtenerTeclaEspecifica("display");
          var na = parseFloat(pantalla.innerHTML);
         if (String(na) != "NaN") {
           operacion.Num2 = parseFloat(pantalla.innerHTML);
         }
       }
    };

    var ProcesarOperacion = function () {
      if (operacion.Num1 != "" && operacion.Num2 != "") {
        operacion.ValorCalculado = true;
        Operador();
        operacion.Operador = "";
     }
    };

    var Operador = function () {
      switch (operacion.Operador) {
        case "*":
          operacion.Resultado = operacion.Num1 * operacion.Num2;
          break;
        case "+":
          operacion.Resultado = operacion.Num1  + operacion.Num2;
          break;
       case "-":
          operacion.Resultado = operacion.Num1 - operacion.Num2;
          break;
      case "/":
          operacion.Resultado = operacion.Num1 / operacion.Num2;
          break;
        default:
          alert("Operación no especificada.");
      }
    }

    var Resultado = function () {
       if (operacion.Operador != "") {
            var pantalla = ObtenerTeclaEspecifica("display");
            GuardarSegundoValor(pantalla);
             //var resultadoOperacion = 0;
              if (operacion.Resultado == "" || operacion.PrecesarIgual == true) {

               Operador();
             }

               var valorTexto = String(operacion.Resultado);
               var cantidadNumerosPantalla = valorTexto.length;
               var valoImprimir = valorTexto;
               if (cantidadNumerosPantalla > 8) {
                valoImprimir = valorTexto.substr(0, 8);
              }
               pantalla.innerHTML = valoImprimir;
               operacion.PrecesarIgual = true;
               operacion.ValorCalculado = true;
               if (operacion.Resultado == 0) {
                   LimpiarObjetoOperacion();
               }
       }
    }

    var GuardarSegundoValor = function (pantalla) {
       if (operacion.Resultado == "") {
         operacion.Num2 = parseFloat(pantalla.innerHTML);
      }else{
            operacion.Num1 = operacion.Resultado;
            if (operacion.ValorCalculado == false) {
              operacion.Num2 = parseFloat(pantalla.innerHTML);
              operacion.Resultado = "";
            }
      }
    }

    var GuardarPrimerValor = function (pantalla) {
      if (operacion.Resultado != "") {
        operacion.Num1 = operacion.Resultado;
      }else{
          operacion.Num1 = parseFloat(pantalla.innerHTML);
      }
    }

    var GuardarOperador = function (operador, pantalla) {
        operacion.Operador = operador;
        pantalla.innerHTML = operador;
    }

    var LimpiarObjetoOperacion = function () {
       operacion.Num1 = "";
       operacion.Num2 = "";
       operacion.Operador = "";
       operacion.Resultado = "";
       operacion.PrecesarIgual = false;
       operacion.ValorCalculado = false;
    }

    return {
      Inicializar: function () {
         var teclasCalculadora = ObtenerElementosTeclas();
         AgregarEventos(teclasCalculadora, "mousedown", ClickPresionar);
         AgregarEventos(teclasCalculadora, "mouseup", ClickSoltar);
        var teclaNumeros = ObtenerTeclaNumeros();
         AgregarEventos(teclaNumeros, "click", IngresarNumero);
        var teclaOn = ObtenerTeclaEspecifica("on");
         AgregarEventos(teclaOn, "click", LimpiarPantalla);
        var teclaSigno = ObtenerTeclaEspecifica("sign");
         AgregarEventos(teclaSigno, "click", AgregarSigno);
        var teclaIgual = ObtenerTeclaEspecifica("igual");
         AgregarEventos(teclaIgual, "click", Resultado);
         Operacion("mas", "+");
         Operacion("menos", "-");
         Operacion("por", "*");
         Operacion("dividido", "/");
      }
    };
  })();


Calculadora.Inicializar();
