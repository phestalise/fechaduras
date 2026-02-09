import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Zap, Building2 } from "lucide-react";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-12 bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-200 relative overflow-hidden">

      {/* Glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-700 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-indigo-600 opacity-10 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* HERO */}
      <div className="max-w-4xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
          Segurança inteligente  
          <span className="block text-[#1e40af] mt-2">
           para seu hotel
          </span>
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed mb-10 text-gray-300 font-medium">
          Fechaduras eletrônicas de alta performance, design moderno e controle total na palma da sua mão.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
          <Link
            to="/produtos"
            className="px-10 py-4 bg-[#1e40af] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[#1e3a8a] hover:scale-105 transition"
          >
            Ver produtos
          </Link>

          <Link
            to="/cadastro"
            className="px-10 py-4 border-2 border-[#1e40af] text-gray-200 rounded-full font-semibold text-lg hover:bg-[#1e40af]/20 hover:scale-105 transition"
          >
            Criar conta
          </Link>
        </div>

        <p className="text-sm uppercase tracking-widest font-semibold text-gray-400">
          Tecnologia • Segurança • Confiabilidade
        </p>
      </div>

      {/* BENEFÍCIOS */}
      <div className="mt-24 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6">
          <ShieldCheck className="h-10 w-10 text-[#1e40af] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Alta Segurança</h3>
          <p className="text-gray-400">
            Criptografia avançada e múltiplos métodose métodos de acesso.
          </p>
        </div>

        <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6">
          <Zap className="h-10 w-10 text-[#1e40af] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Tecnologia Smart</h3>
          <p className="text-gray-400">
            Controle via aplicativo e integração com smart home.
          </p>
        </div>

        <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6">
          <Lock className="h-10 w-10 text-[#1e40af] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Design Premium</h3>
          <p className="text-gray-400">
            Acabamento moderno para ambientes sofisticados.
          </p>
        </div>

        <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-6">
          <Building2 className="h-10 w-10 text-[#1e40af] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Residencial & Hotel</h3>
          <p className="text-gray-400">
            Soluções profissionais para casas e empreendimentos.
          </p>
        </div>
      </div>

      {/* BLOCO HOTEL */}
      <div className="mt-24 max-w-4xl text-center bg-gray-900/60 border border-gray-700 rounded-3xl p-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
          Soluções para Hotéis e Condomínios
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Controle centralizado, relatórios de acesso e segurança profissional
          para grandes operações.
        </p>

        <Link
          to="/produtos"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#1e40af] text-white rounded-full font-semibold text-lg hover:bg-[#1e3a8a] transition"
        >
          <Lock size={20} />
          Solicitar orçamento
        </Link>
      </div>
    </section>
  );
}
