/* V6 势力AI与政治动态 */
window.V6PoliticsAI={
 factions:{
  后周:{power:90,food:80,stability:85},
  北汉:{power:55,food:60,stability:50},
  契丹:{power:75,food:70,stability:70}
 },
 turn(){
  Object.values(this.factions).forEach(f=>{
   f.food=Math.max(0,f.food-1);
  });
  if(window.WarSystem){WarSystem.updateChenqiaoRisk();}
 },
 rumor(){
  let r=window.WarSystem?.chenqiaoRisk||0;
  if(r>70)return '军中已有拥戴赵将军的流言';
  if(r>40)return '将士开始依赖赵匡胤的威望';
  return '军中保持稳定';
 }
};
