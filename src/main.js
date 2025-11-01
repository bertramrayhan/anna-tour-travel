import { tourPackages } from "./data/tourPackage.js";
import { testimonials } from "./data/testimonial.js";

const tourPackagesGrid = document.getElementById('tour-packages-grid');
const tourPackageCardTemplate = document.getElementById('tour-package-card');

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

		tourPackagesGrid.appendChild(tourPackageCardClone);
	}
}

renderTourPackageCards();

const testimonialsGrid = document.getElementById('testimonials-grid');
const testimonialCardTemplate = document.getElementById('testimonial-card');

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

renderTestimonialCards();