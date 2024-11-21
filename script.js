// Get modal, button, and close elements
const modal = document.getElementById("signup-modal");
const signupBtn = document.getElementById("signup-btn");
const closeBtn = document.getElementById("close-btn");

// Open modal when 'Sign Up Now' is clicked
signupBtn.onclick = function () {
    modal.style.display = "flex";
};

// Close modal when close button is clicked
closeBtn.onclick = function () {
    modal.style.display = "none";
};

// Close modal when clicking outside the modal content
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
//carousel
// Open the modal when the sign-up button is clicked
document.getElementById("signup-btn").addEventListener("click", function() {
    document.getElementById("signup-modal").style.display = "block";
});

// Close the modal when the close button is clicked
document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("signup-modal").style.display = "none";
});

// Close the modal if the user clicks outside of the modal content
window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("signup-modal")) {
        document.getElementById("signup-modal").style.display = "none";
    }
});
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) currentSlide = 0;
    if (index < 0) currentSlide = totalSlides - 1;

    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
}
// login
// Form validation logic
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    // For demonstration, we'll just log the values
    console.log('Username:', username);
    console.log('Password:', password);

    // You can replace the following line with actual form submission
    alert('Logged in successfully!');
});
//signup
// Handle form submission
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
  
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const country = document.getElementById('country').value;
  
    if (firstName && lastName && email && password && country) {
      alert('Form submitted successfully!');
      // You can process the data here (e.g., send to the server)
    } else {
      alert('Please fill in all fields!');
    }
  });
  //jobs page
  // Function to handle search form submission
function searchFunction(event) {
    event.preventDefault();  // Prevent form submission
    const searchQuery = document.getElementById('search').value;  // Get the search query
    console.log('Searching for:', searchQuery);  // Display the search query in the console (replace with actual search logic)
  }
  
  // Attach the search function to the form's submit event
  document.querySelector('.SearchBar-searchForm-P1Z').addEventListener('submit', searchFunction);
  // Function to toggle the visibility of the advanced filters
function toggleAdvancedFilters() {
    const filtersContainer = document.getElementById('advanced-filters-container'); // Assume the filters container has this ID
    if (filtersContainer) {
      filtersContainer.classList.toggle('visible');  // Toggle the visibility class
    }
  }
  
  // Attach the function to the "Advanced Filters" button
  document.querySelector('.Content-advancedFiltersButton-Yiv').addEventListener('click', toggleAdvancedFilters);
  // Toggle between grid and list view
document.getElementById("toggleViewButton").addEventListener("click", function() {
    const container = document.querySelector(".job-cards-container");
    container.classList.toggle("grid-view");
    container.classList.toggle("list-view");
    // Update the button text based on the view
    if (container.classList.contains("grid-view")) {
      this.textContent = "Switch to List View";
    } else {
      this.textContent = "Switch to Grid View";
    }
  });
  
  // Update job count dynamically based on displayed cards
  const updateJobCount = () => {
    const jobCards = document.querySelectorAll(".JobCard-jobCardLink-Ywm");
    const jobCountElement = document.getElementById("jobCount");
    jobCountElement.textContent = `(${jobCards.length})`;
  };
  
  // Call the function on page load to initialize job count
  window.onload = updateJobCount;

// Apply the job sequencing algorithm and display sorted jobs
const sortedJobs = jobSequencing(jobs);
displaySortedJobs(sortedJobs);

// Placeholder for any JS interaction you might need in the future
document.querySelectorAll('.view-details-cta').forEach(function (cta) {
    cta.addEventListener('click', function (event) {
        event.preventDefault();
        alert("Redirecting to job details...");
        // You can replace this with a redirection to the job details page.
        // window.location.href = cta.parentElement.parentElement.getAttribute('href');
    });
});
 // Function to filter and display projects based on category selection
 function filterJobs(event) {
    event.preventDefault();
    let category = event.target.innerText;
    let allCards = document.querySelectorAll('.internship-card');
    
    // Loop through all cards and show/hide based on the selected category
    allCards.forEach(card => {
        let cardCategory = card.getAttribute('data-category');
        if (cardCategory === category || category === 'All') {
            card.style.display = 'block'; // Show card
        } else {
            card.style.display = 'none'; // Hide card
        }
    });
}

//job sequencing
// Extract job data from internship cards
function getJobCardsData() {
    const jobCards = document.querySelectorAll('.internship-card');
    const jobs = [];
    jobCards.forEach(card => {
        const id = card.getAttribute('href').split('/').pop(); // Extract ID from href
        const deadlineText = card.querySelector('.job-details li:nth-child(2)').innerText;
        const profitText = card.querySelector('.job-details li:nth-child(3)').innerText;

        const deadline = parseInt(deadlineText.match(/\d+/)[0]); // Extract deadline as number
        const profit = parseInt(profitText.replace(/[^\d]/g, '')); // Extract profit as number

        jobs.push({ id, deadline, profit, card }); // Include the entire card element for redisplay
    });
    return jobs;
}

// Job sequencing algorithm
function jobSequencing(jobs, maxDeadline) {
    jobs.sort((a, b) => b.profit - a.profit); // Sort by profit descending
    let result = [];
    let slot = new Array(maxDeadline).fill(false);

    for (let i = 0; i < jobs.length; i++) {
        for (let j = jobs[i].deadline - 1; j >= 0; j--) {
            if (!slot[j]) {
                result[j] = jobs[i];
                slot[j] = true;
                break;
            }
        }
    }
    return { scheduled: result.filter(Boolean), unscheduled: jobs.filter(job => !result.includes(job)) };
}

// Display sorted cards
function displaySequence() {
    const jobs = getJobCardsData();
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));
    const { scheduled, unscheduled } = jobSequencing(jobs, maxDeadline);

    const container = document.querySelector('.card-container');
    container.innerHTML = ''; // Clear existing cards

    if (scheduled.length === 0) {
        container.innerHTML = '<p>No jobs can be scheduled.</p>';
    } else {
        // Append scheduled jobs
        scheduled.forEach(job => container.appendChild(job.card));

        // Append unscheduled jobs
        if (unscheduled.length > 0) {
            const unscheduledHeader = document.createElement('div');
            unscheduledHeader.innerHTML = '<h4>Unscheduled Projects:</h4>';
            container.appendChild(unscheduledHeader);

            unscheduled.forEach(job => {
                const unscheduledCard = job.card.cloneNode(true);
                const status = document.createElement('p');
                status.textContent = 'Status: Not Scheduled';
                unscheduledCard.querySelector('.job-details').appendChild(status);
                container.appendChild(unscheduledCard);
            });
        }
    }
}

// Sort by profit button
function sortCardsByProfit() {
    displaySequence(); // Call the display function
}

//add to dash}
// Function to add a job to the dashboard
function addToDashboard(event) {
    // Get the project card that was clicked
    const projectCard = event.target.closest('.project-card');
    
    // Ensure that project card exists and is from the "Projects" section
    if (projectCard && projectCard.closest('#project-cards')) {
        // Clone the project card to add it to the dashboard
        const projectClone = projectCard.cloneNode(true); // This copies the card with its content

        // Change the button's text to "Added" and disable it
        const addButton = projectClone.querySelector('button');
        addButton.textContent = 'Added';
        addButton.disabled = true;

        // Append the cloned project card to the dashboard section
        const dashboard = document.getElementById('dashboard');
        dashboard.appendChild(projectClone);

        // Remove the original project card from the Projects section
        projectCard.remove();
    }
}



