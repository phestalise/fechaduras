import { ShoppingCart } from 'lucide-react'
import type { Produto } from '../contexts/CartContext'

type ProductProps = {
  produto: Produto
}

export default function ProdutoCard({ produto }: ProductProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition overflow-hidden">
      
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="w-full h-48 object-cover"
      />

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {produto.nome}
          </h3>
          <p className="text-sm text-gray-600">
            {produto.descricao}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-[#1e40af]">
            R$ {produto.preco.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">
            Estoque: {produto.estoque}
          </span>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-semibold py-3 rounded-xl">
          <ShoppingCart size={18} />
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}
