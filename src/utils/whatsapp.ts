// Substitua pelo seu número em formato internacional sem +, ex: 5511999999999
export const WHATSAPP_NUMBER = '5541999999999'


export function makeWhatsAppUrl(message: string) {
const text = encodeURIComponent(message)
return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}