const element  = $('#target-wrap').children();
let   x        = [];
let   y        = [];
let   goRight  = [];
let   goLeft   = [];
let   goTop    = [];
let   goBottom = [];
let   empty    = 16;
let   position = [];
let   xMove    = [];
let   yMove    = [];
let   judge    = false;
let   check    = [];
let   complete = false;
const images   =[
  ["images/halloween_01.gif","images/halloween_02.gif","images/halloween_03.gif","images/halloween_04.gif","images/halloween_05.gif","images/halloween_06.gif","images/halloween_07.gif","images/halloween_08.gif","images/halloween_09.gif","images/halloween_10.gif","images/halloween_11.gif","images/halloween_12.gif","images/halloween_13.gif","images/halloween_14.gif","images/halloween_15.gif","images/halloween_16.gif"],
  ["images/tsukimi_jugoya_01.gif","images/tsukimi_jugoya_02.gif","images/tsukimi_jugoya_03.gif","images/tsukimi_jugoya_04.gif","images/tsukimi_jugoya_05.gif","images/tsukimi_jugoya_06.gif","images/tsukimi_jugoya_07.gif","images/tsukimi_jugoya_08.gif","images/tsukimi_jugoya_09.gif","images/tsukimi_jugoya_10.gif","images/tsukimi_jugoya_11.gif","images/tsukimi_jugoya_12.gif","images/tsukimi_jugoya_13.gif","images/tsukimi_jugoya_14.gif","images/tsukimi_jugoya_15.gif","images/tsukimi_jugoya_16.gif"],
  ["images/54522_01.gif","images/54522_02.gif","images/54522_03.gif","images/54522_04.gif","images/54522_05.gif","images/54522_06.gif","images/54522_07.gif","images/54522_08.gif","images/54522_09.gif","images/54522_10.gif","images/54522_11.gif","images/54522_12.gif","images/54522_13.gif","images/54522_14.gif","images/54522_15.gif","images/54522_16.gif"],
  ["images/tree-g272ac4122_1280_01.gif","images/tree-g272ac4122_1280_02.gif","images/tree-g272ac4122_1280_03.gif","images/tree-g272ac4122_1280_04.gif","images/tree-g272ac4122_1280_05.gif","images/tree-g272ac4122_1280_06.gif","images/tree-g272ac4122_1280_07.gif","images/tree-g272ac4122_1280_08.gif","images/tree-g272ac4122_1280_09.gif","images/tree-g272ac4122_1280_10.gif","images/tree-g272ac4122_1280_11.gif","images/tree-g272ac4122_1280_12.gif","images/tree-g272ac4122_1280_13.gif","images/tree-g272ac4122_1280_14.gif","images/tree-g272ac4122_1280_15.gif","images/tree-g272ac4122_1280_16.gif"],
  ["images/penfan933_TP_V_01.gif","images/penfan933_TP_V_02.gif","images/penfan933_TP_V_03.gif","images/penfan933_TP_V_04.gif","images/penfan933_TP_V_05.gif","images/penfan933_TP_V_06.gif","images/penfan933_TP_V_07.gif","images/penfan933_TP_V_08.gif","images/penfan933_TP_V_09.gif","images/penfan933_TP_V_10.gif","images/penfan933_TP_V_11.gif","images/penfan933_TP_V_12.gif","images/penfan933_TP_V_13.gif","images/penfan933_TP_V_14.gif","images/penfan933_TP_V_15.gif","images/penfan933_TP_V_16.gif"],
  ["images/penfan934_TP_V_01.gif","images/penfan934_TP_V_02.gif","images/penfan934_TP_V_03.gif","images/penfan934_TP_V_04.gif","images/penfan934_TP_V_05.gif","images/penfan934_TP_V_06.gif","images/penfan934_TP_V_07.gif","images/penfan934_TP_V_08.gif","images/penfan934_TP_V_09.gif","images/penfan934_TP_V_10.gif","images/penfan934_TP_V_11.gif","images/penfan934_TP_V_12.gif","images/penfan934_TP_V_13.gif","images/penfan934_TP_V_14.gif","images/penfan934_TP_V_15.gif","images/penfan934_TP_V_16.gif"],
  ["images/017texture2139_TP_V_01.gif","images/017texture2139_TP_V_02.gif","images/017texture2139_TP_V_03.gif","images/017texture2139_TP_V_04.gif","images/017texture2139_TP_V_05.gif","images/017texture2139_TP_V_06.gif","images/017texture2139_TP_V_07.gif","images/017texture2139_TP_V_08.gif","images/017texture2139_TP_V_09.gif","images/017texture2139_TP_V_10.gif","images/017texture2139_TP_V_11.gif","images/017texture2139_TP_V_12.gif","images/017texture2139_TP_V_13.gif","images/017texture2139_TP_V_14.gif","images/017texture2139_TP_V_15.gif","images/017texture2139_TP_V_16.gif"]
];
const imgComp  =["images/halloween.gif","images/tsukimi_jugoya.gif","images/54522.gif","images/tree-g272ac4122_1280.gif","images/penfan933_TP_V.gif","images/penfan934_TP_V.gif","images/017texture2139_TP_V.gif"];


MovingConfig2();
  
  

