const React = require('react');
const PropTypes = require('prop-types');

const header = function(props) {
    return (
        <div className="header">
            <p>Glorious Gifs!!!</p>
            <label
                className="refresh-btn"
                type="button"
                onClick={props.handleRefresh}>
                <i className="fa fa-refresh" aria-hidden="true"></i>
            </label>
        </div>
    )
}

header.propTypes = {
    handleRefresh: PropTypes.func.isRequired
}

module.exports = header;
