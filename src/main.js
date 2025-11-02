import { tourPackages } from "./data/tourPackage.js";
import { testimonials } from "./data/testimonial.js";

const tourPackagesGrid = document.getElementById('tour-packages-grid');
const tourPackageCardTemplate = document.getElementById('tour-package-card');

const testimonialsGrid = document.getElementById('testimonials-grid');
const testimonialCardTemplate = document.getElementById('testimonial-card');

const hamburgerButton = document.getElementById('hamburger-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const menuOverlay = document.getElementById('menu-overlay');
const closeMenuButton = document.getElementById('close-menu-button');
const menuLinks = mobileMenu.querySelectorAll('a');

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

function openMenu(){
	mobileMenu.classList.remove('translate-x-full');
	menuOverlay.classList.remove('hidden');
	document.body.style.overflow = 'hidden';
}

function closeMenu(){
	mobileMenu.classList.add('translate-x-full');
	menuOverlay.classList.add('hidden');
	document.body.style.overflow = ''; // Mengizinkan scroll kembali
}

document.addEventListener('DOMContentLoaded', () => {
	renderTestimonialCards();
	renderTourPackageCards();

	hamburgerButton.addEventListener('click', openMenu);

	closeMenuButton.addEventListener('click', closeMenu);

	menuOverlay.addEventListener('click', closeMenu);

	menuLinks.forEach(link => {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
		closeMenu();
		}
	});
});