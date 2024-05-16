create database practice_4

use practice_4
--comment  = ctrl+k+c,  uncomment =  ctrl+k+u
/*
multi 
line
comment
*/

drop table customer
create table customer (
	customer_id int identity(1,1) primary key,
	cust_name varchar(50),
	product_id int foreign key references product(product_id),
	order_id int foreign key references orders(order_id),
	city varchar(50),
	contact bigint
)

create table product (
	product_id int primary key,
	product_name varchar(50),
	price int
);

drop table orders 
create table orders(
	order_id int primary key,
	product_id int foreign key references product(product_id),
	quntity int 
);

--insert data
insert into orders values 
(101,901, 1),
(102,901, 4),
(103,902, 3),
(104,903, 1),
(105, 904, 2),
(106,904, 2)

insert into product values 
(901,'watch', 200),
(902,'phone', 150),
(903,'headphone', 400),
(904,'remote', 200),
(905,'tv', 700)

insert into customer (cust_name, product_id, order_id,city, contact) values
('aaa', 901, 101, 'surat', 123465767856),
('bbb', 901, 102, 'valsad', 89234767856),
('sdf', 902, 103, 'ahmedabad',67465767856),
('hjhj', 903, 104, 'surat', 78653434556),
('tyujy', 904, 105, 'ahmedabad', 12346555856),
('www', 902, 106, 'bhavnagar', 242434546)

select * from customer;
select * from product;
select * from orders;
select customer_id from customer;

select * from sys.objects where type = 'u'
select * from sys.objects where type = 'p';
select * from sys.objects where type=  'v'
select * from sys.objects where type = 'fk'
--f for foreign key
--p for store procedure
--v for view
--pk for primary key
--u user define table
--tr for triggre

--unique value
select distinct product_id from customer;

--where clause
select * from customer where customer_id = 1;
select * from customer where customer_id > 2;
select * from customer where customer_id < 5 ;
select * from customer where customer_id >= 3;
select * from customer where customer_id <> 3;
select * from customer where city = 'surat';
select * from customer where customer_id between 1 and 4
select * from customer where customer_id in (1,3,5)
select * from customer where customer_id not in (1,3,5)
select * from customer where city like 's%';
select * from customer where city not like 's%';
select * from customer where city like '_u%';
select * from customer where city like '[abs]%';
select * from customer where city like '[a-s]%';
select * from customer where cust_name like 'A%' or cust_name like '%j%' and (customer_id between 1 and 5);
select * from customer where not customer_id = 4;
select * from customer where city is null;


--order by for sorting asc or desc
select * from product order by product_name desc;

--alias 'as'
select (product.price * orders.quntity) as total_price from product
inner join orders on product.product_id = orders.product_id;

select sum(p.price * o.quntity) as total_amt from product p
inner join orders o on p.product_id = o.product_id;

--update 
update customer set city = 'amreli' where customer_id = 3;
select * from customer;

--delete
delete from customer where customer_id = 5;
select * from customer

--drop 
drop table customer;

--truncate
truncate table customer;

--select top n element
select top 3  customer_id from customer;
select top 3 * from orders

--aggregate function 
select sum(price) from product;
select count(product_id) from product;
select min(price) from product;
select max(price) from product;
select avg(price) from product;

--group by
select sum(price), product_id from product group by product_id;
select count(product_id)as total_count, product_id from product group by product_id;

--joins 
select c.* , p.* from customer c inner join product p on c.product_id = p.product_id;
select * from customer cross join product;

--union
select product_id from customer 
union 
select product_id from product

--union all allow duplicate value
select product_id from customer 
union all
select product_id from product

--having , used with aggregate function 
select sum(price) as total_price, product_id from product group by product_id having product_id > 3 order by total_price;

--exists
select * from customer where exists (select cust_name where customer_id >= 1)

--any
select * from customer where cust_name = any (select cust_name where customer_id >= 1)

--all
select * from customer where cust_name = all (select cust_name where customer_id >= 1)

--copy data from one table to another 
--select into
select * into customer2 from  customer;
select  * from customer2;

--The INSERT INTO SELECT statement copies data from one table and inserts it into another table.
insert into customer2 (cust_name)
select cust_name from customer where customer_id = 4
select  * from customer2;

--case 
select product_id, price,
	case 
	when price >200 then 'high'
	when price <200 then 'lower'
	else 'medium price'
	end as ptice_des
from product

--store procedure 
create procedure getcustomerName 
@id int 
as
begin
	select * from customer where customer_id = @id
end

exec getcustomerName @id = 2;

create procedure getcustomer 
@id int,
@productid int 
as
begin 
	select * from customer where customer_id = @id and product_id = @productid
end;

exec getcustomer @id = 2, @productid = 901;

/*
create database mydb
drop database mydb
drop table customer
*/

--alter 
alter table customer add email varchar(50);
select * from customer;

alter table customer alter column email varchar(100);

exec sp_rename 'customer.email', 'customer_email','column';

alter table customer drop column customer_email;

--constraint
alter table customer alter column cust_name varchar(50) not null

--alter table UC_cust add constraint cust_name unique (cust_name)
--alter table customer drop contraint uc_cust


--view
create view getcustomerNam as
select cust_name from customer ;

select * from getcustomerNam;

--drop view getcustomerNam

--function table valued
create function  getCustomerfun (
@id int
)
returns table 
as
return 
(
select * from Customer where customer_id = @id
);

select * from getCustomerfun(2);

--return single value
create function getcustnameFun (@id int)
returns int
as
begin
declare @count int = 10 * @id
return @count
end;

select dbo.getcustnameFun(2);

--nested function 
--create function dbo.outerfun(@input int)
--returns int
--as
--begin
--	declare @output int
--	declare function dbo.innerfun(@value int)
--		returns int
--		as
--		begin
--			return @value * 2
--		end
--	set @output = innerfun(@input)
--	return @output
--end;

--select dbo.outerfun(2);

--xml 
select cust_name from customer for xml path;
select cust_name from customer for xml auto;
select cast(cust_name as xml) from customer;
select convert(xml,cust_name) from customer;

--stuff
select stuff((select ','+ cust_name from customer for xml path('')),1,1,'') from customer;
select stuff((select ', ' + product_name from product for xml path('')),1,2,'') as concateItem;

sp_helptext getcustomerNam;
select * from sys.objects where type = 'u'

CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(50)
);

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    EmployeeName VARCHAR(50),
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);
-- Insert data into Departments table
INSERT INTO Departments (DepartmentID, DepartmentName)
VALUES
    (1, 'Sales'),
    (2, 'Marketing'),
    (3, 'Finance');

-- Insert data into Employees table
INSERT INTO Employees (EmployeeID, EmployeeName, DepartmentID)
VALUES
    (1, 'John', 1),
    (2, 'Emily', 1),
    (3, 'Michael', 2),
    (4, 'Sophia', 2),
    (5, 'David', 3);

SELECT 
    d.DepartmentID,
    d.DepartmentName,
    STUFF((
        SELECT ', ' + e.EmployeeName
        FROM Employees e
        WHERE e.DepartmentID = d.DepartmentID
        FOR XML PATH('')), 1, 2, '') AS EmployeeList
FROM 
    Departments d;



--built in function 
--string 
select ascii('a');
select char(97);
select nchar(97);
select charindex('t', 'customer')
select concat('wel','come')
select 'wel' + 'come'
select concat_ws(',','wel','come')
select datalength('  dffgbgh  ')
select len('  dffgbgh  ')
select format(12122024 ,'##-##-####')
select left('assdfdf',3)
select right('fsdfdfgfg',3)
select substring('fgfgfgfgt', 1,3)
select lower ('fgfdgrfgfgDFFGFG')
select upper('fdggrfgg')
select ltrim('  dffgf   ')
select rtrim('  dffgf   ')
select trim('  dffgf   ')
select patindex('%as%', 'fffasfgh')
select replace('sql tutorial', 'sql','html')
select replicate('dsdg ',5)
select reverse('hello')

--mathematical function
select abs(-32);
select ceiling(34.84);
select floor(34.84);
select round(34.84, 1);
select acos(1)
select asin(0)
select atan(0)
select log(100)
select power(3,2)
select sqrt(64)
select square(8)
select rand(4)*10
--avg(), min, max, sum, count

--date function
select getdate()
select year(getdate())
select month('2024-12-7')
select day(getdate())
select datediff(year, '2022-12-12', getdate())
select datediff(second, '2022-12-12', getdate())
select current_timestamp
select sysdatetime()
select iif(500<1000, 'yes','no');

select cast(23.23 as int)
select convert(varchar,1212.565)

SELECT PARSE('2024-03-18' AS DATE) AS ParsedDate;
select current_user
select user_name()
select session_user
select object_id('customer_id')

--tempory table 
create table #tempTable (
	id int,
	name varchar(50)
)

insert into #tempTable values
(1,'ghghdfg'),
(2,'jkldtf'),
(3,'wdwdsf')

select * from #temptable;

update #temptable set name = 'aaaaa' where id = 3;

--while loop
declare @counter int
set @counter = 1
while @counter <=10
begin
	select @counter
	print 'counter is less than 10'
	set @counter = @counter + 1
end;
print 'done while loop'


--if else
declare @num int
set @num = 21
if @num >= 20
begin 
	print 'num is greate than 20'
end
else
begin
	print 'num is less than 20'
end

--while with break and continue
declare @num2 int
set @num2 = 1
while @num2 <= 10
begin
	select @num2
	if @num2 = 5
	begin 
		break
	end
	set @num2 = @num2 + 1
end;

select * from sys.objects where type = 'p';
select * from sys.objects where type = 'v';
sp_helptext getcustomer  --sp
sp_helptext getcustomerNam  --view
sp_helptext getcustnameFun   --user defiend function 


--inner query 


--sub query
--other keys, constraints and data types
--normalization
--index  (seek, scan)
--triggrer
--magic table
--cursor
--estimation cost
-- import, export file data
--deadlock
-- Tracsaction
-- Common Table Expressions (CTE) table
-- sql injection
-- grant and revoke
-- backup data
-- copy table 


DECLARE @COUNT INT , @NUM INT
SET @COUNT = 1
SET @NUM = 5
WHILE @COUNT <= @NUM
BEGIN 
	WHILE @NUM >0
	BEGIN
	 PRINT '*'
	 SET @NUM = @NUM - 1
	END
   SET @COUNT = @COUNT + 1
END;

--pattern
select 
    replicate('* ', value) as stars
from generate_series(5, 1, -1) as gs

select 
    replicate('* ', value) as stars
from generate_series(1, 5,1) as gs
--(start, end, jump)


DECLARE @i int = 1
WHILE @i <= 20
BEGIN
    SELECT REPLICATE('* ', @i)    
    SET @i = @i + 1
END


--store procedure 
create procedure getProductName 
as
begin
	select * from product
end
exec getProductName;

--parameterised
alter procedure getProdName 
@start int,
@end int
as
begin
	select * from product where price between @start and @end
end;
exec getProdName @start = 180 , @end = 450;

--insert value
alter procedure insertProduct 
@name varchar,
@amt int
as
begin 
	insert into product (product_name, price) values (@name, @amt)
end;
exec insertProduct  @name = 'pen', @amt = 50
