import { client } from './sanityClient.js';
import { populateCharters } from './utils/charterVehicleUtils.js';
import { populateHalamanUtama } from "./utils/halamanUtamaUtils.js";
import { populateTourPackages } from './utils/tourPackageUtils.js';

// const hamburgerButton = document.getElementById('hamburger-button');
// const mobileMenu = document.getElementById('mobile-menu');
// const menuIcon = document.getElementById('menu-icon');
// const menuOverlay = document.getElementById('menu-overlay');
// const closeMenuButton = document.getElementById('close-menu-button');
// const menuLinks = mobileMenu.querySelectorAll('a');

// function openMenu(){
// 	mobileMenu.classList.remove('translate-x-full');
// 	menuOverlay.classList.remove('hidden');
// 	document.body.style.overflow = 'hidden';
// }

// function closeMenu(){
// 	mobileMenu.classList.add('translate-x-full');
// 	menuOverlay.classList.add('hidden');
// 	document.body.style.overflow = ''; // Mengizinkan scroll kembali
// }

export let nomorTelp = null; 

async function getHalamanUtama() {
  const query = `*[_type == "halamanUtama"][0]`;

  const content = await client.fetch(query);
  return content;
}

async function getTourPackages() {
  const query = `*[_type == "tourPackage"] | order(isPopular desc, _createdAt desc)`;

  const content = await client.fetch(query);
  return content;
}

async function getCharter() {
  const query = `*[_type == "charterVehicle"] | order(isPopular desc, _createdAt desc)`;

  const content = await client.fetch(query);
  return content;
}

async function getContent(){
	try {
		const [halamanUtamaContent, tourPackagesData, chartersData] = await Promise.all([
			getHalamanUtama(),
			getTourPackages(),
			getCharter()
		]);

		const content = {
			halamanUtamaContent: halamanUtamaContent,
			tourPackagesData: tourPackagesData,
			chartersData: chartersData
		}

		nomorTelp = halamanUtamaContent.nomor_telepon;

		loadContent(content)
	} catch (error) {
		console.error("Error di dalam getContent:", error);
	}
}

function loadContent(content){
	const whatsappTemplate = content.halamanUtamaContent.whatsappTemplate;
	populateHalamanUtama(content.halamanUtamaContent);
	populateTourPackages(content.tourPackagesData, whatsappTemplate);
	populateCharters(content.chartersData, whatsappTemplate);
}

document.addEventListener('DOMContentLoaded', () => {
	// renderTestimonialCards();
	// renderTourPackageCards();

	// hamburgerButton.addEventListener('click', openMenu);

	// closeMenuButton.addEventListener('click', closeMenu);

	// menuOverlay.addEventListener('click', closeMenu);

	// menuLinks.forEach(link => {
	// 	link.addEventListener('click', closeMenu);
	// });

	// document.addEventListener('keydown', function (event) {
	// 	if (event.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
	// 	closeMenu();
	// 	}
	// });

	getContent();
});