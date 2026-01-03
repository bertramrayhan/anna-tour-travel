import { nomorTelp } from "./main.js";

export function convertTextToWhatsapp(text){
    const baseLink = 'https://wa.me/';
    
    // Encode text untuk URL (replace spaces dan special characters)
    const encodedText = encodeURIComponent(text);
    
    // Gabungkan base link + nomor telepon + text parameter
    let whatsappLink = `${baseLink}${nomorTelp}`;

    if (text !== ''){
        whatsappLink += `?text=${encodedText}`;
    }
    
    return whatsappLink;
}