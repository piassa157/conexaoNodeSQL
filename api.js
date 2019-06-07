    var express = require('express');
    var app = express();
    var cors = require('cors');
    var sql = require('mssql');
    var bodyParser = require('body-parser');
    var js2xmlparser = require("js2xmlparser");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());

    var sqlConfig = {
        user: 'BD17278',
        password: 'piassa157',
        server: 'regulus',
        database: 'BD17278'
    }

    sql.connect(sqlConfig)
    .then(conexao => global.conexao = conexao)
    .catch(erro => console.log(erro));

    function execSQL(sql, resposta) {
        global.conexao.request()
        .query(sql)
        .then(resultado => resposta.json(resultado.recordset))
        .catch(erro => resposta.json(erro));
        }

    app.get('/api/aluno/json', function (req, res) {
        execSQL('select * from doidera_appp', res)
    })

    app.get('/api/aluno/:ra?', (requisicao, resposta) => {
        let filtro = '';
        if (requisicao.params.ra)
        filtro = ' WHERE ra=' + parseInt(requisicao.params.ra);
        execSQL('SELECT * from doidera_appp' + filtro, resposta);
    })

    app.listen(3000);
    console.log('A API está no ar');