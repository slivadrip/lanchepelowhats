  var lanches = ['X-Burger', 'X-Salada', 'X-Egg', 'X-Frango', 'X-Calabresa', 'X-Bacon', 'X-Dog', 'X-Tudo', 'Cachorro quente normal', 'Cachorro quente prensado'];
  var itens = ['Pão', 'Carne', 'Queijo', 'Presunto', 'Frango', 'Bacon', 'Calabresa', 'Salsicha', 'Ovo', 'Ovo de codorna', 'Alface', 'Tomate', 'Cebola', 'Pepino', 'Cenoura', 'Milho', 'Ervilha', 'Maionese', 'Ketchup', 'Cheddar', 'Catupiry', 'Queijo ralado'];

  $(function () {
    lanches.forEach(function (item) {
        $('.lanche').append("<option value='" + item + "'>" + item + "</option>");
    });

    itens.forEach(function (item) {
        $('.itens').append("<option value='" + item + "'>" + item + "</option>");
    });

    $('select[multiple] > option').mousedown(function (e) {
        e.preventDefault();
        var originalScrollTop = $(this).parent().scrollTop();
        $(this).prop('selected', $(this).prop('selected') ? false : true);
        var self = this;
        $(this).parent().focus();
        setTimeout(function () {
            $(self).parent().scrollTop(originalScrollTop);
        }, 0);

        return false;
    });

    $('.lanche,.itens,textarea').change(montaPedido);
    $('.lanche,.itens').click(montaPedido);

    function montaPedido() {
        var textComposer = $('.msg').val() + " um " + $('.lanche').val();
        var retirar = $('.itens').val();

        if (retirar) {
            retirar.forEach(function (item) {
                textComposer += " sem " + item + ";"
            });
        }

        textComposer += " " + $('.msg-complementar').val();

        $('output').html(textComposer);
    }

    montaPedido();

    $('.pedir').click(function () {
        var tel = $('.tel').val();
        if (!tel) {
            return alert("O número do telefone é obrigatório!");
        }
        var tel = tel.replace(/[^\d]/g, '');
        var api = window.open("https://api.whatsapp.com/send?phone=55" + tel + "&text=" + $('output').html());
    });
});