const API_LINK = 'https://api.shrtco.de/v2/shorten?url=';

const menuIcon = document.querySelector('.header_icon');
const menu = document.querySelector('.menu');
const linkControl = document.querySelector('.shorten_input');
const linkBtn = document.querySelector('.shorten_btn');
const generatedLinks = document.querySelector('.shorten_links');

setupListeners();

function setupListeners() {
   menuIcon.addEventListener('click', () => {
      menu.classList.toggle('menu--visible');
   });

   linkBtn.addEventListener('click', () => {
      if (linkControl.value.length < 6) return;
      shortenLink(linkControl.value);
   });
}

async function shortenLink(link) {
   const response = await fetch(API_LINK + link);
   const data = await response.json();

   generatedLinks.appendChild(createLinkElement(data));
}

function createLinkElement(data) {
   const element = document.createElement('div');
   const linkSpan = document.createElement('span');
   const shortLink = document.createElement('a');
   const button = document.createElement('button');

   element.classList.add('shorten_item');
   linkSpan.classList.add('shorten_span');
   shortLink.classList.add('shorten_link');
   button.classList.add('btn', 'btn--small');

   linkSpan.innerText = data.result.original_link;
   shortLink.innerText = data.result.short_link;
   button.innerText = 'Copy!';

   shortLink.setAttribute('href', `https://${data.result.short_link}`);


   button.addEventListener('click', async () => {
      await copyToClipboard(data.result.short_link)

      button.classList.add('btn--active');
      button.innerText = 'Copied!';
   });

   element.appendChild(linkSpan);
   element.appendChild(shortLink);
   element.appendChild(button);

   return element;
}

async function copyToClipboard(text) {
   const clipboardText = await navigator.clipboard.readText();
   clipboardText = text;
}
