const React = require('react');

const RandomGifs = require('./RandomGifs');
const Header = require('./Header');

class App extends React.Component{
    constructor(props) {
        super(props);

        this.handleRefresh = this.handleRefresh.bind(this);
    }

    // this method gets passed to header as prop
    // and calls the handleRefresh method of RandomGif component
    handleRefresh() {
        this.refToRandomGif.handleRefresh();
    }

    render() {
        return (
            <div className="container" id="appContainer">
                <Header handleRefresh={this.handleRefresh}/>
                <RandomGifs ref={(refToChild) => {this.refToRandomGif = refToChild }} />
            </div>
        )
    }
}

module.exports = App;
