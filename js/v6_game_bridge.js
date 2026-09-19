/*
 V6 天下战争系统接入桥
 不覆盖原SCENES和存档，只做兼容连接
*/
(function(){
 window.V6GameBridge={
   sync(){
     if(!window.WarSystem||!window.stats)return;
     stats.chenqiao=WarSystem.chenqiaoRisk||stats.chenqiao;
     stats.armyPower=WarSystem.army.soldiers;
     stats.armyMorale=WarSystem.army.morale;
     stats.foodSupply=WarSystem.army.food;
     if(typeof persist==='function') persist();
   },
   gaoping(){
     if(!window.WarSystem)return null;
     const result=WarSystem.battleGaoping();
     if(result.win){
       if(window.stats){
        stats.prestige=(stats.prestige||0)+20;
        stats.morale=(stats.morale||0)+10;
        stats.chenqiao=result.risk;
       }
     }
     this.sync();
     return result;
   },
   chenqiaoText(){
     const r=window.WarSystem?.chenqiaoRisk||0;
     if(r>=80)return '军中已经出现拥戴赵将军的声音';
     if(r>=50)return '将士越来越依赖赵匡胤的威望';
     return '军中暂时稳定';
   }
 };
})();
