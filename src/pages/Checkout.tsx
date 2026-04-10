import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Plus, Minus, ShieldCheck, Lock, Check } from 'lucide-react'
import type { Produto } from './Home'

interface FormData {
  nome: string
  telefone: string
  email: string
  endereco: string
  complemento: string
  cidade: string
  estado: string
  quantidade: number
  corSelecionada: string
  observacoes: string
}

const UFS = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT',
  'PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO',
]

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()
  const produto = location.state?.produto as Produto | undefined

  const [form, setForm] = useState<FormData>({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    complemento: '',
    cidade: '',
    estado: '',
    quantidade: 1,
    corSelecionada: produto?.cores[0].hex ?? '',
    observacoes: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [enviado, setEnviado] = useState(false)

  /* ── Produto não encontrado ── */
  if (!produto) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-950 px-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-400 mb-3">Nenhum produto selecionado</h2>
          <p className="text-gray-600 mb-8">Escolha um produto na página inicial para continuar.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl transition"
          >
            Ver produtos
          </button>
        </div>
      </div>
    )
  }

  const totalPreco = produto.preco * form.quantidade

  /* ── Handlers ── */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.nome.trim())     e.nome     = 'Campo obrigatório'
    if (!form.telefone.trim()) e.telefone = 'Campo obrigatório'
    if (!form.email.trim())    e.email    = 'Campo obrigatório'
    if (!form.endereco.trim()) e.endereco = 'Campo obrigatório'
    if (!form.cidade.trim())   e.cidade   = 'Campo obrigatório'
    if (!form.estado)          e.estado   = 'Selecione um estado'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleEnviar = () => {
    if (!validate()) return

    const cor = produto.cores.find(c => c.hex === form.corSelecionada)

    const mensagem = `
🔐 *Novo Pedido — Fechaduras Hoteleiras*

*Produto:* ${produto.nome}
*Cor:* ${cor?.nome ?? form.corSelecionada}
*Quantidade:* ${form.quantidade}
*Total:* R$ ${totalPreco.toFixed(2)}

👤 *Cliente*
*Nome:* ${form.nome}
*Telefone:* ${form.telefone}
*E-mail:* ${form.email}

📍 *Endereço de Entrega*
${form.endereco}${form.complemento ? `, ${form.complemento}` : ''}
${form.cidade} — ${form.estado}
${form.observacoes ? `\n📝 *Observações:* ${form.observacoes}` : ''}
    `.trim()

    // ⚠️ Troque pelo número real com DDI + DDD (sem espaços ou símbolos)
    const numero = '5511995778307'
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, '_blank')
    setEnviado(true)
  }

  const ic = (err: boolean) =>
    `w-full bg-gray-800 border ${err ? 'border-red-500' : 'border-gray-700'} ` +
    `text-gray-100 placeholder-gray-600 rounded-xl px-4 py-2.5 text-sm ` +
    `focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition`

  /* ── Tela de sucesso ── */
  if (enviado) {
    return (
      <div className="min-h-[80vh] bg-gray-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-8">
            <Check size={44} className="text-emerald-400" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Pedido enviado!</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Você foi redirecionado ao WhatsApp com todos os detalhes.
            Nossa equipe entrará em contato em breve.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-full transition hover:scale-105"
          >
            Ver mais produtos
          </button>
        </div>
      </div>
    )
  }

  /* ── Formulário principal ── */
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
          <div className="h-4 w-px bg-gray-700" />
          <div>
            <h1 className="text-2xl font-black text-white">Finalizar Pedido</h1>
            <p className="text-gray-500 text-sm">{produto.nome}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Formulário (3 cols) ── */}
          <div className="lg:col-span-3 space-y-6">

            {/* Dados pessoais */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="font-bold text-white text-lg mb-5">Seus dados</h2>
              <div className="space-y-4">

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Nome completo *</label>
                  <input
                    name="nome" value={form.nome} onChange={handleChange}
                    placeholder="João da Silva"
                    className={ic(!!errors.nome)}
                  />
                  {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">WhatsApp *</label>
                    <input
                      name="telefone" value={form.telefone} onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      className={ic(!!errors.telefone)}
                    />
                    {errors.telefone && <p className="text-red-400 text-xs mt-1">{errors.telefone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">E-mail *</label>
                    <input
                      name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="joao@email.com"
                      className={ic(!!errors.email)}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

              </div>
            </div>

            {/* Endereço */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="font-bold text-white text-lg mb-5">Endereço de entrega</h2>
              <div className="space-y-4">

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Endereço *</label>
                  <input
                    name="endereco" value={form.endereco} onChange={handleChange}
                    placeholder="Av. Paulista, 1000"
                    className={ic(!!errors.endereco)}
                  />
                  {errors.endereco && <p className="text-red-400 text-xs mt-1">{errors.endereco}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Complemento</label>
                  <input
                    name="complemento" value={form.complemento} onChange={handleChange}
                    placeholder="Bloco A, Apto 12 (opcional)"
                    className={ic(false)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Cidade *</label>
                    <input
                      name="cidade" value={form.cidade} onChange={handleChange}
                      placeholder="São Paulo"
                      className={ic(!!errors.cidade)}
                    />
                    {errors.cidade && <p className="text-red-400 text-xs mt-1">{errors.cidade}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Estado *</label>
                    <select
                      name="estado" value={form.estado} onChange={handleChange}
                      className={ic(!!errors.estado)}
                    >
                      <option value="">Selecione</option>
                      {UFS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                    {errors.estado && <p className="text-red-400 text-xs mt-1">{errors.estado}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Observações</label>
                  <textarea
                    name="observacoes" value={form.observacoes} onChange={handleChange}
                    rows={3} placeholder="Algum detalhe sobre o pedido? (opcional)"
                    className={ic(false) + ' resize-none'}
                  />
                </div>

              </div>
            </div>

          </div>

          {/* ── Resumo (2 cols) ── */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
              <h2 className="font-bold text-white text-lg mb-5">Resumo do pedido</h2>

              {/* Produto */}
              <div className="flex gap-4 pb-5 mb-5 border-b border-gray-800">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-16 h-16 object-cover rounded-xl border border-gray-700 shrink-0"
                />
                <div>
                  <p className="font-bold text-white text-sm leading-snug">{produto.nome}</p>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-2">{produto.descricao}</p>
                </div>
              </div>

              {/* Cor */}
              {produto.cores.length > 1 && (
                <div className="mb-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Cor</p>
                  <div className="flex gap-2 flex-wrap">
                    {produto.cores.map(cor => (
                      <button
                        key={cor.hex}
                        type="button"
                        onClick={() => setForm(p => ({ ...p, corSelecionada: cor.hex }))}
                        title={cor.nome}
                        className={`w-8 h-8 rounded-full border-2 transition ${
                          form.corSelecionada === cor.hex
                            ? 'border-blue-400 scale-110'
                            : 'border-gray-700 hover:border-gray-500'
                        }`}
                        style={{ backgroundColor: cor.hex }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5">
                    {produto.cores.find(c => c.hex === form.corSelecionada)?.nome}
                  </p>
                </div>
              )}

              {/* Quantidade */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Quantidade</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm(p => ({ ...p, quantidade: Math.max(1, p.quantidade - 1) }))}
                    className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 transition"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xl font-black text-white w-6 text-center">{form.quantidade}</span>
                  <button
                    type="button"
                    onClick={() => setForm(p => ({ ...p, quantidade: p.quantidade + 1 }))}
                    className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-300 transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Totais */}
              <div className="border-t border-gray-800 pt-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>R$ {totalPreco.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Frete</span>
                  <span className="text-emerald-400">A combinar</span>
                </div>
                <div className="flex justify-between text-lg font-black text-white pt-2 border-t border-gray-800">
                  <span>Total</span>
                  <span className="text-blue-400">R$ {totalPreco.toFixed(2)}</span>
                </div>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={handleEnviar}
                className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black py-4 rounded-xl transition text-base"
              >
                <MessageCircle size={20} />
                Enviar pelo WhatsApp
              </button>

              <p className="text-xs text-gray-600 text-center mt-3">
                Abriremos o WhatsApp com todos os detalhes preenchidos
              </p>

              <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
                  Garantia de 12 meses em todos os produtos
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Lock size={13} className="text-blue-600 shrink-0" />
                  Atendimento direto com nossa equipe
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
