/*
 V6战争系统整合层
 将天下战争模块接入原剧情状态
*/
(function(){
  window.V6Integration={
    sync(){
      if(!window.WarSystem || !window.stats) return;
      stats.armyPower=WarSystem.army.soldiers;
      stats.warMorale=WarSystem.army.morale;
      stats.foodSupply=WarSystem.army.food;
      stats.chenqiaoRisk=WarSystem.chenqiaoRisk;
      if(typeof persist==='function') persist();
    },
    gaoping(){
      if(!window.WarSystem) return null;
      const result=WarSystem.battleGaoping();
      if(result.win){
        WarSystem.army.morale+=10;
        WarSystem.chenqiaoRisk+=10;
      }
      this.sync();
      return result;
    },
    chenqiaoText(){
      const r=window.WarSystem?.chenqiaoRisk||0;
      if(r>=70) return '军中已经出现拥戴赵将军的声音';
      if(r>=40) return '将士越来越依赖赵匡胤的威望';
      return '军中暂时保持稳定';
    }
  };
})();
