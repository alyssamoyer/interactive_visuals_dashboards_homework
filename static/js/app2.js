/// Create the on change function up here and then refer to it in the promise

//When t=a user selects a subject id the page should populate with
//charts specific to selected subject id
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
       // console.log(subject.id);
        //adds a drop down option for each subject in study
         var option = dropDown.append("option");
         option.text(subject.id);
         option.attr("value", subject.id);

    });

   

    //filters the data set for user selected subject id
   // var subjectFilter = sampleData.filter(subject => subject.id == subjectId);

    
    //before on change create dashboard
    //review the plots you need to make, subject filter set up so you can 
    //do subjectFilter.dataname to create plots
    //how to position the charts

    //create function inside of json?

};

function buildPlot(subjectId) {
    d3.json("../../samples.json").then(function(data) {
    var sampleData = data.samples;

    //Filter data for the user selected subject id
    var subjectFilter = sampleData.filter(subject => subject.id == subjectId);
    
    console.log(subjectFilter[0]);
    
    //Create variables for data to pull into graphs
    var values = subjectFilter[0].sample_values;
    var ids = subjectFilter[0].otu_ids;
    var labels = subjectFilter[0].otu_labels;

    //Create horizontal bar chart for the top ten OTU ids
    var trace1 = {
        x: values.slice(0,10),
        y: ids.slice(0,10),
        type:"bar",
        orientation: "h",
        text: labels.slice(0,10),
        marker: {
            color: 'rgba(255,153,51,0.6)',
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
});


};


d3.json("../../samples.json").then (createDropDown);
