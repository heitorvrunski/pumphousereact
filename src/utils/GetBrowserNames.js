export function GetBrowserNames(tags) {
    var keys = Object.keys(tags.toJS());
    var list2Fill = []
    keys.map((tag,i) => {
        rowTable(tag,i,tags.toJS(),0,list2Fill)
        return null
    })
    return list2Fill
  }


  function rowTable(row,i,list,father,list2fill,downLevel){
    if(!father)
        father=[]
    if(downLevel===true&&i!==0)
        father.pop()  
    father.push(row)
    if( parseInt(father[1], 10)>=0&&  parseInt(father[2], 10)>0){
        father.splice(1,1)
    }

    if(typeof list[row] === 'object'){
        var listElements = [];
        Object.keys(list[row]).map((key,index)=>{
            listElements.push(rowTable(key,index,list[row],father,list2fill,true))
            return null;
        })
        return father
    }else{
        let nf = []
        for (let index = 0; index < father.length; index++) {
            nf.push(father[index])
            
        }
        list2fill.push(nf)
        return father
    }
    

    }