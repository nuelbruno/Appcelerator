
var dbName = 'DMCARouteMap.sql';
var db;

var createDB = function()
{
	db = Ti.Database.open(dbName);
	var rs = db.execute('select * from sqlite_master where name="table"');
	if(rs.getRowCount()<=0)
	{
		db.execute();
	}
};
