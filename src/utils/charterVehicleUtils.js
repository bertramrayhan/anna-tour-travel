import { convertTextToWhatsapp } from '../helper.js';
import { urlFor } from '../sanityClient.js';

export function populateCharters(charters, whatsappTemplate){
    const charterCardsContainer = document.getElementById('charter-cards-container');
    const charterCardTemplate = document.getElementById('charter-card-template');
    const charterCardFeatureTemplate = document.getElementById('charter-card-feature-template');

    charterCardsContainer.innerHTML = '';
    charters.forEach(charter => {
        const charterCardClone = charterCardTemplate.content.cloneNode(true);
        
        //populer badge
        const charterCardImageContainer = charterCardClone.querySelector('.charter-card-image-container');
        if (charter.isPopular) {
            const popularBadge = document.createElement('div');
            popularBadge.className = 'absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-[#181510] shadow-sm';
            popularBadge.textContent = 'Populer';
            charterCardImageContainer.appendChild(popularBadge);
        }

        //image
        const imageUrl = urlFor(charter.mainImage).url();
        const imgElement = charterCardClone.querySelector('.charter-card-image');
        imgElement.src = imageUrl;

        //vehicle name
        charterCardClone.querySelector('.charter-card-vehicle-name').textContent = charter.vehicleName;

        //fitur
        const charterCardFeaturesContainer = charterCardClone.querySelector('.charter-card-features-container');
        charterCardFeaturesContainer.innerHTML = ''

        if (charter.features) {
            charter.features.forEach(feature => {
                const charterCardFeatureClone = charterCardFeatureTemplate.content.cloneNode(true);
                
                charterCardFeatureClone.querySelector('.charter-card-feature-icon').textContent = feature.icon;
                charterCardFeatureClone.querySelector('.charter-card-feature-text').textContent = feature.text;

                charterCardFeaturesContainer.appendChild(charterCardFeatureClone);
            });
        }

        //tombol pesan
        whatsappTemplate = whatsappTemplate.replace('{{NAMA_PRODUK}}', charter.vehicleName);
        charterCardClone.querySelector('.charter-card-order-btn').href = convertTextToWhatsapp(whatsappTemplate);

        charterCardsContainer.appendChild(charterCardClone);
    });
}
