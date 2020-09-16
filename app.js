let dates = []
let active_cases = []
let total_cases = []
let deaths = []
let recovered = []
let active_curr
fetch("http://covid.vinteq.in/api/get_data/?country=India", {
     "method": "GET",
     "headers": {
     "auth-key": "11b30735f8040cb1fa442aa8284a1aac93f0376a4034ff14f83c6255479139b1",
     }
})
    .then(response => response.json())
    .then(function (data) {
        console.log(data)

         for(i=0; i<data.history.length; i++){
            dates.push(data.history[i].date)
            active_cases.push(data.history[i].active_cases)
            total_cases.push(data.history[i].total_cases)
            recovered.push(data.history[i].recovered_cases)
            deaths.push(data.history[i].deaths)
        }
        document.getElementById('active').innerHTML = data.live_data.cases.active.toString()
        document.getElementById('recovered').innerHTML = data.live_data.cases.recovered.toString()
        document.getElementById('death').innerHTML = data.live_data.deaths.total.toString()
        document.getElementById('new').innerHTML = data.live_data.cases.new.toString()
        document.getElementById('critical').innerHTML = data.live_data.cases.critical.toString()
        document.getElementById('c_mpop').innerHTML = data.live_data.cases['1M_pop'].toString()
        document.getElementById('new_d').innerHTML = data.live_data.deaths.new.toString()
        document.getElementById('total_d').innerHTML = data.live_data.deaths.total.toString()
        document.getElementById('total_t').innerHTML = data.live_data.tests.total.toString()
        document.getElementById('test_new').innerHTML = data.live_data.tests['1M_pop'].toString()
        console.log(typeof(active_curr))

        drawGraph()
    })
    .catch(err => {
        console.log(err);
});


function drawGraph(){
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: dates.reverse(),
        datasets: [{
            label: 'Total Cases',
            borderColor: 'rgb(255, 99, 132)',
            data: total_cases.reverse()
        },{
            label: 'Recovered Cases',
            borderColor: 'rgb(0, 255, 132)',
            data: recovered.reverse()
        },
        {
            label: 'Deaths',
            borderColor: 'rgb(150, 150, 132)',
            data: deaths.reverse()
        }
    ],
    },

    // Configuration options go here
    options: {}
});
}