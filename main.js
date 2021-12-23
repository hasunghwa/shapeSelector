function loadItems() {
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.items);
}

function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
 return `
 <li class="item">
   <img class="item_thumbnail" src="${item.path}" alt="${item.type}">
   <span class="item_description">${item.type}, ${item.color}</span>
 </li>
 `
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  displayItems(items.filter( item => item[key] == value));
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));  
}

// main
loadItems()
.then(items => {
  console.log(items);
  displayItems(items);
  setEventListeners(items)
})
.catch(console.log);