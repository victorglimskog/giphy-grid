const React = require('react');
const PropTypes = require('prop-types');
const queryString = require('query-string');

const gifDetail = function(props) {
    return (
        <div className="gif-detail-container">
            <div className="gif-detail-inner">
                <div className="row">
                    <div className="gif-detail panel">
                        <img src={props.currentGifObj.img_url} className="responsive-image" />
                    </div>
                </div>
                <div className="row">
                    <div className="preview panel preview panel">
                        { props.currentGifObj.prev_img_url ?
                            <img src={props.currentGifObj.prev_img_url} className="responsive-image" onClick={props.prevGifDetail}/>
                            :
                            null
                        }
                    </div>
                    <label
                        type="button"
                        className="close-btn"
                        onClick={props.closeDetailView}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </label>
                    <div className="preview panel preview panel">
                        { props.currentGifObj.next_img_url ?
                            <img src={props.currentGifObj.next_img_url} className="responsive-image" onClick={props.nextGifDetail}/>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

gifDetail.propTypes = {
    currentGifObj: PropTypes.object.isRequired,
    closeDetailView: PropTypes.func.isRequired,
    nextGifDetail: PropTypes.func.isRequired,
    prevGifDetail: PropTypes.func.isRequired
}

module.exports = gifDetail;
