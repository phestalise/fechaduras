import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Lock, Zap, Building2, ChevronDown, Star } from 'lucide-react'

import imgSecurityPlus from '../img/fechadura1.png'
import imgAccessPro from '../img/fechadura2.png'
import imgSmartLockX from '../img/economizador.png'
import imgBiometric from '../img/estrutura-metalica.avif'
import imgMaster from '../img/camera.jpg'

export interface Produto {
  id: string
  nome: string
  descricao: string
  preco: number
  cores: { hex: string; nome: string }[]
  imagem: string
  badge?: string
  estrelas: number
  avaliacoes: number
  destaque?: boolean
}

export const PRODUTOS: Produto[] = [
  {
    id: '1',
    nome: 'Fechadura Digital Pro',
    descricao: 'Controle de acesso seguro com tecnologia moderna.',
    preco: 1299.9,
    cores: [{ hex: '#111827', nome: 'Preto' }],
    imagem: imgSecurityPlus,
    estrelas: 4.8,
    avaliacoes: 124,
  },
  {
    id: '2',
    nome: 'Fechadura Inteligente Access',
    descricao: 'Gestão de acesso em tempo real.',
    preco: 1599.9,
    cores: [{ hex: '#111827', nome: 'Preto' }],
    imagem: imgAccessPro,
    badge: 'Mais Vendido',
    estrelas: 4.9,
    avaliacoes: 218,
    destaque: true,
  },
  {
    id: '3',
    nome: 'Economizador de Energia Smart',
    descricao: 'Redução automática de consumo.',
    preco: 499.9,
    cores: [{ hex: '#1f2937', nome: 'Grafite' }],
    imagem: imgSmartLockX,
    estrelas: 4.7,
    avaliacoes: 89,
  },
  {
    id: '4',
    nome: 'Estrutura Metálica Industrial',
    descricao: 'Alta resistência para instalações.',
    preco: 2299.9,
    cores: [{ hex: '#6B7280', nome: 'Cinza' }],
    imagem: imgBiometric,
    estrelas: 5.0,
    avaliacoes: 42,
  },
  {
    id: '5',
    nome: 'Câmera de Segurança HD',
    descricao: 'Monitoramento inteligente.',
    preco: 899.9,
    cores: [{ hex: '#111827', nome: 'Preto' }],
    imagem: imgMaster,
    estrelas: 4.9,
    avaliacoes: 67,
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')

  const produtosFiltrados = busca.trim()
    ? PRODUTOS.filter(p =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.descricao.toLowerCase().includes(busca.toLowerCase())
      )
    : PRODUTOS

  const primeiros = produtosFiltrados.slice(0, 3)
  const ultimos = produtosFiltrados.slice(3)

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">

      <section className="text-center py-20 px-6">
        <h1 className="text-6xl font-black mb-6">
          Tecnologia para
          <span className="block text-blue-400">seu negócio</span>
        </h1>

        <p className="text-gray-400 mb-10">
          Segurança, energia, monitoramento e estrutura em um só lugar.
        </p>

        <button
          onClick={() => document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-blue-600 px-8 py-3 rounded-full"
        >
          Ver produtos
        </button>

        <ChevronDown className="mx-auto mt-10 text-gray-600 animate-bounce" />
      </section>

      <section className="py-20 px-6 bg-gray-900/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: ShieldCheck, title: 'Segurança' },
            { icon: Zap, title: 'Eficiência' },
            { icon: Lock, title: 'Controle' },
            { icon: Building2, title: 'Infraestrutura' },
          ].map(({ icon: Icon, title }) => (
            <div key={title} className="text-center">
              <Icon className="mx-auto text-blue-400 mb-2" />
              <p>{title}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="produtos" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">

          <input
            placeholder="Buscar..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="mb-10 w-full max-w-md mx-auto block bg-gray-900 border border-gray-700 px-4 py-2 rounded-full"
          />

          {/* PRIMEIROS 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {primeiros.map(produto => (
              <div key={produto.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">

                <div className="h-52 flex items-center justify-center bg-white">
                  <img src={produto.imagem} className="max-h-[85%] object-contain" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < 4 ? 'text-yellow-400' : 'text-gray-600'} />
                    ))}
                    <span className="text-xs text-gray-500">({produto.avaliacoes})</span>
                  </div>

                  <h3 className="font-bold text-lg mb-2">{produto.nome}</h3>
                  <p className="text-gray-400 text-sm mb-4">{produto.descricao}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-bold">R$ {produto.preco.toFixed(2)}</span>
                    <button
                      onClick={() => navigate('/checkout', { state: { produto } })}
                      className="bg-blue-600 px-4 py-2 rounded"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ÚLTIMOS 2 CENTRALIZADOS */}
          <div className="flex justify-center gap-6 flex-wrap">
            {ultimos.map(produto => (
              <div key={produto.id} className="w-full max-w-sm bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">

                <div className="h-52 bg-gray-800">
                  <img src={produto.imagem} className="w-full h-full object-cover" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < 4 ? 'text-yellow-400' : 'text-gray-600'} />
                    ))}
                    <span className="text-xs text-gray-500">({produto.avaliacoes})</span>
                  </div>

                  <h3 className="font-bold text-lg mb-2">{produto.nome}</h3>
                  <p className="text-gray-400 text-sm mb-4">{produto.descricao}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-bold">R$ {produto.preco.toFixed(2)}</span>
                    <button
                      onClick={() => navigate('/checkout', { state: { produto } })}
                      className="bg-blue-600 px-4 py-2 rounded"
                    >
                      Comprar
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}