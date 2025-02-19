import api from "./api";

export interface Nome {
  id: number;
  name: string;
}

export const listarNomes = async (): Promise<Nome[]> => {
  const response = await api.get<Nome[]>("/listarNome");
  return response.data;
};


export const cadastrarNome = async (nome: string): Promise<Nome> => {
  const response = await api.post<Nome>("/cadastraNome", { nome });
  return response.data;
};

export const atualizarNome = async (id: number, nome: string): Promise<Nome> => {
  const response = await api.put<Nome>(`/atualizarNome/${id}`, { nome });
  return response.data;
};

export const deletarNome = async (id: number): Promise<void> => {
  await api.delete(`/deletarNome/${id}`);
};
