import fs from 'fs';
import path from 'path';
import process from 'process';

import gameStringsApply from './utils/gameStringsApply';

process.env.WORK_PATH = path.join(__dirname, '../../');

const main = () => {
  const gameStrings = fs.readFileSync(`${process.env.WORK_PATH}/sources/zhCN.SC2Data/LocalizedData/GameStrings.txt`).toString();
  const applyGameStrings = gameStringsApply(gameStrings);
  fs.writeFileSync(`${process.env.WORK_PATH}/results/gameStringApply.GameStrings.txt`, applyGameStrings);
}

main();
