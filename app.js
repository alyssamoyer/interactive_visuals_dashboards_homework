// Option changed function handles user selection of subjec id 
//on the drop down. When user selects an id buildplot function is called
function optionChanged() {
    subjectId = d3.select("#selDataset").property("value");
    
    console.log(subjectId);

    buildPlot(subjectId);
}

function createDropDown(data) {


    console.log(data.samples);

    var sampleData = data.samples;

    //selects dropdown menu
    var dropDown = d3.select("#selDataset");

    sampleData.forEach((subject) => {
        //adds a drop down option for each subject in study
         var option = dropDown.append("option");
         option.text(subject.id);
         option.attr("value", subject.id);

    });


};

function buildPlot(subjectId) {
    d3.json("samples.json").then(function(data) {
    
    console.log(data);

    var sampleData = data.samples;
    var meta = data.metadata;

    //Filter data for the user selected subject id
    var subjectFilter = sampleData.filter(subject => subject.id == subjectId);
    var metaFilter = meta.filter(subject => subject.id == subjectId);
    console.log(metaFilter[0]);

    var demo = metaFilter[0];

    
    //Select table to hold demographic information
    var table = d3.select("#sample-metadata");
    //remove data from previous selected subject
    table.selectAll("tr").remove();

    //Add in metadata for subject by appending a row for each datapoint
    table.append("tr").text(`Id: ${demo.id}`)
    table.append("tr").text(`Ethnicity: ${demo.ethnicity}`)
    table.append("tr").text(`Gender: ${demo.gender}`)
    table.append("tr").text(`Age: ${demo.age}`)
    table.append("tr").text(`Location: ${demo.location}`)
    table.append("tr").text(`Bbtype: ${demo.bbtype}`)
    table.append("tr").text(`Wfreq: ${demo.wfreq}`)

    //Create variables for data to pull into graphs

    var values = subjectFilter[0].sample_values;
    var ids = subjectFilter[0].otu_ids;
    var labels = subjectFilter[0].otu_labels;

    //Create horizontal bar chart for the top ten OTU ids
    var trace1 = {
        x: values.slice(0,10).reverse(),
        y: ids.slice(0,10).reverse(),
        type:"bar",
        orientation: "h",
        text: labels.slice(0,10),
        marker: {
            color: 'rgba(140, 207, 188,0.6)',
            width: 1
          }
    };

    var data = [trace1];

    //set the y axis to the type category so all OTUs display
    var layout = {
        yaxis: {
            type: 'category',
        },
        title: `Subject ${subjectId} Top 10 Sample Values by OTU Id`
    };
    //add chart to page
    Plotly.newPlot("bar", data, layout);

    
    //Loop through the number of data points for each subject
     //and create three numbers for the rbb color values
    var  rgblist = [];
    var r = 10;
    var g = 30;
    var b = 0;

    for (i = 0; i < ids.length; i++){
        r += 1;
        g += 5;
        b += 1;

        var rgbcolor = `rgb(${r}, ${g} ,${b})`;
        rgblist.push(rgbcolor);
    };


    var trace2 = {
        x: ids,
        y: values,
        mode: 'markers',
        marker: {
            size: values
        },
        color: rgblist,
        text: labels
    };

    var data2 = [trace2];

    var layout2 = {
        xaxis: {range: [0, 3500]},
        title: `Subject ${subjectId} Sample Values by OTU Id`
    };

    Plotly.newPlot("bubble", data2, layout2);    

   
   


});


};


d3.json("samples.json").then (createDropDown);
