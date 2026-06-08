"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = {
    GET_CUSTOMERS: 'SELECT * FROM customers order by updated_at desc',
    GET_CUSTOMER_BY_ID: 'SELECT * FROM customers WHERE customer_id = ?',
    CREATE_CUSTOMER: `
    INSERT INTO customers (name, email, address, status, kyc_status)
    VALUES (?, ?, ?, ?, ?)`,
    UPDATE_CUSTOMER: `
    UPDATE customers SET name=?, email=?, address=?, status=?, kyc_status=?
    WHERE customer_id=?`,
    DELETE_CUSTOMER: 'DELETE FROM customers WHERE customer_id=?',
    GET_CUSTOMER_INVESTMENT: `SELECT 
        c.customer_id, c.name, c.email, c.address, c.status, c.kyc_status,
        i.investment_id, i.amount, i.date
      FROM customers c
      LEFT JOIN Investments i ON c.customer_id = i.customer_id
      WHERE c.customer_id = ?`,
    GET_LOAN_CUSTOMERS: `
  select distinct customers.customer_id, customers.name from customers, loans where customers.customer_id = loans.customer_id
`,
    GET_CUSTOMER_CONTRIB: `select * from customer_contrib_vw`,
    BULK_INSERT_CUSTOMER_PROFITS: `
  INSERT INTO customer_profits (customer_id, profit, sell_date, sell_order_id)
  VALUES ?
`,
    GET_INVESTMENTS: `
    SELECT i.*,  c.name as customer_name, (case when amount > 0 then 'DEPOSIT' else 'WITHDRAW' end) as transaction_type
FROM investments i, customers c WHERE i.customer_id = c.customer_id 
and (c.email = ? or 1 = ?)
order by i.date desc
  `,
    GET_INVESTMENT_BY_ID: 'SELECT * FROM investments WHERE investment_id = ?',
    CREATE_INVESTMENT: `
    INSERT INTO investments (customer_id, amount, date)
    VALUES (?, ?, ?)`,
    UPDATE_INVESTMENT: `
    UPDATE investments SET customer_id=?, amount=?, date=?
    WHERE investment_id=?`,
    DELETE_INVESTMENT: 'DELETE FROM investments WHERE investment_id=?',
    GET_INVESTMENT_BALANCES: `SELECT 
    SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS deposit_sum,
    SUM(CASE WHEN amount < 0  THEN amount ELSE 0 END) AS withdraw_sum,
    SUM(amount) as balance_sum
FROM investments, customers
where investments.customer_id  = customers.customer_id and
(customers.email = ? or 1 = ?);`,
    GET_LOANS: `SELECT l.*,  c.name as customer_name, (case when amount > 0 then 'DEPOSIT' else 'WITHDRAW' end) as transaction_type
FROM loans l, customers c WHERE l.customer_id = c.customer_id 
and (c.email = ? or  1 = ?)
order by l.date desc`,
    GET_LOAN_BY_ID: 'SELECT * FROM loans WHERE loan_id = ?',
    CREATE_LOAN: `
    INSERT INTO loans (customer_id, amount, date)
    VALUES (?, ?, ?)`,
    UPDATE_LOAN: `
    UPDATE loans SET customer_id=?, amount=?, date=?
    WHERE loan_id=?`,
    DELETE_LOAN: 'DELETE FROM loans WHERE loan_id=?',
    GET_LOAN_BALANCES: `SELECT 
    SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) AS deposit_sum,
    SUM(CASE WHEN amount < 0  THEN amount ELSE 0 END) AS withdraw_sum,
    SUM(amount) as balance_sum
FROM loans, customers c 
where c.customer_id  = loans.customer_id and
(c.email = ? or 1 = ?)`,
    GET_OPEN_ORDERS: `select * from open_orders oo, instruments i where oo.market_type = ? and oo.instrument_id = i.instrument_id order by i.instrument_name asc, oo.buy_date asc`,
    GET_OPEN_ORDER_BY_ID: 'SELECT * FROM open_orders WHERE order_id = ?',
    CREATE_OPEN_ORDER: `
    INSERT INTO open_orders
(instrument_id, market_type, buy_date, buy_qty, buy_price, customer_id)
    VALUES (?, ?, ?, ?,?, ?)`,
    UPDATE_OPEN_ORDER: `
   UPDATE open_orders
SET instrument_id=?, market_type=?, buy_date=?, buy_qty=?, buy_price=?, customer_id=?
WHERE order_id = ?
`,
    DELETE_OPEN_ORDER: 'DELETE FROM open_orders WHERE order_id=?',
    BULK_DELETE_OPEN_ORDER: 'DELETE FROM open_orders WHERE order_id IN (?)',
    GET_SELL_ORDERS: `
    select * from sell_orders oo
left join customers c on c.customer_id = oo.customer_id
left join instruments i on i.instrument_id = oo.instrument_id  
where oo.market_type = ? 
order by i.instrument_name asc, oo.buy_date asc
  `,
    GET_SELL_ORDER_BY_ID: 'SELECT * FROM sell_orders WHERE sell_order_id = ?',
    CREATE_SELL_ORDER: `
    INSERT INTO jwtraders.sell_orders
    (instrument_id, customer_id, market_type, buy_date, buy_qty, buy_price, sell_price, sell_qty, sell_date, brokerage, charges, tax_percent, usd_value)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    UPDATE_SELL_ORDER: `
  UPDATE jwtraders.sell_orders
SET instrument_id=?, customer_id=?, market_type=?, buy_date=?, buy_qty=?, buy_price=?, sell_price=?, sell_qty=?, sell_date=?
WHERE sell_order_id IS ?;
`,
    DELETE_SELL_ORDER: 'DELETE FROM sell_orders WHERE sell_order_id=?',
    BATCH_CREATE_SELL: `
     INSERT INTO sell_orders (instrument_id, customer_id, market_type, buy_date, buy_qty, buy_price, sell_price, sell_qty, sell_date, is_average, brokerage, charges, tax_percent, usd_value)
      VALUES ?
  `,
    GET_BULK_SELL_ORDER_BY_ID: 'SELECT * FROM sell_orders WHERE sell_order_id IN (?)',
    GET_SYS_PARAMS: `SELECT * from system_params`,
    GET_SYS_PARAMS_BY_MARKET: `SELECT * FROM system_params WHERE market_type = ?`,
    GET_SYS_PARAMS_BY_ID: `SELECT * FROM system_params WHERE system_params_id = ?`,
    UPDATE_SYS_PARAMS: `
    update system_params
    set brokerage=?, charges=?, tax_percent=?, usd_value=?
    where system_params_id = ?
  `,
    GET_ALL_INSTRUMENTS: `select * from instruments`,
    GET_INSTRUMENT_BY_ID: 'SELECT * FROM instruments WHERE instrument_id = ?',
    CREATE_INSTRUMENT: `
    INSERT INTO instruments
(instrument_name, instrument_type, instrument_description)
    VALUES (?, ?, ?)`,
    UPDATE_INSTRUMENT: `
   UPDATE instruments
SET instrument_name=?, instrument_type=?, instrument_description=?
WHERE instrument_id = ?
`,
    DELETE_INSTRUMENT: 'DELETE FROM instruments WHERE instrument_id=?',
    GET_DASHBORAD_DATA: `select * from dashboard_vw`,
    GET_DASHBORAD_MAIN_DATA: `select * from dashboard_main_vw where market_type = 'MAIN'`,
};
//# sourceMappingURL=queries.js.map