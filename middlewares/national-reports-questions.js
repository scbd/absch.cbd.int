


module.exports = async function(req, res){

    let clearingHouse = process.env.CLEARINGHOUSE.toLowerCase();
    let report        = req.params.report;
    
    const reportPaths = {
        'absch' : 'app/app-data/absch/report-analyzer',
        'bch'   : 'app/app-data/bch/report-analyzer'
    }
    try{
    const reportData = await import(`../${reportPaths[clearingHouse]}/${report}.js`)
    res.status(200).json(reportData);
    }
    catch(e){
        console.log(e)
    }
}
