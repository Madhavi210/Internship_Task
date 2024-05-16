create database Assignment_2_Madhavi_Joshi

use Assignment_2_Madhavi_Joshi

--employee table
create table Employees (
	EmployeeID int identity(1,1) primary key ,
	LastName varchar(50),
	FirstName varchar(50),
	Title varchar(50),
	BirthDate date,
	HireDate date,
	ReportsTo int,
	Address varchar(50)
);
-- Insert values into Employees table
insert into Employees ( LastName, FirstName, Title, BirthDate, HireDate, ReportsTo, Address) values 
( 'Madhavi', 'Joshi', 'Manager', '1980-05-15', '2005-10-20', NULL, '123 Main St, Cityville'),
('vidhi', 'jani', 'Sales Rep', '1985-08-22', '2008-03-12', 1, '456 Oak St, Townsville'),
( 'nidhi', 'Mehta', 'IT Specialist', '1982-12-10', '2010-07-05', 1, '789 Pine St, Villagetown'),
( 'hasti', 'patel', 'HR Coordinator', '1978-03-08', '2012-11-18', 3, '101 Elm St, Hamletville'),
( 'riya', 'shah', 'Analyst', '1987-06-25', '2015-09-30', 1, '222 Maple St, Boroughville'),
('dhruvi', 'pandya', 'Sales Rep', '1984-09-18', '2013-05-25', 2, '789 Oak St, Villagetown'),
('Miller', 'Daniel', 'IT Specialist', '1989-02-12', '2016-08-10', 3, '456 Pine St, Boroughville'),
('Jones', 'Sophia', 'HR Coordinator', '1981-07-30', '2019-03-15', 1, '888 Elm St, Cityville'),
('Thomas', 'Brian', 'Analyst', '1990-11-05', '2020-12-01', 2, '555 Maple St, Townsville'),
('White', 'Olivia', 'Manager', '1975-04-20', '2007-02-18', NULL, '222 Main St, Hamletville');

select * from Employees;

-- orders table
create table Orders (
	OrderID int  identity(1,1) primary key ,
	CustomerID int foreign key references Customers(CustomerID),
	EmployeeID int foreign key references Employees(EmployeeID),
	OrderDate date
);

-- Insert values into Orders table
insert into Orders ( CustomerID, EmployeeID, OrderDate) values 
( 1, 2, '2023-01-15'),
( 3, 4, '2023-02-20'),
( 2, 1, '2023-03-10'),
( 4, 3, '2023-04-05'),
(2, 3, '2023-07-10'),
(5, 1, '2023-08-22')

insert into Orders  ( CustomerID, EmployeeID, OrderDate) values (5,6, '2023-03-10' );

select * from Orders

--customers table
create table Customers(
	CustomerID int  primary key ,
	CompanyName varchar(50),
	ContactName varchar(50),
	ContactTitle varchar(50),
	Address varchar(50),
	City varchar(50) ,
	Country varchar(50)
);

-- Insert values into Customers table
insert into Customers ( CompanyName, ContactName, ContactTitle, Address, City, Country) values 
( 'AAA Corporation', 'David', 'CEO', '321 Broadway, Cityville', 'Cityville', 'USA'),
( 'XYZ Corporation', 'Sarah', 'Manager', '654 Oak Lane, Townsville', 'Townsville', 'Canada'),
( 'CCC Corporation', 'Kevin', 'Director', '987 Pine Blvd, Villagetown', 'Villagetown', 'UK'),
( 'BBB Corporation', 'Lisa', 'COO', '111 Elm Street, Hamletville', 'Hamletville', 'Australia'),
( 'DDD Corporation', 'Ryan', 'CFO', '333 Maple Avenue, Boroughville', 'Boroughville', 'Germany'),
('EEE Ltd.', 'Sophie', 'Manager', '444 Pine Blvd, Cityville', 'Cityville', 'USA'),
('HHH Corp.', 'Jack', 'Director', '987 Oak Lane, Townsville', 'Townsville', 'Canada'),
('JJJ Tech', 'Emma', 'CFO', '111 Maple St, Villagetown', 'Villagetown', 'UK'),
('GGG Solutions', 'Lucas', 'COO', '555 Elm Street, Hamletville', 'Hamletville', 'Australia'),
('KKK Innovations', 'Ava', 'CEO', '333 Broadway, Boroughville', 'Boroughville', 'Germany'),
( 'MMM Corporation', 'David', 'CEO', '321 Broadway, Cityville', 'Cityville', 'USA');

select * from Customers;


--1 Write a SQL query to retrieve the list of all orders made by customers in the "USA".
select Orders.OrderID, Orders.CustomerID, Orders.EmployeeID, Orders.OrderDate
from Orders 
inner join Customers on Orders.CustomerID = Customers.CustomerID
where Customers.Country = 'USA';

--2 Write a SQL query to retrieve the list of all customers who have placed an order.
select Orders.OrderID , Orders.CustomerID, Customers.CompanyName, Customers.City
from Orders
inner join Customers on Orders.CustomerID = Customers.CustomerID;

--3 Write a SQL query to retrieve the list of all employees who have not yet placed an order.
select   Employees.EmployeeID, Employees.FirstName
from Orders
right join Employees on Orders.EmployeeID = Employees.EmployeeID
where Orders.OrderID is  null;

--4 Write a SQL query to retrieve the list of all employees who have placed an order.
select Orders.OrderID ,  Employees.EmployeeID,  Employees.FirstName
from Orders
inner join Employees on Orders.EmployeeID = Employees.EmployeeID;

--5 Write a SQL query to retrieve the list of all customers who have not yet placed an order.
select Customers.CustomerID, Customers.CompanyName, Customers.ContactName, Customers.ContactTitle, Customers.Address, Customers.City, Customers.Country
from Customers
left join Orders on Customers.CustomerID = Orders.CustomerID
where Orders.OrderID is null;

--6 Write a SQL query to retrieve the list of all customers who have placed an order, along with the order date.
select Orders.OrderID , Customers.CustomerID, Orders.OrderDate
from Orders
inner join Customers on Orders.CustomerID = Customers.CustomerID;

--7 Write a SQL query to retrieve the list of all orders placed by a particular customer.
select OrderID, CustomerID, EmployeeID, OrderDate
from Orders
where CustomerID = 1;

--8 Write a SQL query to retrieve the list of all orders placed by a particular employee.
select OrderID, CustomerID, EmployeeID, OrderDate
from Orders
where EmployeeID = 1;

--9 Write a SQL query to retrieve the list of all orders placed by a particular customer on a particular date.
select OrderID, CustomerID, EmployeeID, OrderDate
from Orders
where CustomerID = 1 and OrderDate = '2023-01-15';

--10 Write a SQL query to retrieve the list of all customers who have not yet placed an order, sorted by their country.
select Customers.CustomerID, Customers.CompanyName, Customers.ContactName, Customers.ContactTitle, Customers.Address, Customers.City, Customers.Country
from Customers
left join Orders on Customers.CustomerID = Orders.CustomerID
where Orders.OrderID is null  order by Customers.Country; 

--11 Write a SQL query to retrieve the list of all orders placed by customers in the "USA", sorted by order date.
select Orders.OrderID, Orders.CustomerID, Orders.EmployeeID, Orders.OrderDate
from Orders 
inner join Customers on Orders.CustomerID = Customers.CustomerID
where Customers.Country = 'USA' order by Orders.OrderDate;

--12 Write a SQL query to retrieve the list of all employees who have not yet placed an order, sorted by last name.
select   Employees.EmployeeID, Employees.FirstName, Employees.LastName
from Orders
right join Employees on Orders.EmployeeID = Employees.EmployeeID
where Orders.OrderID is  null order by Employees.LastName;

--13 Write a SQL query to retrieve the list of all customers who have placed an order, sorted by their company name.
select Orders.OrderID , Customers.CustomerID, Customers.CompanyName
from Orders
inner join Customers on Orders.CustomerID = Customers.CustomerID order by Customers.CompanyName ;  

--14 Write a SQL query to retrieve the list of all employees who have placed an order, sorted by their hire date.
select Orders.OrderID ,  Employees.EmployeeID,  Employees.FirstName, Employees.HireDate
from Orders
inner join Employees on Orders.EmployeeID = Employees.EmployeeID order by Employees.HireDate;


--15 Write a SQL query to retrieve the list of all customers who have placed an order on a particular date, sorted by their company name.
select distinct Customers.CustomerID, Customers.CompanyName, Customers.ContactName, Customers.ContactTitle, Customers.Address, Customers.City, Customers.Country
from Customers 
inner join Orders  on Customers.CustomerID = Orders.CustomerID
where Orders.OrderDate = '2023-03-10'
order by Customers.CompanyName;

--16 Write a SQL query to retrieve the list of all customers who have placed an order, along with the employee who handled the order.
select Customers.CustomerID, Customers.CompanyName, Customers.ContactTitle, Customers.Country,   Orders.OrderDate, Employees.EmployeeID, Employees.FirstName as EmployeeFirstName, Employees.LastName as EmployeeLastName
from Customers 
inner join Orders  on Customers.CustomerID = Orders.CustomerID
inner join Employees  on Orders.EmployeeID = Employees.EmployeeID


--17 Write a SQL query to retrieve the list of all employees who have placed an order, along with the customer who placed the order.
select e.EmployeeID, e.LastName, e.FirstName, e.HireDate, 
       o.OrderID, o.OrderDate,
       c.CustomerID, c.CompanyName, c.ContactName,  c.Country as CustomerCountry
from Employees e
inner join Orders o on e.EmployeeID = o.EmployeeID
inner join Customers c on o.CustomerID = c.CustomerID;

--18 Write a SQL query to retrieve the list of all orders placed by customers in a particular country, along with the customer name and order date.
select c.CustomerID, c.CompanyName, c.ContactName, c.ContactTitle, c.Address, c.City, c.Country,
       o.OrderID, o.OrderDate
from Customers c
inner join Orders o on c.CustomerID = o.CustomerID
where c.Country = 'USA';

--19 Write a SQL query to retrieve the list of all orders placed by employees who were born in a particular year, along with the employee name and order date.
select e.EmployeeID, e.LastName, e.FirstName,
       o.OrderID, o.OrderDate
from Employees e
inner join Orders o on e.EmployeeID = o.EmployeeID
where year(e.BirthDate) = 1985;


--20 Write a SQL query to retrieve the list of all customers who have placed an order, along with the customer name, order date, and employee who handled the order.
select Customers.CustomerID, Customers.CompanyName, Customers.ContactName, Customers.ContactTitle, Customers.Address, Customers.City, Customers.Country,  Orders.OrderID, Orders.OrderDate, Employees.EmployeeID, Employees.FirstName as EmployeeFirstName, Employees.LastName as EmployeeLastName
from Customers 
inner join Orders  on Customers.CustomerID = Orders.CustomerID
inner join Employees  on Orders.EmployeeID = Employees.EmployeeID


--21 Write a SQL query to retrieve the list of all orders placed by customers who have a particular contact title, along with the customer name and order date.
select c.CustomerID, c.CompanyName, c.ContactName, c.ContactTitle, c.Address, c.City, c.Country,
       o.OrderID, o.OrderDate
from Customers c
inner join Orders o on c.CustomerID = o.CustomerID
where c.ContactTitle = 'Manager';


--22 Write a SQL query to retrieve the list of all orders placed by employees who have a particular job title, along with the employee name and order date.
select e.EmployeeID, e.LastName, e.FirstName,
       o.OrderID, o.OrderDate
from Employees e
inner join Orders o on e.EmployeeID = o.EmployeeID
where e.Title = 'Sales Rep';


--23 Write a SQL query to retrieve the list of all customers who have placed an order on a particular date, along with the customer name, order date, and employee who handled the order.
select Customers.CustomerID, Customers.CompanyName, Customers.ContactName, Customers.ContactTitle, Customers.Address,Customers.City, Customers.Country, 
	   Orders.OrderID, Orders.OrderDate,
	   Employees.EmployeeID, Employees.FirstName as EmployeeFirstName, Employees.LastName as EmployeeLastName
from Customers 
inner join Orders  on Customers.CustomerID = Orders.CustomerID
inner join Employees  on Orders.EmployeeID = Employees.EmployeeID
where Orders.OrderDate = '2023-01-15';

--select * from Orders;

--24 Write a SQL query to retrieve the list of all orders placed by customers in a particular city, along with the customer name and order date.
select Customers.CustomerID, Customers.CompanyName, Customers.ContactName, Customers.ContactTitle, Customers.Address, Customers.City, Customers.Country, 
	   Orders.OrderID, Orders.OrderDate
from Customers 
inner join Orders  on Customers.CustomerID = Orders.CustomerID
where Customers.Country = 'USA';


--25 Write a SQL query to retrieve the list of all orders placed by employees who were born in a particular city, along with the employee name and order date.
select e.EmployeeID, e.LastName, e.FirstName, e.BirthDate,
       o.OrderID, o.OrderDate
from Employees e
inner join Orders o on e.EmployeeID = o.EmployeeID
where e.Address = '123 Main St, Cityville';

--select * from Employees;

--26 Write a SQL query to retrieve the list of all customers who have placed an order, along with the customer name, order date, and employee who handled the order, sorted by order date.
select Customers.CustomerID, Customers.CompanyName, Customers.ContactName, Customers.ContactTitle, Customers.Address, Customers.City, Customers.Country,
	   Orders.OrderID, Orders.OrderDate,
	   Employees.EmployeeID, Employees.FirstName as EmployeeFirstName, Employees.LastName as EmployeeLastName
from Customers 
inner join Orders  on Customers.CustomerID = Orders.CustomerID
inner join Employees  on Orders.EmployeeID = Employees.EmployeeID
where Orders.OrderDate = '2023-01-15' 
order by Orders.OrderDate;

--27 Write a SQL query to retrieve the list of all orders placed by customers in a particular country, along with the customer name and order date, sorted by order date.
select Customers.CustomerID, Customers.CompanyName, Customers.ContactName, Customers.ContactTitle, Customers.Address, Customers.City, Customers.Country, Orders.OrderID, Orders.OrderDate
from Customers 
inner join Orders  on Customers.CustomerID = Orders.CustomerID
where Customers.Country = 'USA'
order by Orders.OrderDate;









