export function convertTextToWhatsapp(numberTelephone, text){
    const baseLink = 'https://wa.me/';
    
    // Encode text untuk URL (replace spaces dan special characters)
    const encodedText = encodeURIComponent(text);
    
    // Gabungkan base link + nomor telepon + text parameter
    const whatsappLink = `${baseLink}${numberTelephone}?text=${encodedText}`;
    
    return whatsappLink;
}