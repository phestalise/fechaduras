import { useState } from 'react'
import { Search } from 'lucide-react'
import ProdutoCard from '../components/ProdutoCard'
import type { Produto } from '../contexts/CartContext'

import imgSecurityPlus from '../img/fechadura1.jfif'
import imgAccessPro from '../img/fechadura2.jfif'
import imgSmartLockX from '../img/economizador.jfif'

const produtos: Produto[] = [
  {
    id: '1',
    nome: 'Hotel Security Plus',
    descricao: 'Sistema profissional para hotéis com controle centralizado',
    preco: 1299.9,
    cores: ['#000000', '#FFFFFF'],
    imagem: imgSecurityPlus,
    categoria: 'hotel',
    estoque: 20,
  },
  {
    id: '2',
    nome: 'Hotel Access Pro',
    descricao: 'Fechadura inteligente com relatórios e gestão de acessos',
    preco: 1599.9,
    cores: ['#000000'],
    imagem: imgAccessPro,
    categoria: 'hotel',
    estoque: 15,
  },
  {
    id: '3',
    nome: 'Hotel Smart Lock X',
    descricao: 'Alta durabilidade, ideal para grandes redes hoteleiras',
    preco: 1899.9,
    cores: ['#1f2937', '#FFFFFF'],
    imagem: imgSmartLockX,
    categoria: 'hotel',
    estoque: 10,
  },
]

export default function Produtos() {
  const [busca, setBusca] = useState('')

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Soluções para Hotéis
          </h1>
          <p className="text-gray-600 text-lg">
            Fechaduras eletrônicas profissionais para gestão hoteleira
          </p>
        </div>

        {/* BUSCA */}
        <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar fechaduras para hotel..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e40af]"
            />
          </div>
        </div>

        {/* LISTA DE PRODUTOS */}
        {produtosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtosFiltrados.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Nenhum produto encontrado.
            </p>
          </div>
        )}

        {/* BLOCO INSTITUCIONAL */}
        <div className="mt-16 p-8 bg-blue-50 rounded-2xl border border-blue-200">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">
            Atendimento Especializado para Hotéis
          </h3>
          <p className="text-blue-800 text-lg">
            Trabalhamos com projetos sob medida para hotéis e condomínios.
            Inclui instalação, treinamento da equipe e suporte técnico contínuo.
          </p>
        </div>

      </div>
    </div>
  )
}
