import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StartMenu, TicTacToe } from './components'

const Screen = () => {
    return (
      <Routes>
        <Route path='/' element={<StartMenu></StartMenu>}></Route>
        <Route path='tictactoe' element={<TicTacToe></TicTacToe>}></Route>
      </Routes>
    )
  }

ReactDOM.render(<BrowserRouter>
<Screen />
</BrowserRouter>, document.getElementById('app'));