import { Selector } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';
import { waitForReact } from 'testcafe-react-selectors';

function getBal(obj) {
  return obj.getReact(({ props }) => props.amount.text);
}

function getTrans(grid) {
  return grid.getReact(({ props }) => props.transactions);
}

function getChartD(chart) {
  return chart.getReact(({ props }) => props.data);
}

function formatBal(str) {
  return parseInt(str.replace(/[$,]+/g, ''));
}

fixture`Modus`.page('http://localhost:8000').beforeEach(async () => {
  await waitForReact();
});

test.meta({
  'Scenario ID': 'TS001',
  Descripion: 'Income Addition Validation',
  'Creater ': 'parama4u[a]gmail',
  'Creation Date': 'Sep 23 2018',
});

const root = 'Provider BrowserRouter Router AppContainer App ';

const lnkBudget = ReactSelector(`${root}ErrorBoundary StyledNavLink`).withProps('label', 'Budget');
const lnkReports = ReactSelector(`${root}ErrorBoundary StyledNavLink`).withProps('label', 'Reports');

const gridBd = ReactSelector(`${root}ErrorBoundary BudgetGrid`);

const selItem = Selector('.containers-EntryFormRow-style__formSection');
const optCat = selItem.find('option');
const txtDesc = selItem.find('input').withAttribute('name', 'description');
const txtVal = selItem.find('input').withAttribute('name', 'value');
const btnSub = selItem.find('button').withAttribute('type', 'submit');

// const valChartIn=Selector('.components-StackedChart-styles__value').find('text')

const Chart = ReactSelector(`${root}ErrorBoundary Reports ReportsPanel InflowOutflow StackedChart`);

const lblTotIn = ReactSelector(`${root}ErrorBoundary BalanceRow Balance`).withProps('title', 'Total Inflow');
const lblTotOut = ReactSelector(`${root}ErrorBoundary BalanceRow Balance`).withProps('title', 'Total Outflow');
const lblTotBal = ReactSelector(`${root}ErrorBoundary BalanceRow Balance`).withProps('title', 'Working Balance');

test('Validate Income Addition', async t => {
  // Record State
  const totIn = formatBal(await getBal(lblTotIn));
  const totOut = formatBal(await getBal(lblTotOut));
  const totBal = formatBal(await getBal(lblTotBal));

  const curRows = (await getTrans(gridBd)).length;

  await t
    // Add Income Row
    .click(selItem)
    .click(optCat.withText('Income'))
    .typeText(txtDesc, 'Freelance')
    .typeText(txtVal, '100')
    .click(btnSub);

  // Validations
  await t.expect(formatBal(await getBal(lblTotIn))).eql(totIn + 100, 'InFlow Filed Update');
  await t.expect((await getTrans(gridBd)).length).eql(curRows + 1, 'InFlow Grid Update');

  await t.click(lnkReports);
  await t.expect((await getChartD(Chart)).inflow[0].value).eql(totIn + 100, 'InFlow Chart Data Update');
});

test('Validate Expense Addition', async t => {
  // Record State
  const totIn = formatBal(await getBal(lblTotIn));
  const totOut = formatBal(await getBal(lblTotOut));
  const totBal = formatBal(await getBal(lblTotBal));

  const curRows = (await getTrans(gridBd)).length;

  await t
    // Add Expense Row
    .click(selItem)
    .click(optCat.withText('Commute'))
    .typeText(txtDesc, 'Matro')
    .typeText(txtVal, '300')
    .click(btnSub);

  // Validations
  await t.expect(formatBal(await getBal(lblTotOut))).eql(totOut + 300, 'Outflow Field Update');
  await t.expect((await getTrans(gridBd)).length).eql(curRows + 1, 'OutFlow Grid Update');

  await t.click(lnkReports);
  const outFlows = (await getChartD(Chart)).outflow;
  await t.expect(outFlows[outFlows.length - 1].value).eql(300, 'OutFlow Chart Data Update');
});

test('Validate Data Storage - A Case to fail', async t => {
  // Record State

  const curRows = (await getTrans(gridBd)).length;

  await t
    // Add Income Row
    .click(selItem)
    .click(optCat.withText('Income'))
    .typeText(txtDesc, 'Freelance')
    .typeText(txtVal, '100')
    .click(btnSub);

  // Validations
  // This will Fail - Added contents are not stored in DB, So the added row wwill vanish after a refresh
  await t.eval(() => location.reload(true));
  await t.expect((await getTrans(gridBd)).length).eql(curRows + 1, 'InFlow Grid Update');
});
