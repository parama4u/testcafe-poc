
## TEST PLAN

[x] IN-SCOPE

* Page Navgational Tests
* Field Validational Tests
* Calculation Tests - Buget Page
* Caclulation Tests - Reports Page
* Data Injection Tests - Budget Page

[x] OUT-SCOPE

* Security Tests
* Performance Tests


## TEST CONDITIONS

* TS001 Validate Addition of Income
	Add Income in BudgetPage
	Validate Positive Row is Added
	Calculate Total value of Possive Rows
	Validate Inflow value

* TS002 Validate addition of Expense
	Add Misc Expense in Budget Page
	Validate Negative Row is added
	Caculate Total value of Negative Rows
	Validate OutFlow value in Reports-Flow page
	Validate Misc Total value on Reports-Spending Page 
* TS003 Validate DataStorage
	Refresh the page afte adding values and Validate the data

* TS004 Field Validations
	Description only - Validate the Add button is not enabled
	Income with Negative value on Value Field - validate postive Rows
	Expense with Negative Value on Value Field - Validate Negative Rows

* TS005 Graph Validations
	Add Random Income Rows - Validate all combined on Graph
	Add Random Expense Rows - Validate all grouped by Category in Graphs
	
* TS006 Balance Validation
	Add Income and Expenses - Validate the balance in the bottom is calculatetd as expected
 	 

 
## TEST EXECUTION

*Tests were written using TestCafe framework
*Tests were written in Tests.js
*Tests were written for budgettting-app running in http://localhost:8000/:
*Tests were written in assumption that, execution will be done on command line


[x] Pre-requsites

The following modules are required to Run the Tests

		npm install testcafe
		npm install testcafe-react-selectors
		npm install testcafe-reporter-html	 


[x] Execution

*Command:

		testcafe [BROWSER] [TESTFILEPATH] --reporter [<<format>>:<<respath>>]

*Example:

    testcafe chrome e2e/Tests.js --reporter html:Res/report.html

*Expected Results:

There will be three sets of actions will be done. TS001,TS002 would pass, and the TS003 would fail.


