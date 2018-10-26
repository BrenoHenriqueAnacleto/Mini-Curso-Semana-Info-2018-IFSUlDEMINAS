
    $('#cadastro').validate({

        rules: {
            required: "required",
            nome: {
                required: true
            },
            login: {
                required: true
            },
            senha: {
                required: true,
                minlength: 5
            },
            confirmarSenha: {
                required: true,
                minlength: 5,
                equalTo: "#senha"
            },
            email: {
                required: true,
                email: true
            },
            cpf: {
                required: true,
                validaCpf: true
            },
            rg: {
                required: true
            },
            dataExpedicaoRG: {
                required: true,
                dateBR: true
            },
            nacionalidade: {
                required: true
            },
            naturalidade: {
                required: true
            },
            dataNascimento: {
                required: true,
                dateBR: true
            },
            pai: {
                required: true
            },
            mae: {
                required: true
            },
            estadoCivil: {
                required: true
            },
            numeroSindicato: {
                required: true
            },
            numeroRegistro: {
                required: true
            },
            folhaRegistro: {
                required: true
            },
            livroRegistro: {
                required: true
            },
            dataRegistroJucesp: {
                required: true,
                dateBR: true
            },
            dataCompromisso: {
                required: true,
                dateBR: true
            },
            site: {
                required: false
            },
            telefone: {
                required: true
            },
            cepComercial: {
                required: true,
                pesquisacepcomercial: true
            },
            estadoComercial: {
                required: true
            },
            cidadeComercial: {
                required: true
            },
            enderecoComercial: {
                required: true
            },
            numeroComercial: {
                required: true
            },
            cep: {
                required: true,
                pesquisacep: true
            },
            estado: {
                required: true
            },
            cidade: {
                required: true
            },
            endereco: {
                required: true
            },
            numero: {
                required: true
            },
            complemento: {
                required: false
            },
            captcha: {
                validaCaptcha: true
            }

        },
        errorClass: 'help-block col-lg-12',
        errorElement: 'span',
        highlight: function (element) {
            $(element).parents('div').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).parents('div').removeClass('has-error').addClass('has-success');
        },
        messages: {
            cep: {
                pesquisacep: 'CEP invÃ¡lido'
            },
            cepComercial: {
                pesquisacepcomercial: 'CEP invÃ¡lido'
            }
        }

    });
    jQuery.validator.addMethod('validaCpf', function (value, element) {

        value = removeMascara(value);

        return validaCpf(value);

    }, msgCpfCnpjInvalido);

    function removeMascara(pNum) {

        return String(pNum).replace(/\D/g, "").replace(/^0+/, "");
    }

    function validaCpf(cpf) {

        while (cpf.length < 11)
            cpf = "0" + cpf;
        var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
        var a = [];
        var b = new Number;
        var c = 11;
        for (i = 0; i < 11; i++) {
            a[i] = cpf.charAt(i);
            if (i < 9)
                b += (a[i] * --c);
        }
        if ((x = b % 11) < 2) {
            a[9] = 0
        } else {
            a[9] = 11 - x
        }
        b = 0;
        c = 11;
        for (y = 0; y < 10; y++)
            b += (a[y] * c--);
        if ((x = b % 11) < 2) {
            a[10] = 0;
        } else {
            a[10] = 11 - x;
        }
        if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg))
            return false;
        return true;
    }

    jQuery.validator.addMethod('pesquisacep', function (value, element) {

        return pesquisaCep(value);

    }, msgCEP);

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

    jQuery.validator.addMethod('pesquisacepcomercial', function (value, element) {

        return pesquisaCepComercial(value);

    }, msgCEP);

    function pesquisaCepComercial(valor) {

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

                    document.getElementById('cidadeComercial').setAttribute('readonly', true);
                    document.getElementById('ufComercial').setAttribute('readonly', true);
                    document.getElementById('cepComercial').value = (valor);
                    document.getElementById('cidadeComercial').value = (res['cidade']);
                    document.getElementById('ufComercial').value = (res['estado']);
                    valido = true;


                }
            });

            if (!valido) {
                document.getElementById('cidadeComercial').value = ("");
                document.getElementById('ufComercial').value = ("");
            }

        }

        return valido;
    }

    jQuery.validator.addMethod("validaCaptcha", function (value, element) {

        if (typeof grecaptcha != 'undefined') {

            var v = grecaptcha.getResponse();

            if (v.length == 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    }, msgCaptcha);

    jQuery.validator.addMethod("dateBR", function (value, element) {
        
        if (value.length != 10) {
            
            return (this.optional(element) || false);
        }
        
        var data = value;
        var dia = data.substr(0, 2);
        var barra1 = data.substr(2, 1);
        var mes = data.substr(3, 2);
        var barra2 = data.substr(5, 1);
        var ano = data.substr(6, 4);
        
        if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) {
            
            return (this.optional(element) || false);
        }
        
        if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) {
            
            return (this.optional(element) || false);
        }
        
        if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) {
            
            return (this.optional(element) || false);
        }
        
        if (ano < 1900) {
            
            return (this.optional(element) || false);
        }
        
        return (this.optional(element) || true);
    }, msgData);
});