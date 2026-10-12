(function(root){
const initial=()=>{let b=Array(90).fill(0),row=[4,3,2,1,5,1,2,3,4];for(let x=0;x<9;x++){b[x]=-row[x];b[81+x]=row[x]}b[19]=b[25]=-6;b[64]=b[70]=6;for(let x=0;x<9;x+=2){b[27+x]=-7;b[54+x]=7}return b};
const side=p=>Math.sign(p),xy=i=>[i%9,Math.floor(i/9)],inside=(x,y)=>x>=0&&x<9&&y>=0&&y<10;
function pseudo(b,i){let p=b[i],s=side(p),t=Math.abs(p),[x,y]=xy(i),out=[];if(!p)return out;let add=(a,c)=>{if(inside(a,c)&&side(b[c*9+a])!==s)out.push(c*9+a)},pal=(a,c)=>a>=3&&a<=5&&(s===1?c>=7&&c<=9:c>=0&&c<=2);
if(t===1){for(let [a,c]of [[1,1],[-1,1],[1,-1],[-1,-1]])if(pal(x+a,y+c))add(x+a,y+c)}
if(t===2){for(let[a,c]of [[2,2],[-2,2],[2,-2],[-2,-2]]){let ny=y+c;if(inside(x+a,ny)&&(s===1?ny>=5:ny<=4)&&!b[(y+c/2)*9+x+a/2])add(x+a,ny)}}
if(t===3){for(let[a,c]of [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]])if(inside(x+a,y+c)&&!b[(y+(Math.abs(c)===2?c/2:0))*9+x+(Math.abs(a)===2?a/2:0)])add(x+a,y+c)}
if(t===4||t===6){for(let[a,c]of [[1,0],[-1,0],[0,1],[0,-1]]){let screen=false;for(let nx=x+a,ny=y+c;inside(nx,ny);nx+=a,ny+=c){let j=ny*9+nx;if(t===4){if(!b[j])out.push(j);else{if(side(b[j])!==s)out.push(j);break}}else if(!screen){if(!b[j])out.push(j);else screen=true}else if(b[j]){if(side(b[j])!==s)out.push(j);break}}}}
if(t===5){for(let[a,c]of [[1,0],[-1,0],[0,1],[0,-1]])if(pal(x+a,y+c))add(x+a,y+c);for(let d of [-1,1])for(let ny=y+d;inside(x,ny);ny+=d){let j=ny*9+x;if(b[j]){if(b[j]===-s*5)out.push(j);break}}}
if(t===7){add(x,y-s);if(s===1?y<=4:y>=5){add(x-1,y);add(x+1,y)}}return out}
function check(b,s){let k=b.indexOf(5*s);if(k<0)return true;for(let i=0;i<90;i++)if(side(b[i])===-s&&pseudo(b,i).includes(k))return true;return false}
function legal(b,s){let out=[];for(let i=0;i<90;i++)if(side(b[i])===s)for(let j of pseudo(b,i)){let p=b[i],c=b[j];b[j]=p;b[i]=0;if(!check(b,s))out.push({from:i,to:j,capture:c});b[i]=p;b[j]=c}return out}
function apply(b,m){let n=b.slice();n[m.to]=n[m.from];n[m.from]=0;return n}
const names={1:['仕','士'],2:['相','象'],3:['马','马'],4:['车','车'],5:['帅','将'],6:['炮','炮'],7:['兵','卒']},nums=['','一','二','三','四','五','六','七','八','九'];
function notation(b,m){let p=b[m.from],s=side(p),t=Math.abs(p),[x,y]=xy(m.from),[nx,ny]=xy(m.to),number=v=>s===1?nums[v]:String(v),file=a=>s===1?9-a:a+1;let peers=[];for(let i=0;i<90;i++)if(b[i]===p&&i%9===x)peers.push(i);peers.sort((a,c)=>s===1?a-c:c-a);let prefix=names[t][s===1?0:1]+number(file(x));if(peers.length>1){let idx=peers.indexOf(m.from);prefix=(peers.length===2?(idx===0?'前':'后'):peers.length===3?['前','中','后'][idx]:number(idx+1))+names[t][s===1?0:1]}
if(y===ny)return prefix+'平'+number(file(nx));let forward=(ny-y)*s<0;return prefix+(forward?'进':'退')+number([1,2,3].includes(t)?file(nx):Math.abs(ny-y))}
const values=[0,120,120,310,650,20000,350,80];
function evaluate(b,s){let v=0;for(let i=0;i<90;i++)if(b[i]){let p=b[i],t=Math.abs(p),[x,y]=xy(i),advance=side(p)===1?9-y:y,bonus=0;if(t===7)bonus=advance*9+(advance>=5?35+(4-Math.abs(4-x))*6:0);if(t===3)bonus=(4-Math.abs(4-x))*9+(advance>=2?10:0);if(t===4||t===6)bonus=(4-Math.abs(4-x))*3;v+=side(p)*(values[t]+bonus)}return v*s}
function bestMove(board,s,level,hint=false){let deadline=Date.now()+(hint?12000:[120,500,1400][level]),nodes=0,aborted=false,max=hint?8:[1,3,5][level],best=null,reached=0;let ordered=(b,ms)=>ms.sort((a,c)=>(values[Math.abs(c.capture)]*10-values[Math.abs(b[c.from])])-(values[Math.abs(a.capture)]*10-values[Math.abs(b[a.from])]));
function search(b,turn,d,alpha,beta,ply){if((++nodes&127)===0&&Date.now()>deadline){aborted=true;return 0}let ms=legal(b,turn);if(!ms.length)return -30000+ply;if(d<=0)return evaluate(b,turn);let value=-Infinity;for(let m of ordered(b,ms)){let p=b[m.from],cap=b[m.to];b[m.to]=p;b[m.from]=0;let score=-search(b,-turn,d-1,-beta,-alpha,ply+1);b[m.from]=p;b[m.to]=cap;if(aborted)return 0;value=Math.max(value,score);alpha=Math.max(alpha,score);if(alpha>=beta)break}return value}
let ms=ordered(board,legal(board,s));if(!ms.length)return {move:null};best=ms[0];for(let depth=1;depth<=max;depth++){let score=-Infinity,candidate=best;ms.sort((a,c)=>a===best?-1:c===best?1:0);let alpha=-Infinity;for(let m of ms){let n=apply(board,m),v=-search(n,-s,depth-1,-Infinity,-alpha,1);if(aborted)break;if(level===0)v+=Math.random()*45;if(v>score){score=v;candidate=m}alpha=Math.max(alpha,v)}if(aborted)break;best=candidate;reached=depth;if(score>29000)break}return{move:best,depth:reached,nodes}}
const api={initial,pseudo,check,legal,apply,notation,names,bestMove,evaluate};if(typeof module!=='undefined')module.exports=api;root.XQ=api;
})(typeof self!=='undefined'?self:globalThis);
