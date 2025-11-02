import { tourData } from "./data/tour.js";
import { convertTextToWhatsapp } from "./helper.js";

const tourModal = document.getElementById('tour-modal');
const closeModal = document.getElementById('close-modal');

const tourPackagesGrid = document.getElementById('tour-packages-grid');

closeModal.addEventListener('click', (e) => {
  	e.preventDefault();
	
	tourModal.classList.add('hidden');
	// Re-enable body scroll
	document.body.classList.remove('modal-open');
});

tourPackagesGrid.addEventListener('click', (e) => {
	e.preventDefault();

	const viewBtn = e.target;

	if(viewBtn.tagName === 'BUTTON'){
    showTourDetail(viewBtn.dataset.id);
  }
});

const modalPrice = document.getElementById('modal-price');
const modalDurationDay = document.getElementById('modal-duration-day');
const modalDurationNight = document.getElementById('modal-duration-night');
const modalType = document.getElementById('modal-type');
const modalDestination = document.getElementById('modal-destination');
const modalGroupSize = document.getElementById('modal-group-size');
const modalDescription = document.getElementById('modal-description');
const modalItinerary = document.getElementById('modal-itinerary');
const modalIncluded = document.getElementById('modal-included');
const modalNotIncluded = document.getElementById('modal-not-included');
const modalImage = document.getElementById('modal-image');
const modalOrder = document.getElementById('modal-order');

const itineraryTemplate = document.getElementById('itinerary-template');
const includedTemplate = document.getElementById('included-template');
const notIncludedTemplate = document.getElementById('not-included-template');

function showTourDetail(id){
	const tourDetail = tourData[id];

	modalPrice.textContent = tourDetail['price'];
	modalDurationDay.textContent = tourDetail['durationDay'];
	modalDurationNight.textContent = tourDetail['durationNight'];
	modalType.textContent = tourDetail['type'];
	modalDestination.textContent = tourDetail['destination'];
	modalGroupSize.textContent = tourDetail['groupSize'];
	modalDescription.textContent = tourDetail['description'];
	modalImage.style.backgroundImage = tourDetail['image'];
	modalOrder.href = convertTextToWhatsapp(tourData['telephoneNumber'], tourDetail['whatsappTemplate']);

	modalItinerary.innerHTML = '';
	for (let i = 0; i < tourDetail['itinerary'].length; i++) {
		const itinerary = tourDetail['itinerary'][i];

		const itineraryClone = itineraryTemplate.content.cloneNode(true);

		itineraryClone.querySelector('.day-count').textContent = i + 1;
		itineraryClone.querySelector('.itinerary-title').textContent = itinerary['title'];
		itineraryClone.querySelector('.itinerary-description').textContent = itinerary['content'];

		modalItinerary.appendChild(itineraryClone);
	}

	modalIncluded.innerHTML = '';
	for (const included of tourDetail['included']) {
		const includedClone = includedTemplate.content.cloneNode(true);

		includedClone.querySelector('.included-text').textContent = included;

		modalIncluded.appendChild(includedClone);
	}

	modalNotIncluded.innerHTML = '';
	for (const notIncluded of tourDetail['notIncluded']) {
		const notIncludedClone = notIncludedTemplate.content.cloneNode(true);

		notIncludedClone.querySelector('.not-included-text').textContent = notIncluded;

		modalNotIncluded.appendChild(notIncludedClone);
	}

	tourModal.classList.remove('hidden');
	
	// Prevent background scroll when modal is open
	document.body.classList.add('modal-open');
	
	// Reset scroll position to top when modal opens - best practice
	const modalContent = tourModal.querySelector('.overflow-y-auto');
	if (modalContent) {
		modalContent.scrollTo({ top: 0, behavior: 'smooth' });
	}
}

// Smooth accordion animation for details elements
function setupAccordionAnimation() {
	document.addEventListener('click', function(e) {
		const summary = e.target.closest('details summary');
		if (!summary) return;
		
		const details = summary.parentElement;
		const content = details.querySelector('.itinerary-description');
		
		if (!content) return;
		
		e.preventDefault();
		
		if (details.hasAttribute('open')) {
			// Closing animation - content first, then height
			const currentHeight = content.scrollHeight;
			
			// Set current height explicitly
			content.style.maxHeight = currentHeight + 'px';
			content.style.transition = 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), padding-top 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s, max-height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s';
			
			// Force reflow
			content.offsetHeight;
			
			// Start with content fade out
			content.style.opacity = '0';
			content.style.transform = 'translateY(-8px)';
			
			// Then padding and height
			setTimeout(() => {
				content.style.paddingTop = '0';
				content.style.maxHeight = '0px';
			}, 150);
			
			setTimeout(() => {
				details.removeAttribute('open');
				// Reset styles after closing
				content.style.transition = '';
				content.style.opacity = '';
				content.style.transform = '';
				content.style.maxHeight = '';
				content.style.paddingTop = '';
			}, 700);
		} else {
			// Opening animation
			details.setAttribute('open', '');
			
			// Get natural height WITHOUT padding to avoid jumps
			content.style.visibility = 'hidden';
			content.style.opacity = '0';
			content.style.paddingTop = '0'; // Measure without padding
			content.style.maxHeight = 'none';
			const naturalHeightWithoutPadding = content.scrollHeight;
			
			// Calculate height WITH padding (add 16px for 1rem)
			const paddingInPixels = 16;
			const naturalHeightWithPadding = naturalHeightWithoutPadding + paddingInPixels;
			
			// Set initial state for animation
			content.style.visibility = 'visible';
			content.style.maxHeight = '0px';
			content.style.opacity = '0';
			content.style.transform = 'translateY(-10px)';
			content.style.paddingTop = '0';
			content.style.transition = 'max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.5s';
			
			// Force reflow
			content.offsetHeight;
			
			// Animate to open state - height and padding simultaneously
			requestAnimationFrame(() => {
				content.style.maxHeight = naturalHeightWithPadding + 'px';
				content.style.paddingTop = '1rem';
				
				// Content fade in after height starts expanding
				setTimeout(() => {
					content.style.opacity = '1';
					content.style.transform = 'translateY(0)';
				}, 100);
			});
			
			// Clean up after animation
			setTimeout(() => {
				content.style.transition = '';
				content.style.maxHeight = '';
				content.style.visibility = '';
			}, 1100);
		}
	});
}

setupAccordionAnimation();