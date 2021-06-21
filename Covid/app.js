window.onload = function () {
    loadData(`https://api.covid19india.org/data.json`, tabularData);
    loadData(`https://api.covid19india.org/data.json`, totalcases);
}

// function for xmlhttprequest with params as url & callbackfunction.
function loadData(url, callbackFunction) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunction(this);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

//callback function for totalcases
function totalcases(xhr) {
    var label = "",timetamp="";
    var obj = JSON.parse(xhr.responseText);
    label = `<div class="confirmed-case"><h4>Confirmed</h4><h5>↑`+ obj.statewise[0].deltaconfirmed + `</h5><h1>`+ obj.statewise[0].confirmed + `</h1></div>
    <div class="active-case"><h4>Active</h4><h5>&nbsp;</h5><h1>`+ obj.statewise[0].active + `</h1></div>
    <div class="recov-case"><h4>Recovered</h4><h5>↑`+ obj.statewise[0].deltarecovered + `</h5><h1>`+ obj.statewise[0].recovered + `</h1></div>
    <div class="deceased-case"><h4>Deceased</h4><h5>↑`+ obj.statewise[0].deltadeaths + `</h5><h1>`+ obj.statewise[0].deaths + `</h1></div>
    <div class="dose-supplied"><h4>Total Doses Supplied</h4><h1>`+obj.tested[obj.tested.length-1].totalcovishieldadministered+`</h1></div>
    <div class="total-vaccinated"><h4>Total Individual Vacinated</h4><h1>`+obj.tested[obj.tested.length-1].totalindividualsvaccinated+`</h1></div>`;
    timetamp = `<h3>`+obj.tested[obj.tested.length-1].updatetimestamp+`</h3>`

    document.getElementById("data-label").innerHTML = label;
    document.getElementById("timestamp").innerHTML = timetamp;
}

//callback function for tabulardata
function tabularData(xhr) {
    var row = "", i = 1;
    var obj = JSON.parse(xhr.responseText);
    while (i < obj.statewise.length) {
        row += `<tr>
                            <td><h5>(` + obj.statewise[i].statecode + `)</h5>`+ obj.statewise[i].state + `</td>
                            <td>`+ obj.statewise[i].active + `</td>
                            <td><h5 class="delta-confirmed">↑` + obj.statewise[i].deltaconfirmed + `</h5>`+ obj.statewise[i].confirmed + `</td>
                            <td><h5 class="delta-recov">↑` + obj.statewise[i].deltarecovered + `</h5>`+ obj.statewise[i].recovered + `</td>
                            <td><h5 class="delta-deceased">↑` + obj.statewise[i].deltadeaths + `</h5>`+ obj.statewise[i].deaths + `</td>
                            </tr>`;
        i++;
    }
    document.getElementById("data-table").innerHTML = row;
}
