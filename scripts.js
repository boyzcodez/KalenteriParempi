document.addEventListener('DOMContentLoaded', function() {
const calendarGrid = document.getElementById('calendar-grid');
const modal = document.getElementById('modal');
const dayIframe = document.getElementById('day-iframe');
const closeBtn = document.querySelector('.close');

// Developer mode toggle
let devMode = false;
document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'd') {
        devMode = !devMode;
        console.log('Developer mode: ' + (devMode ? 'ENABLED' : 'DISABLED'));
        updateDayBoxes();
    }
});


const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; 
const isDecember = currentMonth === 12;

function updateDayBoxes() {
    calendarGrid.innerHTML = '';

    // Create day boxes
    for (let day = 1; day <= 24; day++) {
        const dayBox = document.createElement('div');
        dayBox.className = 'day-box';
        dayBox.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-label">Dec ${day}</div>
        `;

        // Check if day is today (only if we're in December)
        if (isDecember && day === currentDay) {
            dayBox.classList.add('today');
        }

        let shouldLock = false;

        // Developer mode: unlock all days
        if (devMode) {
            shouldLock = false;
        }
        // Normal mode: lock based on date
        else {
            // Only allow opening days if it's December
            if (!isDecember) {
                shouldLock = true;
            } else if (day > currentDay) {
                // In December, lock future days
                shouldLock = true;
            }
        }

        if (shouldLock) {
            dayBox.classList.add('locked');
            dayBox.style.pointerEvents = 'none';
        } else {
            dayBox.addEventListener('click', function() {
                openDay(day);
            });
        }

        calendarGrid.appendChild(dayBox);
    }
}

// Initialize day boxes
updateDayBoxes();

// Open day content in new tab with animation
function openDay(day) {
    const dayBoxes = document.querySelectorAll('.day-box');
    const clickedBox = dayBoxes[day - 1];
    
    // Add opening animation
    clickedBox.classList.add('opening');
    
    // Open in new tab after animation starts
    setTimeout(function() {
        window.open(`Days/Day${day}.html`, '_self');
    }, 300);
    
    // Remove animation class after it completes
    setTimeout(function() {
        clickedBox.classList.remove('opening');
    }, 800);
}
});
