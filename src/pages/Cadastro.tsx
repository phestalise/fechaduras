import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Key, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch {
      alert("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Lock className="h-12 w-12 text-blue-700 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900">Criar conta</h1>
          <p className="text-sm text-gray-500">
            Cadastro para acesso ao sistema
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 w-full rounded-xl border border-gray-300 py-2 focus:ring-2 focus:ring-blue-700 outline-none"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">E-mail</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full rounded-xl border border-gray-300 py-2 focus:ring-2 focus:ring-blue-700 outline-none"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <div className="relative mt-1">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full rounded-xl border border-gray-300 py-2 focus:ring-2 focus:ring-blue-700 outline-none"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirmar senha
            </label>
            <div className="relative mt-1">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 w-full rounded-xl border border-gray-300 py-2 focus:ring-2 focus:ring-blue-700 outline-none"
                placeholder="Repita a senha"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-blue-700 font-medium hover:underline"
            >
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
