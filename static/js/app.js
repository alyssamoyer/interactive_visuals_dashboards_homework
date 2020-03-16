


    d3.json("../../samples.json").then(function(data){


        console.log(data.samples);

        var sampleData = data.samples;

        var dropDown = d3.select("#selDataset");

        sampleData.forEach((subject) => {
            console.log(subject.id);
             var option = dropDown.append("option");
             option.text(subject.id);
             option.attr("value", subject.id);

        });

        // on click filter data set and display bar graph
        //for the selected subject



        

     


    });
