phElement = document.getElementById("ph");
conditionElement = document.getElementById("condition");

minElement = document.getElementById("min");
maxElement = document.getElementById("max");



function updateCondition() {
  phValue = parseFloat(phElement.value);
  
  if (isNaN(phValue)){
    conditionElement.innerText = "please enter pH please thx pls";
    return;
  }
  console.log(phValue);
  
  
  if (phValue > 7.6 || phValue < 7)
    conditionElement.innerText = "u r dead";
  else if (phValue < 7.35)
    conditionElement.innerText = "Acidosis";
  else if (phValue > 7.45)
    conditionElement.innerText = "Alkalosis";
  else
    conditionElement.innerText = "Normal hahaha";
  
}


function updateAxis(){
  mn = -180;
  mx = -180;
  
  d1 = document.getElementById("d1").value;
  d2 = document.getElementById("d2").value;
  d3 = document.getElementById("d3").value;
  aVR = document.getElementById("aVR").value;
  aVL = document.getElementById("aVL").value;
  aVF = document.getElementById("aVF").value;
  
  full_range = range(-180,180);
  
  if (d1 !== ''){
    if (d1 === '+'){
      r = range(-90,90);
    } else{
      r = union(range(-180,-90), range(90,180));
    }
    full_range = intersection(full_range, r);
  }
  
  if (d2 !== ''){
    if (d2 === '+'){
      r = range(-30,150);
    } else{
      r = union(range(150,180), range(-180,-30));
    }
    full_range = intersection(full_range, r);
  }
  
  if (d3 !== ''){
    if (d3 === '+'){
      r = union(range(30,180), range(-180, -150));
    } else{
      r = range(-150,30);
    }
    full_range = intersection(full_range, r);
  }
  
    if (aVR !== ''){
    if (aVR === '+'){
      r = union(range(-180,-60), range(120,180));
    } else{
      r = range(-60, 120);
    }
    full_range = intersection(full_range, r);
  }
  
    if (aVL !== ''){
    if (aVL === '+'){
      r = range(-120,60);
    } else{
      r = union(range(-180,-120), range(60,180));
    }
    full_range = intersection(full_range, r);
  }
  
    if (aVF !== ''){
    if (aVF === '+'){
      r = range(0,180);
    } else{
      r = range(-180,0);
    }
    full_range = intersection(full_range, r);
  }


  rangeMin = Math.min(...full_range);
  rangeMax = Math.max(...full_range);
  
  
  
  console.log(`Min: ${rangeMin}, Max: ${rangeMax}`);
  minElement.innerText = rangeMin;
  maxElement.innerText = rangeMax;
  
}





function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i <= stop : i >= stop; i += step) {
        result.push(i);
    }

    return result;
};


function intersection(x,y){
  return x.filter(value => y.includes(value));
}

function union(x,y){
  return [...new Set([...x, ...y])]
}