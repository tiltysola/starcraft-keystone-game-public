import fs from 'fs';
import path from 'path';
import process from 'process';

import defineCardApply from './utils/defineCardApply';

process.env.WORK_PATH = path.join(__dirname, '../../');

const main = () => {
  const gameStrings = fs.readFileSync(`${process.env.WORK_PATH}/results/defineCardConvert.GameStrings.txt`).toString();
  const applyGameStrings = defineCardApply(gameStrings);
  fs.writeFileSync(`${process.env.WORK_PATH}/results/defineCardApply.GameStrings.txt`, applyGameStrings);
}

main();
