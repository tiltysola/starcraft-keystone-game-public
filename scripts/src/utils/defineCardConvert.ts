import fs from "fs";
import process from 'process';
import _ from 'lodash';

const RegVar = '(?:\\s*)(.*?)(?:\\s*)';
// const RegInt = '(?:\\s*)(?:(\\d+?)|(.*?))(?:\\s*)';
const RegString = '(?:\\s*)"(.*?)"(?:\\s*)';
// const RegTrigger = RegVar;
const RegSoundLink = `(?:\\s*)SoundLink\\(${RegVar},${RegVar}\\)(?:\\s*)`;
const DefineCardRegexp = `lib1_gf_DefineCard\\(${RegVar},${RegVar},${RegVar},${RegString},${RegVar},${RegVar},${RegVar},${RegVar},${RegVar},${RegVar},${RegString},${RegVar},${RegSoundLink}\\);`

const defineCardConvert = (_script: string) => {
  let script = _script;
  const match = script.match(new RegExp(DefineCardRegexp, 'ig'));
  const resultArray: any = [];
  const cardArray: any = [];
  match?.forEach(v => {
    const result = v.match(new RegExp(DefineCardRegexp, 'i')) || [];
    // generate ConvertResult.json
    resultArray.push({
      lv_id: result[1],
      lv_set: result[2],
      lv_race: result[3],
      lv_name: result[4],
      lv_type: result[5],
      lv_subtype: result[6],
      lv_rarity: result[7],
      lv_mineral: result[8],
      lv_gas: result[9],
      lv_default_effect: result[10],
      lv_base_text: result[11],
      lv_image: result[12],
      lv_sound_id: result[13],
      lv_sound_index: result[14],
    })
    // generate card summary
    const summary = result[4].replace(/\s/g, '_');
    // replace script
    script = script.replace(v, `lib1_gf_DefineCard(${result[1]}, ${result[2]}, ${result[3]}, "${result[4]}", StringExternal("Card/Name/${summary}"), ${result[5]}, ${result[6]}, ${result[7]}, ${result[8]}, ${result[9]}, ${result[10]}, StringExternal("Card/Describe/${summary}"), ${result[12]}, SoundLink(${result[13]}, ${result[14]}));`)
    // generate GameStrings.txt
    cardArray.push({
      summary,
      cardName: result[4],
      cardDescribe: result[11]
    });
  })
  // save ConvertResult.json
  fs.writeFileSync(`${process.env.WORK_PATH}/results/defineCardConvert.Result.json`, JSON.stringify(resultArray, null, 2));
  // save GameStrings.txt
  const cardNames = cardArray.map((v: any) => {
    return `Card/Name/${v.summary}=${v.cardName}`;
  }).join('\n');
  const cardDescribes = cardArray.map((v: any) => {
    return `Card/Describe/${v.summary}=${v.cardDescribe}`;
  }).join('\n');
  fs.writeFileSync(`${process.env.WORK_PATH}/results/defineCardConvert.GameStrings.txt`, `${cardNames}\n${cardDescribes}`)
  // save TranslationDB.json
  const translationDb = [...cardArray.map((v: any) => {
    return {
      en: v.cardName,
      cn: '',
    }
  }), ...cardArray.map((v: any) => {
    return {
      en: v.cardDescribe,
      cn: '',
    }
  })]
  fs.writeFileSync(`${process.env.WORK_PATH}/results/defineCardConvert.TranslationDB.json`, JSON.stringify(_.uniqBy(translationDb.filter((v: any) => v.en !== ''), 'en'), null, 2));
  // done
  return script;
}

export default defineCardConvert;
