function buildMetadata(sample) {
  var sample = `/metadata/${sample}`
  Plotly.d3.json(sample,function(error,response){
    if (error) return console.log(error);
    console.log(response);
    var data = response[0];
    console.log(data)
    var metaList = document.getElementById('sampleMetadata');
    metaList.innerHTML = '';
    var metaItems = [["Sample","SAMPLEID"],["Ethnicity","ETHNICITY"],["Gender","GENDER"],["Age","AGE"],
        ["Weekly Wash Frequency","WFREQ"],["Type (Innie/Outie)","BBTYPE"],["Country","COUNTRY012"],["Dog Owner","DOG"],["Cat Owner","CAT"]];
    console.log(metaList)
    for(i=0; i<metaItems.length; i++){
        var newLi = document.createElement('li');
        newLi.innerHTML = `${metaItems[i][0]}: ${data[metaItems[i][1]]}`;
        metaList.appendChild(newLi);
    };
  });
};

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.select("")

    // @TODO: Build a Bubble Chart using the sample data
    // var = [sample_data]
    var trace1 = {
      x: data.map(row => row.otu_ids),
      y: data.map(row => row.sample_values),
      mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        // opacity: [1, 0.8, 0.6, 0.4],
        size: [sample_values]
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Marker Size and Color',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data, layout);


    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  // var top_10=
  var trace1 = {
  labels: [top_10.label],
  values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: 'pie'
};

var data = [trace1];

Plotly.newPlot("pie", data);
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
