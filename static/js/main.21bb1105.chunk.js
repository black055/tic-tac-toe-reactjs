(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n.n(r),i=n(8),l=n.n(i),a=(n(13),n(3)),o=n(4),c=n(2),h=n(6),u=n(5),p=n(0);function j(e){return e.highlight?Object(p.jsx)("button",{className:"square highlight",onClick:function(){return e.onClick()},children:Object(p.jsx)("strong",{children:e.value})}):Object(p.jsx)("button",{className:"square",onClick:function(){return e.onClick()},children:e.value})}var f=function(e){Object(h.a)(n,e);var t=Object(u.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"renderSquare",value:function(e){var t=this;return this.props.line.includes(e)?Object(p.jsx)(j,{highlight:!0,value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}},e):Object(p.jsx)(j,{highlight:!1,value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}},e)}},{key:"render",value:function(){for(var e=[],t=0;t<this.props.size;t++){for(var n=[],r=0;r<this.props.size;r++)n.push(this.renderSquare(this.props.size*t+r));e.push(Object(p.jsx)("div",{className:"board-row",children:n},"row_"+t))}return Object(p.jsx)("div",{children:e})}}]),n}(s.a.Component),v=function(e){Object(h.a)(n,e);var t=Object(u.a)(n);function n(e){var r;return Object(a.a)(this,n),(r=t.call(this,e)).handleChangeSize=r.handleChangeSize.bind(Object(c.a)(r)),r.handleSort=r.handleSort.bind(Object(c.a)(r)),r.state={history:[{squares:Array(9).fill(null),newMark:null}],xIsNext:!0,stepNumber:0,size:3,winner:null,line:[],isIncre:!0},r}return Object(o.a)(n,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),n=t[t.length-1].squares.slice();if(null==d(n,this.state.size)&&!n[e]){n[e]=this.state.xIsNext?"X":"O";var r=d(n,this.state.size);if(r){for(var s=[],i=0;i<r.line.length;i++)s.push(r.line[i].row*this.state.size+r.line[i].col);this.setState({history:t.concat([{squares:n,newMark:e}]),stepNumber:t.length,winner:r.player,line:s})}else this.setState({history:t.concat([{squares:n,newMark:e}]),xIsNext:!this.state.xIsNext,stepNumber:t.length})}}},{key:"jumpTo",value:function(e){var t=this.state.history.slice(0,e+1),n=d(t[t.length-1].squares.slice(),this.state.size);if(null!=n){for(var r=[],s=0;s<n.line.length;s++)r.push(n.line[s].row*this.state.size+n.line[s].col);this.setState({stepNumber:e,xIsNext:e%2===0,winner:n.player,line:r})}else this.setState({stepNumber:e,xIsNext:e%2===0,winner:null,line:[]})}},{key:"handleChangeSize",value:function(e){this.setState({history:[{squares:Array(Math.pow(e.target.value,2)).fill(null)}],xIsNext:!0,stepNumber:0,size:e.target.value,winner:null,line:[]})}},{key:"handleSort",value:function(){this.setState({isIncre:!this.state.isIncre})}},{key:"render",value:function(){var e,t=this,n=this.state.history,r=n[this.state.stepNumber],s=n.map((function(e,n){var r=n?"Go to move #"+n+" ("+Math.floor(e.newMark/t.state.size)+", "+e.newMark%t.state.size+")":"Go to game start";return n===t.state.stepNumber?Object(p.jsx)("li",{children:Object(p.jsx)("button",{onClick:function(){return t.jumpTo(n)},children:Object(p.jsx)("strong",{children:r})})},n):Object(p.jsx)("li",{children:Object(p.jsx)("button",{onClick:function(){return t.jumpTo(n)},children:r})},n)}));return e=null!=this.state.winner?"Winner: "+this.state.winner:"Next player: "+(this.state.xIsNext?"X":"O"),Object(p.jsxs)("div",{className:"screen",children:[Object(p.jsx)("div",{className:"game-size-controller",children:Object(p.jsxs)("span",{children:["Size of the game:",Object(p.jsx)("input",{type:"number",min:"3",defaultValue:"3",className:"input-number",onChange:this.handleChangeSize})]})}),Object(p.jsxs)("div",{className:"game",children:[Object(p.jsx)("div",{className:"game-board",children:Object(p.jsx)(f,{squares:r.squares,line:this.state.line,onClick:function(e){return t.handleClick(e)},size:this.state.size})}),Object(p.jsxs)("div",{className:"game-info",children:[Object(p.jsx)("div",{children:e}),Object(p.jsxs)("button",{className:"sort-button",onClick:this.handleSort,children:[Object(p.jsx)("strong",{children:"Sort: "})," ",this.state.isIncre?"increasing":"decreasing"," "]}),Object(p.jsxs)("div",{className:"text",children:["History list: location each move in ",Object(p.jsx)("strong",{children:"(row, col)"})," format"]}),Object(p.jsx)("ol",{children:this.state.isIncre?s:s.reverse()})]})]})]})}}]),n}(s.a.Component);function b(e,t){for(var n=0,r=0;n<e.length-1;n=r)if(null!=e[n]){for(r=n+1;r<e.length&&e[r]===e[n];r++);if(r-n>=t)return e.length-r}else r=n+1;return null}function d(e,t){for(var n=function(e){for(var t=Array(Math.sqrt(e.length)),n=0;n<t.length;n++)t[n]=Array(Math.sqrt(e.length)).fill(null);for(var r=0;r<t.length;r++)for(var s=0;s<t.length;s++)t[r][s]=e[r*t.length+s];return t}(e),r=t>5?5:parseInt(t),s=0;s<n.length;s++){var i=b(n[s],r);if(null!=i){for(var l=[],a=0;a<r;a++)l.push({row:s,col:n.length-i-1-a});return{player:n[s][n.length-1-i],line:l}}}for(var o=function(e){var t=b(n.map((function(t){return t[e]})),r);if(null!=t){for(var s=[],i=0;i<r;i++)s.push({row:n.length-t-1-i,col:e});return{v:{player:n.map((function(t){return t[e]}))[n.length-1-t],line:s}}}},c=0;c<n.length;c++){var h=o(c);if("object"===typeof h)return h.v}for(var u=0;u<2*n.length-1;u++){for(var p=[],j=void 0,f=0;f<n.length;f++){var v=u-f;v>=0&&v<n.length&&(p.push(n[f][v]),j={row:f,col:v})}var d=b(p,r);if(null!=d){for(var g=[],x=0;x<r;x++)t>5?g.push({row:j.row-d-x,col:j.col+d+x}):g.push({row:j.row-x,col:j.col+x});return{player:p[p.length-1-d],line:g}}}for(var m=0;m<2*n.length-1;m++){for(var O=[],w=void 0,y=0;y<n.length;y++){var N=m-(n.length-1-y);N>=0&&N<n.length&&(O.push(n[y][N]),w={row:y,col:N})}var k=b(O,r);if(null!=k){for(var C=[],z=0;z<r;z++)t>5?C.push({row:w.row-k-z,col:w.col-k-z}):C.push({row:w.row-z,col:w.col-z});return{player:O[O.length-1-k],line:C}}}if(!1===e.includes(null)){return{player:"draw",line:[]}}return null}l.a.render(Object(p.jsx)(v,{}),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.21bb1105.chunk.js.map