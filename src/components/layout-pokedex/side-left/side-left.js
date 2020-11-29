import React from 'react'

// Import Styles
import './side-left.css'


class SideLeft extends React.Component {

    render() {

        return (
            <>
                <div className={`left-side ${this.props.transitionPokedex ? 'left-show-pokemons' : ''}`}>
                    <div className="left-side__notches-top left-side__notches-top--position-absolute">
                        <div className="left-side__top-notch-outside">
                            <div className="left-side__top-notch-in"></div>
                        </div>
                    </div>
                    <div className="left-side__notches-bottom left-side__notches-bottom--position-absolute">
                        <div className="left-side__bottom-notch-outside">
                            <div className="left-side__bottom-notch-in"></div>
                        </div>
                    </div>
                    <div className="left-side__half-pokeball">
                        <div className="half-left-pokeball">
                            <div className="half-left-pokeball__outline-top"></div>
                            <div className="half-left-pokeball__outline-bottom"></div>
                            <div className="half-left-pokeball__half">
                                <div className="half-left-pokeball__half-top"></div>
                                <div className="half-left-pokeball__half-bottom"></div>
                                <div className="half-left-pokeball__in">
                                    <div className="half-left-pokeball__in-top"></div>
                                    <div className="half-left-pokeball__in-bottom"></div>
                                    <div className="half-left-pokeball__button" onClick={() => this.props.showDisplayFn()}>
                                        <div className="half-left-pokeball__button-top"></div>
                                        <div className="half-left-pokeball__button-bottom"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SideLeft