
//when user selects a new drop down option
//function selects drop down value and calls the plot function using drop down value
function optionChanged() {
    subjectId = d3.select("#selDataset").property("value");
    plot(subjectId);
}


function plot(subjectId) {
    d3.json("../../samples.json").then(function(data){


        console.log(data.samples);

        var sampleData = data.samples;

        //selects dropdown menu
        var dropDown = d3.select("#selDataset");

        sampleData.forEach((subject) => {
            console.log(subject.id);
            //adds a drop down option for each subject in study
             var option = dropDown.append("option");
             option.text(subject.id);
             option.attr("value", subject.id);

        });

        //filters the data set for user selected subject id
        var subjectFilter = sampleData.filter(subject => subject.id == subjectId);

        //review the plots you need to make, subject filter set up so you can 
        //do subjectFilter.dataname to create plots
        //how to position the charts




      



        

     


    });

}
