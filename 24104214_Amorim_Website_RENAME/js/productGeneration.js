
/*
TODO: add choice for how many products per row (would have to change the 3 in (i-1) % 3 === 0  statement to desired)
TODO:change from xml request to Async/await to test
TODO: add some type of validation if it loaded or provide an error
*/
const currentUrlPath = window.location.pathname;

const cardLinkTemplate = (productCategoryObject, productIterator) => {
  return `
    <div class="col">
      <div class="card">
        <img class="card-img-top img-fluid" src="${productCategoryObject[productIterator].image}" alt="card image top">
        <div class="card-body">
          <a class="card-title h5" href="${productCategoryObject[productIterator].pageLink}">
            ${productCategoryObject[productIterator].categoryName} </a>
        </div>
      </div>
    </div>
  `
}
const cardTemplate = (productCategoryObject, productsIterator ) => {
  const { image, imageAlt, title, price } = productCategoryObject[productsIterator];
  return `
    <div class="col">
      <div class="card">
        <img class="card-img-top" src="${image}" alt="${imageAlt}">
        <div class="card-body">
          <span class="card-title h5">${title}</span>
          <p class="card-text">${price}</p>
          <a href="#" class="btn btn-primary add-to-cart-btn" 
             data-image="${image}" 
             data-image-alt="${imageAlt}" 
             data-title="${title}" 
             data-price="${price}"
             onclick="addToCart(event)"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  `;
}
const addToCart = (event) => {
  alert('Successfully Added To Cart') ;
  const image = event.target.getAttribute('data-image');
  const imageAlt = event.target.getAttribute('data-image-alt');
  const title = event.target.getAttribute('data-title');
  const price = event.target.getAttribute('data-price');

  const product = { image, imageAlt, title, price };
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push(product);

  localStorage.setItem('cart', JSON.stringify(cartItems));
};
//  3 in % 3 is the number of columns per row
const lengthMod = (productCategoryObject, columnsPerRow = 3, subtractLengthBy = 0) => {
  return (productCategoryObject.length - subtractLengthBy) %  columnsPerRow;
}
const addCardRow = (productCategoryObject, iterator, columnsPerRow = 3, subtractIteratorBy = 0) => {
  if ((iterator - subtractIteratorBy) % columnsPerRow === 0) {
    return `</div><div class="row mb-4 my-4">` ;
  }else if (iterator - subtractIteratorBy === productCategoryObject.length) {
    return `</div>` ;
  }else {
    return ''
  }
}
// allows addition of products,with ability to auto adjust the white space for the missing cards in a row
const addBlankCard = (productCategoryObject, iterator, columnsPerRow= 3, subtractLengthBy = 0  ) => {
  if (lengthMod(productCategoryObject, columnsPerRow, subtractLengthBy) === 2
    && iterator === productCategoryObject.length - 1) {
    return `<div class="col"></div>` ;
  }else if(lengthMod(productCategoryObject, subtractLengthBy) === 1
    && iterator === productCategoryObject.length - 1) {
    return `<div class="col"></div> <div class="col"></div>` ;
  } else {
    return '' ;
  }
}
const categoryTitle = (title = '') => {
  return `<p class="h4 my-1">${title}</p>` ;
}
const updateUI = (response, columnsPerRow = 3) => {

  const categoryLinks =  response.categoryLinks
  const popular = response.popular
  const sneakers = response.sneakers;
  const games = response.games;
  const electrLaptops = response.electronics[0].laptops;
  const electrGraphicsCards = response.electronics[0].graphicsCards;
  const electrGamingTowers = response.electronics[0].gamingTowers;
  const accsVideoGame = response.accessories[0].videoGame;
  const accsComputer = response.accessories[0].computer;
  const accsSneakers = response.accessories[0].sneaker;

  if (currentUrlPath === "/Web-Dev-2023/24104214_Amorim_Website_RENAME/html/index.html") {
    let popularOutput = '' ;
    let linksOutput = '' ;

    for(let i = 0 ; i < categoryLinks.length ; i++ ) {
      linksOutput += addCardRow(categoryLinks, i , columnsPerRow, 2)
        + cardLinkTemplate(categoryLinks, i) + addBlankCard(categoryLinks, i , columnsPerRow) ;
    }
    document.querySelector('#pageCardLinks').innerHTML = `${linksOutput}`

    
    for(let i = 0 ; i < popular.length ; i++) {
      popularOutput += addCardRow(popular, i, 3) + cardTemplate(popular, i)
        + addBlankCard(popular, i , columnsPerRow) ;
    }
    document.querySelector('#popularProducts').innerHTML = `${categoryTitle("Popular")} ${popularOutput}`

  } else if (currentUrlPath === "/Web-Dev-2023/24104214_Amorim_Website_RENAME/html/product1.html") {

     let output = '';
    for (let i = 1; i < sneakers.length; i++) {
      output += addCardRow(sneakers, i, 3,1) + cardTemplate(sneakers, i)
        + addBlankCard(sneakers, i, 3,1);
    }
    document.querySelector('#snkrChoiceOTD').innerHTML = `
        ${categoryTitle("Choice of the Day")}
        <div class="row mb-5 my-4"> ${cardTemplate(sneakers, 0)} <div>`
    document.querySelector('#snkrMain').innerHTML = `${categoryTitle("Sneakers")} ${output}`
  } else if (currentUrlPath === "/Web-Dev-2023/24104214_Amorim_Website_RENAME/html/products3.html") {
    let output = '';
    for (let i = 0; i < games.length; i++) {
      output += addCardRow(games, i, columnsPerRow) + cardTemplate(games, i)
        + addBlankCard(games, i, columnsPerRow);
    }
    document.querySelector('#videoGameContainer').innerHTML = `${categoryTitle("Video Games")} ${output}`
  } else if (currentUrlPath === "/Web-Dev-2023/24104214_Amorim_Website_RENAME/html/products2.html") {
    let laptopOutput = '';
    let graphicsCardsOutput = '';
    let gamingTowersOutput = '';

    for (let i = 0; i < electrLaptops.length; i++) {
      laptopOutput += addCardRow(electrLaptops, i, columnsPerRow) + cardTemplate(electrLaptops, i)
        + addBlankCard(electrLaptops, i, columnsPerRow);
    }
    document.querySelector('#laptopContainer').innerHTML = `${categoryTitle("Laptops")} ${laptopOutput}`;

    for (let i = 0; i < electrGraphicsCards.length; i++) {
      graphicsCardsOutput += addCardRow(electrGraphicsCards, i, columnsPerRow) + cardTemplate(electrGraphicsCards, i)
        + addBlankCard(electrGraphicsCards, i, columnsPerRow);
    }
    document.querySelector('#graphicsCardContainer').innerHTML = `
        ${categoryTitle("Graphics Cards")} ${graphicsCardsOutput}` ;

    for (let i = 0; i < electrGamingTowers.length; i++) {
      gamingTowersOutput += addCardRow(electrGamingTowers, i, columnsPerRow) + cardTemplate(electrGamingTowers, i)
        + addBlankCard(electrGamingTowers, i, columnsPerRow) ;
    }
    document.querySelector('#gamingTowerContainer').innerHTML = `
        ${categoryTitle("Gaming Towers")} ${gamingTowersOutput}` ;
  } else if (currentUrlPath === "/Web-Dev-2023/24104214_Amorim_Website_RENAME/html/products4.html") {
    let accsVideoGameOutput = '' ;
    let accsSneakerOutput = '' ;
    let accsComputerOutput = ''  ;

    for (let i = 0; i < accsVideoGame.length; i++) {
      accsVideoGameOutput += addCardRow(accsVideoGame, i, columnsPerRow) + cardTemplate(accsVideoGame, i)
        + addBlankCard(accsVideoGame, i, columnsPerRow) ;
    }
    document.querySelector('#accsVideoGameContainer').innerHTML = `
      ${categoryTitle("Video Game Accessories")} ${accsVideoGameOutput}` ;

    for (let i = 0; i < accsComputer.length; i++) {
      accsComputerOutput += addCardRow(accsComputer, i, columnsPerRow) + cardTemplate(accsComputer, i)
        + addBlankCard(accsComputer, i, columnsPerRow);
    }
    document.querySelector('#accsComputerContainer').innerHTML = `
      ${categoryTitle("Computer Accessories")} ${accsComputerOutput}` ;

    for (let i = 0 ; i < accsSneakers.length; i++ ) {
      accsSneakerOutput += addCardRow(accsSneakers, i, columnsPerRow) + cardTemplate(accsSneakers, i)
        + addBlankCard(accsSneakers, i, columnsPerRow) ;
    }
    document.querySelector('#accsSneakerContainer').innerHTML = `
      ${categoryTitle("Sneaker Accessories")} ${accsSneakerOutput}` ;
  }
}


const fetchProducts = async () => {
  const response = await fetch('../json/products.json') ;
  const data = await response.json() ;
  if (response.ok) {
    return data ;
  } else {
    throw new Error ('Error while fetching Products') ;
  }
}



/*
const selectElement = document.getElementById('columnsSelect');
selectElement.addEventListener('change', () => {
  const columnsPerRow = selectElement.value;

  fetchProducts().then((data) => {
    updateUI(data, columnsPerRow);
  });
});
*/


try {
  fetchProducts().then((data) => {
    updateUI(data);
  }) ;
} catch (err) {
  console.log(`Error caught: ${err}`)
}
