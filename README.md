# PlanningPoker

For use in distributed Agile SCRUM teams for estimating story points.

Vintage: 2015

## Installation

You will need Node.js installed

```bash
git clone  https://github.com/alexellis/PlanningPoker
cd PlanningPoker

npm install
npm install -g bower # This may need sudo

bower install
```

## Running the software

```bash
cd PlanningPoker
node app.js
```

Now open a browser and navigate [to your local instance](http://localhost:8000/).

Instructions are provided on how to play on the homepage.

* The dealer / PM / Scrum master logs in first and starts a game with a story i.e. "As a user I want to pay per month for the PDF generation service"
* The players all join and wait
* The dealer sends the story
* Each player picks a t-shirt size estimation card
* Then the dealer hits "send cards" and all the team see the cards

### Invite the team

If you would like to know what IP address to give to your team-mates you can find it with `ipconfig` on windows and `ifconfig` on most Mac/Linux machines.
If you'd like to share a game over the Internet, then consider using [inlets.dev - the cloud native tunnel](https://docs.inlets.dev/).

## License

MIT

Contributions are not being accepted at this time, but feel free to fork the project if it is of value to you.