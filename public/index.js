window.onload = function() {
    // verificando qual navegador esta em uso para usar o indexedDB específico
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    // verificando qual navegador esta em uso para usar a transação específica
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};

    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    //var formulario = document.getElementById('formulario');
    //Botões
    var addBtn = document.getElementById('addBtn');
    var removeBtn = document.getElementById('removeBtn');
    var getBtn = document.getElementById('getBtn');
    var updateBtn = document.getElementById('updateBtn');
    var form = document.getElementById('formulario');
    /*Cardapio*/ 
    var codigo = 0;  
    var nome = document.getElementById('nome').value;
    var preco = document.getElementById('preco').value;  

    if (!window.indexedDB) {
        window.alert("Seu Navegador não suporta versão estável do IndexedDB. \nOu seu Navegador está em modo de navegação anônimo. \n"+
        "O recurso não está disponível.");
    }else{
        openConnectionIndexBD();    
        form.addEventListener('submit', function(e){
            e.preventDefault();
            window.alert('Form Enviado');
        });
        
    }
    addBtn.addEventListener('click', function(){
        console.log('Botao Adicionar');
        //window.alert(document.getElementById('nome').value);
        atualizaValorCampos();
        console.log(nome);
        console.log(preco);
    });

    removeBtn.addEventListener('click', function(){
        console.log('Botao Remover');
        atualizaValorCampos();
        console.log(nome);
        console.log(preco);
    });

    getBtn.addEventListener('click', function(){
        console.log('Botao Localizar');        
        atualizaValorCampos();
        console.log(nome);
        console.log(preco);
    });
    updateBtn.addEventListener('click', function(){
        console.log('Botao Atualizar');
        atualizaValorCampos();
        console.log(nome);
        console.log(preco);
    });
    function atualizaValorCampos(){
        nome = document.getElementById('nome').value;
        preco = document.getElementById('preco').value;
    }
    /*Operações com Base de dados*/
    function openConnectionIndexBD(){
        var db;
        var request = indexedDB.open("menuDB");

        request.onerror = function(event){
            window.alert("Erro de Base de Dados: "+event.target.errorCode);
        };
        request.onsuccess = function(event){
            db = event.target.result;
        };
        request.onupgradeneeded = function(event){
            var intemMenuDefault = [{codigo:"1",nome:"Pepsi Lata 350ml", preco:"4.50"},
            {codigo:"2",nome:"Guaraná Antartica Lata 350ml", preco:"4.50"}];

            db = event.target.result;
            /*Criando objeto "objectStore" no qual possui codigo, nome, preço*/ 
            var objectStore = db.createObjectStore("menuItem", {keyPath:"codigo"});
            /*Configurando atributos se o valor de cada campo pode ser repetido ou não*/ 
            /* Cada produto tem seu código*/    
            objectStore.createIndex("codigo","codigo",{unique: true});
            /* Cada produto tem seu nome*/
            objectStore.createIndex("nome","nome",{unique: true});
            /* Cada produto tem seu preço podendo ter preços iguais*/
            objectStore.createIndex("preco","preco",{unique: false});

            objectStore.transaction.oncomplete = function(event){
                var menuItemObjectStore = db.transaction("menuItem", "readwrite").objectStore("menuItem");
                intemMenuDefault.forEach(function(itemMenu){
                    menuItemObjectStore.add(itemMenu);
                });
            };

        };
    }
}