import React, {useEffect, useState } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_sliceGrouper from "@amcharts/amcharts4/plugins/sliceGrouper"; 
import data from '../data/userModuleLogs.json';

function getModulValue(modulName, data){
    return data.filter(item => item.module_name === modulName).length;
}

function countFreq(moduleName, chartData) {
    const output = [];
    moduleName.map((module_name) =>(
        output.push({'module_name' : module_name, 'usage' : getModulValue(module_name, chartData)})
    ));
    return output;
}

function PieChart () {
  const [chartData] = useState(data.data.user_module_logs);
  const [AllModulesName] = useState([...new Set(chartData.map(item => item.module_name))]); 
  am4core.options.autoDispose = true;
  am4core.useTheme(am4themes_animated);
  useEffect(() => {
    let chart = am4core.create("piechart", am4charts.PieChart);
    chart.data = countFreq(AllModulesName,chartData);
    
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "usage";
    pieSeries.dataFields.category = "module_name";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    let grouper = pieSeries.plugins.push(new am4plugins_sliceGrouper.SliceGrouper());
    grouper.threshold = 2.5;
    grouper.groupName = "Other";
    grouper.clickBehavior = "zoom";
  });


  return (
    <>
        <div id="piechart" style={{ width: "100%", height: "300px" }}></div>
    </>
  );
}


export default PieChart
