"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = {
    GET_CUSTOMERS: `
    SELECT c.*, 
  COALESCE(ibv.deposit_sum, 0) as deposit_sum, 
  COALESCE(ibv.withdraw_sum, 0) as withdraw_sum, 
  COALESCE(ibv.total_profit, 0) as total_profit, 
  COALESCE(ibv.balance_sum, 0) as balance_sum  
  FROM customers c left join investment_balance_vw ibv on c.customer_id = ibv.customer_id order by updated_at desc;
  `,
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
  SELECT c.*, 
  COALESCE(lbv.deposit_sum, 0) as deposit_sum, 
  COALESCE(lbv.withdraw_sum, 0) as withdraw_sum, 
  COALESCE(lbv.total_profit, 0) as total_profit, 
  COALESCE(lbv.balance_sum, 0) as balance_sum  
  FROM loan_balance_vw lbv left join customers c on c.customer_id = lbv.customer_id order by updated_at desc;
`,
    GET_CUSTOMER_CONTRIB: `SELECT
    c.name AS name,
    i.customer_id AS customer_id,
    SUM(i.amount) / SUM(SUM(i.amount)) OVER () AS contribution
FROM jwtraders.investments i
LEFT JOIN jwtraders.customers c 
    ON c.customer_id = i.customer_id
where i.date <= ?
GROUP BY
    i.customer_id,
    c.name;
`,
    BULK_INSERT_CUSTOMER_PROFITS: `
  INSERT INTO customer_profits (customer_id, profit, sell_date, sell_order_id, is_loan)
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
    GET_INVESTMENT_BALANCES: `
select
	sum(deposit_sum) as deposit_sum,
	sum(withdraw_sum) as withdraw_sum,
	sum(balance_sum) as balance_sum,
	sum(total_profit) as total_profit
from investment_balance_vw bv where bv.email = ? or 1 = ?`,
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
    GET_LOAN_BALANCES: `select
	sum(deposit_sum) as deposit_sum,
	sum(withdraw_sum) as withdraw_sum,
	sum(balance_sum) as balance_sum,
	sum(total_profit) as total_profit
from loan_balance_vw bv
where (bv.email = ? or 1 = ?)`,
    GET_LOAN_ORDERS: `select
	buy_date,
	name, 
	oo.market_type,
	instrument_name,
	CASE 
        WHEN oo.market_type IN ('us', 'crypto') THEN oo.buy_price * oo.buy_qty * sp.usd_value 
        ELSE oo.buy_price * oo.buy_qty 
    END AS capital
from
	open_orders oo
left join instruments i on
	i.instrument_id = oo.instrument_id
left join customers c on
	c.customer_id = oo.customer_id
left join system_params sp on 
	oo.market_type = sp.market_type 
where
	oo.customer_id is not null 
order by
	name asc,
	oo.buy_date asc;`,
    GET_TOTAL_LOAN_ORDERS: `
select
	name, 
	oo.market_type,
	count(oo.order_id) as total_orders,
	SUM(CASE 
        WHEN oo.market_type IN ('us', 'crypto') THEN oo.buy_price * oo.buy_qty * sp.usd_value 
        ELSE oo.buy_price * oo.buy_qty 
    END) AS total_capital
from
	open_orders oo
left join instruments i on
	i.instrument_id = oo.instrument_id
left join customers c on
	c.customer_id = oo.customer_id
left join system_params sp on 
	oo.market_type = sp.market_type 
where oo.customer_id is not null
group by name, market_type, usd_value
order by
	name asc, market_type desc;`,
    GET_CUSTOMER_LOAN_TOTAL_ORDERS: `
SELECT 
    c.customer_id,
    c.name,
    loan_totals.total_loan, -- No COALESCE needed here anymore since INNER JOIN guarantees a value
    COALESCE(order_totals.total_invested, 0) AS total_invested,
    loan_totals.total_loan - COALESCE(order_totals.total_invested, 0) + COALESCE(closed_orders.total_invested , 0) as balance
FROM customers c
INNER JOIN (
    SELECT 
        customer_id, 
        SUM(amount) AS total_loan
    FROM loans
    GROUP BY customer_id
) loan_totals ON c.customer_id = loan_totals.customer_id
LEFT JOIN (
    SELECT 
        oo.customer_id, 
        SUM(
            CASE 
                WHEN LOWER(oo.market_type) IN ('crypto', 'us') 
                THEN (oo.buy_qty * oo.buy_price) * CAST(sp.usd_value AS DECIMAL(18,10))
                ELSE (oo.buy_qty * oo.buy_price)
            END
        ) AS total_invested
    FROM jwtraders.open_orders oo
    LEFT JOIN system_params sp on sp.market_type = oo.market_type 
    WHERE oo.customer_id IS NOT NULL
    GROUP BY oo.customer_id
) order_totals ON c.customer_id = order_totals.customer_id
LEFT JOIN(
	 SELECT 
        oo.customer_id, 
        SUM(
            cp.profit
        ) AS total_invested
    FROM jwtraders.sell_orders oo
    LEFT JOIN customer_profits cp on cp.customer_id = oo.customer_id and oo.sell_order_id = cp.sell_order_id 
    WHERE oo.customer_id IS NOT NULL
    GROUP BY oo.customer_id
) closed_orders on c.customer_id  = closed_orders.customer_id ; `,
    GET_CUSTOMER_LOAN_SELL_TOTAL_ORDERS: `

select
	*,
	CASE 
        WHEN oo.market_type IN ('us', 'crypto') THEN oo.buy_price * oo.buy_qty * sp.usd_value 
        ELSE oo.buy_price * oo.buy_qty 
    END AS capital
from
	sell_orders oo
left join instruments i on
	i.instrument_id = oo.instrument_id
left join customers c on
	c.customer_id = oo.customer_id
left join system_params sp on 
	oo.market_type = sp.market_type 
where
	oo.customer_id is not null 
order by
	name asc,
	oo.buy_date asc;		
  `,
    GET_OPEN_ORDERS: `
  select
	*
from
	open_orders oo
left join instruments i on
	i.instrument_id = oo.instrument_id
left join customers c on
	c.customer_id = oo.customer_id
where
	oo.market_type = ?
	and oo.instrument_id = i.instrument_id
order by
	i.instrument_name asc,
	oo.buy_date asc
  `,
    GET_OPEN_ORDER_BY_ID: 'SELECT * FROM open_orders WHERE order_id = ?',
    CREATE_OPEN_ORDER: `
    INSERT INTO open_orders
(instrument_id, market_type, buy_date, buy_qty, buy_price, customer_id, sell_placed, reserved_placed, loan_percent)
    VALUES (?, ?, ?, ?,?, ?, ?, ?, ?)`,
    UPDATE_OPEN_ORDER: `
   UPDATE open_orders
SET instrument_id=?, market_type=?, buy_date=?, buy_qty=?, buy_price=?, customer_id=?, sell_placed=?, reserved_placed=?, loan_percent=?
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
    (instrument_id, customer_id, market_type, buy_date, buy_qty, buy_price, sell_price, sell_qty, sell_date, loan_percent, brokerage, charges, tax_percent, usd_value)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    UPDATE_SELL_ORDER: `
  UPDATE jwtraders.sell_orders
SET instrument_id=?, customer_id=?, market_type=?, buy_date=?, buy_qty=?, buy_price=?, sell_price=?, sell_qty=?, sell_date=?, loan_percent=?
WHERE sell_order_id IS ?;
`,
    DELETE_SELL_ORDER: 'DELETE FROM sell_orders WHERE sell_order_id=?',
    BATCH_CREATE_SELL: `
     INSERT INTO sell_orders (instrument_id, customer_id, market_type, buy_date, buy_qty, buy_price, sell_price, sell_qty, sell_date, is_average,loan_percent, brokerage, charges, tax_percent, usd_value)
      VALUES ?
  `,
    GET_BULK_SELL_ORDER_BY_ID: 'SELECT * FROM sell_orders WHERE sell_order_id IN (?)',
    GET_SELL_ORDER_BY_MARKET: 'SELECT sell_order_id FROM sell_orders WHERE market_type = ?',
    BULK_DELETE_SELL_ORDER: 'DELETE FROM sell_orders WHERE sell_order_id IN (?)',
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
    GET_CUSTOMER_PROFITS: `
  select * from sell_orders so 
left join customer_profits cp on cp.sell_order_id = so.sell_order_id 
left join customers c on c.customer_id = cp.customer_id ;
  `,
    GET_CUSTOMER_PROFITS_MONTHLY: `select * from monthly_profits_vw;`,
    GET_CUSTOMER_PROFITS_DAILY: `select * from daily_profits_vw;`,
    GET_CUSTOMER_PROFITS_QUARTERLY: `select * from quarterly_profits_vw;`,
    GET_CUSTOMER_PROFITS_YEARLY: `select * from yearly_profits_vw;`,
    GET_CUSTOMER_PROFITS_MONTHLY_LOANS: `select * from monthly_profits_loans_vw;`,
    GET_CUSTOMER_PROFITS_DAILY_LOANS: `select * from daily_profits_loans_vw;`,
    GET_CUSTOMER_PROFITS_QUARTERLY_LOANS: `select * from quarterly_profits_loans_vw;`,
    GET_CUSTOMER_PROFITS_YEARLY_LOANS: `select * from yearly_profits_loans_vw;`,
    GET_CUSTOMER_PROFITS_BY_CUSTOMER: `select DATE_FORMAT(sell_date, ?), customer_id, sum(profit) 
from customer_profits cp 
group by cp.customer_id, DATE_FORMAT(sell_date, ?)`,
    BULK_DELETE_CUSTOMER_PROFITS: 'DELETE FROM customer_profits WHERE sell_order_id IN (?)',
    GET_LIVE_MARKET_DATA: `select lmd.*, i.instrument_name  from live_market_data lmd left join instruments i on i.instrument_id = lmd.instrument_id where lmd.date = ?`,
    BULK_MARKET_DATA: `INSERT INTO live_market_data
(date, instrument_id, open, high, low, close, ltp) values ?`
};
//# sourceMappingURL=queries.js.map