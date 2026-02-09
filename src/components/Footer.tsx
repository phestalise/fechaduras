export function Footer() {
return (
<footer className="bg-black text-white border-t border-white/10 mt-24">
<div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
<div>
<h4 className="font-semibold text-lg mb-3">Fechadura Hotel</h4>
<p className="text-gray-400 text-sm">Soluções profissionais em fechaduras eletrônicas para hotelaria e empresas.</p>
</div>


<div>
<h4 className="font-semibold text-lg mb-3">Contato</h4>
<p className="text-gray-400 text-sm">suporte@securelock.com</p>
<p className="text-gray-400 text-sm">(11) 99999-9999</p>
</div>


<div>
<h4 className="font-semibold text-lg mb-3">Institucional</h4>
<ul className="space-y-2 text-gray-400 text-sm">
<li className="hover:text-blue-400 transition cursor-pointer">Política de Privacidade</li>
<li className="hover:text-blue-400 transition cursor-pointer">Termos de Uso</li>
</ul>
</div>
</div>


<div className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
© 2026 Fechadura Hotel. Todos os direitos reservados.
</div>
</footer>
);
}