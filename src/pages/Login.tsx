import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Key } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch {
      alert("E-mail ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <Lock className="h-12 w-12 text-blue-700 mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-900">Entrar</h1>
          <p className="text-sm text-gray-500">
            Acesse sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Sua senha"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Não tem conta?{" "}
            <Link
              to="/cadastro"
              className="text-blue-700 font-medium hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
