# starcraft-keystone-game  

### Structure  

1. assets: project assets folder.  

2. maps: map noumenon folder.  

3. scripts: translation & postprocess scripts folder.  

4. sources: map sources folder.  

5. tools: external executable programs folder.  

### Progress:  

1. Translation Cards: done.  

> auto: defineCardConvert.  
> manual: translation text.  
> auto: defineCardApply.  
> manual: combine GameStrings.txt.  
> manual: add lp_cname & lp_base_text support.  
> manual: StringToText(lib1_gv_card[lp_card_id].lv_name) > lib1_gv_card[lp_card_id].lv_cname  
> manual: lib1_gv_card[lp_id].lv_base_text = TextToString(lp_base_text)  
> manual: lib1_gv_set[x].lv_price = 150; > lib1_gv_set[x].lv_price = 15;  
> manual: Avatar: lib1_gf_DefineCosmeticPortrait  
