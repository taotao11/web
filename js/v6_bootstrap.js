/*
 V6 天下战争系统接入层
 作用：不破坏原剧情系统，将战争数据同步到游戏状态
*/
(function(){
  function initV6(){
    if(!window.WarSystem)return;

    window.openWorldMap=function(){
      if(window.V6MapUI) V6MapUI.open();
      else alert('天下系统加载中');
    };

    window.syncV6State=function(){
      if(!window.st)return;
      st.stats=st.stats||{};
      st.stats.chenqiao=WarSystem.chenqiaoRisk;
      st.stats.armyMorale=WarSystem.army.morale;
      st.stats.armyFood=WarSystem.army.food;
      st.stats.armyPower=WarSystem.army.soldiers;
    };

    window.v6BattleGaoping=function(){
      const result=WarSystem.battleGaoping();
      if(window.st){
        st.stats.prestige=(st.stats.prestige||0)+(result.win?15:0);
        st.stats.chenqiao=result.risk;
        if(typeof persist==='function')persist();
      }
      return result;
    };
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initV6);
  }else initV6();
})();
