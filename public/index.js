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
        getCurrentFieldValues();
        actionInsertUpdate();

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

    function actionInsertUpdate(){
        document.getElementById("result").innerHTML = "";
        var transaction = db.transaction(["produtos"], "readwrite");
        
        transaction.oncomplete = function(event) {
            console.log("Sucesso :)");
        };
        
        transaction.onerror = function(event) {
            console.log("Erro :(");
            document.getElementById("result").innerHTML = "Erro ao Adicionar ";            
        };
        var objectStore = transaction.objectStore("produtos");
        var request = objectStore.get(codigo);
        request.onsuccess = function(event){            
            if(request.result.nome != nome)
                document.getElementById("result").innerHTML = "Atualizando nome do produto : "+request.result.nome+" para "+nome;
            if(request.result.preco != preco)
                document.getElementById("result").innerHTML = "Atualizando preço do produto: "+request.result.preco+" para "+preco;
            if(request.result.nome != nome && request.result.preco != preco){
                document.getElementById("result").innerHTML = "Atualizando nome do produto : "+request.result.nome+" para "+nome+" e preço do produto: "+
                    request.result.preco+" para "+preco;
            }    
            request.result.nome = nome;
            request.result.preco = preco;
            objectStore.put(request.result);
        };
        request.onerror = function(event){
            objectStore.add({codigo: codigo, nome: nome, preco: preco});
            document.getElementById("result").innerHTML = "Adicionado com Sucesso";
        };
        /*
        $("#updateBtn").click(function(){
		var codigo = $("#codigo").val();
		var nome = $("#nome").val();
		var transaction = db.transaction(["estudantes"],"readwrite");
		var objectStore = transaction.objectStore("estudantes");
		var request = objectStore.get(codigo);
		request.onsuccess = function(event){
			$("#result").html("Atualizando : "+request.result.nome + " para " + nome);
			request.result.nome = nome;
			objectStore.put(request.result);
		};
	});
        
        */
    }
}