export type Produto = {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
  categoria:  | 'hotel';
  estoque: number;
};
