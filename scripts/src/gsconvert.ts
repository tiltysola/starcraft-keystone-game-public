import fs from 'fs';
import path from 'path';
import process from 'process';

import gameStringsConvert from './utils/gameStringsConvert';

process.env.WORK_PATH = path.join(__dirname, '../../');

const main = () => {
  const gameStrings = fs.readFileSync(`${process.env.WORK_PATH}/sources/zhCN.SC2Data/LocalizedData/GameStrings.txt`).toString();
  const convertedGameStrings = gameStringsConvert(gameStrings);
  fs.writeFileSync(`${process.env.WORK_PATH}/results/gameStringConvert.GameStrings.txt`, convertedGameStrings);
}

main();
