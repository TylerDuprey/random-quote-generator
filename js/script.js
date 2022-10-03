/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/*** 
 * `quotes` array 
***/
const quotes = [
  {
      quote: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
      source: "Patrick McKenzie",
      citation: "Twitter"
  },
  {
      quote: "Resentment and cynicism suffocate the human spirit. Choose optimism, and fight for the best possible future you can imagine.",
      source: "Lex Fridman",
      citation: "Twitter Web App",
      year: "2022",
      time: "9:52 pm"
  },
  {
      quote: "Do not let ancient grudge break to new mutiny",
      source: "Elon Musk",
      citation: "Twitter for iPhone",
      year: "2022",
      time: "2:49 pm"
  },
  {
      quote: "At ShopTalkShow we've always said \“Just Build Websites\” as general advice on how to get better and to guide you on what to learn next. I believe that now more than ever!",
      source: "Chris Coyier",
      citation: "Twitter for iPhone",
      year: "2019",
      time: "6:21 pm"
  },
  {
      quote: "Hot take: Code is becoming more and more portable and if you're a hosting provider who isn't rapidly evolving, you're in trouble.",
      source: "Dave Rupert",
      citation: "Twitter Web App",
      year: "2022",
      time: "5:33 pm"
  },
  {
      quote: "Things that get a rise out of ux designers: hamburger menus, qr codes, and carousels.",
      source: "Brad Frost",
      citation: "Twitter Web Client",
      year: "2015",
      time: "6:11 pm"
  },
  {
      quote: "I think the best advice I can give is to be honest with yourself and your colleagues; no one benefits from an employee that\'s burnt out.",
      source: "David Walsh",
      citation: "Evrone",
      year: "2015"
  }
]

const config = {
  container: 'quote-box',
  timer: 4000,
  background: document.querySelector('body'),
  maxRgbValue: 150 /* Better bg contrast with values of 150 and below */
}

/***
 * Instantiate a variable to track available quotes and remove the first quote from the list of available quotes (shows on the page when loaded)
 */
let availableQuotes = quotes.filter( quote => quote !== quotes[0] )

/***
 * `getRandomNumber` function
***/
const getRandomNumber = max => Math.floor( Math.random() * max )

/***
 * `getRandomQuote` function
***/
const getRandomQuote = quotes => quotes[ getRandomNumber(quotes.length) ]

/***
 * `printQuote` function
***/
const printQuote = () => {

	const randomQuote = getRandomQuote(availableQuotes)

	const addInnerHTML = (container, html) => document.querySelector(`.${container}`).innerHTML = html

	const getHtmlElements = randomQuote => {

	let {quote, source, citation, year, time} = randomQuote;

	quote = quote !== undefined ? quote : 'Missing Quote.'
	source = source !== undefined ? source : 'Unknown Source'
	citation = citation !== undefined ? `<span class="citation">${citation}</span>` : '',
	year = year !== undefined ?  `<span class="year">${year}</span>` : '',
	time = time !== undefined ?  `<span class="time"> | ${time}</span>` : ''

	return `
		<p class="quote">${quote}</p>
		<p class="source">${source}${citation}${year}${time}</p>
	`

	}

	addInnerHTML(config.container, getHtmlElements(randomQuote))

	availableQuotes = availableQuotes.length > 1 ? availableQuotes.filter( quote => quote !== randomQuote ) : quotes

	/* Reset the interval so that it doesn't switch to fast after a click */
	clearInterval( autoQuote )
	autoQuote = setInterval( printQuote, config.timer)

	/* Set to a random bg with each quote */
	setRandomBackground()

}

/***
 * Automate the quotes with a set interval. 
***/
let autoQuote = setInterval( printQuote, config.timer )

/* Set the background to a random RGB color */
const setRandomBackground = () => {
		
	const rgbValues = []

	/***
	 * Set the background element to a random RGB value
	***/
	config.background.style.backgroundColor = `rgb(
		${getRandomNumber(config.maxRgbValue)}, 
		${getRandomNumber(config.maxRgbValue)}, 
		${getRandomNumber(config.maxRgbValue)}
	)`
}

/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/
document.getElementById('load-quote').addEventListener("click", printQuote, false);