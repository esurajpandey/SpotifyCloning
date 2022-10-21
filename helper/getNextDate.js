function getEndDate(days){
    let today = new Date();
    let day = today.getDate() + days;
    let endDate = new Date(today.getFullYear(),today.getMonth(),day);
    console.log(endDate);
    return endDate;

}
module.exports = {getEndDate};