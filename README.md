# exclude-cms-items-site-search
Use custom attributes to hide specific CMS items from Webflow site search results.

Although you can [natively exclude entire CMS Collections from site search](https://university.webflow.com/lesson/site-search#excluding-collection-pages), there may be times where you only want to exclude specific CMS items (and not the entire Collection). To do so, check out the instructions and resources below.

## Clone an example site from Made in Webflow:
[Final showcase URL will go here]
[Webflow.io staging domain in the interim](https://exclude-cms-items-from-site-search.webflow.io/)

# Instructions
## Prerequisites: Site search
### Enable site search in your project
If you haven't already done so, follow the directions in [this Webflow University guide](https://university.webflow.com/lesson/site-search) to add and style site search in your project. **Note:** Site search is available only on sites with CMS Hosting or a higher site plan tier.
### Set the Search Title for your CMS Template page(s)
For each of the CMS Collections you plan to partially exclude from site search, navigate to its corresponding Template Page Settings. If it isn't already configured accordingly, set the Search Title to the Name of the CMS item. Do not add any additional text or characters.

### Add and connect a Text Block for your Search Title
On your Search Results page, add a text element to your Search Result Item element and bind it to the Search Title. If you do not plan to display an item's Search Title, you may optionally add a CSS class to hide it (display:none;).

## Step #1: CMS Collections, items, and Collection Lists
### Create a switch field in your CMS Collection(s) and update your CMS item(s)
For each of the CMS Collections you plan to partially exclude from site search, create a new [Switch field](https://university.webflow.com/lesson/switch-field) within the Collection structure. You may want to name it something similar to ***"Exclude from site search?"***

Once the switch field is in place, update your CMS items accordingly — toggle the switch to "Yes" for any items that should be hidden from your Search Results page.
### Add and filter Collection List(s) on your Search Results page
For each of the CMS Collections you plan to partially exclude from site search, [add a Collection List element](https://university.webflow.com/lesson/collection-list#how-to-add-a-collection-list) to your Search Results page. Connect it to your relevant CMS Collection(s). Because these Collection Lists will be removed from the rendered page, you can place them anywhere you would like and it is not necessary to style them.

Once they are connected, [filter each Collection List](https://university.webflow.com/lesson/filter-collection-lists) by **"Exclude from site search? is On"** — the Collection List should only display the CMS items that will be removed from your search results.
### Add and connect a Text Block within your Collection Item(s)
For each of the Collection Lists on your Search Results page, add a Text Block to the Collection Item block. Bind it to the **Name** of the CMS item.

## Step #2: Custom empty state
### Create and style a custom "empty state" on your Search Results page
By default, when there are no matching results for your visitors' search query, Webflow will display its own native empty state through server-side rendering. However, the excluded CMS items will be removed client-side on the Search Results page, so Webflow's native empty state will not appear.

To resolve this, you will need to create and a style a custom "empty state" that mimics the native one (you can likely reuse the CSS class applied to the native empy state). Be sure to **add your custom empty state as a sibling element of your Search Result Wrapper** in order for it to appear in the same place as the native one.

The custom empty state will be hidden when the Search Results page loads. It is **not** required to add any additional CSS properties (such as "display: none" through a combo class), although you may optionally do so if you prefer to hide it in the Designer.

## Step #3: Custom attributes
### Add a custom attribute to the "Search Results List" element
On your Search Results page, locate the "Search Results List" element. From the Element Settings panel, add the following custom attribute:
- Name: `exclude-cms-items`
- Value: `results`

### Add a custom attribute to the "Search Title" element
On your Search Results page, locate the "Search Results List" element. From the Element Settings panel, add the following custom attribute:
- Name: `exclude-cms-items`
- Value: `title`

### Add a custom attribute to each "Collection List" element
For each of the Collection Lists on your Search Results page, navigate to the Element Settings panel and add the following custom attribute. Be sure to add this on the Collection List (and not the Collection List Wrapper); repeat this step as needed.
- Name: `exclude-cms-items`
- Value: `remove`

### Add a custom attribute to the custom empty state
On your Search Results page, locate your "custom empty state" element. From the Element Settings panel, add the following custom attribute:
- Name: `exclude-cms-items`
- Value: `empty-state`

## Step #4: Custom code
### Copy the provided script and paste into your Search Results Page Settings
Copy the provided script below and paste it before the [closing </body> tag](https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags-wf#before-the-%3C/body%3E-tag) of your Search Results page. Be sure to add an opening <script> and closing </script> tag if you plan to inline the custom code.

```javascript
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
```

## Step #5: Publish and test
### Publish your site and run a test query
Publish your site and test your site search by querying the name of an excluded item.
