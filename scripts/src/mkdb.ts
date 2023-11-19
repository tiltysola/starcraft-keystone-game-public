import fs from 'fs';
import path from 'path';
import process from 'process';

process.env.WORK_PATH = path.join(__dirname, '../../');

const main = () => {
  const gameStringsDB = JSON.parse(fs.readFileSync(`${process.env.WORK_PATH}/results/gameStringConvert.GameStrings.txt`).toString());
  const gameStringsDBOLD = JSON.parse(fs.readFileSync(`${process.env.WORK_PATH}/database/game_strings_db.json`).toString());
  const gameStringsDBOLDObject: any = {};
  gameStringsDBOLD.forEach((gs: any) => {
    gameStringsDBOLDObject[gs.en] = gs.cn;
  });
  for (let i = 0; i < gameStringsDB.length; i++) {
    if (gameStringsDBOLDObject[gameStringsDB[i].en]) {
      gameStringsDB[i].cn = gameStringsDBOLDObject[gameStringsDB[i].en];
    }
  }
  fs.writeFileSync(`${process.env.WORK_PATH}/results/game_strings_db.json`, JSON.stringify(gameStringsDB, null, 2));

  const cardsDB = JSON.parse(fs.readFileSync(`${process.env.WORK_PATH}/results/defineCardConvert.TranslationDB.json`).toString());
  const cardsDBOLD = JSON.parse(fs.readFileSync(`${process.env.WORK_PATH}/database/cards_db.json`).toString());
  const cardsDBOLDObject: any = {};
  cardsDBOLD.forEach((gs: any) => {
    cardsDBOLDObject[gs.en] = gs.cn;
  });
  for (let i = 0; i < cardsDB.length; i++) {
    if (cardsDBOLDObject[cardsDB[i].en]) {
      cardsDB[i].cn = cardsDBOLDObject[cardsDB[i].en];
    }
  }
  fs.writeFileSync(`${process.env.WORK_PATH}/results/cards_db.json`, JSON.stringify(cardsDB, null, 2));
}

main();
