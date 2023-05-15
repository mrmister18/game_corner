import React, {  } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StartMenu, TicTacToe, Hangman, ColorPicker } from './components'

const Screen = () => {
    return (
      <Routes>
        <Route path='/' element={<StartMenu></StartMenu>}></Route>
        <Route path='tictactoe' element={<TicTacToe></TicTacToe>}></Route>
        <Route path='hangman' element={<Hangman></Hangman>}></Route>
        <Route path='colorpicker' element={<ColorPicker></ColorPicker>}></Route>
      </Routes>
    )
  }

ReactDOM.render(<BrowserRouter>
<Screen />
</BrowserRouter>, document.getElementById('app'));