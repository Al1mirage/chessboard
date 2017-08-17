/**
 * @origin https://github.com/andrii-maglovanyi/knight-shortest-path/blob/master/js/src/PathFinder.ts
 * Find the shortest path with a Dijkstra's algorithm.
 */
class PathFinder {
    constructor(start, finish, boardSize = 8) {
        // multidimensional array of starting and finishing coordinates
        this.startAndFinishPoints = [start, finish];
        this.matrix = {};
        this.boardSize = boardSize;
        this.possibleMoves = {
            x: [-1, 1, -2, 2, -2, 2, -1, 1],
            y: [-2, -2, -1, -1, 1, 1, 2, 2]
        };
        this.coordinates = {};
        this.amountOfMoves = 0;
        this.path = [];
        for (let x = 0; x < boardSize; x++) {
            this.matrix[x] = {};
            for (let y = 0; y < boardSize; y++) {
                this.matrix[x][y] = -1;
            }
        }
    }

    /**
     * Return array of all coordinates, reachable from the current position
     *
     * @param iX    Initial x coordinate
     * @param iY    Initial y coordinate
     * @param fX    Searched x coordinate
     * @param fY    Searched y coordinate
     * @param count Number of steps made so far
     *
     * @returns {number[][]}
     */
    listMoves(iX, iY, fX, fY, count) {
        // Array off coordinates arrays which were made on path searching
        const steps = [];
        // Mark matrix cell with a current step
        this.matrix[iX][iY] = count;
        for (let step = 0; step < this.possibleMoves['y'].length; step++) {
            const currentX = iX + this.possibleMoves['x'][step];
            const currentY = iY + this.possibleMoves['y'][step];
            // If step has not gone beyond limits and the cell has not been used
            if (currentX >= 0 && currentX < this.boardSize && currentY >= 0 && currentY < this.boardSize && this.matrix[currentX][currentY] === -1) {
                // If step matches the goal
                if (currentX === fX && currentY === fY) {
                    this.coordinates[count] = iX + '_' + iY;
                    this.amountOfMoves = count;
                }
                this.coordinates[currentX + '_' + currentY] = iX + '_' + iY;
                this.matrix[currentX][currentY] = count;
                steps.push([currentX, currentY]);
            }
        }
        return steps;
    }

    /**
     * Recursive search.
     * List all possible moves from current position, than move to the next position in the list and
     * do the same until searched coordinate is reached.
     *
     * @param fX    Searched x coordinate
     * @param fY    Searched y coordinate
     * @param count Number of steps made so far
     * @param steps List of coordinates to perform the moves from
     */
    next(fX, fY, count, steps) {
        let _steps = [];
        for (let i = 0; i < steps.length; i++) {
            _steps = _steps.concat(this.listMoves(steps[i][0], steps[i][1], fX, fY, count + 1));
        }
        if (_steps.length) {
            this.next(fX, fY, count + 1, _steps);
        }
    }
    /**
     * Initial possible moves lookup
     *
     * @param iX    Initial x coordinate
     * @param iY    Initial y coordinate
     * @param fX    Searched x coordinate
     * @param fY    Searched y coordinate
     */
    findShortestPath(iX, iY, fX, fY) {
        const steps = this.listMoves(iX, iY, fX, fY, 1);
        this.next(fX, fY, 1, steps);
    }
    /**
     * Recursive tracing of path from starting to finishing position
     *
     * @param array
     * @param index
     */
    trace(array, index) {
        if (array[index]) {
            const coordinates = array[index].split('_').map(value => +value);
            // Puts steps in a reverse order
            this.path.unshift(coordinates);
            return this.trace(array, array[index]);
        }
    }

    /**
     * Store coordinates and fire a search when all data is provided
     */
    run() {
        // If start and finish positions present - start search loop
        this.findShortestPath(
            this.startAndFinishPoints[0][0], this.startAndFinishPoints[0][1],
            this.startAndFinishPoints[1][0], this.startAndFinishPoints[1][1]
        );
        this.trace(this.coordinates, this.amountOfMoves);
        return { amountOfMoves: this.amountOfMoves, path: this.path };
    }
}

export default PathFinder;
