# Under node-app
	1. Run npm install command
		This command will install all the required npm packages
	2. Run npm run start command
		This command will start the node server
	3. This code has two endpoints :
		i. localhost:8081/crawlImdb for crawling imdb data and storing it in json file under uploads folder
		ii. localhost:8081/listMovies to return crawled data from json file

# Under react-app
	1. Run npm install command
		This command will install all the required npm packages
	2. Run npm run start command
		This command will start the react server with all the fetched data
	3. This code makes an http request to localhost:8081/listMovies endpoint and retrieve the json data. Once 
		the data is available, it populates it over the browser.
		

# Note
	Please start node server before starting the react server and run localhost:8081/crawlImdb endpoint so that
	the data get crawled from imdb website and get stored in the imdbMovieData.json file else it will populate 
	Loading... message over the react side.