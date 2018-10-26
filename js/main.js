$(document).ready(function(){

	$('#teste').click(function(){
		console.log('Ola Marilene');
	});

//	jQuery mask
	$('#telefone').mask('(00)0000-0000');
	$('#cpf').mask('000.000.000-00');
	$('#cep').mask('00000-000');
	// $('*').css('display','none');

// Animação
   $('#main').append('<p id="test">jQuery Animate</p>');
   $('#main').append('<button id="animatebtn">Animate</button>');
   $('#test').css('border','1px solid green');
   $('#test').css('width','100px');
   $('#test').css('margin-left','50px');
   $('#test').css('height','100px');
   $('#test').css('text-align','center');
   //$('#test').css('background-image','url("img/palmeiras.png")');

   $('#animatebtn').click(function () {
      $('#test').animate({
          fontSize: '4em',
          borderWidth: '10px',
          width: '70%',
          height: '400px'
      },5000, function () {
          $(this).css('border-color', 'red');
        //  $(this).css('background-image','url("img/boca.png")');
      });
   });

   // jQuery Validate
	$('#cadastroForm').validate({
		rules:{
			nome:{
				required:true
			},
			email:{
				required:true
			},
			senha:{
				required:true
			},
			confirmasenha:{
				equalTo:"#senha",
				required:true
			},
			cep:{
				required:true,
				pesquisaCep:true
			},
			telefone:{
				required:true,
			},

		},
		 messages: {
		 	nome: 'Campo Obrigatório',
		 	email: 'Campo Obrigatório',
		 	senha:'Campo Obrigatório',
		 	confirmasenha: 'Campo Obrigatório',
		 	cep: 'Campo Obrigatório',
		 	telefone: 'Campo Obrigatório',
		 }
	});
	  jQuery.validator.addMethod('pesquisaCep', function (value, element) {

        return pesquisaCep(value);

    });
// AJAX
    function pesquisaCep(valor) {

        var cep = valor.replace(/\D/g, '');
        var valido = false;

        if (cep.length == 8) {

            $.ajax({
                url: 'https://api.postmon.com.br/v1/cep/' + cep,
                method: 'GET',
                dataType: 'json',
                async: false,
                beforeSend: function () {
                    $("#CepEsperar").show(50, "swing");

                },
                complete: function () {
                    $("#CepEsperar").slideUp(3000, "linear");
                },
                success: function (res) {
                    document.getElementById('cidade').setAttribute('readonly', true);
                    document.getElementById('uf').setAttribute('readonly', true);
                    document.getElementById('cep').value = (valor);
                    document.getElementById('cidade').value = (res['cidade']);
                    document.getElementById('uf').value = (res['estado']);
                    valido = true;

                }
            });

            if (!valido) {
                document.getElementById('cidade').value = ("");
                document.getElementById('uf').value = ("");
            }
        }

        return valido;
    }

    $('.error').css("color","red");

 // EVENTOS
    $('#click').click(function () {
      $(this).html('OK');
   });

   $('#dblclick').dblclick(function () {
      $(this).html('OK');
   });

   $('#mouseenter').mouseenter(function () {
      $(this).html('OK');
   });

   $('#mouseleave').mouseleave(function () {
      $(this).html('OK');
   });

   $('#keypress').keypress(function () {
      $('#eventKey').html('keypress - ' + $(this).val());
   });

   $('#keydown').keydown(function () {
      $('#eventKey').html('keydown - ' + $(this).val());
   });

   $('#keyup').keyup(function () {
      $('#eventKey').html('keyup - ' + $(this).val());
   });
   $('#selectchange').change(function(){
   	$( "#selectchange option:selected" ).each(function() {
   		if(	$( "#selectchange option:selected" ).val()=="opcao1"){
   			$('main').css('background-color','red');
   		}else{
   			$('main').css('background-color','blue');
   		}
   });
   });


});