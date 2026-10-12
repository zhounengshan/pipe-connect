const assert=require('node:assert/strict'),E=require('./engine.js');
let b=E.initial();assert.equal(b.filter(Boolean).length,32);assert.equal(E.legal(b,1).length,44);assert.equal(E.legal(b,-1).length,44);let perft=E.legal(b,1).reduce((n,m)=>n+E.legal(E.apply(b,m),-1).length,0);assert.equal(perft,1920);
assert.equal(E.notation(b,{from:70,to:67}),'炮二平五');assert.equal(E.notation(b,{from:7,to:24}),'马8进7');
let c=Array(90).fill(0);c[4]=-5;c[85]=5;c[49]=4;assert(!E.check(c,1));assert(!E.legal(c,1).some(m=>m.from===49&&m.to===48));c[49]=0;assert(E.check(c,1));
c=Array(90).fill(0);c[40]=3;c[41]=7;assert(!E.pseudo(c,40).includes(51));assert(!E.pseudo(c,40).includes(33));
c=Array(90).fill(0);c[49]=2;assert(!E.pseudo(c,49).includes(29));c[49]=0;c[67]=2;assert(E.pseudo(c,67).includes(47));c[57]=7;assert(!E.pseudo(c,67).includes(47));
c=Array(90).fill(0);c[40]=6;c[41]=7;c[43]=-4;assert(E.pseudo(c,40).includes(43));assert(!E.pseudo(c,40).includes(42));c[41]=0;assert(!E.pseudo(c,40).includes(43));
c=Array(90).fill(0);c[54]=7;assert.deepEqual(E.pseudo(c,54),[45]);c[54]=0;c[36]=7;assert.deepEqual(E.pseudo(c,36).sort((a,b)=>a-b),[27,37]);
const openings=[[[70,67],[7,24],[88,71],[1,20],[89,88],[27,36],[60,51],[8,7]],[[56,47],[25,22],[88,71],[7,24],[70,67],[1,20],[89,88],[27,36]],[[83,67],[25,22],[56,47],[7,24],[88,71],[1,20],[89,88],[27,36]]];
for(let seq of openings){let board=E.initial(),s=1;for(let[from,to]of seq){let m=E.legal(board,s).find(m=>m.from===from&&m.to===to);assert(m,'opening '+from+' '+to);board=E.apply(board,m);s=-s}}
for(let lv=0;lv<3;lv++){let copy=b.slice(),t=Date.now(),r=E.bestMove(b,-1,lv);assert(E.legal(b,-1).some(m=>m.from===r.move.from&&m.to===r.move.to));assert.deepEqual(b,copy);console.log('AI',lv,'depth',r.depth,'nodes',r.nodes,'ms',Date.now()-t)}
let board=E.initial(),s=1;for(let i=0;i<60;i++){let ms=E.legal(board,s);if(!ms.length)break;let m=ms[Math.floor(Math.random()*ms.length)];board=E.apply(board,m);assert(!E.check(board,s));s=-s}
console.log('PASS: starting perft 44 / 1920, piece rules, king safety, notation, 3 openings, AI levels, legal playout');
