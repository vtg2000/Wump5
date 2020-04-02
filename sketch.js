let arr = [];
let board = new Array(8);
let dupb = new Array(8);
let vis = new Array(8);
let dead = 0;
let startx = 0;
let starty = 7;
let xr;
let yr;
let wdead = 0;
let hideen = 0;
function setup() {
  background(255)
  wdead = 0;
  startx = 0;
  starty = 7;
  hidden = 0;
  createCanvas(windowWidth, windowHeight);
  dead = 0;
  for(let i =0; i<64; i++){
   arr.push(i); 
  }
  xr = int(random(0,7));
  yr = int(random(0,7));


  for (let y = 0; y <8; y++) {
    board[y] = new Array(8);
    dupb[y] = new Array(8);
    vis[y] = new Array(8);
  }

  for (let y = 0; y <8; y++) {
    for (let x = 0; x <8; x++) {
       dupb[y][x] = ''
      if(x==xr && y==yr)
      {
        board[y][x] = 'W';
        if(y-1>=0)
        {
          board[y-1][x] = 'S';
        }
        if(x-1>=0)
        {
          board[y][x-1] = 'S';
        }
        if(y+1<=7)
        {
          board[y+1][x] = 'S';
        }
        if(x+1<=7)
        {
          board[y][x+1] = 'S';
        }
      }
      else
      {
        if (board[y][x] != 'S')
        {
        board[y][x] = '';
      }
      }
    }
  }

  let gxr = int(random(0,7));
  let gyr = int(random(0,7));

  while(gxr != xr && gyr != yr)
    {
      gxr = int(random(0,7));
      gyr = int(random(0,7));
    }
  board[gyr][gxr] += ' G';

  for(let i =0; i<4; i++)
  {

  let pxr = int(random(0,7));
  let pyr = int(random(0,7));
  while(pxr != xr && pyr != yr)
  {
    pxr = int(random(0,7));
    pyr = int(random(0,7));
  }
  

  for (let y = 0; y <8; y++) {
    for (let x = 0; x <8; x++) {
      dupb[y][x] = '';
      if(x==pxr && y==pyr)
      {
        if(board[y][x] == '')
          {
          board[y][x] = 'P';
          }
          else
          {
            board[y][x] += ' P'
          }
        if(y-1>=0)
        {
          if(board[y-1][x] == '')
          {
          board[y-1][x] = 'B';
          }
          else
          {
            board[y-1][x] += ' B'
          }
        }
        if(x-1>=0)
        {
          if(board[y][x-1] == '')
          {
          board[y][x-1] = 'B';
          }
          else
          {
            board[y][x-1] += ' B'
          }
        }
        if(y+1<=7)
        {
          if(board[y+1][x] == '')
          {
          board[y+1][x] = 'B';
          }
          else
          {
            board[y+1][x] += ' B'
          }
        }
        if(x+1<=7)
        {
          if(board[y][x+1] == '')
          {
          board[y][x+1] = 'B';
          }
          else
          {
            board[y][x+1] += ' B'
          }
        }
      }
    }
  }

}
    
  

  colorMode(RGB);
  frameRate(60);
}



function hide()
{
  if(hidden)
  {
    hidden = 0
  }
  else
  {
  hidden = 1;
  }
}

function draw() {
  background(200);
  let offset = 70;
  textAlign(CENTER, CENTER);

 

  button = createButton('Hide');
  button.position(230,500);
  button.mousePressed(hide);


  for (let y = 0; y <8; y++) {
    for (let x = 0; x < 8; x++) {
     
      let xpos = offset + x *50;
      let ypos = offset + y *50; 
      let index = y * 7 + x; // find the index
      
      if(inside(xpos, ypos, 50, 50) ){
        fill(255,0,0);
      } else {
        // not inside
        fill(255);
      }
      if(!hidden)
     {
      if(board[y][x] != null)
      {
        stroke(0);
        rect(xpos, ypos, 50, 50);
        fill(0);
        noStroke();
        textSize(20);
        text(board[y][x], xpos, ypos, 50,50);
      }
      else
      {
      stroke(0);
      rect(xpos, ypos, 50, 50);
      fill(0);
      noStroke();
      // text('', xpos, ypos, 50,50);
      }
    }

      if(inside(xpos+50*10, ypos, 50, 50) ){
        fill(255,0,0);
      } else {
        // not inside
        fill(255);
      }

      if(dupb[y][x] == null)
      {
        stroke(0);
        rect(xpos+50*10, ypos, 50, 50);
        fill(0);
        noStroke();
        textSize(20);
        text('', xpos+50*10, ypos, 50,50);
      }     // colorMode(RGB);
    }
  }

  let xpos = (startx*50) + 50*10;
  let ypos = starty *50;

  dupb[starty][startx] = 'A';
  x = startx;
  y = starty;
  
  
  if(board[starty][startx].includes('P'))
  {
    fill(0);
    noStroke();
    textSize(20);
    text('You fell into a pit. ', offset +680, offset +430);
    dead = 1;
  }
  else if(board[starty][startx].includes('W'))
  {
    fill(0);
    noStroke();
    textSize(20);
    text('You were killed by the Wumpus. ', offset +680, offset +430);
    dead = 1;
  }
  else if(board[starty][startx].includes('S'))
  {
    fill(0);
    noStroke();
    textSize(20);
    text('You perceive stench. ', offset +680, offset +430);

    if(y-1>=0 && dupb[y-1][x] !== 'safe' && !((dupb[y-1][x]).includes('B')) && !(dupb[y-1][x].includes('S')))
    {
      dupb[y-1][x] = 'W?';
    }
    if(x-1>=0 && dupb[y][x-1] !== 'safe' && !((dupb[y][x-1]).includes('B')) && !(dupb[y][x-1].includes('S')))
    {
      dupb[y][x-1] = 'W?';
    }
    if(y+1<=7 && dupb[y+1][x] !== 'safe' && !((dupb[y+1][x]).includes('B')) && !(dupb[y+1][x].includes('S')))
    {
      dupb[y+1][x] = 'W?';
    }
    if(x+1<=7 && dupb[y][x+1] !== 'safe' && !((dupb[y][x+1]).includes('B')) && !(dupb[y][x+1].includes('S')))
    {
      dupb[y][x+1] = 'W?';
    }
  }
  else if(board[starty][startx].includes('G'))
  {
    fill(0);
    noStroke();
    textSize(20);
    text('You got the gold ', offset +680, offset +430);
    if(y-1>=0 && !((dupb[y-1][x]).includes('B')) && !(dupb[y-1][x].includes('S')))
    {
      dupb[y-1][x] = 'safe';
    }
    if(x-1>=0 && !((dupb[y][x-1]).includes('B')) && !(dupb[y][x-1].includes('S')))
    {
      dupb[y][x-1] = 'safe';
    }
    if(y+1<=7 && !((dupb[y+1][x]).includes('B')) && !(dupb[y+1][x].includes('S')))
    {
      dupb[y+1][x] = 'safe';
    }
    if(x+1<=7 && !((dupb[y][x+1]).includes('B')) && !(dupb[y][x+1].includes('S')))
    {
      dupb[y][x+1] = 'safe';
    }
  }
  else if(!(board[starty][startx].includes('S')) && !(board[starty][startx].includes('B')))
  {
    fill(0);
    noStroke();
    textSize(20);
    text('You perceive nothing', offset +680, offset +430);
    if(y-1>=0 && !((dupb[y-1][x]).includes('B')) && !(dupb[y-1][x].includes('S')))
    {
      dupb[y-1][x] = 'safe';
    }
    if(x-1>=0 && !((dupb[y][x-1]).includes('B')) && !(dupb[y][x-1].includes('S')))
    {
      dupb[y][x-1] = 'safe';
    }
    if(y+1<=7 && !((dupb[y+1][x]).includes('B')) && !(dupb[y+1][x].includes('S')))
    {
      dupb[y+1][x] = 'safe';
    }
    if(x+1<=7 && !((dupb[y][x+1]).includes('B')) && !(dupb[y][x+1].includes('S')))
    {
      dupb[y][x+1] = 'safe';
    }
  }
  
  if(board[starty][startx].includes('B'))
  {
    fill(0);
    noStroke();
    textSize(20);
    text('You perceive breeze. ', offset +680, offset +460);

    if(y-1>=0 && dupb[y-1][x] !== 'safe' && !((dupb[y-1][x]).includes('B')) && !(dupb[y-1][x].includes('S')))
    {
      dupb[y-1][x] = 'P?';
    }
    if(x-1>=0 && dupb[y][x-1] !== 'safe' && !((dupb[y][x-1]).includes('B')) && !(dupb[y][x-1].includes('S')))
    {
      dupb[y][x-1] = 'P?';
    }
    if(y+1<=7 && dupb[y+1][x] !== 'safe' && !((dupb[y+1][x]).includes('B')) && !(dupb[y+1][x].includes('S')))
    {
      dupb[y+1][x] = 'P?';
    }
    if(x+1<=7 && dupb[y][x+1] !== 'safe' && !((dupb[y][x+1]).includes('B')) && !(dupb[y][x+1].includes('S')))
    {
      dupb[y][x+1] = 'P?';
    }

  }
  

  for (let y = 0; y <8; y++) {
    for (let x = 0; x < 8; x++) {
      let xpos = offset + x *50;
      let ypos = offset + y *50; 
      let index = y * 7 + x; 

      if(inside(xpos+50*10, ypos, 50, 50) ){
        fill(255,0,0);
      } else {
        fill(255);
      }

      if(dupb[y][x] != null)
      {
        stroke(0);
        rect(xpos+50*10, ypos, 50, 50);
        fill(0);
        noStroke();
        textSize(20);
        text(dupb[y][x], xpos+50*10, ypos, 50,50);
      }    
    }
  }

  if(wdead)
  {
    text('The Wumpus is dead. Long live the Wumpus.', offset +680,offset + 490);
  }


  button = createButton('Restart');
  button.position(offset +650,offset +510);
  button.mousePressed(setup);
  text('Use arrow keys to move.', 1200,100)
   text('Click to shoot the Wumpus.', 1200, 130)
   text('W - Wumpus', 1200, 160)
   text('A - Agent', 1200, 190)
   text('S - Stench', 1200, 220)
   text('P - Pit', 1200, 250)
   text('G - Gold', 1200, 280)
   text('B - Breeze', 1200, 310)
   stroke(2)
   text('Wumpus World', 770, 50)
   stroke(1)
   
  

  
}

function mouseClicked() { 
  if(dead == 0){
  if(inside(70 + xr*50+50*10, 70 + yr*50, 50, 50) ){
        wdead = 1;
        dead = 1
      } 
    }
} 

function keyPressed() {
  if(dead == 0)
  {
  if (keyCode === LEFT_ARROW) {
    starty = y;
    startx = x-1;

    if(board[starty][startx+1].includes('B') && board[starty][startx+1].includes('S'))
    {
      console.log('tru')
      dupb[starty][startx+1]= 'S B' 
    }
    else if(board[starty][startx+1].includes('B'))
    {
      dupb[starty][startx+1]='B' 
    }
    else if(board[starty][startx+1].includes('S'))
    {
      dupb[starty][startx+1]='S' 
    }
    else
    {
      dupb[starty][startx+1]='safe'
    }

  } 

  else if(keyCode === UP_ARROW){
    starty = y-1;
    startx = x;
    if(board[starty+1][startx].includes('B') && board[starty+1][startx].includes('S'))
    {
      dupb[starty+1][startx]= 'S B' 
    }
    else if(board[starty+1][startx].includes('S'))
    {
      dupb[starty+1][startx]='S' 
    }
    else if(board[starty+1][startx].includes('B'))
    {
      dupb[starty+1][startx]='B' 
    }
    else
    {
      dupb[starty+1][startx]='safe'
    }
  }

  else if(keyCode === RIGHT_ARROW){

    starty = y;
    startx = x+1;
    if(board[starty][startx-1].includes('B') && board[starty][startx-1].includes('S'))
    {
      dupb[starty][startx-1]= 'S B' 
    }
    else if(board[starty][startx-1].includes('S'))
    {
      dupb[starty][startx-1]='S' 
    }
    else if(board[starty][startx-1].includes('B'))
    {
      dupb[starty][startx-1]='B' 
    }
    else
    {
      dupb[starty][startx-1]='safe'
    }
    
  }

  else if(keyCode === DOWN_ARROW){
    starty = y+1;
    startx = x;
    if(board[starty-1][startx].includes('B') && board[starty-1][startx].includes('S'))
    {
      dupb[starty-1][startx]= 'S B' 
    }
    else if(board[starty-1][startx].includes('S'))
    {
      dupb[starty-1][startx]='S' 
    }
    else if(board[starty-1][startx].includes('B'))
    {
      dupb[starty-1][startx]='B' 
    }
    else
    {
      dupb[starty-1][startx]='safe'
    }

  }
}
}


function inside(x, y, w, h){
 if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
  return true; 
 } else {
  return false; 
 }
}