create database Assignment_6_Madhavi

use Assignment_4_Madhavi;


create table customers (
	customer_id int primary key identity(1,1),
	customer_fname varchar(50),
	customer_lname varchar(50),
	customer_city varchar(50),
);

insert into customers ( customer_fname, customer_lname, customer_city)
values
('AAA', 'aaa', 'Ahmedabad' ),
('BBB', 'bbb', 'Bhavnagar' ),
('CCC', 'ccc', 'Surat' ),
('DDD', 'ddd', 'Amreli' ),
('EEE', 'eee', 'Ahmedabad' ),
('FFF', 'fff', 'Baroda' ),
('GGG', 'ggg', 'Ahmedabad' ),
('HHH', 'hhh', 'Ahmedabad' ),
('III', 'iii', 'Baroda' ),
('JJJ', 'jjj', 'Bhavnagar' ),
('KKK', 'kkk', 'Surat' ),
('LLL', 'lll', 'Ahmedabad' ),
('MMM', 'mmm', 'Bhavnagar' ),
('NNN', 'nnn', 'Amreli' ),
('YYY', 'yyy', 'Ahmedabad' ),
('XXX', 'xxx', 'Baroda' ),
('TTT', 'ttt', 'Ahmedabad' ),
('RRR', 'rrr', 'Surat' ),
('SSS', 'sss', 'Bhavnagar' ),
('UUU', 'uuu', 'Rajkot' );

select * from customers
select * from products


create table products(
	product_id int primary key identity(1,1),
	product_name varchar(50),
	product_price float,
	description varchar(50)
);

insert into products (product_name, product_price, description)
values 
('Laptop', 8800.00, 'High-performance laptop'),
('Smartphone', 6600.00, 'Latest smartphone model'),
('Tablet', 1400.00, '10-inch tablet'),
('Headphones', 1100.00, 'Noise-canceling headphones'),
('Smartwatch', 900.00, 'Fitness tracking smartwatch'),
('Speaker', 200.00, 'Wireless Bluetooth speaker'),
('Camera', 1000.00, 'Digital camera with zoom lens'),
('Printer', 1150.00, 'All-in-one printer'),
('Monitor', 4050.00, '24-inch LED monitor'),
('Keyboard', 650.00, 'Mechanical gaming keyboard'),
('Wireless Mouse', 520.00, 'Ergonomic wireless mouse'),
('External Hard Drive', 120.00, '1TB external hard drive'),
('USB Flash Drive', 710.00, '32GB USB flash drive'),
('Gaming Console', 400.00, 'Next-gen gaming console'),
('Wireless Router', 880.00, 'Dual-band wireless router'),
('Smart Thermostat', 5150.00, 'Programmable smart thermostat'),
('Electric Toothbrush', 850.00, 'Rechargeable electric toothbrush'),
('Fitness Tracker', 380.00, 'Activity and sleep tracker'),
('Portable Charger', 930.00, '10000mAh portable charger'),
('Bluetooth Earbuds', 960.00, 'Wireless Bluetooth earbuds');


create table orders (
	order_id int primary key identity(1,1),
	customer_id int foreign key references customers(customer_id),
	product_id int foreign key references products(product_id),
	order_date date,
	total_amount float,
	amt_paid float,
	quantity int
);

insert into orders (customer_id, product_id, order_date, total_amount, amt_paid, quantity)
values 
(1, 1, '2004-03-01', 8800.00, 4800, 1),
(2, 2, '2014-03-02', 6600.00, 2200, 1),
(3, 3, '2020-03-03', 1400.00, 775, 1),
(4, 4, '2010-03-04', 3300.00,1100, 3),
(5, 5, '2024-03-05', 2700.00,2500, 3),
(6, 6, '2015-03-06', 400.00,300, 2),
(7, 7, '2019-03-07', 4000.00, 2000, 4),
(8, 8, '2024-03-08', 1150.00, 1000, 1),
(9, 9, '2014-03-09', 8100.00,4100, 2),
(10, 10, '2024-03-10', 650.00, 600, 1),
(11, 11, '2013-03-11', 2600.00, 2000, 5),
(12, 12, '2024-03-12', 120.00, 100, 1),
(13, 13, '2022-03-13', 2130.00, 2000, 3),
(14, 14, '2024-03-14', 400.00, 200, 1),
(15, 15, '2021-03-15', 1760.00, 1000, 2),
(16, 16, '2017-03-16', 5150.00, 5000, 1),
(17, 17, '2024-03-17', 3400.00, 3000, 4),
(18, 18, '2018-03-18', 1520.00, 1500, 4),
(19, 19, '2020-03-19', 5580.00, 5000, 6),
(20, 20, '2012-03-20', 1920.00, 1900, 2);

select * from orders;

select * from sys.objects where type = 'u';
select * from sys.objects where type = 'pk';
select * from sys.objects where type = 'f';
select * from sys.objects where type = 'p';
sp_helptext get_orders


--1.Create a stored procedure called "get_customers" that returns all customers from the "customers" table.
alter procedure get_customers 
as
begin
	select * from customers
end;

exec get_customers;

--2.Create a stored procedure called "get_orders" that returns all orders from the "orders" table.
create procedure get_orders
as
begin
	select * from orders
end;
exec get_orders;

--3.Create a stored procedure called "get_order_details" that accepts an order ID as a parameter and returns the details of that order (i.e., the products and quantities).
alter procedure get_order_details
	@orderid int 
as
begin
	select p.product_name, o.quantity
    from orders o
    inner join products p on o.product_id = p.product_id
    where o.order_id = @orderid;
end;

exec get_order_details @orderid = 19;
select * from products;

--4.Create a stored procedure called "get_customer_orders" that accepts a customer ID as a parameter and returns all orders for that customer.
alter procedure get_customer_orders 
	@cust_id int
as
begin
	select * from orders where customer_id = @cust_id;
end;

exec get_customer_orders @cust_id = 5;

--5.Create a stored procedure called "get_order_total" that accepts an order ID as a parameter and returns the total amount of the order.
alter procedure get_order_total 
	@orderid int 
as
begin
	select order_id, total_amount from orders where order_id = @orderid
end;

exec get_order_total @orderid = 8 ;

--6.Create a stored procedure called "get_product_list" that returns a list of all products from the "products" table.
alter procedure get_product_list
as
begin
	select product_id, product_name, description  from products
end;

exec get_product_list  ;

select * from products;

--7.Create a stored procedure called "get_product_info" that accepts a product ID as a parameter and returns the details of that product.
alter procedure get_product_info
	@productid int 
as
begin
	select product_name ,description, product_price from products where product_id = @productid
end;

exec get_product_info @productid = 4;

--8.Create a stored procedure called "get_customer_info" that accepts a customer ID as a parameter and returns the details of that customer.
alter procedure get_customer_info
	@id int 
as
begin
	select * from customers where customer_id = @id
end;

exec get_customer_info @id = 8  ;

--9.Create a stored procedure called "update_customer_info" that accepts a customer ID and new information as parameters and updates the customer's information in the "customers" table.
alter procedure update_customer_info
	@id int,
	@newname varchar(50)
as
begin
	update customers set customer_fname = @newname where customer_id = @id
end;

exec update_customer_info @id = 1, @newname = 'XYZABC' ;
select * from customers;

--10.Create a stored procedure called "delete_customer" that accepts a customer ID as a parameter and deletes that customer from the "customers" table.
alter procedure delete_customer
	@id int
as
begin
	delete from orders where customer_id = @id
	delete from customers where customer_id = @id
end;

exec delete_customer  @id = 6 ;

select * from customers;
select * from orders;

--11.Create a stored procedure called "get_order_count" that accepts a customer ID as a parameter and returns the number of orders for that customer.
alter procedure get_order_count
	@id int
as
begin
	select  count(*) as no_of_orders from orders where customer_id = @id
end;

exec get_order_count @id = 5 ;


--12.Create a stored procedure called "get_customer_balance" that accepts a customer ID as a parameter and returns
--the customer's balance (i.e., the total amount of all orders minus the total amount of all payments).
create procedure get_customer_balance
    @customer_id int
as
begin
    declare @total_order_amount float;
    declare @total_payment_amount float;

    select @total_order_amount = sum(total_amount) from orders where customer_id = @customer_id;
    select @total_payment_amount = sum(amt_paid) from orders where customer_id = @customer_id;

    select @total_order_amount - @total_payment_amount as balance;
end;

exec get_customer_balance @customer_id = 5

select * from customers;
select * from orders;
select * from products;


--13.Create a stored procedure called "get_customer_payments" that accepts a customer ID as a parameter and returns all payments made by that customer.
alter procedure  get_customer_payments 
	@customerId int 
as
begin
	select * from orders where customer_id = @customerId and amt_paid > 0;
end;

exec get_customer_payments @customerId = 2;

select * from orders;

--14.Create a stored procedure called "add_customer" that accepts a name and address as parameters and adds a new customer to the "customers" table.
alter procedure add_customer
	@fname varchar(50),
	@lname varchar(50),
	@city varchar(50)
as
begin
	insert into customers (customer_fname, customer_lname, customer_city) 
	values
	(@fname, @lname, @city)
end;

exec add_customer @fname = 'abcabcabc', @lname= 'bcdfgv', @city = 'Bhavnagar';
select * from customers;
select * from products

--15.Create a stored procedure called "get_top_products" that returns the top 10 products based on sales volume.
alter procedure get_top_products
	@topn int
as
begin
	select top(@topn) product_name , sum(orders.quantity) as total_sales_volume
	from products
	inner join orders on orders.product_id = products.product_id
	group by products.product_name
	order by total_sales_volume desc
end;

exec get_top_products  @topn = 10 ;


--16.Create a stored procedure called "get_product_sales" that accepts a product ID as a parameter
--and returns the total sales volume for that product.
alter procedure get_product_sales
	@productId int
as
begin
	select product_id, sum(quantity) as total_sales_volume from orders
    where product_id = @productId
	group by product_id
end;

exec get_product_sales  @productId = 2 ;

select * from products;
select * from orders;
select * from customers

--17.Create a stored procedure called "get_customer_orders_by_date" that accepts a customer ID and date range as parameters
--and returns all orders for that customer within the specified date range.
alter procedure get_customer_orders_by_date 
	@customerId int ,
	@start_date date,
	@end_date date
as
begin
	select * from orders where customer_id = @customerId and order_date between @start_date and @end_date
end;

exec get_customer_orders_by_date @customerId = 5, @start_date = '2022-01-01' , @end_date = '2024-12-03';



--18.Create a stored procedure called "get_order_details_by_date" that accepts an order ID and 
--date range as parameters and returns the details of that order within the specified date range.
alter procedure get_order_details_by_date
	@orderId int,
	@start_date date,
	@end_date date
as
begin
	--select * from orders where order_id = @orderId and order_date between @start_date and @end_date
	select o.*, p.product_name, p.product_price
    from orders o
    inner join products p on o.product_id = p.product_id
    where order_id = @orderId
    and order_date between @start_date and @end_date;
end;

exec get_order_details_by_date @orderId = 14, @start_date = '2022-01-01' , @end_date = '2024-12-03';


--19.Create a stored procedure called "get_product_sales_by_date" that accepts a product ID
--and date range as parameters and returns the total sales volume for that product within the specified date range.
alter procedure get_product_sales_by_date
	@productId int ,
	@start_date date,
	@end_date date
as
begin 
	select sum(quantity) as total_sales
    from orders
    where product_id = @product_id
    and order_date between @start_date and @end_date;
end ;

exec get_product_sales_by_date @productId = 5,  @start_date = '2022-01-01' , @end_date = '2024-12-03'; 
select * from products;
select * from orders
select * from customers;

--20.Create a stored procedure called "get_customer_balance_by_date" that accepts a customer ID and date range as parameters
--and returns the customer's balance within the specified date range.

alter procedure get_customer_balance_by_date
    @customerId int,
    @start_date date,
    @end_date date
as
begin
    declare @total_order_amount float;
    declare @total_payment_amount float;

    select @total_order_amount = sum(total_amount) from orders where customer_id = @customerId and order_date between @start_date and @end_date;
    select @total_payment_amount = sum(amt_paid) from orders where customer_id = @customerId and order_date between @start_date and @end_date;

    select @total_order_amount - @total_payment_amount as balance;
end;

exec get_customer_balance_by_date  @customerId = 2, @start_date = '2022-01-01' , @end_date = '2024-12-03';


--21.Create a stored procedure called "add_order" that accepts a customer ID, order date, and total amount as parameters and adds a new order to the "orders" table.
alter procedure add_order
	@custId int,
	@order_date date,
	@totalamount float,
	@amtpaid float
as
begin
	insert into orders (customer_id,product_id,  order_date, total_amount, amt_paid , quantity) values 
	(@custId, 2,@order_date, @totalamount, @amtpaid, 2)
end;

exec add_order @custId = 8, @order_date = '2012-03-20', @totalamount = 1234, @amtpaid = 1000 ;
exec add_order @custId = 2, @order_date = '2024-03-12', @totalamount = 1234, @amtpaid = 1000 ;
select * from orders;

--22.Create a stored procedure called "update_order_total" that accepts an order ID and a new total amount as parameters 
--and updates the total amount of the order in the "orders" table.
alter procedure update_order_total 
	@orderId int ,
	@new_amount float
as
begin
	update orders set total_amount = @new_amount where order_id = @orderId
end;

exec update_order_total @orderId = 4, @new_amount = 4545 ;


--23.Create a stored procedure called "delete_order" that accepts an order ID as a parameter and deletes that order from the "orders" table.
alter procedure delete_order
	@id int 
as
begin
	delete from orders where order_id = @id
end;

exec delete_order @id = 3;

select * from orders;






