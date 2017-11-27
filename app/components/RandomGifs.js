const React = require('react');
const PropTypes = require('prop-types');

const api = require('../utilities/api.js');
const Loading = require('./Loading');
const GifGrid = require('./GifGrid');

function bottomReached(element) {
    if (element) {
        return element.getBoundingClientRect().bottom <= window.innerHeight;
    }
}

function imgToFetchAmount(width) {
    if (width < 768) {
        return 12;
    }
    else if (width < 1000) {
        return 18;
    }
    else {
        return 25;
    }
}

class RandomGifs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gifs:null,
            width: 0,
            height: 0
        };

        this.loadRandomGifs = this.loadRandomGifs.bind(this);
        this.closeLoadingScreen = this.closeLoadingScreen.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.showLoadingScreen = this.showLoadingScreen.bind(this);
    }

    componentWillMount() {
        this.updateWindowDimensions();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        document.addEventListener('scroll', this.scrollHandler);
        this.loadRandomGifs();
    }

    loadRandomGifs() {
        this.setState(()=> {
            return {
                loading: true
            }
        });

        api.fetchRandomGifs(imgToFetchAmount(this.state.width))
            .then((gifObjArray) => {
                const indexOffset = this.state.gifs ? this.state.gifs.length : 0;
                const newGifArr = gifObjArray.map((responseObj, index, thisArr) => {
                    const i = index + indexOffset;
                    return {
                        index: i,
                        img_url: responseObj.data.data.image_url,
                        next_img_url: thisArr[index+1] ? thisArr[index+1].data.data.image_url : null,
                        prev_img_url: thisArr[index-1] ? thisArr[index-1].data.data.image_url : null,
                    }
                });
                // link up new array with old one for next/prev purposes
                if (this.state.gifs) {
                    this.state.gifs[this.state.gifs.length-1].next_img_url = newGifArr[0].img_url;
                    newGifArr[0].prev_img_url = this.state.gifs[this.state.gifs.length-1].img_url;
                }
                this.setState(() => {
                    return {
                        gifs: this.state.gifs ? this.state.gifs.concat(newGifArr) : newGifArr
                    }
                })
            });
    }

    showLoadingScreen() {
        this.setState(()=> {
            return {
                loading: true
            }
        });
    }

    closeLoadingScreen() {
        this.setState(()=> {
            return {
                loading: false
            }
        });
    }

    handleRefresh() {
        this.setState(() => {
            return {
                gifs: null
            }
        });
        this.loadRandomGifs();
        window.scrollTo(0,0);
    }


    scrollHandler() {
        const element = document.getElementById('gifGrid');
        let busy = false;
        if ( !busy && !this.state.loading ){
            if (bottomReached(element)) {
                busy = true;
                setTimeout(() => {
                    busy = false;
                },100);
                this.loadRandomGifs();
            }
        }
    }

    updateWindowDimensions() {
        this.setState(() => {
            return {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    }

    render() {
        return(
            <div>
                <Loading loading={this.state.loading}/>
                {this.state.gifs ? <GifGrid
                                        gifs={this.state.gifs}
                                        closeLoadingScreen={this.closeLoadingScreen}
                                        showLoadingScreen={this.showLoadingScreen}
                                        />
                                 : null }
            </div>
        )
    }
}

module.exports = RandomGifs;
