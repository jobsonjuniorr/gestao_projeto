import msyql from "mysql2"

const connectionMysql =  msyql.createConnection({
    host:'localhost',
    user: 'root',
    password:'admin',
    database:'crud_db',
}).promise();

connectionMysql.connect((err)=>{
    if(err){
        console.error("Erro ao connectar ao banco de dados")
        return
    }else{
        console.log("Conectado ao banco")
    }
})

export default connectionMysql