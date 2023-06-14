// THE SHOWSLIDES
let slideIndex = 1;
showSlides(slideIndex);

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("Round_Button");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


// PRODUCTTTTT
let productIndex = 1;
showProducts(productIndex);

// Thumbnail image controls
function currentProduct(n) {
    showProducts(productIndex = n);
}

function showProducts(n) {
    let i;
    let products = document.getElementsByClassName("myProducts");
    let dots = document.getElementsByClassName("Nav_Button");
    if (n > products.length) { productIndex = 1 }
    if (n < 1) { productIndex = products.length }
    for (i = 0; i < products.length; i++) {
        products[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    products[productIndex - 1].style.display = "block";
    dots[productIndex - 1].className += " active";
}

// SEARCH BARRRRR
document.querySelector('.SearchBar form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
    const searchInput = document.querySelector('.searchInput').value;
    performSearch(searchInput);
});

function performSearch(searchQuery) {
    // Assuming you have an array of objects to search through
    const data = [
        // Traditional
        { click: 'onclick="showProductOverlay(\'Matcha\')"', name: 'Matcha', price: '250g - 10.99$', image: '/frontEnd/Assets/Pics/TranditionalTea/Matche edited.png' },
        { click: 'onclick="showProductOverlay(\'Hojicha\')"', name: 'Hojicha', price: '250g - 10.99$', image: '/frontEnd/Assets/Pics/TranditionalTea/Hojicha edited.png' },
        { click: 'onclick="showProductOverlay(\'Sencha\')"', name: 'Sencha', price: '250g - 10.99$', image: '/frontEnd/Assets/Pics/TranditionalTea/Sencha edited.png' },
        { click: 'onclick="showProductOverlay(\'Konacha\')"', name: 'Konacha', price: '250g - 10.99$', image: '/frontEnd/Assets/Pics/TranditionalTea/Konacha edited.png' },
        { click: 'onclick="showProductOverlay(\'Genmaicha\')"', name: 'Genmaicha', price: '250g - 10.99$', image: '/frontEnd/Assets/Pics/TranditionalTea/Genmaicha edited.png' },
        { click: 'onclick="showProductOverlay(\'Kunicha\')"', name: 'Kunicha', price: '250g - 10.99$', image: '/frontEnd/Assets/Pics/TranditionalTea/Kuchicha edited.png' },
        { click: 'onclick="showProductOverlay(\'Tamaruokucha\')"', name: 'Tamaruokucha', price: '250g - 10.99$', image: '/frontEnd/Assets/Pics/TranditionalTea/Tamaruokucha edited.png' },

        // WW
        { click: 'onclick="showProductOverlay(\'VN_Sen\')"', name: 'VN_Sen', price: '250g - 10.99$', image: '/Assets/Pics/WordwideTea/VN_Sen edited.png' },
        { click: 'onclick="showProductOverlay(\'VN_Olong\')"', name: 'VN_Olong', price: '250g - 10.99$', image: '/Assets/Pics/WordwideTea/VN_Olong edited.png' },
        { click: 'onclick="showProductOverlay(\'VN_NonTom\')"', name: 'VN_NonTom', price: '250g - 10.99$', image: '/Assets/Pics/WordwideTea/VN_NonTom edited.png' },
        { click: 'onclick="showProductOverlay(\'India_Nilgiri\')"', name: 'India_Nilgiri', price: '250g - 10.99$', image: '/Assets/Pics/WordwideTea/India_Nilgiri edited.png' },
        { click: 'onclick="showProductOverlay(\'India_Darjeeling\')"', name: 'India_Darjeeling', price: '250g - 10.99$', image: '/Assets/Pics/WordwideTea/India_Darjeeling edited.png' },
        { click: 'onclick="showProductOverlay(\'China_Longtinh\')"', name: 'China_Longtinh', price: '250g - 10.99$', image: '/Assets/Pics/WordwideTea/China_Longtinh edited.png' },
        { click: 'onclick="showProductOverlay(\'China_HSMP\')"', name: 'China_HSMP', price: '250g - 10.99$', image: '/Assets/Pics/WordwideTea/China_HSMP edited.png' },
        // Flower
        { click: 'onclick="showProductOverlay(\'Lavender\')"', name: 'Lavender', price: '250g - 10.99$', image: '/Assets/Pics/FlowerTea/Lavender edited.png' },
        { click: 'onclick="showProductOverlay(\'Lily\')"', name: 'Lily', price: '250g - 10.99$', image: '/Assets/Pics/FlowerTea/Lily edited.png' },
        { click: 'onclick="showProductOverlay(\'Osmanthus\')"', name: 'Osmanthus', price: '250g - 10.99$', image: '/Assets/Pics/FlowerTea/Osmanthus edited.png' },
        { click: 'onclick="showProductOverlay(\'Rose\')"', name: 'Rose', price: '250g - 10.99$', image: '/Assets/Pics/FlowerTea/Rose edited.png' },
        { click: 'onclick="showProductOverlay(\'Jasmine\')"', name: 'Jasmine', price: '250g - 10.99$', image: '/Assets/Pics/FlowerTea/Jasmine edited.png' },

    ];

    // Trim the search query to remove leading/trailing whitespace
    const trimmedQuery = searchQuery.trim();

    // Check if the search query is empty
    if (trimmedQuery === '') {
        // If empty, clear the results container
        displayResults([]);
        return;
    }

    // Perform the search
    const searchResults = data.filter(item => {
        const lowerCaseItem = item.name.toLowerCase();
        const lowerCaseQuery = searchQuery.toLowerCase();
        return lowerCaseItem.includes(lowerCaseQuery);
    });

    // Display search results
    displayResults(searchResults);
}

function displayResults(results) {
    const resultsContainer = document.querySelector('.resultsContainer');
    resultsContainer.style.display = 'block'; // Show the results container

    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        // No results found
        resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        // Render each result
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `
          <div class="Body_Tea_ProductSearch" ${result.click} >
            <div class="Body_Tea_ProductSearch_Pic">
              <img src="${result.image}" alt="">
            </div>

            <div class="Body_Tea_ProductSearch_Content">
                <div class="Body_Tea_ProductSearch_Content_Tittle">
                    <div class="Tea_ProductSearch_Tittle">
                        ${result.name}
                    </div>
                    <div class="Tea_ProductSearch_Slogan">
                        Lorem ipsum dolor sit amet
                    </div>
                </div>
                <div class="Tea_ProductSearch_Price">
                    ${result.price}
                </div>
            </div>
          </div>
        `;
            resultsContainer.appendChild(resultElement);
        });
    }
}

// TEA PRODUCT INFORMATIONNNNNN

function showProductOverlay(productName) {
    var productInfo = getProductInfo(productName);
    var overlay = document.querySelector('.FullScreen');
    var overlayContent = document.querySelector('.productOverlayContent');
    overlayContent.innerHTML = `
        <div class="FullScreen_Box_Content">
            <div class="FullScreen_Box_Content_Visual">
                <div class="FullScreen_Box_Content_Pic">
                    <img src="${productInfo.image}" alt="">
                </div>
                <div class="FullScreen_Box_Content_TittleAndDescript">
                    <div class="FullScreen_Box_Content_Tittle">
                        <b>${productInfo.name}</b>
                    </div>

                    <div class="FullScreen_Box_Content_Descript">
                        <div class="FullScreen_Box_Content_DescriptInfo ">
                            <div class="FullScreen_Box_Content_InfoPrice inline">
                                <b>Price: </b>
                                <p>....</p>
                            </div>
                            <div class="FullScreen_Box_Content_InfoBrand inline">
                                <b>Brand: </b>
                                <p>....</p>
                            </div>
                            <div class="FullScreen_Box_Content_InfoUnit inline">
                                <b>Unit Count: </b>
                                <p>....</p>
                            </div>
                            <div class="FullScreen_Box_Content_InfoHar inline">
                                <b>Harvested in: </b>
                                <p>....</p>
                            </div>
                        </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra</p>
                    </div>
                </div>
            </div>
            <div class="FullScreen_Box_ScrollDIV">
                <div class="FullScreen_Box_ScrollObj">
                        <p>${productInfo.description}</p>
                </div>
            </div>
        </div>
        <div class="FullScreen_Box_Add">
            <div class="FullScreen_Box_AddButton">
                <b>Add to cart</b>
            </div>
        </div> `;

    overlay.style.display = 'flex';
}

function closeProductOverlay(event) {
    var overlay = document.querySelector('.FullScreen');
    var overlayContent = document.querySelector('.productOverlayContent');
    var isOverlayClicked = event.target === overlay || overlay.contains(event.target);
    var isContentClicked = event.target === overlayContent || overlayContent.contains(event.target);

    if (!isOverlayClicked || isContentClicked) {
        return;
    }

    overlay.style.display = 'none';
}


// Example function to retrieve the product information
function getProductInfo(productName) {
    var productData = {
        // Tranditional
        Matcha: {
            image: "/Assets/Pics/TranditionalTea/Matche edited.png",
            name: "Matcha",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Sencha: {
            image: "/Assets/Pics/TranditionalTea/Sencha edited.png",
            name: "Sencha",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Konacha: {
            image: "/Assets/Pics/TranditionalTea/Konacha edited.png",
            name: "Konacha",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Genmaicha: {
            image: "/Assets/Pics/TranditionalTea/Genmaicha edited.png",
            name: "Genmaicha",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Kunicha: {
            image: "/Assets/Pics/TranditionalTea/Kuchicha edited.png",
            name: "Kunicha",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Tamaruokucha: {
            image: "/Assets/Pics/TranditionalTea/Tamaruokucha edited.png",
            name: "Tamaruokucha",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Hojicha: {
            image: "/Assets/Pics/TranditionalTea/Hojicha edited.png",
            name: "Hojicha",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        // WW
        VN_Sen: {
            image: "/Assets/Pics/WordwideTea/VN_Sen edited.png",
            name: "VN_Sen",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        VN_NonTom: {
            image: "/Assets/Pics/WordwideTea/VN_NonTom edited.png",
            name: "VN_NonTom",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        VN_Olong: {
            image: "/Assets/Pics/WordwideTea/VN_Olong edited.png",
            name: "VN_Olong",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        India_Nilgiri: {
            image: "/Assets/Pics/WordwideTea/India_Nilgiri edited.png.png",
            name: "India_Nilgiri",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        India_Darjeeling: {
            image: "/Assets/Pics/WordwideTea/India_Darjeeling edited.png",
            name: "India_Darjeeling",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        China_Longtinh: {
            image: "/Assets/Pics/WordwideTea/China_Longtinh edited.png",
            name: "China_Longtinh",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        China_HSMP: {
            image: "/Assets/Pics/WordwideTea/China_HSMP edited.png",
            name: "China_HSMP",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        // FLOWERR
        Jasmine: {
            image: "/Assets/Pics/FlowerTea/Jasmine edited.png",
            name: "Jasmine",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Lavender: {
            image: "/Assets/Pics/FlowerTea/Lavender edited.png",
            name: "Lavender",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Lily: {
            image: "/Assets/Pics/FlowerTea/Lily edited.png",
            name: "Lily",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Osmanthus: {
            image: "/Assets/Pics/FlowerTea/Osmanthus edited.png",
            name: "Osmanthus",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },
        Rose: {
            image: "/Assets/Pics/FlowerTea/Rose edited.png",
            name: "Rose",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetraLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra  <br> Nulla ut tincidunt lorem.Morbi lorem risus, venenatis egetefficitur et, semper at arcu.Maecenas imperdiet aliquam elit, pharetra"
        },

    };

    return productData[productName];
}
