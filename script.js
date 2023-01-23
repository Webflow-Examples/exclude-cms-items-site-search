// Get list of Search Results
const resultsList = document.querySelector('[exclude-cms-items="results"]');

// Get titles in Search Results
const resultTitles = document.querySelectorAll('[exclude-cms-items="title"]');

// Get custom empty state
const emptyState = document.querySelector('[exclude-cms-items="empty-state"]');

    // Hide custom empty state by default
    emptyState.style.display = "none";

// Create array of excluded item titles from all excluded Collection Lists
const excludeTitles = Array.from(document.querySelectorAll('[exclude-cms-items="remove"]')).map((item)=> {
    return item.innerText.toLowerCase();
});

    // Remove the excluded Collection Lists from DOM
    document.querySelectorAll('[exclude-cms-items="remove"]').forEach(item => {
        item.parentElement.remove();
    });

// Check each Search Result item title against each excluded item title
resultTitles.forEach(resultItem => {
    excludeTitles.forEach(excludeTitle => {
        // If a match, remove Search Result item that contains matching title
        if (resultItem.innerText.toLowerCase() == excludeTitle) {
            resultItem.parentElement.parentElement.remove();
        }
    })
});

// If list of Search Results is now empty, remove it from DOM and show custom empty state
(function() {
    if (resultsList.childElementCount == 0) {
        resultsList.remove();
        emptyState.style.display = "block";
    }
})();
