import _ from 'lodash';

const RegString = '(.+?)=(.+)';
const RegApply = '^Weapon|^Unit|^Button|^Behavior';

const defineCardApply = (_gameStrings: string) => {
  const translationDb: any = [];
  // Process
  let gameStrings = _gameStrings;
  const match = gameStrings.match(new RegExp(RegString, 'ig'));
  match?.forEach(v => {
    const result = v.match(new RegExp(RegString, 'i')) || [];
    if (new RegExp(RegApply, 'i').test(result[1])) {
      translationDb.push({
        en: result[2],
        cn: '',
      })
    }
  });
  return JSON.stringify(_.uniqBy(translationDb.filter((v: any) => v.en !== ''), 'en'), null, 2);
}

export default defineCardApply;
