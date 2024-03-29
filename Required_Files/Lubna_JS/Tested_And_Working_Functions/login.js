var x = login(1000011,"674nd");
console.log(x);
//var x = login(1000012,"97473n");
//var x = login(1000013,"028n84");
//var x = login(1000014,"i4y3j");
//var x = login(1000015,"84ynf");
//var x = login(1000016,"28464n");
//var x = login(1000017,"84757");
//var x = login(1000018,"ndie74");
//var x = login(1000019,"9283nd");
//var x = login(1000020,"034gsv");
//var x = login(1000021,"6438292bne");
//var x = login(1000022,"872hd");
//var x = login(1000023,"9383bw");
/*var x = login(1000024,"48473uyhg");
var x = login(1000025,"723fhr");
var x = login(1000026,"282jd");
*/

function login(Employee_id,Entered_Password)
{
	var Connection = require('tedious').Connection;
	var Request = require('tedious').Request;
	var TYPES = require('tedious').TYPES;

	// Create connection to database
	var config =
	{
		authentication: {
			options: {
				userName: 'lubnamakoon01',
				password: 'Lub_5361252211'
			},
			type: 'default'
		},
		server: 'lubnamakoon.database.windows.net',
		options:
		{
			database: 'LubnaCharityShop',
			encrypt: true
		}
	}
	
	var connection = new Connection(config);
	// Attempt to connect and execute queries if connection goes through
	connection.on('connect', function(err)
		{
			if (err)
			{
				console.log(err)
			}
			else
			{
				var request = new Request("IF exists (SELECT * FROM sources.employee WHERE Employee_id = @Employee_id AND Login_Password = @Entered_Password)" +
					" BEGIN"+
					" INSERT INTO transactions.login_table (Login_id,Employee_id,Login_Time)" +
					" VALUES ((SELECT max(Login_id)+1 FROM transactions.login_table),@Employee_id,getdate());" +
					" END;" +
					"SELECT Employee_id FROM sources.employee WHERE Employee_id = @Employee_id AND Login_Password = @Entered_Password;", 
					function (err, rowCount) {
					if (err)
						console.error(err);

					console.log('rowCount: ' + rowCount);
					
					process.exit();
				});

				request.addParameter('Employee_id', TYPES.Int, Employee_id);
				request.addParameter('Entered_Password', TYPES.VarChar, Entered_Password);

				request.on('row', function (columns) {
					if (columns[0].value == Employee_id)
					{
						console.log(columns[0].value);
						return 10;
					}
				});

				connection.execSql(request);
			}
		}
	);
}