minElement = document.getElementById("min");
maxElement = document.getElementById("max");

var root = document.querySelector(':root');


function updateAxis() {

    d1 = document.getElementById("d1").value;
    d2 = document.getElementById("d2").value;
    d3 = document.getElementById("d3").value;
    aVR = document.getElementById("aVR").value;
    aVL = document.getElementById("aVL").value;
    aVF = document.getElementById("aVF").value;

    full_range = range(-180, 180);

    if (d1 !== '') {
        if (d1 === '+') {
            r = range(-90, 90);
        } else {
            r = union(range(-180, -90), range(90, 180));
        }
        full_range = intersection(full_range, r);
    }

    if (d2 !== '') {
        if (d2 === '+') {
            r = range(-30, 150);
        } else {
            r = union(range(150, 180), range(-180, -30));
        }
        full_range = intersection(full_range, r);
    }

    if (d3 !== '') {
        if (d3 === '+') {
            r = union(range(30, 180), range(-180, -150));
        } else {
            r = range(-150, 30);
        }
        full_range = intersection(full_range, r);
    }

    if (aVR !== '') {
        console.log(`aVR: ${aVR}`);
        if (aVR === '+') {
            r = union(range(-180, -60), range(120, 180));
        } else {
            r = range(-60, 120);
        }
        full_range = intersection(full_range, r);
    }

    if (aVL !== '') {
        if (aVL === '+') {
            r = range(-120, 60);
        } else {
            r = union(range(-180, -120), range(60, 180));
        }
        full_range = intersection(full_range, r);
    }

    if (aVF !== '') {
        if (aVF === '+') {
            r = range(0, 180);
        } else {
            r = range(-180, 0);
        }
        full_range = intersection(full_range, r);
    }

    if(full_range.includes(-180) && full_range.includes(180))
        full_range = full_range.map( s => s < 0 ? 360 + s : s);


    rangeMin = Math.min(...full_range);
    rangeMax = Math.max(...full_range);


    console.log(`Min: ${rangeMin}, Max: ${rangeMax}`);
    minElement.innerText = rangeMin > 180 ? 180 - rangeMin : rangeMin;
    maxElement.innerText = rangeMax > 180 ? -360 + rangeMax : rangeMax;

    if(!isFinite(rangeMin)) rangeMin = 0;
    if(!isFinite(rangeMax)) rangeMax = 360;

    updateCSS(rangeMin, rangeMax);
    
}


function updateCSS(min, max) {
    
    root.style.setProperty('--min-deg', `${min}deg`);
    root.style.setProperty('--max-deg', `${max}deg`);
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


function intersection(x, y) {
    return x.filter(value => y.includes(value));
}

function union(x, y) {
    return [...new Set([...x, ...y])]
}