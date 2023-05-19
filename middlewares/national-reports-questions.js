import path from 'path';
import {analyzerMapping} from '../app/app-data/report-analyzer-mapping.js'

module.exports = async function(req, res){

    let clearingHouse = process.env.CLEARINGHOUSE.toLowerCase();
    let report        = req.params.report;
    
    let reports = [];
    if(clearingHouse == 'absch')
        reports = analyzerMapping.abs;
    else if(clearingHouse == 'bch')
        reports = analyzerMapping.bch;

    const reportDetails = reports.find(e=>e.type == report);

    if(!reportDetails)
        return res.status(404).send();

    try{
        const reportPath = path.join('..', 'app', `${reportDetails.questionsUrl}.js`)
        const reportData = await import(reportPath)
        res.status(200).json(reportData);
    }
    catch(e){
        console.log(e)
        res.status(500).send('Internal server error')
    }
}
