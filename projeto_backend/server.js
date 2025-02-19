import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectionMysql from "./db/db.js"

dotenv.config()
const app =  express()
const port =  process.env.PORT || 5000

app.use(cors())
app.use(json())


app.get("/listarNome", async (req,res)=>{
    try{
        const [rows] = await connectionMysql.query("SELECT * FROM items")
        res.status(200).json(rows)
    }catch(err){
        console.error('Erro ao atualizar evento:', err);
        res.status(500).json({ error: 'Erro ao listar nomes' });
    }
})

app.post("/cadastraNome", async (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: "O nome é obrigatório" });

    try {
        const [result] = await connectionMysql.query(
            "INSERT INTO items (name) VALUES (?)",
            [nome]
        );
        res.status(201).json({ id: result.insertId, nome });
    } catch (err) {
        console.error("Erro ao cadastrar nome:", err);
        res.status(500).json({ error: "Erro ao cadastrar nome" });
    }
});

app.put("/atualizarNome/:id", async(req,res)=>{
    const {id} = req.params
    const {nome} = req.body
    if (!nome) return res.status(400).json({ error: "O nome é obrigatório" });
    try {
        const [result] = await connectionMysql.query(
            "UPDATE items SET name = ? WHERE id = ?",
            [nome, id]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "ID não encontrado" });

        res.status(200).json({ id, nome });
    } catch (err) {
        console.error("Erro ao atualizar nome:", err);
        res.status(500).json({ error: "Erro ao atualizar o nome" });
    }
})
app.delete("/deletarNome/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await connectionMysql.query(
            "DELETE FROM items WHERE id = ?",
            [id]
        );
        if (result.affectedRows === 0)
            return res.status(404).json({ error: "ID não encontrado" });

        res.status(200).json({ message: "Nome deletado com sucesso" });
    } catch (err) {
        console.error("Erro ao deletar nome:", err);
        res.status(500).json({ error: "Erro ao deletar nome" });
    }
});

app.listen(port,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})