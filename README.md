# techdegree-project-7
### Build a Twitter Interface
#### By: Omari Bennett
###### To Start the Twitter Interface app run "npm start"
Using Node to connect to 3rd party APIs provides much greater control than using just AJAX. Server-side communication with APIs offers many more options and greater access to data.

Requirements:  
	* Dependency Management  
		&nbsp;&nbsp; -[] Project includes a package.json file containing dependencies to run the project  
		&nbsp;&nbsp; -[] Running npm install installs relevant dependencies  
	* Server-Side API Access  
		&nbsp;&nbsp; -[] Correctly uses an API key and secret from Twitter to communicate on the server.  
		&nbsp;&nbsp; -[] Application can be authenticated using a config.js file, and contains code allowing a config.js file to be imported into app.js  
	* Correct Express Routes  
		&nbsp;&nbsp; -[] Renders a template with the user’s Twitter info using the ‘/’ route  
	* Rendered Template  
		&nbsp;&nbsp; -[] Matches the sample layout: a header and three columns of data as shown.  
	* Displays Correct Information  
		&nbsp;&nbsp; -[] Displays 5 tweets, 5 friends, and username in a Jade/Pug template that roughly matches the mockups  
		&nbsp;&nbsp; -[] App should try to display 5 direct messages, but if there aren't 5 direct messages available to display, It's okay to show fewer, as long as the app &nbsp;&nbsp; doesn't crash as a result of it.  
Exceeds Expectations:  
	* Server-Side API Access  
		&nbsp;&nbsp; -[] Allows users to post a new tweet.  
	* Correct Express Routes  
		&nbsp;&nbsp; -[] Add an ‘error’ route that renders a friendly error page when something goes wrong.  
	* Rendered Template  
		&nbsp;&nbsp; -[] Display a new tweet without having to refresh the page.  
	* Displays Correct Information  
		&nbsp;&nbsp; -[] Displays the user’s profile background image as the site header’s background