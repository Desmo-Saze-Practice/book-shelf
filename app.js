// Pour une présentation de notre séléction littéraire 
// nous utilisons un page web il nous faut donc la libraire http
// afin de créer notre serveur
const http = require('http');


// formating date with dayjs module
var dayjs = require('dayjs');

// to get element age
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

// for advanced format
var advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);
dayjs().format('');

dayjs.locale('fr');

const host = 'http://localhost:3000';

// Séléction de livres incontournables
const books = [
    {
        title: "The Fellowship of the Ring",
        language: "English",
        country: "United Kingdom",
        author: "J.R.R. Tolkien",
        date: "1954-07-29"
    },
    {
        title: "Prelude to foundation",
        language: "English",
        country: "United States",
        author: "Isaac Asimov",
        date: "1988-11-08"
    },
    {
        title: "Voyage au centre de la terre",
        language: "Français",
        country: "France",
        author: "Jules Verne",
        date: "1864-11-25"
    },
    {
        title: "La nuit des temps",
        language: "Français",
        country: "France",
        author: "René Barjavel",
        date: "1968-05-20"
    },
    {
        title: "Carrion Comfort",
        language: "English",
        country: "United States",
        author: "Dan Simmons",
        date: "1989-02-15"
    }
];
const drawTable = books.forEach(index => {
    `    <tr>
    <p>YO</p>
    </tr>`
});
// Création de notre serveur
const server = http.createServer((req, res) => {


    // On court-circuite l'appel automatique du navigateur au favicon.ico
    // sinon l'appel au script ce fera 2 fois et il ecrira "Hum, 50 alors ?" dedans
    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }

    // On envoi les header de la réponse http
    // ici nous voulons une réponse de type text encodé en UTF-8
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // On écrit l'entête de notre page html
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./style.css">
    <title>Document</title>
    </head>
    <body>
    <table>
    <tbody>
    `);

    // Corps de la page
    books.forEach(book => {
        
        let bookDate = dayjs(book.date).format('YYYY-MM-DD');
        console.log('book year is ', bookDate);

        let bookAge = dayjs().to(dayjs(bookDate));
        console.log('fuck ', bookAge);

        let bookPublicationDate = dayjs(book.date).format('dddd MMMM Do YYYY');
        console.log('book date formated ', bookPublicationDate);
        

        res.write(`
        <tr>
            <td>${book.title}</td>
            <td>${book.language}</td>
            <td>${book.country}</td>
            <td>${book.author}</td>
            <td>${bookPublicationDate}</td>
            <td>${bookAge}</td>
        </tr>`
        );
    });

    // On écrit le pied de page de notre page html
    res.write(`
    </tbody>
    </table>
    </body>
    </html>`);

    // On à fini d'envoyer nos informations au client
    res.end();

});

// Notre serveur sera sur le port 3000
server.listen(3000, () => {
    console.log(`server live at ${host}`);
});
