 /**
 * @param {com.ett.blockchain.Programmeben} pgben 
 * @transaction

/*/
function Programmeben(pgben){

  pgben.bankprogramme.benificiary = pgben.benificiary;
   
  console.log('Inside js');
   
return  query('selectProgrammeben',{benificiary: 'resource:com.ett.blockchain.Benificiary#'+pgben.benificiary.customerid,bankprogram: 'resource:com.ett.blockchain.Bankprogramme#'+pgben.bankprogramme.programmeid})

  .then(function (transactions1) {
         console.log("Inside Transaction");
    //throw Error("Transaction already exist for "+ //pgben.benificiary.customerid +" and "  //+pgben.bankprogramme.programmeid );
  console.log("Before " +transactions1.length);
  if(transactions1.length >0){
	 // reject("Error");
    throw Error("Transaction Exists");
  console.log("After " +transactions1);
  }else {
   return  asyncall(pgben);
  }
  //	throw Error("Transaction Exists");
 
});
}
function asyncall(pgben){
console.log("Inside Async Call");
 var benific ;
 var benificiaries=[];
 var benematch = 0; 
  var date1= pgben.disbdate;
return getParticipantRegistry('com.ett.blockchain.Benificiary')
  .then(function (participantRegistry) {
    // Get all of the drivers in the driver participant registry.
  console.log("date is "+date1 );
   console.log("Inside function 1 "+ JSON.stringify(participantRegistry.getAll()));
    return participantRegistry.getAll();
  }).then(function (benificiaries) {
    // Process the array of driver objects.
    console.log("Inside function 2 "+ benificiaries);
    benificiaries.forEach(function (benific) {
      console.log( "list of beneficiaries : "+ benific.customerid);
      if(benific.customerid == pgben.benificiary.customerid )
         {
         benematch = 1;
           console.log("value of benematch "+benematch);
           console.log("Input "+ pgben.benificiary.customerid+"matched with one of the participant"+benific.customerid);
		   
         }
    });
     console.log("bene match inside function 2"+benematch);
	  
  if(benematch == 0){
  console.log("not a beneficiary");
    throw Error("not a beneficiary");
  }
      if(benematch == 1) {
        console.log("Inside else condition 2");
   if(pgben.benificiary.customerid == "TATA"  && pgben.roi > 12)
    {
      console.log("Inside if condition 3");
              throw Error("For TATA roi cannot be more than 12%");
      } 
         else if(pgben.benificiary.customerid == "MRF"  && pgben.loanamount  > 10000000)
    {
              throw Error("For MRF Loan Amount cannot be more than 1 Crore");
      } 
  else if(pgben.benificiary.customerid == "TVS"  && pgben.loanamount  > 5000000)
    {
        //console.log ("Loan Ammount for TVS cannot be more than 50 Lakhs");
        throw Error("For MRF Loan Amount cannot be more than 50 Lakhs");
       } 
   else if(pgben.benificiary.customerid == "TOYOTA"  && pgben.roi > 11)
    {
        throw Error("For TOYOTA roi cannot be more than 11%");
    }  
	else if(date1.getDay() == 0)
    {
       throw Error("Disbursement Date can not be Sunday");
    }
	   else {
         console.log("Inside else condition 4");
    return getAssetRegistry('com.ett.blockchain.Bankprogramme')
        .then(function (assetRegistry) {
            return assetRegistry.update(pgben.bankprogramme);
	});
	}
   }         
  });
 } 
 
