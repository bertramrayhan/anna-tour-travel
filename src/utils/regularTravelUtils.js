import { convertTextToWhatsapp } from '../helper.js';
import { urlFor } from '../sanityClient.js';

export function populateRegularTravels(regularTravels, whatsappTemplate){
    const regularTravelCardsContainer = document.getElementById('regular-travel-cards-container');
    const regularTravelCardTemplate = document.getElementById('regular-travel-card-template');
    const regularTravelCardFeatureTemplate = document.getElementById('card-feature-template');

    regularTravelCardsContainer.innerHTML = '';
    regularTravels.forEach(regularTravel => {
        const regularTravelCardClone = regularTravelCardTemplate.content.cloneNode(true);
        
        //populer badge
        const regularTravelCardImageContainer = regularTravelCardClone.querySelector('.regular-travel-card-image-container');
        if (regularTravel.isPopular) {
            const popularBadge = document.createElement('div');
            popularBadge.className = 'absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-[#181510] shadow-sm';
            popularBadge.textContent = 'Populer';
            regularTravelCardImageContainer.appendChild(popularBadge);
        }

        //image
        const imageUrl = urlFor(regularTravel.mainImage).url();
        const imgElement = regularTravelCardClone.querySelector('.regular-travel-card-image');
        imgElement.src = imageUrl;

        //vehicle name
        regularTravelCardClone.querySelector('.regular-travel-card-vehicle-name').textContent = regularTravel.vehicleName;

        //fitur
        const regularTravelCardFeaturesContainer = regularTravelCardClone.querySelector('.card-features-container');
        regularTravelCardFeaturesContainer.innerHTML = ''

        if (regularTravel.features) {
            regularTravel.features.forEach(feature => {
                const regularTravelCardFeatureClone = regularTravelCardFeatureTemplate.content.cloneNode(true);
                
                regularTravelCardFeatureClone.querySelector('.card-feature-icon').textContent = feature.icon;
                regularTravelCardFeatureClone.querySelector('.card-feature-text').textContent = feature.text;

                regularTravelCardFeaturesContainer.appendChild(regularTravelCardFeatureClone);
            });
        }

        //tombol pesan
        whatsappTemplate = whatsappTemplate.replace('{{NAMA_PRODUK}}', regularTravel.routeName);
        regularTravelCardClone.querySelector('.regular-travel-card-order-btn').href = convertTextToWhatsapp(whatsappTemplate);

        regularTravelCardsContainer.appendChild(regularTravelCardClone);
    });
}
