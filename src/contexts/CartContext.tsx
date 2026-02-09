// contexts/CartContext.tsx
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  cores: string[];
  imagem: string;
  categoria: | 'hotel';
  estoque: number;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
  corSelecionada?: string;
}

interface CartContextType {
  carrinho: ItemCarrinho[];
  adicionarAoCarrinho: (produto: Produto, quantidade: number, cor?: string) => void;
  removerDoCarrinho: (produtoId: string) => void;
  atualizarQuantidade: (produtoId: string, quantidade: number) => void;
  limparCarrinho: () => void;
  totalItens: number;
  totalPreco: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  const adicionarAoCarrinho = (produto: Produto, quantidade: number, cor?: string) => {
    setCarrinho(prev => {
      const itemExistente = prev.find(item => 
        item.produto.id === produto.id && item.corSelecionada === cor
      );
      
      if (itemExistente) {
        return prev.map(item =>
          item.produto.id === produto.id && item.corSelecionada === cor
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      } else {
        return [...prev, { produto, quantidade, corSelecionada: cor }];
      }
    });
  };

  const removerDoCarrinho = (produtoId: string) => {
    setCarrinho(prev => prev.filter(item => item.produto.id !== produtoId));
  };

  const atualizarQuantidade = (produtoId: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }
    
    setCarrinho(prev =>
      prev.map(item =>
        item.produto.id === produtoId
          ? { ...item, quantidade }
          : item
      )
    );
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
  const totalPreco = carrinho.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);

  return (
    <CartContext.Provider value={{
      carrinho,
      adicionarAoCarrinho,
      removerDoCarrinho,
      atualizarQuantidade,
      limparCarrinho,
      totalItens,
      totalPreco,
    }}>
      {children}
    </CartContext.Provider>
  );
};