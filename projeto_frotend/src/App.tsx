import { useEffect, useState } from "react";
import { listarNomes, cadastrarNome, atualizarNome, deletarNome, Nome } from "./services/service";

function App() {
  const [nomes, setNomes] = useState<Nome[]>([]);
  const [novoNome, setNovoNome] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nomeEditado, setNomeEditado] = useState("");

  // Carregar nomes ao iniciar
  useEffect(() => {
    carregarNomes();
  }, []);

  const carregarNomes = async () => {
    const data = await listarNomes();
    setNomes(data);
  };

  const handleAdicionar = async () => {
    if (!novoNome.trim()) return;
    await cadastrarNome(novoNome);
    setNovoNome("");
    carregarNomes();
  };

  const handleEditar = (id: number, nome: string) => {
    setEditandoId(id);
    setNomeEditado(nome);
  };

  const handleAtualizar = async () => {
    if (editandoId !== null && nomeEditado.trim()) {
      await atualizarNome(editandoId, nomeEditado);
      setEditandoId(null);
      setNomeEditado("");
      carregarNomes();
    }
  };

  const handleDeletar = async (id: number) => {
    await deletarNome(id);
    carregarNomes();
  };

  return (
    <div>
      <h1>Gerenciamento de Nomes</h1>

      <input
        type="text"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
        placeholder="Digite um nome"
      />
      <button onClick={handleAdicionar}>Adicionar</button>

      <ul>
        {nomes.map((item) => (
          <li key={item.id}>
            {editandoId === item.id ? (
              <>
                <input
                  type="text"
                  value={nomeEditado}
                  onChange={(e) => setNomeEditado(e.target.value)}
                />
                <button onClick={handleAtualizar}>Salvar</button>
              </>
            ) : (
              <>
                {item.name} 
                <button onClick={() => handleEditar(item.id, item.name)}>Editar</button>
                <button onClick={() => handleDeletar(item.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
