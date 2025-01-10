import coinModel from '../models/coins.js';
export const getDeviations=async(req,res)=>{
    const { coin } = req.body;

    if (!coin) {
        return res.status(400).json({ error: 'Please provide a cryptocurrency name.'});
    }

    try {
        // Fetch the last 100 records for the specified cryptocurrency
        const records = await coinModel.find({ coin: { $regex: new RegExp(`^${coin}$`, 'i') } })
            .sort({ timestamp: -1 }) // Sort by timestamp descending
            .limit(100);

        if (records.length === 0) {
            return res.status(404).json({ error: 'No records found for the requested cryptocurrency.' });
        }

        // Extract prices from the records
        const prices = records.map(record => record.currentPrice);

        // Calculate the mean
        const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

        // Calculate the variance
        const variance =
            prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

        // Calculate the standard deviation
        const standardDeviation = Math.sqrt(variance);

        return res.status(200).json({ standardDeviation: standardDeviation.toFixed(2) });
    } catch (err) {
        console.log(err);
        return res.status(500).json({error:'An error occurred while calculating standard deviation.' });
    }
}
