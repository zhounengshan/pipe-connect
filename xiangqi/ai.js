importScripts('engine.js');onmessage=e=>postMessage(XQ.bestMove(e.data.board,e.data.side,e.data.level,!!e.data.hint));
