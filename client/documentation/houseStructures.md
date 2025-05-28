# Technical Documentation for House.jsx 

We will likely need to alter the data structures of the housing page so I wanted to give a brief description of the ones used.

## 1. mockListings - Array of House Listings  
- Type: `Array<Object>`
- Each listing is a JavaScript Object representing one housing unit  
- Contains nested structure for seller info and house details  

Example structure:
```javascript
{  
  id: 1,  
  title: 'Modern 2-Bedroom Apartment',  
  location: 'Guelph, ON',  
  price: '$1,200/month',  
  image: 'https://via.placeholder.com/...',  
  description: '...',  
  amenities: ['In-unit laundry', 'High-speed internet'],  
  seller: {  
    name: 'John Smith',  
    contact: 'john.s@email.com',  
    joinedDate: 'Member since 2023'  
  },  
  details: {
    bedrooms: 2,  
    bathrooms: 1,  
    lease: '12 months',  
    available: 'September 1, 2024',  
    utilities: 'Not included'  
  }  
}
```

## 2. filters - Object for Filter State
- Type: `Object`
- Maintains the current user-selected filters
- Used to control which listings are visible after filtering

Example structure:
```javascript
{  
  priceRange: '',       // max price as a string (e.g. "1500")  
  location: '',         // filter by partial location match  
  bedrooms: '',         // number of bedrooms as a string  
  utilities: '',        // string to match utility info  
  furnished: false,     // true if "furnished" checkbox is selected  
  petFriendly: false,  // true if "pet friendly" checkbox is selected  
  minPrice: 0,         // lower bound for price slider  
  maxPrice: 2000,      // upper bound for price slider  
  currentPrice: 2000   // current position of the price slider  
}
```

## 3. filteredListings - Filtered Array of Listings
- Type: `Array<Object>`
- Derived from `mockListings` using `.filter()`
- Contains only listings that match all active search + filter criteria:

    - Title or description matches search term

    - Price is within range

    - Location and bedroom filters match

    - Amenities contain "furnished" or "pet" if toggled

    - Utilities info includes selected keyword

<br>

# State Variables

### searchTerm

```javascript
const [searchTerm, setSearchTerm] = useState('');
```

- What it does: Stores what the user types into the search bar.

- Why it matters: It’s used to filter the listings by matching the house title or description.

- Update trigger: Changes every time the user types in the search box.

### isFilterOpen

```javascript
const [isFilterOpen, setIsFilterOpen] = useState(false);

```

- What it does: Controls whether the filter drawer is open or hidden.

- Why it matters: Lets the UI toggle between showing and hiding the filters on small or mobile screens.

- Update trigger: Set to true when the "Filters" button is clicked, and false when "Apply Filters" or ✕ is clicked.    
<br>

# Confusing Things to Mention


### 1. ```filters.priceRange``` vs ```filters.currentPrice```  

- `priceRange`: Used in the `.filter()` function to compared house prices. 
- `currentprice`: Used to display and control the position of the slider
- Important: These values are set together when the slider is moved
- Keep them in sync - if they fall out of sync, the filtering logic may not work as expected

### 2. `house.price` is a formatted string like `$1,200/month`
- Prices in `mockListings` are strings, not numbers. 
- In order to compare prices, you must clean the string:  
``` javascript
parseFloat(house.price.replace(/[^0-9.]/g, ''))
```

### 3. Case-insensitive comparisons for search and filters
- To make matching user input reliable, all compairons are done using `.toLowerCase()`  

```javascript
house.title.toLowerCase().includes(searchTerms.toLowerCase())
```
- If this is removed, case-sensitive issues may arise, breaking expected behaviour

### 4. Furnished, pet-friendly and future filters use `.some(...)`
- Amentities are stored as arrays of strings
- To check if an amenity like "Furnished" exists, the filter uses:
```javascript
house.amenities.some((a) => a.toLowerCase().includes('furnished'))
```
- ex. a = 'Wi-Fi'  
    a = 'Furnished'

