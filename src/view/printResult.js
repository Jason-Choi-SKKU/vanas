import * as d3 from "d3";
import { cellSainityCheck } from "../data/dataProcessing";
import { getAccuracy } from "../service/getAccuracy";

let init = 1;

export function printResult(){
    if (init){
        init = 0;
        return 0;
    }
    const cellStatus = cellSainityCheck();
    console.log(cellStatus);
    let checker = 0;
    
    if(cellStatus.numEdge > 9){
        d3.select("#analytics").attr("class", "visually-hidden")
        d3.select("#edgeNumberAlert")
            .attr("class", "notcell alert alert-danger")
        checker++;
    }
    if(!cellStatus.isConnected){
        d3.select("#analytics").attr("class", "visually-hidden")
        d3.select("#connectAlert")
            .attr("class", "notcell alert alert-warning")
        checker++;
    }
    
    d3.selectAll(".node").select("circle").style("filter", "url(#drop-shadow)");

    if(cellStatus.extraneous.length > 0){
        d3.select("#analytics").attr("class", "visually-hidden");
        for (let ext of cellStatus.extraneous){
            
            if(ext ==0 || ext ==cellStatus.matrix.length-1){
                continue;
            }
            console.log(ext);
            d3.select("#node" + ext).select("circle")
                .style("filter", "url(#drop-shadow-ext)");
        }
        d3.select("#extraneousAlert")
            .attr("class", "alert alert-warning")
    }
    else{
        d3.select("#extraneousAlert")
            .attr("class", "visually-hidden")
    }
    if(!checker){
        d3.selectAll(".notcell")
            .attr("class", "visually-hidden")
        getAccuracy(cellStatus.matrix);
    }

}

