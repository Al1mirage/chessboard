function getNextPositions(start) {
    const moves = [
        { x: -2, y: -1 },
        { x: -2, y: +1 },
        { x: -1, y: -2 },
        { x: -1, y: +2 },
        { x: +1, y: -2 },
        { x: +1, y: +2 },
        { x: +2, y: -1 },
        { x: +2, y: +1 }
    ];
    const positions = [];

    for (let i = 0; i < moves.length; i++) {
        let move = moves[i];
        const position = {};
        position.x = start.x + move.x;
        position.y = start.y + move.y;
        positions.push(position);
    }

    return positions;
}

function countMoves(source, destination, depth = 0, cache = {}) {
    let result = (cache[destination.x] || {})[destination.y];

    if (result) {
        return result;
    }

    if (source.x === destination.x && source.y === destination.y) {
        result = 0;
    } else if (depth > 100) {
        result = -2;
    } else {
        let minMoves = Infinity;
        let nextPositions = getNextPositions(destination);

        for (let i = 0; i < nextPositions.length; i++) {
            const nextPosition = nextPositions[i];
            const result = countMoves(source, nextPosition, depth + 1, cache);

            if (result < 0) {
                continue;
            }

            minMoves = Math.min(minMoves, 1 + result);
        }

        if (minMoves === Infinity) {
            result = -2
        } else {
            result = minMoves
        }
    }

    cache[destination.x] = cache[destination.x] || {};
    cache[destination.x][destination.y] = result;

    return result;
}

export default function getShortestPath(source, destination) {
    return countMoves(source, destination);
}
