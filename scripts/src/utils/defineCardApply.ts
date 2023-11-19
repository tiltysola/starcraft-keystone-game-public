import fs from "fs";
import process from 'process';

const RegString = '(.+)=(.+)';

const defineCardApply = (_gameStrings: string) => {
  // Read DB
  const translationDb: any = {};
  JSON.parse(fs.readFileSync(`${process.env.WORK_PATH}/database/cards_db.json`).toString()).map((v: any) => {
    translationDb[v.en] = v.cn;
  })
  // Process
  let gameStrings = _gameStrings;
  const match = gameStrings.match(new RegExp(RegString, 'ig'));
  match?.forEach(v => {
    const result = v.match(new RegExp(RegString, 'i')) || [];
    if (result[2] && translationDb[result[2]]) {
      gameStrings = gameStrings.replace(v, `${result[1]}=${translationDb[result[2]]}`);
    }
  });
  return gameStrings;
}

export default defineCardApply;
