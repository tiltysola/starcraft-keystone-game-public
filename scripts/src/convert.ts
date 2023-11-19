import fs from 'fs';
import path from 'path';
import process from 'process';

import defineCardConvert from './utils/defineCardConvert';

process.env.WORK_PATH = path.join(__dirname, '../../');

const main = () => {
  const script = fs.readFileSync(`${process.env.WORK_PATH}/sources/MapScript.galaxy`).toString();
  const convertedScript = defineCardConvert(script);
  fs.writeFileSync(`${process.env.WORK_PATH}/results/defineCardConvert.MapScript.galaxy`, convertedScript);
}

main();
