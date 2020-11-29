import React from 'react';

class Pagination extends React.Component {

    render() {
        const pokemonArray = this.props.pages
        // console.log(this.state.pages)
        //3. Mostrar las páginas disponibles
        //Si solicitamos la página 10 mostrariamos [5, 6, 7, 8, 9, 10, 11, 12, 13, 14] ( |10 - 5| |10 + 4| )
        //Si solicitamos la página 14 mostrariamos [9, 10, 11, 12, 13, 14, 15, 16, 17, 18] ( |14 - 5 | |14 + 4| )
        return (
            <div className="pagination-row">
                {
                    this.props.currentPage > 5 ? 
                    <button onClick={() => this.props.changePagesFn(this.props.currentPage - 1)}>previous</button> : null
                }
                {
                    pokemonArray.map( (element) => {
                        return <div className="item" onClick={() => {
                            this.props.fetchPageFn(element); this.props.changePagesFn(element)
                        }}>{element}</div>
                    })
                }
                <button onClick={() => this.props.changePagesFn(this.props.currentPage + 1)}>next</button>
            </div>
        )
    }
}

export default Pagination;