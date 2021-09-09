const battles = require("./battles")

const b = battles.reduce((d, battle) => {

    if (d.attacker_king.hasOwnProperty(battle.attacker_king)) d.attacker_king[battle.attacker_king]+=1
    else if (battle.attacker_king.length>0) d.attacker_king[battle.attacker_king]=1
    
    if (d.defender_king.hasOwnProperty(battle.defender_king)) d.defender_king[battle.defender_king]+=1
    else if (battle.defender_king.length>0) d.defender_king[battle.defender_king]=1

    if (d.region.hasOwnProperty(battle.region)) d.region[battle.region]+=1
    else if (battle.region.length>0) d.region[battle.region]=1
    
    if (d.name.hasOwnProperty(battle.name)) d.name[battle.name]+=1
    else if (battle.name.length>0) d.name[battle.name]=1

    if (!(d.battle_type.includes(battle.battle_type)) && battle.battle_type.length>0) d.battle_type.push(battle.battle_type)

    if(battle.attacker_outcome == "win") d.win++
    else if(battle.attacker_outcome == "loss") d.loss++
    
    d.max=battle.defender_size >d.max ? battle.defender_size : d.max
    d.min=(battle.defender_size!=null && battle.defender_size <d.min) ? battle.defender_size : d.min
    d.sum+=battle.defender_size
    return d

}, {attacker_king:{},defender_king:{},region:{},name:{},win:0,loss:0,battle_type:[],sum:0,min:battles[0].defender_size, max:0});

var max_name = Object.keys(b.name).reduce((x, y) => b.name[x] > b.name[y] ? x : y)
if (b.name[max_name]==1) max_name="All names occur only once"

ans={
    'most_active':{
        'attacker_king': Object.keys(b.attacker_king).reduce((x, y) => b.attacker_king[x] > b.attacker_king[y] ? x : y),
        'defender_king': Object.keys(b.defender_king).reduce((x, y) => b.defender_king[x] > b.defender_king[y] ? x : y),
        'region':Object.keys(b.region).reduce((x, y) => b.region[x] > b.region[y] ? x : y),
        'name':max_name
    },
    'attacker_outcome':{
        'win':b.win, 
        'loss':b.loss 
    },
    'battle_type':b.battle_type,
    'defender_size':{
        'average':(b.sum/battles.length).toFixed(4),
        'min':b.min,
        'max':b.max
        }
}
console.log(ans)