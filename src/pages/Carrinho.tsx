import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Carrinho() {
  const { carrinho, removerDoCarrinho, atualizarQuantidade, totalPreco, totalItens } = useCart();

  if (carrinho.length === 0) {
    return (
      <div className="py-20 text-center">
        <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-600 mb-8">Adicione produtos para continuar</p>
        <Link
          to="/produtos"
          className="inline-flex items-center bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-bold py-3 px-6 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Meu Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {carrinho.map((item) => (
                <div key={`${item.produto.id}-${item.corSelecionada}`} className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.produto.nome}
                          </h3>
                          {item.corSelecionada && (
                            <div className="flex items-center mt-2">
                              <span className="text-sm text-gray-600 mr-2">Cor:</span>
                              <div
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: item.corSelecionada }}
                              />
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#1e40af]">
                            R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            R$ {item.produto.preco.toFixed(2)} cada
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => atualizarQuantidade(item.produto.id, item.quantidade - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="mx-3 font-medium">{item.quantidade}</span>
                          <button
                            onClick={() => atualizarQuantidade(item.produto.id, item.quantidade + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removerDoCarrinho(item.produto.id)}
                          className="text-red-600 hover:text-red-700 flex items-center"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R$ {totalPreco.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-medium">R$ 0.00</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#1e40af]">R$ {totalPreco.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-sm text-gray-500 mb-4">
                  {totalItens} {totalItens === 1 ? 'item' : 'itens'} no carrinho
                </p>
                
                <Link
                  to="/checkout"
                  className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-bold py-3 px-4 rounded-lg text-center block"
                >
                  Finalizar Compra
                </Link>
                
                <Link
                  to="/produtos"
                  className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg text-center block"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}