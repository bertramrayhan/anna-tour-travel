import { client } from './sanityClient.js';
import { populateCharters } from './utils/charterVehicleUtils.js';
import { populateHalamanUtama } from "./utils/halamanUtamaUtils.js";
import { populateRegularTravels } from './utils/regularTravelUtils.js';
import { populateTourPackages } from './utils/tourPackageUtils.js';
import { initVideoPlayer } from './utils/videoPlayer.js';

export let nomorTelp = null; 

async function getHalamanUtama() {
  const query = `*[_type == "halamanUtama"][0]`;

  const content = await client.fetch(query);
  return content;
}

async function getVideoGallery() {
  const query = `*[_type == "videoGallery"]`;

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

async function getRegularTravel() {
  const query = `*[_type == "regularTravel"] | order(isPopular desc, _createdAt desc)`;

  const content = await client.fetch(query);
  return content;
}

async function getContent(){
	try {
		const [halamanUtamaContent, videoGalleryData, tourPackagesData, chartersData, regularTravelsData] = await Promise.all([
			getHalamanUtama(),
			getVideoGallery(),
			getTourPackages(),
			getCharter(),
			getRegularTravel()
		]);

		console.log(regularTravelsData)

		const content = {
			halamanUtamaContent: halamanUtamaContent,
			tourPackagesData: tourPackagesData,
			chartersData: chartersData,
			regularTravelsData: regularTravelsData,
			videoGalleryData: videoGalleryData
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
	populateRegularTravels(content.regularTravelsData, whatsappTemplate);
	initVideoPlayer(content.videoGalleryData);
}

function initMobileMenu() {
	const mobileMenuBtn = document.getElementById('mobile-menu-btn');
	const mobileMenu = document.getElementById('mobile-menu');
	const mobileMenuPanel = document.getElementById('mobile-menu-panel');
	const mobileMenuClose = document.getElementById('mobile-menu-close');
	const hamburgerIcon = document.getElementById('hamburger-icon');
	const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
	const mobileContactBtn = document.getElementById('mobile-contact-btn');
	const contactBtn = document.getElementById('contact-btn');

	// Set mobile contact button href sama dengan desktop contact button
	if (contactBtn && mobileContactBtn) {
		mobileContactBtn.href = contactBtn.href;
	}

	// Toggle mobile menu with hamburger button
	mobileMenuBtn?.addEventListener('click', () => {
		const isOpen = mobileMenu.classList.contains('mobile-menu-open');
		
		if (isOpen) {
			closeMobileMenu();
		} else {
			openMobileMenu();
		}
	});

	// Close menu with close button
	mobileMenuClose?.addEventListener('click', () => {
		closeMobileMenu();
	});

	// Close menu when clicking overlay
	mobileMenu?.addEventListener('click', (e) => {
		if (e.target === mobileMenu) {
			closeMobileMenu();
		}
	});

	// Close menu when clicking navigation links
	mobileMenuLinks.forEach(link => {
		link.addEventListener('click', () => {
			closeMobileMenu();
		});
	});

	// Close menu when clicking mobile contact button
	mobileContactBtn?.addEventListener('click', () => {
		closeMobileMenu();
	});

	function openMobileMenu() {
		mobileMenu.classList.add('mobile-menu-open');
		mobileMenu.style.opacity = '1';
		mobileMenu.style.visibility = 'visible';
		
		// Animate panel slide in
		setTimeout(() => {
			mobileMenuPanel.style.transform = 'translateX(0)';
		}, 10);
		
		// Animate hamburger icon
		hamburgerIcon.textContent = 'close';
		hamburgerIcon.style.transform = 'rotate(180deg)';
		
		// Prevent body scroll
		document.body.style.overflow = 'hidden';
	}

	function closeMobileMenu() {
		// Animate panel slide out
		mobileMenuPanel.style.transform = 'translateX(100%)';
		
		// Hide overlay after animation
		setTimeout(() => {
			mobileMenu.classList.remove('mobile-menu-open');
			mobileMenu.style.opacity = '0';
			mobileMenu.style.visibility = 'hidden';
		}, 300);
		
		// Reset hamburger icon
		hamburgerIcon.textContent = 'menu';
		hamburgerIcon.style.transform = 'rotate(0deg)';
		
		// Restore body scroll
		document.body.style.overflow = '';
	}

	// Close menu on escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu-open')) {
			closeMobileMenu();
		}
	});

	// Close menu on window resize to desktop size
	window.addEventListener('resize', () => {
		if (window.innerWidth >= 768 && mobileMenu.classList.contains('mobile-menu-open')) {
			closeMobileMenu();
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	getContent();
	initMobileMenu();
});