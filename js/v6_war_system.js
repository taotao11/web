/*
 * V6 天下战争系统
 * 乱世赵匡胤 · 黄袍之前
 * 城池 / 道路 / 粮道 / 军队 / 将领 / 高平之战 / 陈桥风险
 */

window.WarSystem = {
  cities: {
    东京:{owner:'后周',food:100000,defense:80,population:500000,x:70,y:55},
    高平:{owner:'战场',food:30000,defense:50,population:80000,x:45,y:35},
    太原:{owner:'北汉',food:60000,defense:90,population:150000,x:20,y:25},
    开封:{owner:'后周',food:90000,defense:85,population:400000,x:75,y:70}
  },

  roads:[
    {from:'东京',to:'高平',days:35,foodCost:12000,terrain:'平原'},
    {from:'高平',to:'太原',days:15,foodCost:6000,terrain:'山地'},
    {from:'东京',to:'开封',days:5,foodCost:1000,terrain:'平原'}
  ],

  army:{
    commander:'赵匡胤',
    soldiers:15000,
    morale:80,
    food:50000,
    location:'东京',
    status:'待命'
  },

  generals:{
    '赵匡胤':{military:95,politics:85,charisma:90,loyalty:75,ambition:90},
    '柴荣':{military:98,politics:90,charisma:95,loyalty:95,ambition:70}
  },

  chenqiaoRisk:20,

  moveArmy(to){
    const road=this.roads.find(r=>r.from===this.army.location&&r.to===to);
    if(!road)return {ok:false,msg:'没有可用道路'};
    this.army.location=to;
    this.army.food-=road.foodCost;
    this.army.morale-=Math.floor(road.days/10);
    return {ok:true,msg:`军队抵达${to}，消耗粮草${road.foodCost}`};
  },

  battleGaoping(extra={}){
    let power=this.army.soldiers*this.army.morale/100;
    power+=this.generals['赵匡胤'].military*100;
    power+=extra.command||0;
    const enemy=22000*0.75;
    const win=power>enemy;
    if(win){
      this.army.morale+=15;
      this.chenqiaoRisk+=15;
    }
    return {win,power,enemy,risk:this.chenqiaoRisk};
  },

  updateChenqiaoRisk(){
    this.chenqiaoRisk=Math.min(100,
      this.chenqiaoRisk+
      this.army.morale/20+
      this.generals['赵匡胤'].charisma/30
    );
    return this.chenqiaoRisk;
  }
};
