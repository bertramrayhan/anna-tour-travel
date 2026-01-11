import { convertTextToWhatsapp } from "../helper.js";
import { urlFor } from '../sanityClient.js';

export function populateHalamanUtama(halamanUtamaContent){
    const contactBtn = document.getElementById('contact-btn');
    const mobileContactBtn = document.getElementById('mobile-contact-btn');
    const whatsappLink = convertTextToWhatsapp('');
    
    contactBtn.href = whatsappLink;
    if (mobileContactBtn) {
        mobileContactBtn.href = whatsappLink;
    }

    populateFooter(halamanUtamaContent);
    populateHero(halamanUtamaContent);
    populateWhyUs(halamanUtamaContent);
}

function populateHero(halamanUtamaContent){
    const heroBackgroundImage = document.getElementById('hero-background-image');
    const heroContainer = document.getElementById('hero-container');
    const imageUrl = urlFor(halamanUtamaContent['hero_backgroundImage']).url();

    // Buat image object untuk mendapatkan dimensi asli
    const img = new Image();
    img.onload = function() {
        const aspectRatio = img.width / img.height;
        
        // Set container height berdasarkan viewport width dan aspect ratio gambar
        const viewportWidth = window.innerWidth;
        let containerWidth = Math.min(viewportWidth, 1280); // Max width 1280px (max-w-7xl)
        
        // Responsive width calculation
        if (viewportWidth >= 1024) { // lg breakpoint
            containerWidth = viewportWidth * 0.9; // 90% viewport width
        } else if (viewportWidth >= 768) { // md breakpoint  
            containerWidth = viewportWidth * 0.95; // 95% viewport width
        } else {
            containerWidth = viewportWidth; // Full width on mobile
        }
        
        const calculatedHeight = containerWidth / aspectRatio;
        
        // Set minimum height untuk memastikan konten tetap terbaca
        const minHeight = Math.max(calculatedHeight, 400);
        
        heroContainer.style.height = `${minHeight}px`;
        
        console.log(`Image dimensions: ${img.width}x${img.height}, Aspect ratio: ${aspectRatio.toFixed(2)}, Container: ${containerWidth}x${minHeight}`);
    };
    
    img.src = imageUrl;
    heroBackgroundImage.src = imageUrl;

    // Resize listener untuk responsive
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            img.onload(); // Trigger recalculation
        }, 300);
    });

    document.getElementById('hero-headline').textContent = halamanUtamaContent['hero_headline'];
    document.getElementById('hero-subheadline').textContent = halamanUtamaContent['hero_subheadline'];
}

function populateWhyUs(halamanUtamaContent){
    const poinKeunggulanContainer = document.getElementById('poin-keunggulan-container');
    const poinKeunggulanTemplate = document.getElementById('poin-keunggulan-template');
    
    poinKeunggulanContainer.innerHTML = '';

    halamanUtamaContent['whyUs_keunggulan'].forEach(poinKeunggulan => {
        const poinKeunggulanClone = poinKeunggulanTemplate.content.cloneNode(true);

        poinKeunggulanClone.querySelector('.poin-keunggulan-icon').textContent = poinKeunggulan['icon'] 
        poinKeunggulanClone.querySelector('.poin-keunggulan-title').textContent = poinKeunggulan['title'] 
        const descriptionEl = poinKeunggulanClone.querySelector('.poin-keunggulan-description');

        // 👉 kalau description kosong / null / undefined
        if (!poinKeunggulan.description || poinKeunggulan.description.trim() === '') {
            descriptionEl.remove();
        } else {
            descriptionEl.textContent = poinKeunggulan.description;
        }

        poinKeunggulanContainer.appendChild(poinKeunggulanClone);
    });
}

function populateFooter(halamanUtamaContent){
    const nomorTelp = halamanUtamaContent['nomor_telepon'];

    //nomor telepon
    const nomorTelpContainer = document.getElementById('nomor-telepon-container');
    const individualNomorTelpContainer = document.createElement('div');
    individualNomorTelpContainer.textContent = `+${nomorTelp}`;
    nomorTelpContainer.appendChild(individualNomorTelpContainer)

    // Populate alamat kantor (pusat + cabang)
    const alamatContainer = document.getElementById('alamat-container');
    if (alamatContainer) {
        alamatContainer.innerHTML = ''; // Clear existing content
        
        // Alamat Pusat (wajib ada)
        const alamatPusat = halamanUtamaContent['kontak_alamatPusat'];
        if (alamatPusat) {
            const alamatPusatDiv = document.createElement('div');
            alamatPusatDiv.innerHTML = `
                <div class="font-semibold text-white mb-1">Kantor Pusat</div>
                <span>${alamatPusat}</span>
            `;
            alamatContainer.appendChild(alamatPusatDiv);
        }
        
        // Alamat Cabang (opsional, array)
        const alamatCabangArray = halamanUtamaContent['kontak_alamatCabang'];
        if (alamatCabangArray && Array.isArray(alamatCabangArray) && alamatCabangArray.length > 0) {
            alamatCabangArray.forEach((alamatCabang, index) => {
                const alamatCabangDiv = document.createElement('div');
                alamatCabangDiv.innerHTML = `
                    <br/>
                    <div class="font-semibold text-white mb-1">Kantor Cabang ${index + 1}</div>
                    <span>${alamatCabang}</span>
                `;
                alamatContainer.appendChild(alamatCabangDiv);
            });
        }
    }

    //alamat email
    document.getElementById('alamat-email').textContent = halamanUtamaContent['kontak_email']

    //medsos
    const socialLinks = halamanUtamaContent['kontak_socialLinks'];
    if (socialLinks && Array.isArray(socialLinks)) {
        // Facebook
        const facebookLink = socialLinks.find(link => link.platform === 'Facebook');
        if (facebookLink) {
            const facebookElement = document.getElementById('facebook');
            if (facebookElement) {
                facebookElement.href = facebookLink.url;
            }
        }

        // Instagram
        const instagramLink = socialLinks.find(link => link.platform === 'Instagram');
        if (instagramLink) {
            const instagramElement = document.getElementById('instagram');
            if (instagramElement) {
                instagramElement.href = instagramLink.url;
            }
        }

        // YouTube
        const youtubeLink = socialLinks.find(link => link.platform === 'YouTube');
        if (youtubeLink) {
            const youtubeElement = document.getElementById('youtube');
            if (youtubeElement) {
                youtubeElement.href = youtubeLink.url;
            }
        }
    }
}