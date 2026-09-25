import { CurrencyConfig, Product, CartItem } from '../types';
import { BRAND_WHATSAPP_NUMBER } from '../data/jewelryData';

export function formatPrice(amountInUSD: number, currency: CurrencyConfig): string {
  const converted = amountInUSD * currency.rate;
  if (currency.code === 'EUR') {
    return `${Math.round(converted)} ${currency.symbol}`;
  }
  return `${currency.symbol}${Math.round(converted)}`;
}

export function createWhatsAppInquiryLink(
  type: 'general' | 'product' | 'cart' | 'appointment',
  details?: {
    product?: Product;
    metal?: string;
    size?: string;
    cartItems?: CartItem[];
    currency?: CurrencyConfig;
    subtotal?: number;
    customMessage?: string;
  }
): string {
  let text = '';

  if (type === 'product' && details?.product) {
    text = `Bonjour Amandine Atelier! ✨\n\nI am captivated by the *${details.product.name}* ($${details.product.price} USD) from the ${details.product.collection} collection.\n`;
    if (details.metal) text += `• Selected Metal: ${details.metal}\n`;
    if (details.size) text += `• Size: ${details.size}\n`;
    text += `\nCould you please provide availability and assistance with ordering this piece? Merci!`;
  } else if (type === 'cart' && details?.cartItems && details.cartItems.length > 0) {
    const symbol = details.currency?.symbol || '$';
    text = `Bonjour Amandine Atelier! ✨\n\nI would love to place a direct bespoke order through your WhatsApp Concierge:\n\n`;
    details.cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}* (Qty: ${item.quantity})\n   Material: ${item.selectedMetal} | Size: ${item.selectedSize}\n   Price: ${symbol}${item.product.price * (details.currency?.rate || 1)}\n`;
    });
    if (details.subtotal) {
      text += `\nEstimated Total: ${symbol}${Math.round(details.subtotal)}\n`;
    }
    text += `\nPlease confirm availability and payment instructions. Merci beaucoup!`;
  } else if (type === 'appointment') {
    text = `Bonjour Amandine Concierge! 🕊️\n\nI would like to schedule a private styling session / virtual viewing for custom heirloom jewelry pieces. My preferred timeframe is this upcoming week. Could you share your availability? Merci!`;
  } else {
    text = `Bonjour Amandine Atelier! 🕊️\n\nI'm exploring your jewellery collection and would love personal guidance on sizing, materials, or bespoke custom creations. Merci!`;
  }

  return `https://wa.me/${BRAND_WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(text)}`;
}
