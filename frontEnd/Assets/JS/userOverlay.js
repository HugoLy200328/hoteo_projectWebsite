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
