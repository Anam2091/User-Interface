const dropdownOptions = [
  {
    text: "hum vs precip",
    value: 'humvsprecip'
  },
  {
    text: "pressure vs temp",
    value: 'pressurevstemp'
  },

]
function buildMetadata(sample) {

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
  const [prop1, prop2] = sample.split('vs');

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.csv("./data.csv").then((i) => {
    const items = i.slice(0, 50);
    // @TODO: Build a Bubble Chart using the sample data
    const prop1_y_axis = items.map((item) => item[prop1]);
    const prop2_y_axis = items.map((item) => item[prop2]);
    const year = items.map((item) => item['month']);

    var trace1 = {
      x: year,
      y: prop1_y_axis,
      mode: 'markers',
      type: 'scatter'
    };
    
    var trace2 = {
      x: year,
      y: prop2_y_axis,
      mode: 'markers',
      type: 'scatter'
    };
    
    var data = [trace1, trace2];
    
    Plotly.newPlot('myDiv', data);
  });
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

    // get list of keys from obj and create options for dropdown
    dropdownOptions.forEach((option) => {
      selector
        .append("option")
        .text(option.text)
        .property("value", option.value);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = dropdownOptions[0];
    buildCharts(firstSample.value);
    buildMetadata(firstSample);
  
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
