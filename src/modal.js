// Modal functionality for tour packages
document.addEventListener('DOMContentLoaded', () => {
  // Get modal elements
  const tourModal = document.getElementById('tourModal');
  const closeModal = document.getElementById('closeModal');

  // Tour data
  const tourData = {
    bali: {
      image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzBZsORQiCXQvn3j-f73kVjSVShsCNcCu4IJ-3e9tF16y2lQT1NnxiCfMtvohwqAUQ9RQB-TgYjY8l6DLHFl83k_kJcWab0Fa0-xFY31KZPaDSAJ-dWSxXHaTEC6AxBJHqWAQ3S91kEu-XxVQp6uNkCT6H5R3X_YzF5IslTpeFpRX-Uh68phJzssGQiYCZhX9oTHoZHDjOoLJeg47bbmX5ANbVvkQh_RxY42Ui204A1bOo4OYxHqxERq8-SGxaZbVwE11oElmMX0vl")',
      price: 'from $599 / person',
      duration: '4 Days, 3 Nights',
      type: 'Cultural, Beach',
      destination: 'Bali, Indonesia',
      groupSize: 'Max 15 people',
      description: 'Experience the magic of Bali, from its serene temples to vibrant beaches and lush rice terraces. Discover the rich Balinese culture, enjoy traditional cuisine, and relax on pristine beaches.',
      itinerary: [
        { 
          title: 'Day 1: Arrival in Denpasar', 
          content: 'Arrive at Ngurah Rai International Airport, transfer to hotel in Ubud. Visit traditional markets and enjoy welcome dinner.' 
        },
        { 
          title: 'Day 2: Ubud Cultural Tour', 
          content: 'Explore ancient temples, visit rice terraces, and experience traditional Balinese art and craft workshops.' 
        },
        { 
          title: 'Day 3: Beach Day in Seminyak', 
          content: 'Transfer to Seminyak, enjoy beach activities, sunset at Tanah Lot temple, and beachfront dining.' 
        },
        { 
          title: 'Day 4: Departure', 
          content: 'Last-minute shopping at local markets before transfer to airport for departure.' 
        }
      ]
    },
    komodo: {
      image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBw3uV4_gRKmSn_RKaszvatE2weDz5vAZQ52RaYJOHIJTzVUxUvncvcOW1TM-Sk59-sCbCNEEIXUzxlIL4r1IF_KsGTrcShVgJYyLmN4FLb61MbJU8qcIXF0lrgow1TDy7N-YDbF8QktdqDhGM-m3r9obV3HMGB_4NO6vt-FMIBjcD1kRhPIvLodA7yKuT-4PDdMtEwwTuxlDYZY6BbMOl2-o8F7UM64YnuREI7934rWaU7vgTxBpehYH9xmbEycJ9ZFW_mGsp74TGm")',
      price: 'from $850 / person',
      duration: '3 Days, 2 Nights',
      type: 'Adventure, Wildlife',
      destination: 'Komodo, Indonesia',
      groupSize: 'Max 10 people',
      description: 'Get up close with the legendary Komodo dragons and explore the stunning Pink Beach. This adventure combines wildlife encounters with pristine marine life and breathtaking landscapes.',
      itinerary: [
        { 
          title: 'Day 1: Labuan Bajo Arrival', 
          content: 'Arrive in Labuan Bajo, board traditional boat, and cruise to Komodo National Park. Evening sunset at Padar Island.' 
        },
        { 
          title: 'Day 2: Komodo Island Trek', 
          content: 'Morning trek to see Komodo dragons in their natural habitat. Afternoon snorkeling at Pink Beach and exploring coral reefs.' 
        },
        { 
          title: 'Day 3: Return Journey', 
          content: 'Morning at Kanawa Island for swimming and relaxation before returning to Labuan Bajo for departure.' 
        }
      ]
    },
    rajaampat: {
      image: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDy0lfHjeJwadkw6VD75d5y0mfnAp2byewlDaJ_nx-OgqAxLqVO-h1A2Mar2LmzQgHBRMiVnFY72gM1GEk0UG022tnGVaIwg5RIjEZ18b5X45RLVppIViNCQgNBhkdB6v3oQ5SWd8yJ60m5i7mN5YHfBOef5pDXDB0Rjb7xDXj_uPI0LwBmJ_Gq_YyoMfZW4Jvj9Q6tzfPBXATJ4GUxcn5KrUb5gKPxDa9FBQJmeokKCGJRJapr7Bct7beJVqy2rzx9PdS20eMU7EUy")',
      price: 'from $1200 / person',
      duration: '5 Days, 4 Nights',
      type: 'Diving, Adventure',
      destination: 'Raja Ampat, Indonesia',
      groupSize: 'Max 12 people',
      description: 'Embark on an unforgettable journey to the heart of the Coral Triangle. Raja Ampat offers a world-class diving experience with breathtaking underwater biodiversity. Explore pristine coral reefs, encounter majestic manta rays, and relax on untouched white-sand beaches.',
      itinerary: [
        { 
          title: 'Day 1: Arrival and Exploration', 
          content: 'Arrive at Sorong, meet our team, and transfer to your liveaboard. Settle in and enjoy a welcome briefing before our first checkout dive in the afternoon.' 
        },
        { 
          title: 'Day 2: Manta Point & Hidden Bays', 
          content: 'Experience the magic of Manta Sandy, where you can witness majestic manta rays at their cleaning stations. Explore hidden bays and enjoy the scenic landscapes.' 
        },
        { 
          title: 'Day 3: Wayag Islands', 
          content: 'Hike to the iconic viewpoint of Wayag for breathtaking panoramic views of the karst islands. Spend the afternoon diving and snorkeling in the surrounding lagoons.' 
        },
        { 
          title: 'Day 4: Pianemo & Blue Lagoon', 
          content: 'Explore the mushroom-shaped islands of Pianemo and dive in crystal-clear blue lagoons with incredible marine biodiversity.' 
        },
        { 
          title: 'Day 5: Departure', 
          content: 'Final morning dive and transfer back to Sorong for departure flights.' 
        }
      ]
    }
  };

  // Open modal function
  function openModal(tourType) {
    const tour = tourData[tourType];
    if (!tour) return;

    // Update modal content
    const modalImage = document.getElementById('modalImage');
    const modalPrice = document.getElementById('modalPrice');
    const modalDuration = document.getElementById('modalDuration');
    const modalType = document.getElementById('modalType');
    const modalDestination = document.getElementById('modalDestination');
    const modalGroupSize = document.getElementById('modalGroupSize');
    const modalDescription = document.getElementById('modalDescription');

    if (modalImage) modalImage.style.backgroundImage = tour.image;
    if (modalPrice) modalPrice.textContent = tour.price;
    if (modalDuration) modalDuration.textContent = tour.duration;
    if (modalType) modalType.textContent = tour.type;
    if (modalDestination) modalDestination.textContent = tour.destination;
    if (modalGroupSize) modalGroupSize.textContent = tour.groupSize;
    if (modalDescription) modalDescription.textContent = tour.description;

    // Update itinerary
    const itineraryContainer = document.getElementById('modalItinerary');
    if (itineraryContainer) {
      itineraryContainer.innerHTML = tour.itinerary.map(day => `
        <details class="group rounded-lg bg-gray-50 dark:bg-gray-700">
          <summary class="flex cursor-pointer list-none items-center justify-between p-4 font-semibold text-gray-900 dark:text-white">
            <span>${day.title}</span>
            <span class="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
          </summary>
          <p class="p-4 pt-0 text-gray-600 dark:text-gray-300">${day.content}</p>
        </details>
      `).join('');
    }

    // Show modal
    if (tourModal) {
      tourModal.classList.remove('hidden');
      tourModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  }

  // Close modal function
  function closeModalFunc() {
    if (tourModal) {
      tourModal.classList.add('hidden');
      tourModal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }
  }

  // Event listeners
  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
  }
  
  if (tourModal) {
    tourModal.addEventListener('click', (e) => {
      if (e.target === tourModal) closeModalFunc();
    });
  }

  // Initialize view details buttons
  const buttons = document.querySelectorAll('.tour-package button');
  
  buttons.forEach((button, index) => {
    const tourTypes = ['bali', 'komodo', 'rajaampat'];
    
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(tourTypes[index]);
    });
  });

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModalFunc();
  });
});
