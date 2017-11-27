const React = require('react');
const PropTypes = require('prop-types');
const imgsLoaded = require('imagesloaded');

const GifDetail = require('./GifDetail');

function resizeGridItem(item){
    const grid = document.getElementsByClassName('gif-grid')[0];
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.item-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
}

function resizeAllGridItems(){
    const allItems = document.getElementsByClassName("img-cell");
    for (let x=0; x<allItems.length; x++) {
        imgsLoaded( allItems[x], resizeInstance);
    }
}

function resizeInstance(instance){
    const item = instance.elements[0];
    resizeGridItem(item);
}

class GifGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailView: false,
            currentGifObj: null
        }

        this.handleImgChange = this.handleImgChange.bind(this);
        this.closeDetailView = this.closeDetailView.bind(this);
        this.nextGifDetail = this.nextGifDetail.bind(this);
        this.prevGifDetail = this.prevGifDetail.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", resizeAllGridItems);
        resizeAllGridItems();
    }

    componentDidUpdate(prevProps, prevState) {
        if ( prevProps.gifs !== this.props.gifs || prevState !== this.state) {
            resizeAllGridItems();
        }
    }

    handleImgChange() {
        const gridElement = this.refs.gridElement;
        // if ( imagesLoaded(gridElement) === true) {
        //     this.props.closeLoadingScreen();
        // }
        imgsLoaded(gridElement, this.props.closeLoadingScreen);
    }

    handleClickedImage(gifObj) {
        window.scrollTo(0,0);
        this.setState(() => {
            return {
                detailView: true,
                currentGifObj: gifObj
            }
        });
    }

    closeDetailView() {
        this.props.showLoadingScreen();
        this.setState(() => {
            return {
                detailView: false
            }
        });
    }

    nextGifDetail() {
        this.setState(() => {
            return {
                currentGifObj: this.props.gifs[this.state.currentGifObj.index+1]
            }
        });
    }

    prevGifDetail() {
        this.setState(() => {
            return {
                currentGifObj: this.props.gifs[this.state.currentGifObj.index-1]
            }
        });
    }

    render() {
        let index = 0;
        return (
            this.state.detailView ?
            <GifDetail
                currentGifObj={this.state.currentGifObj}
                closeDetailView={this.closeDetailView}
                nextGifDetail={this.nextGifDetail}
                prevGifDetail={this.prevGifDetail}
            />
            :
            <ul className="gif-grid" ref="gridElement" id="gifGrid">
                {this.props.gifs.map((gifObj) => {
                    index++;
                    return (
                        <li key={index} className="img-cell panel">
                            <div className="item-content">
                                <img
                                    src={gifObj.img_url}
                                    className="responsive-image"
                                    onLoad={this.handleImgChange}
                                    onError={this.handleImgChange}
                                    onClick={this.handleClickedImage.bind(this,gifObj)}
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

GifGrid.propTypes = {
    gifs: PropTypes.array.isRequired,
    closeLoadingScreen: PropTypes.func.isRequired,
    showLoadingScreen: PropTypes.func.isRequired
}

module.exports = GifGrid;
