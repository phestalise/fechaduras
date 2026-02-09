export type Color = 'preto' | 'branco' | 'azul'


export type Product = {
id: string
name: string
price: number
colors: Color[]
image?: string
isHotel?: boolean
}


export const products: Product[] = [
{
id: 'p1',
name: 'Fechadura Inteligente Residencial',
price: 499.9,
colors: ['preto', 'branco', 'azul'],
},
{
id: 'p2',
name: 'Fechadura Inteligente Comercial',
price: 649.9,
colors: ['preto', 'branco', 'azul'],
},
{
id: 'hotel-1',
name: 'Fechadura Eletrônica para Hotéis',
price: 999.0,
colors: ['preto', 'branco'],
isHotel: true,
},
]