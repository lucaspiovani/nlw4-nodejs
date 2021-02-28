import 'reflect-metadata'
import express from 'express';
import './database';

const app = express();



/**
 * GET => BUSCA
 * POST => SALVAR
 * PUT => ALTERAR
 * DELETE => DELETAR
 * PATCH => ALTERAÇÃO ESPECIFICA
 */

 // http://localhost:3333/users

 app.get("/", (request, response) => {
    return response.json({message: "Hello world - NLW04"});
    // return response.send("Hello world - NLW04");
 });

 // 1 param => Rota(Recurso API)
 // 2 param => request, response
 app.post("/", (request, response) => {
    return response.json({message: "Os dados foram salvos com sucesso"});
    // return response.send("Hello world - NLW04");
 });

 app.listen(3333, () => console.log("SERVER IS RUNNING"));