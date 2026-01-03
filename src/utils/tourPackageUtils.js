import { convertTextToWhatsapp } from '../helper.js';
import { urlFor } from '../sanityClient.js';

export function populateTourPackages(tourPackages, whatsappTemplate){
    const tourPackageCardsContainer = document.getElementById('tour-package-cards-container');
    const tourPackageCardTemplate = document.getElementById('tour-package-card-template');

    tourPackageCardsContainer.innerHTML = '';
    tourPackages.forEach(tourPackage => {
        const tourPackageCardClone = tourPackageCardTemplate.content.cloneNode(true);
        
        //populer badge
        const tourPackageCardImageContainer = tourPackageCardClone.querySelector('.tour-package-card-image-container');
        if (tourPackage.isPopular) {
            const popularBadge = document.createElement('div');
            popularBadge.className = 'absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-[#181510] shadow-sm';
            popularBadge.textContent = 'Populer';
            tourPackageCardImageContainer.appendChild(popularBadge);
        }

        //image
        const imageUrl = urlFor(tourPackage.mainImage).url();
        tourPackageCardClone.querySelector('.tour-package-card-image').src = imageUrl;

        //title
        tourPackageCardClone.querySelector('.tour-package-card-title').textContent = tourPackage.title;

        //tipe trip
        const tripTypeString = tourPackage.tripType;

        const tripTypeParts = tripTypeString.split('@');

        const tripTypeText = tripTypeParts[0];
        const tripTypeIconName = tripTypeParts[1];

        tourPackageCardClone.querySelector('.tour-package-card-trip-type-icon').textContent = tripTypeIconName;
        tourPackageCardClone.querySelector('.tour-package-card-trip-type-text').textContent = tripTypeText;
        
        //info akomodasi
        const accommodationInfoString = tourPackage.accommodationInfo;

        const accommodationInfoParts = accommodationInfoString.split('@');

        const accommodationInfoText = accommodationInfoParts[0];
        const accommodationInfoIconName = accommodationInfoParts[1];

        tourPackageCardClone.querySelector('.tour-package-card-accommodation-info-icon').textContent = accommodationInfoIconName;
        tourPackageCardClone.querySelector('.tour-package-card-accommodation-info-text').textContent = accommodationInfoText;

        //tombol pesan
        whatsappTemplate = whatsappTemplate.replace('{{NAMA_PRODUK}}', tourPackage.title);
        tourPackageCardClone.querySelector('.tour-package-card-order-btn').href = convertTextToWhatsapp(whatsappTemplate);

        tourPackageCardsContainer.appendChild(tourPackageCardClone);
    });
}