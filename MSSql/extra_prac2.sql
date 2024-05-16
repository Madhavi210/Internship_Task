create database practice_5

use practice_5;

--***********exam question****************


-- Category Master Table

CREATE TABLE CategoryMaster (
    CategoryId INT PRIMARY KEY identity(1,1),
    CategoryName VARCHAR(50) NOT NULL,
    CategoryDescription VARCHAR(255),
    IsActive BIT NOT NULL,
    CreatedDate DATETIME NOT NULL
);

select *  from CategoryMaster
select * from ItemMaster
select * from CouponMaster

-- Item Master Table
CREATE TABLE ItemMaster (
    ItemId INT PRIMARY KEY identity(1,1),
    CategoryId INT FOREIGN KEY REFERENCES CategoryMaster(CategoryId),
    ItemName VARCHAR(50) NOT NULL,
    ItemDescription VARCHAR(255),
    Price DECIMAL(10,2) NOT NULL,
    Gst DECIMAL(5,2) NOT NULL,
    IsActive BIT NOT NULL,
    CreatedDate DATETIME NOT NULL
);

-- Coupon Master Table
CREATE TABLE CouponMaster (
    CouponId INT PRIMARY KEY identity(101,1),
    CouponText VARCHAR(100) NOT NULL,
    DiscountPercentage DECIMAL(5,2) NOT NULL,
    ExpiryDate DATE NOT NULL
);

-- Order Master Table
CREATE TABLE OrderMaster (
    OrderId INT PRIMARY KEY identity(501,1),
    DeliveryCharge DECIMAL(10,2) NOT NULL,
    CouponAmount DECIMAL(10,2) NOT NULL,
    Subtotal DECIMAL(10,2) NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    OrderDate DATETIME NOT NULL
);

-- Order Details Table
CREATE TABLE OrderDetails (
    OrderDetailsId INT PRIMARY KEY identity(505,1),
    OrderId INT FOREIGN KEY REFERENCES OrderMaster(OrderId),
    ItemId INT NOT NULL,
    Quantity INT NOT NULL,
    Total DECIMAL(10,2) NOT NULL
);

-- Stored procedure to insert data into Category table
CREATE PROCEDURE InsertCategory
    @CategoryName NVARCHAR(50),
    @CategoryDescription NVARCHAR(100),
    @IsActive BIT
AS
BEGIN
    INSERT INTO CategoryMaster (CategoryName, CategoryDescription, IsActive, CreatedDate)
    VALUES (@CategoryName, @CategoryDescription, @IsActive, GETDATE())
END

-- Stored procedure to insert data into Item table
CREATE PROCEDURE InsertItem
    @CategoryId INT,
    @ItemName NVARCHAR(50),
    @ItemDescription NVARCHAR(100),
    @Price DECIMAL(10, 2),
    @Gst DECIMAL(5, 2),
    @IsActive BIT
AS
BEGIN
    INSERT INTO ItemMaster (CategoryId, ItemName, ItemDescription, Price, Gst, IsActive, CreatedDate)
    VALUES (@CategoryId, @ItemName, @ItemDescription, @Price, @Gst, @IsActive, GETDATE())
END


-- Stored procedure to insert data into Coupon table
CREATE PROCEDURE InsertCoupon
    @CouponText NVARCHAR(100),
    @DiscountPercentage DECIMAL(5, 2),
    @ExpiryDate DATE
AS
BEGIN
    INSERT INTO CouponMaster (CouponText, DiscountPercentage, ExpiryDate)
    VALUES (@CouponText, @DiscountPercentage, @ExpiryDate)
END


-- Insert values into CategoryMaster table
EXEC InsertCategory 'Category1', 'Category 1 Description', 1;
EXEC InsertCategory 'Category2', 'Category 2 Description', 1;
EXEC InsertCategory 'Category3', 'Category 3 Description', 0;
EXEC InsertCategory 'Category4', 'Category 4 Description', 1;

-- Insert values into ItemMaster table
EXEC InsertItem 1, 'Item1', 'Item 1 Description', 100, 18, 1;
EXEC InsertItem 1, 'Item2', 'Item 2 Description', 200, 18, 1;
EXEC InsertItem 2, 'Item3', 'Item 3 Description', 150, 18, 1;
EXEC InsertItem 3, 'Item4', 'Item 4 Description', 120, 18, 1;

-- Insert values into CouponMaster table
EXEC InsertCoupon 'Coupon1', 10, '2024-06-30';
EXEC InsertCoupon 'Coupon2', 20, '2024-04-30';
EXEC InsertCoupon 'Coupon3', 15, '2023-12-31';




-- Function to calculate total item amount based on quantity
CREATE FUNCTION CalculateTotalItemAmount
(
    @Price DECIMAL(10, 2),
    @Quantity INT
)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    RETURN @Price * @Quantity
END


-- Stored procedure to process order
alter PROCEDURE ProcessOrder
    @ItemId INT,
    @Quantity INT,
    @Coupon NVARCHAR(100) = NULL
AS
BEGIN
    DECLARE @TotalItemAmount DECIMAL(10, 2)
    DECLARE @DeliveryCharge DECIMAL(10, 2)
    DECLARE @Discount DECIMAL(10, 2)
    declare @itemPrice decimal(10,2)

    -- Check if item is active
    IF NOT EXISTS (SELECT 1 FROM ItemMaster WHERE ItemId = @ItemId AND IsActive = 1)
    BEGIN
        PRINT 'Item is not available'
        RETURN
    END
    
    -- Check if category of item is active
    IF NOT EXISTS (SELECT 1 FROM ItemMaster i INNER JOIN CategoryMaster c ON i.CategoryId = c.CategoryId WHERE i.ItemId = @ItemId AND c.IsActive = 1)
    BEGIN
        PRINT 'Category is not available'
        RETURN
    END

	select @itemprice = Price from ItemMaster where ItemId = @ItemId
    
    -- Calculate total item amount
    SELECT @TotalItemAmount = dbo.CalculateTotalItemAmount(@itemprice , @Quantity)
    FROM ItemMaster
    WHERE ItemId = @ItemId
    
    -- Calculate delivery charge
    IF @TotalItemAmount > 1000
        SET @DeliveryCharge = 0
    ELSE IF @TotalItemAmount BETWEEN 500 AND 1000
        SET @DeliveryCharge = 50
    ELSE
        SET @DeliveryCharge = 80
    
    -- Check for coupon and calculate discount
    IF @Coupon IS NOT NULL
    BEGIN
        SELECT @Discount = DiscountPercentage
        FROM CouponMaster
        WHERE CouponText = @Coupon AND ExpiryDate >= GETDATE()
        
        IF @Discount IS NOT NULL
            SET @TotalItemAmount = @TotalItemAmount - (@TotalItemAmount * (@Discount / 100))
    END
    
    -- Insert order
    INSERT INTO OrderMaster (Deliverycharge, CouponAmount, Subtotal, Total, Orderdate)
    VALUES (@DeliveryCharge, 10, @TotalItemAmount, @TotalItemAmount + @DeliveryCharge, GETDATE())
    
    --DECLARE @OrderId INT
    --SET @OrderId = SCOPE_IDENTITY()
    
    -- Insert order details
    INSERT INTO OrderDetails ( ItemId, Quantity, Total)
    VALUES ( @ItemId, @Quantity, @TotalItemAmount)
    
    -- Select order and order details as output
    --SELECT o.OrderId, o.Deliverycharge, o.CouponAmount, o.Subtotal, o.Total, o.Orderdate, od.OrderDetailsId, od.ItemId, od.Quantity, od.Total
    --FROM OrderMaster o
    --INNER JOIN OrderDetails od ON o.OrderId = od.OrderId
    --WHERE o.OrderId = @OrderId
END


-- Call the ProcessOrder procedure without a coupon
EXEC ProcessOrder @ItemId = 1, @Quantity = 2;

-- Call the ProcessOrder procedure with a coupon
EXEC ProcessOrder @ItemId = 2, @Quantity = 1, @Coupon = 'Coupon1';


select * from OrderMaster
select * from OrderDetails











































