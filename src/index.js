import React, {  } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StartMenu, TicTacToe, Hangman, ColorPicker, ConnectFour, SimonSays, Blackjack } from './components'

const Screen = () => {
    return (
      <Routes>
        <Route path='/' element={<StartMenu></StartMenu>}></Route>
        <Route path='tictactoe' element={<TicTacToe></TicTacToe>}></Route>
        <Route path='hangman' element={<Hangman></Hangman>}></Route>
        <Route path='colorpicker' element={<ColorPicker></ColorPicker>}></Route>
        <Route path='connectfour' element={<ConnectFour></ConnectFour>}></Route>
        <Route path='simonsays' element={<SimonSays></SimonSays>}></Route>
        <Route path='blackjack' element={<Blackjack></Blackjack>}></Route>
      </Routes>
    )
  }

ReactDOM.render(<BrowserRouter>
<Screen />
</BrowserRouter>, document.getElementById('app'));