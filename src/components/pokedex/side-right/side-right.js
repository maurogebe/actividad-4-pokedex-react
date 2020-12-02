import React from 'react'

// Import Style
import './side-right.css'


class SideRight extends React.Component {

    render() {

        return (
            <>
                <div className={`right-side ${this.props.transitionPokedex ? 'right-show-pokemons' : ''} ${this.props.showShowDirectlyAccess ? (this.props.showDirectlyAccess ? 'show-directly-access-right' : 'right-side-static') : null}`}>
                    <div className="right-side__notches-top right-side__notches-top--position-absolute">
                        <div className="right-side__top-notch-outside">
                            <div className="right-side__top-notch-in"></div>
                        </div>
                    </div>
                    <div className="right-side__notches-bottom right-side__notches-bottom--position-absolute">
                        <div className="right-side__bottom-notch-outside">
                            <div className="right-side__bottom-notch-in"></div>
                        </div>
                    </div>
                    <div className="right-side__half-pokeball">
                        <div className="half-right-pokeball">
                            <div className="half-right-pokeball__outline-top"></div>
                            <div className="half-right-pokeball__outline-bottom"></div>
                            <div className="half-right-pokeball__half">
                                <div className="half-right-pokeball__half-top"></div>
                                <div className="half-right-pokeball__half-bottom"></div>
                                <div className="half-right-pokeball__in">
                                    <div className="half-right-pokeball__in-top"></div>
                                    <div className="half-right-pokeball__in-bottom"></div>
                                    <div className="half-right-pokeball__button"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SideRight