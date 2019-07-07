const toolkit = require('./toolkit')
const matrix = toolkit.makeMatrix()

class Grid {
    constructor(container) {
        this._$container = container
    }

    build() {
        const matrix = toolkit.makeMatrix()
        console.log('matrix', matrix)

        const $cells =   matrix.map(rowValues =>
             rowValues.map(cellValue => {
                return $('<span>').addClass('cell').text(cellValue)
            })
        )

        console.log('$cells', $cells)

        const  $divArray =   $cells.map($spanArray =>  {
            return $('div')
                // .addClass('row')
                .append($spanArray)
        })

        console.log('  $divArray', $divArray)
        this._$container.append($divArray)
    }

}

new Grid($('#container')).build()
