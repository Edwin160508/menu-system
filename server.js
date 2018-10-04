var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var port = 3000;
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', { title: 'DWA Index DB', message: 'Hello there!' });
});

app.listen(port, function () {
    console.log('Servidor Ativado, escutando porta '+ port);
});
/*http.createServer(function(request, response){
	var q = url.parse(request.url, true);
	var fileName = '.'+q.pathname;
	console.log(fileName);
	if(fileName == './'){
		fileName = './public/index.html';
	}
	fs.readFile(fileName, function(err,data){
		if(err){
			console.log('deu ruim = '+err);
			fs.readFile('404.html', function(erro, dados){
				response.writeHead(200, {'contentType':'text/html;charset=utf-8'});
				response.write(dados);
				response.end();
			});
		}else{
			response.writeHead(200, {'contentType':'text/html;charset=utf-8'});
			response.write(data);
			response.end();
		}
	});
}).listen(3000);
console.log('Servidor Ativado!!!!');*/