export function translateXYtoGrid(x,y){
    let coorX = Math.floor(x/40)
    let coorY = Math.floor(y/40)
    return  coorX + coorY*20
}
export function translateGridToX(grid){
    return (grid%20) * 40
}
export function translateGridToY(grid){
    return Math.floor(grid/20) * 40
}
export const unusedSquare = 1337;
export function translateXY(x,y){
    let b = unusedSquare
    switch (translateXYtoGrid(x,y)) {
        case 10: b = 0; break;
        case 30: b = 1; break;
        case 50: b = 2; break;
        case 70: b = 3; break;
        case 90: b = 4; break;
        case 110: b = 5; break;
        case 111: b = 6; break;
        case 112: b = 7; break;
        case 113: b = 8; break;
        case 114: b = 9; break;
        case 115: b = 10; break;
        case 135: b = 11; break;
        case 155: b = 12; break;
        case 154: b = 13; break;
        case 153: b = 14; break;
        case 152: b = 15; break;
        case 151: b = 16; break;
        case 150: b = 17; break;
        case 170: b = 18; break;
        case 190: b = 19; break;
        case 210: b = 20; break;
        case 230: b = 21; break;
        case 250: b = 22; break;
        case 249: b = 23; break;
        case 248: b = 24; break;
        case 228: b = 25; break;
        case 208: b = 26; break;
        case 188: b = 27; break;
        case 168: b = 28; break;
        case 148: b = 29; break;
        case 147: b = 30; break;
        case 146: b = 31; break;
        case 145: b = 32; break;
        case 144: b = 33; break;
        case 143: b = 34; break;
        case 123: b = 35; break;
        case 103: b = 36; break;
        case 104: b = 37; break;
        case 105: b = 38; break;
        case 106: b = 39; break;
        case 107: b = 40; break;
        case 108: b = 41; break;
        case 88: b = 42; break;
        case 68: b = 43; break;
        case 48: b = 44; break;
        case 28: b = 45; break;
        case 8: b = 46; break;
        case 9: b = 47; break;
        case 45: b = 400; break;
        case 46: b = 401; break;
        case 65: b = 402; break;
        case 66: b = 403; break;
        case 52: b = 100; break;
        case 53: b = 101; break;
        case 72: b = 102; break;
        case 73: b = 103; break;
        case 192: b = 200; break;
        case 193: b = 201; break;
        case 212: b = 202; break;
        case 213: b = 203; break;
        case 185: b = 300; break;
        case 186: b = 301; break;
        case 205: b = 302; break;
        case 206: b = 303; break;
        case 29: b = 48; break;
        case 49: b = 49; break;
        case 69: b = 50; break;
        case 89: b = 51; break;
        case 109: b = 52; break;
        case 134: b = 53; break;
        case 133: b = 54; break;
        case 132: b = 55; break;
        case 131: b = 56; break;
        case 130: b = 57; break;
        case 229: b = 58; break;
        case 209: b = 59; break;
        case 189: b = 60; break;
        case 169: b = 61; break;
        case 149: b = 62; break;
        case 124: b = 63; break;
        case 125: b = 64; break;
        case 126: b = 65; break;
        case 127: b = 66; break;
        case 128: b = 67; break;
    }
    return b
}
export function translateSquare(square){
    let b = unusedSquare
    switch (square) {
        case 0: b = 10; break;
        case 1: b = 30; break;
        case 2: b = 50; break;
        case 3: b = 70; break;
        case 4: b = 90; break;
        case 5: b = 110; break;
        case 6: b = 111; break;
        case 7: b = 112; break;
        case 8: b = 113; break;
        case 9: b = 114; break;
        case 10: b = 115; break;
        case 11: b = 135; break;
        case 12: b = 155; break;
        case 13: b = 154; break;
        case 14: b = 153; break;
        case 15: b = 152; break;
        case 16: b = 151; break;
        case 17: b = 150; break;
        case 18: b = 170; break;
        case 19: b = 190; break;
        case 20: b = 210; break;
        case 21: b = 230; break;
        case 22: b = 250; break;
        case 23: b = 249; break;
        case 24: b = 248; break;
        case 25: b = 228; break;
        case 26: b = 208; break;
        case 27: b = 188; break;
        case 28: b = 168; break;
        case 29: b = 148; break;
        case 30: b = 147; break;
        case 31: b = 146; break;
        case 32: b = 145; break;
        case 33: b = 144; break;
        case 34: b = 143; break;
        case 35: b = 123; break;
        case 36: b = 103; break;
        case 37: b = 104; break;
        case 38: b = 105; break;
        case 39: b = 106; break;
        case 40: b = 107; break;
        case 41: b = 108; break;
        case 42: b = 88; break;
        case 43: b = 68; break;
        case 44: b = 48; break;
        case 45: b = 28; break;
        case 46: b = 8; break;
        case 47: b = 9; break;
        case 400: b = 45; break;
        case 401: b = 46; break;
        case 402: b = 65; break;
        case 403: b = 66; break;
        case 100: b = 52; break;
        case 101: b = 53; break;
        case 102: b = 72; break;
        case 103: b = 73; break;
        case 200: b = 192; break;
        case 201: b = 193; break;
        case 202: b = 212; break;
        case 203: b = 213; break;
        case 300: b = 185; break;
        case 301: b = 186; break;
        case 302: b = 205; break;
        case 303: b = 206; break;
        case 48: b = 29; break;
        case 49: b = 49; break;
        case 50: b = 69; break;
        case 51: b = 89; break;
        case 52: b = 109; break;
        case 53: b = 134; break;
        case 54: b = 133; break;
        case 55: b = 132; break;
        case 56: b = 131; break;
        case 57: b = 130; break;
        case 58: b = 229; break;
        case 59: b = 209; break;
        case 60: b = 189; break;
        case 61: b = 169; break;
        case 62: b = 149; break;
        case 63: b = 124; break;
        case 64: b = 125; break;
        case 65: b = 126; break;
        case 66: b = 126; break;
        case 67: b = 128; break;
    }
    return b
}
