import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

/**
 * Step 1. Create a game board react component
 * 
 * Step 2. create methods of gameboard component for
 *      isWon(), isFull(), getPositionFromRC, isVerticalComplete,
 *      isHorizontalComplete, isDiagonalComplete, markSymbol, changePlayer
 * 
 * Step 3: Define the component state with isWon, 
 * isFull, winner, positions, currentPLayer 
 * 
 * Step 4: Create a click handler to mark blocks
 * 
 * Step 5: Create UI using flatList and numColumns = 3
 * to give a tic tac toe board like look
 * 
 * Step 6: Maps the UI with state and onPress to clickHandler
 * 
 * Step 7: Feature to reset the board
 * Step 8: Feature to keep track of players wins and losses
 */

const EMPTY_SYMBOL = '';
const X_SYMBOL = 'X';
const O_SYMBOL = 'O';
const BOARD_SIZE = 3;

class GameBoard extends Component {

    state = {
        isWon: false,
        isFull: false,
        winnner: '',
        positions: {},      // For 3x3 board, there will be 9 positions from 0, 1, upto 8
        currentPlayer: EMPTY_SYMBOL
    }

    componentWillMount() {
        // populate initial positions with empty symbols
        for (i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
            this.state.positions[i] = EMPTY_SYMBOL;
        }

        console.log(this.state);
    }

    getPositionFromRC(r, c) {
        // Helper method convert row, col coordinates to positions
        return BOARD_SIZE * r + c;
    }

    isHorizontalComplete(r, c, symbol) {
        var isHorizontalComplete = true;
        // go forward
        for (i = c; i < BOARD_SIZE; i++) {
            // if marked symbol is not equal to current symbol, 
            // then row is not complete 
            const pos = getPositionFromRC(r, i);
            if (this.state.positions[pos] != symbol) {
                isHorizontalComplete = false;
            }
        }

        // go back
        for (i = c; i >= 0; i--) {
            // if marked symbol is not equal to current symbol, 
            // then row is not complete
            const pos = getPositionFromRC(r, i);
            if (this.state.positions[pos] != symbol) {
                isHorizontalComplete = false;
            }
        }

        return isHorizontalComplete;
    }

    isVerticalComplete(r, c, symbol) {
        var isVerticalComplete = true;
        // go forward
        for (i = r; i < BOARD_SIZE; i++) {
            // if marked symbol is not equal to current symbol, 
            // then col is not complete 
            const pos = getPositionFromRC(i, c);
            if (this.state.positions[pos] != symbol) {
                isVerticalComplete = false;
            }
        }

        // go back
        for (i = r; i >= 0; i--) {
            // if marked symbol is not equal to current symbol, 
            // then col is not complete
            const pos = getPositionFromRC(i, c);
            if (this.state.positions[pos] != symbol) {
                isVerticalComplete = false;
            }
        }

        return isVerticalComplete;
    }

    isDiagonalComplete(r, c, symbol) {
        // go forward i++, j++ in row, column and check if it is complete
        var isDiagonalComplete = true;

        for (i = r, j = c; i < BOARD_SIZE, j < BOARD_SIZE; i++ , j++) {
            // if marked symbol is not equal to current symbol, 
            // then col is not complete 
            const pos = getPositionFromRC(i, j);
            if (this.state.positions[pos] != symbol) {
                isDiagonalComplete = false;
            }
        }

        // go back i--, j-- in row, column and check if it is complete
        for (i = r, j = c; i >= 0, j >= 0; i-- , j--) {
            // if marked symbol is not equal to current symbol, 
            // then col is not complete
            const pos = getPositionFromRC(i, j);
            if (this.state.positions[pos] != symbol) {
                isDiagonalComplete = false;
            }
        }

        return isDiagonalComplete;
    }

    isWon() {
        // Check for X symbol
        var h = isHorizontalComplete(0, 0, X_SYMBOL);
        var v = isVerticalComplete(0, 0, X_SYMBOL);
        var d = isDiagonalComplete(0, 0, X_SYMBOL);
        var x = h && v && d;

        // Check for O symbol
        h = isHorizontalComplete(0, 0, O_SYMBOL);
        v = isVerticalComplete(0, 0, O_SYMBOL);
        d = isDiagonalComplete(0, 0, O_SYMBOL);
        var o = h && v && d;

        // check if either X or O has won
        return o && x;
    }

    isFull() {
        return Object.keys(this.state.positions).length == BOARD_SIZE * BOARD_SIZE;
    }

    changePlayer() {
        // After every move change current player
        this.state.currentPlayer == X_SYMBOL ?
            this.setState({ currentPlayer: O_SYMBOL }) : this.setState({ currentPlayer: X_SYMBOL });
    }

    markSymbol(position, symbol) {
        // mark only if the game is not won and board has some blocks left
        if (!this.state.isFull && !this.state.isWon) {
            this.state.positions[position] = symbol;
            changePlayer()
        }
    }

    renderItem = ({ item, index }) => {
        console.log("render item called");
        return <View>
            <Text>{item}</Text>
        </View>;
    }

    handleClick(position) {
        markSymbol(position, this.state.positions[position])
    }

    render() {
        const positionArr = Object.keys(this.state.positions)
        const { boxStyle } = styles;

        console.log(pos);
        console.log(positionArr);
        return (
            <FlatList
                numColumns={3}
                data={positionArr}
                renderItem={({ item, index }) =>
                    <Text
                        onPress={this.handleClick.bind(this)}
                        style={boxStyle}>{item}
                    </Text>
                }
                keyExtractor={({ item, index }) => item}
            />
        );
    }
}

export default GameBoard;

const styles = {
    boxStyle: {
        textAlign: 'center',
        height: 100,
        width: 100,
        backgroundColor: 'lightblue',
        margin: 10
    }
}