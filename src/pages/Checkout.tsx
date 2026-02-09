import React, { useState, useRef } from 'react';
import { CreditCard, Smartphone, Barcode, Shield, Lock, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Checkout() {
  const { carrinho, totalPreco, limparCarrinho } = useCart();
  const { user } = useAuth();
  const [formaPagamento, setFormaPagamento] = useState<'cartao' | 'pix' | 'boleto'>('cartao');
  const [parcelas, setParcelas] = useState(1);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);
  const [codigoPedido, setCodigoPedido] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  const codigoGerado = useRef(false);

  const handleFinalizarPedido = () => {
    setLoading(true);
    
    setTimeout(() => {
      if (formaPagamento === 'boleto' && parcelas > 1) {
        const numeroWhatsapp = '5511999999999';
        const mensagem = `Olá! Gostaria de finalizar meu pedido via boleto parcelado. Total: R$ ${totalPreco.toFixed(2)} em ${parcelas}x`;
        window.open(`https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`, '_blank');
        setLoading(false);
      } else {
        if (!codigoPedido && !codigoGerado.current) {
          const novoCodigo = Math.random().toString(36).substr(2, 9).toUpperCase();
          setCodigoPedido(novoCodigo);
          codigoGerado.current = true;
        }
        
        setTimeout(() => {
          setPedidoFinalizado(true);
          limparCarrinho();
          setLoading(false);
        }, 100);
      }
    }, 1500);
  };

  if (pedidoFinalizado) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pedido Confirmado!</h2>
          <p className="text-gray-600 mb-6">
            Seu pedido foi realizado com sucesso. Em breve você receberá a confirmação por e-mail.
          </p>
          {codigoPedido && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <p className="text-green-800 font-medium text-lg">
                Código do pedido: <span className="font-bold">#{codigoPedido}</span>
              </p>
              <p className="text-green-700 text-sm mt-2">
                Guarde este código para consultar seu pedido
              </p>
            </div>
          )}
          <div className="space-y-3">
            <a
              href="/"
              className="block w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-medium py-3 px-4 rounded-lg"
            >
              Voltar para a loja
            </a>
            <a
              href="/produtos"
              className="block w-full border border-[#1e40af] text-[#1e40af] hover:bg-blue-50 font-medium py-3 px-4 rounded-lg"
            >
              Continuar comprando
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (carrinho.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Carrinho vazio</h2>
          <p className="text-gray-600 mb-8">Adicione produtos ao carrinho antes de finalizar a compra.</p>
          <a
            href="/produtos"
            className="inline-block bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-medium py-3 px-6 rounded-lg"
          >
            Ver produtos
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Lock className="h-5 w-5 text-[#1e40af]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informações do Cliente</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Forma de Pagamento</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setFormaPagamento('cartao')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center ${
                    formaPagamento === 'cartao'
                      ? 'border-[#1e40af] bg-blue-50 text-[#1e40af]'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span>Cartão</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormaPagamento('pix')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center ${
                    formaPagamento === 'pix'
                      ? 'border-[#1e40af] bg-blue-50 text-[#1e40af]'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Smartphone className="h-6 w-6 mb-2" />
                  <span>PIX</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormaPagamento('boleto')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center ${
                    formaPagamento === 'boleto'
                      ? 'border-[#1e40af] bg-blue-50 text-[#1e40af]'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Barcode className="h-6 w-6 mb-2" />
                  <span>Boleto</span>
                </button>
              </div>

              {formaPagamento === 'cartao' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número do cartão <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validade <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome no cartão <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Como está no cartão"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parcelamento
                    </label>
                    <select
                      value={parcelas}
                      onChange={(e) => setParcelas(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                        <option key={num} value={num}>
                          {num}x de R$ {(totalPreco / num).toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {formaPagamento === 'pix' && (
                <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Smartphone className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Pagamento Instantâneo</h3>
                  <p className="text-gray-700 mb-4">
                    Após confirmar o pedido, você receberá um QR Code para pagamento via PIX.
                    O pedido será confirmado automaticamente após o pagamento.
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-gray-300 inline-block">
                    <div className="w-48 h-48 bg-gray-100 rounded flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-white mx-auto mb-2 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <span className="text-gray-400 text-sm">QR Code</span>
                        </div>
                        <p className="text-xs text-gray-500">Escaneie com seu app de pagamentos</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {formaPagamento === 'boleto' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parcelamento
                    </label>
                    <select
                      value={parcelas}
                      onChange={(e) => setParcelas(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>
                          {num}x {num > 1 ? `(acréscimo de ${((num - 1) * 2.5).toFixed(1)}%)` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {parcelas > 1 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <MessageCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-yellow-800 font-medium mb-1">
                            Para boleto parcelado, finalize seu pedido via WhatsApp
                          </p>
                          <p className="text-yellow-700 text-sm">
                            Nossa equipe entrará em contato para enviar os boletos e finalizar o pedido.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      <span className="font-medium">Prazo de entrega:</span> O boleto pode levar até 2 dias úteis para compensar. 
                      A entrega será agendada após a confirmação do pagamento.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {carrinho.map((item) => (
                  <div key={`${item.produto.id}-${item.corSelecionada}`} className="flex justify-between items-start py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{item.produto.nome}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantidade}x {item.corSelecionada && `• Cor: ${item.corSelecionada}`}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900">R$ {(item.produto.preco * item.quantidade).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">R$ {totalPreco.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-medium text-green-600">Grátis</span>
                </div>
                {formaPagamento === 'boleto' && parcelas > 1 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Juros ({parcelas}x)</span>
                    <span className="font-medium">R$ {((totalPreco * 0.025 * (parcelas - 1)).toFixed(2))}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#1e40af]">
                      R$ {formaPagamento === 'boleto' && parcelas > 1 
                        ? (totalPreco + (totalPreco * 0.025 * (parcelas - 1))).toFixed(2)
                        : totalPreco.toFixed(2)
                      }
                    </span>
                  </div>
                  {formaPagamento === 'cartao' && parcelas > 1 && (
                    <p className="text-sm text-gray-500 text-right mt-1">
                      em {parcelas}x de R$ {(totalPreco / parcelas).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Lock className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Pagamento 100% seguro - SSL criptografado</span>
                </div>
                
                <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Shield className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Garantia de 12 meses em todos os produtos</span>
                </div>
                
                <button
                  type="button"
                  onClick={handleFinalizarPedido}
                  disabled={loading}
                  className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processando...
                    </>
                  ) : formaPagamento === 'boleto' && parcelas > 1 ? (
                    <>
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Finalizar via WhatsApp
                    </>
                  ) : (
                    'Confirmar Pedido'
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Ao finalizar o pedido, você concorda com nossos 
                  <a href="#" className="text-[#1e40af] hover:text-[#1e3a8a] ml-1">Termos de Serviço</a> e 
                  <a href="#" className="text-[#1e40af] hover:text-[#1e3a8a] ml-1">Política de Privacidade</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}