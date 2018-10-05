var request, db;

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
    var codigo = document.getElementById('codigo').value;  
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
        getCurrentFieldValues();
        console.log(nome);
        console.log(preco);
        var transaction = db.transaction(["produtos"], "readwrite");
        
        transaction.oncomplete = function(event) {
            console.log("Sucesso :)");
            //document.getElementById("result").innerHTML("Adicionado com Sucesso");			
        };
        
        transaction.onerror = function(event) {
            console.log("Erro :(");
            //document.getElementById("result").innerHTML("Erro ao Adicionar");
        };
        var objectStore = transaction.objectStore("produtos");
        objectStore.add({codigo: codigo, nome: nome, preco: preco});


    });

    removeBtn.addEventListener('click', function(){
        console.log('Botao Remover');
        getCurrentFieldValues();
        console.log(nome);
        console.log(preco);
    });

    getBtn.addEventListener('click', function(){
        console.log('Botao Localizar');        
        getCurrentFieldValues();
        console.log(nome);
        console.log(preco);
    });
    updateBtn.addEventListener('click', function(){
        console.log('Botao Atualizar');
        getCurrentFieldValues();
        console.log(nome);
        console.log(preco);
    });
    function getCurrentFieldValues(){
        codigo = document.getElementById('codigo').value;
        nome = document.getElementById('nome').value;
        preco = document.getElementById('preco').value;
    }
    /*Operações com Base de dados*/
    function openConnectionIndexBD(){
        request = indexedDB.open("menuDBX");

        request.onerror = function(event){
            window.alert("Erro de Base de Dados: "+event.target.errorCode);
        };
        request.onsuccess = function(event){
            db = event.target.result;
        };
        request.onupgradeneeded = function(event){
            db = event.target.result;
            var objectStore = db.createObjectStore("produtos", { keyPath : "codigo" });
        };
    }
}