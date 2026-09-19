/* V6 天下地图 UI 接入 */
(function(){
  window.V6MapUI={
    open(){
      if(!window.WarSystem){return alert('战争系统未加载');}
      let old=document.getElementById('v6-war-panel');
      if(old){old.remove();}
      const p=document.createElement('div');
      p.id='v6-war-panel';
      p.style='position:fixed;inset:5%;z-index:9999;background:#eee4d2;border:2px solid #a77a3e;padding:24px;overflow:auto;color:#28231e;font-family:serif;box-shadow:0 20px 80px #000';
      let c=WarSystem.cities;
      p.innerHTML=`<h2>天下局势</h2>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">
      ${Object.keys(c).map(k=>`<div style="border:1px solid #b9a88f;padding:12px"><b>${k}</b><br>势力:${c[k].owner}<br>粮草:${c[k].food}<br>城防:${c[k].defense}</div>`).join('')}
      </div>
      <hr><h3>赵匡胤军</h3>
      兵力:${WarSystem.army.soldiers}<br>
      士气:${WarSystem.army.morale}<br>
      粮草:${WarSystem.army.food}<br>
      当前位置:${WarSystem.army.location}<br><br>
      <button onclick="WarSystem.moveArmy('高平');V6MapUI.refresh()">行军高平</button>
      <button onclick="alert(JSON.stringify(WarSystem.battleGaoping(),null,2))">高平之战</button>
      <button onclick="V6MapUI.close()">关闭</button>`;
      document.body.appendChild(p);
    },
    refresh(){this.open();},
    close(){let p=document.getElementById('v6-war-panel');if(p)p.remove();}
  };
})();
