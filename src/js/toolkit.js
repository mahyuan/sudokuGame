const matrixToolkit = {
    makeRow( v = 0) {
        const arr = new Array(9)
        arr.fill(v)
        return arr
        return Array.from({ length: 9 })
            .fill(v)
    },

    makeMatrix( v = 9) {
        return  Array.from({ length: 9 })
        .map(() => this.makeRow())
    },

    /**
     * Fisher-Yates 洗牌算法
     */
    shuffle(array) {
        const endIndex = array.length - 2
        for(let i = 0; i <= endIndex; i++) {
            const j = Math.floor(Math.random() * ( array.length - i)) + i;
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }
}

module.exports = matrixToolkit
