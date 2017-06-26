// Include React
var React = require("react");

var helpers = require("../utils/helpers");
var Search = require("./children/Search");

// Here we include all of the sub-components
// import Form from "./children/Form";
// import Results from "./children/Results";
// import History from "./children/History";

// Helper for making AJAX requests to our API
// import helpers from "./utils/helpers";

// Creating the Main component
var Main = React.createClass({

  // Here we se{t a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", beginDate: "", endDate: "", results: [], history: [] };
  },

  // The moment the page renders get the History
  componentDidMount: function() {
    // Get the latest history.
    helpers.getHistory().then(function(response) {
      console.log(response);
      if (response !== this.state.history) {
        console.log("History", response.data);
        this.setState({ history: response.data });
      }
    }.bind(this));
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {

    // Run the query for the address
    helpers.query(this.state.searchTerm, this.state.beginDate, this.state.endDate).then(function(data) {
      
        console.log("Results", data);
        this.setState({ results: data });

        // After we've received the result... then post the search term to our history.
        helpers.postHistory(this.state.results).then(function() {
          console.log("Updated!");

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {
            console.log("Current History", response.data);

            console.log("History", response.data);

            this.setState({ history: response.data });

          }.bind(this));
        }.bind(this));
      }.bind(this));
  
    },
  // This function allows childrens to update the parent.
  setTerm: function(searchTerm, beginDate, endDate) {
    
    this.setState({ searchTerm: searchTerm,
                    beginDate: beginDate,
                    endDate: endDate });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Scrubber</h2>
            <p className="text-center">
             
            </p>
          </div>

          <div className="col-md-12">

            <Search setTerm={this.setTerm} />

          </div>

          <div className="row">

            {/*<Results address={this.state.results} />*/}

          </div>

        </div>

        <div className="row">

          {/*<History history={this.state.history} />*/}

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
