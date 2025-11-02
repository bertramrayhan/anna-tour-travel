import { tourPackages } from "./data/tourPackage.js";
import { testimonials } from "./data/testimonial.js";

const tourPackagesGrid = document.getElementById('tour-packages-grid');
const tourPackageCardTemplate = document.getElementById('tour-package-card');

const testimonialsGrid = document.getElementById('testimonials-grid');
const testimonialCardTemplate = document.getElementById('testimonial-card');


function renderTourPackageCards(){
	tourPackagesGrid.innerHTML = '';

	for (const tourPackage of tourPackages) {
		const tourPackageCardClone = tourPackageCardTemplate.content.cloneNode(true);
		
		let packageBg = tourPackageCardClone.querySelector('.package-bg');
		packageBg.src = tourPackage['background'];
		packageBg.alt = tourPackage['alt'];

		tourPackageCardClone.querySelector('.title').textContent = tourPackage['title'];
		tourPackageCardClone.querySelector('.description').textContent = tourPackage['description'];
		tourPackageCardClone.querySelector('.price').textContent = tourPackage['price'];

		tourPackageCardClone.querySelector('.btn-view').setAttribute('data-id', tourPackage['id']);

		tourPackagesGrid.appendChild(tourPackageCardClone);
	}
}

function renderTestimonialCards(){
	testimonialsGrid.innerHTML = ''

	for (const testimonial of testimonials) {
		const testimonialCardClone = testimonialCardTemplate.content.cloneNode(true);

		testimonialCardClone.querySelector('.photo').src = testimonial['photo'];
		testimonialCardClone.querySelector('.name').textContent = testimonial['name'];
		testimonialCardClone.querySelector('.destination').textContent = testimonial['destination'];
		testimonialCardClone.querySelector('.testimonial').textContent = testimonial['testimonial'];
		
		testimonialsGrid.appendChild(testimonialCardClone);
	}
}

// Mobile menu functionality
function initMobileMenu() {
	const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
	const mobileMenu = document.getElementById('mobile-menu');
	const mobileMenuClose = document.getElementById('mobile-menu-close');
	const mobileMenuLinks = document.querySelectorAll('#mobile-menu nav a');

	// Check if elements exist (safety check)
	if (!mobileMenuToggle || !mobileMenu || !mobileMenuClose) {
		return;
	}

	// Open mobile menu
	mobileMenuToggle.addEventListener('click', () => {
		mobileMenu.style.transform = 'translateX(0)';
		document.body.classList.add('overflow-hidden');
	});

	// Close mobile menu
	function closeMobileMenu() {
		mobileMenu.style.transform = 'translateX(-100%)';
		document.body.classList.remove('overflow-hidden');
	}

	mobileMenuClose.addEventListener('click', closeMobileMenu);

	// Close menu when clicking on navigation links
	mobileMenuLinks.forEach(link => {
		link.addEventListener('click', () => {
			closeMobileMenu();
		});
	});

	// Close menu when clicking outside (on overlay)
	mobileMenu.addEventListener('click', (e) => {
		if (e.target === mobileMenu) {
			closeMobileMenu();
		}
	});

	// Close menu when pressing Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && mobileMenu.style.transform === 'translateX(0px)') {
			closeMobileMenu();
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	renderTestimonialCards();
	renderTourPackageCards();
	initMobileMenu();
});