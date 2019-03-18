function buildMetadata(sample) {
  d3.json(`/metadata/${sample}`).then((data) => {
  // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");
   
   // Use `.html(“”) to clear any existing metadata
    panel.html("");
   
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
    Object.entries(data).forEach(([key, value]) => {
      panel.append("h4").text(`${key}: ${value}`);
      console.log(key, value);
    });
  
  });
}

function buildCharts(sample) {
  //Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data)=>{
    var otu_ids=data.otu_ids;
    var otu_labels=data.otu_labels;
    var sample_values=data.sample_values;
    // Build a Bubble Chart using the sample data
    var trace1 = [{
      // x: data.map(row => row.otu_ids),
      // y: data.map(row => row.sample_values),
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        // opacity: [1, 0.8, 0.6, 0.4],
        size: sample_values
      }
    }];
    
    var layout = {
      margin: {t: 0},
      showlegend: false,
      height: 600,
      width: 600,
      hovermode: "closest"
    };
    
    Plotly.newPlot('bubble', trace1, layout);


    //Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  var trace2 = [{
  labels: otu_ids.slice(0, 10),
  values: sample_values.slice(0, 10),
  hovertext: otu_labels.slice(0, 10),
  hoverinfo: "hovertext",
  type: 'pie'
  }
];

var layout2 = {
  margin:{t:0, l:0}
};

Plotly.newPlot('pie', trace2, layout2);
});
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
        console.log(selector)
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
