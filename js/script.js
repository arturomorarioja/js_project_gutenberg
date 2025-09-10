import { BASE_URL } from './env.js';

fetch(BASE_URL)
.then(response => response.json())
.then(data => {
    const bookList = document.createDocumentFragment();
    data.results.forEach(book => {
        const card = document.querySelector('#book_card').content.cloneNode(true);

        card.querySelector('h2').innerText = book.title;

        let authors = book.authors[0]?.name;
        book.authors.shift();
        book.authors.forEach(author => {
            authors += ` / ${author.name}`;
        });
        card.querySelector('h3').innerText = authors;

        const cover = card.querySelector('img');
        cover.setAttribute('src', book.formats['image/jpeg']);
        cover.setAttribute('alt', book.title);

        card.querySelector('.description').innerText = book.summaries[0] ?? '';

        const link = card.querySelector('a');
        link.setAttribute('href', book.formats['text/html']);
        link.setAttribute('title', `Read ${book.title} online`);

        bookList.append(card);
    });
    document.querySelector('#wait').classList.add('hidden');
    document.querySelector('#book_list').append(bookList);
});