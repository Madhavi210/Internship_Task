create database Assignment_3_Madhavi_Joshi

use Assignment_3_Madhavi_Joshi


select * from sys.objects where type = 'u';
select * from sys.objects where type = 'v';
select * from sys.objects where type = 'p';

sp_helptext v1;
sp_helptext getTopm;


 
 drop table actor
--actor table 
create table actor(
	act_id int identity(1,1) primary key ,
	act_fname varchar(50),
	act_lname varchar(50),
	act_gender varchar(50)
);

insert into actor (act_fname, act_lname, act_gender) values
('Madhavi', 'Joshi', 'female'),
('Vidhi', 'AAA', 'Female'),
('Nidhi', 'BBB', 'Female'),
('Hardik', 'DDD', 'Male'),
('Harsh', 'CCC', 'Male'),
('Sophia', 'XYZ', 'Female'),
('Riya', 'XXX', 'Female'),
('Hasti', 'YYY', 'Female'),
('Neha', 'MMM', 'Female'),
('Woody', 'Allen', 'Female');

select * from actor ;

-- genre table
create table genre (
	gen_id int  identity(1,1) primary key,
	gen_title varchar(50)
);

insert into genre (gen_title) values
('Action'),
('Comedy'),
('Drama'),
('Science Fiction'),
('Romance'),
('Thriller'),
('Horror'),
('Fantasy'),
('Adventure'),
('Mystery');

select * from genre;

--director table
create table director (
	dir_id int identity(1,1) primary key ,
	dir_fname varchar(50),
	dir_lname varchar(50)
);

insert into director (dir_fname, dir_lname) values
('David', 'Johnson'),
('Emily', 'Williams'),
('Michael', 'Brown'),
('Sophia', 'Davis'),
('Daniel', 'Clark'),
('Olivia', 'Miller'),
('Andrew', 'Wilson'),
('Emma', 'Moore'),
('Brian', 'Lee'),
('Lucas', 'Taylor');

select * from director;

drop table movie 
--movie table 
create table movie (
	mov_id int identity(901,1) primary key ,
	mov_title varchar(50),
	mov_year int,  --int
	mov_time time,
	mov_lang varchar(50),
	mov_dt_rel date,
	mov_release_country varchar(50)
);

insert into movie (mov_title, mov_year, mov_time, mov_lang, mov_dt_rel, mov_release_country) values
('The Action Hero', 2020, '02:00:00', 'English', '2020-05-15', 'USA'),
('A Comedy Story', 2021, '01:30:00', 'Spanish', '2021-03-10', 'Spain'),
('Drama Nights', 2019, '02:30:00', 'English', '2019-08-22', 'USA'),
('The Sci-Fi Adventure', 2022, '02:10:00', 'English', '2022-01-01', 'USA'),
('Romantic Sunset', 2020, '01:50:00', 'French', '2020-11-18', 'France'),
('Thrill Seeker', 1989, '01:40:00', 'English', '1989-06-25', 'USA'),
('Horror House', 2018, '01:20:00', 'English', '2018-09-30', 'USA'),
('Fantasy Island', 1980, '02:20:00', 'English', '1980-04-05', 'USA'),
('The Adventure Quest', 2019, '02:40:00', 'English', '2019-12-10', 'USA'),
('Mystery Mansion', 2000, '01:35:00', 'English', '2000-03-12', 'USA'),
('aaaaaeeee', 1999, '01:35:00', 'English', '1999-03-12', 'USA');


select * from movie

drop table movie_genres
--movie_genre table
create table movie_genres(
	mov_id int foreign key references movie(mov_id),
	gen_id int foreign key references genre(gen_id)
);

insert into movie_genres (mov_id, gen_id) values
(901, 1),
(902, 2),
(903, 3),
(904, 4),
(905, 5),
(906, 6),
(907, 7),
(908, 8),
(909, 9),
(910, 10);

drop table movie_direction
--movie_direction table 
create table movie_direction(
	dir_id int foreign key references director(dir_id),
	mov_id int foreign key references movie(mov_id)
);
insert into movie_direction (dir_id, mov_id)
values
(1, 901),
(2, 902),
(3, 903),
(4, 904),
(5, 905),
(6, 906),
(7, 907),
(8, 908),
(9, 909),
(10, 910);

select * from movie_direction;

--reviewer table
create table reviewer(
	rev_id int identity(1,1) primary key ,
	rev_name varchar(50)
);

insert into reviewer (rev_name) values
('Alice'),
('Bob'),
('Charlie'),
('David'),
('Eva'),
('Frank'),
('Grace'),
('Henry'),
('Ivy'),
('Jack');

select * from reviewer

drop table rating
--rating table
create table rating(
	mov_id int foreign key references movie(mov_id),
	rev_id int foreign key references reviewer(rev_id),
	rev_stars float ,
	num_o_rating int
);

insert into rating (mov_id, rev_id, rev_stars, num_o_rating) values
(901, 1, 4, 100),
(902, 2, 5, 150),
(903, 3, 3, 80),
(904, 4, null, 120),
(905, 5, 7, 200),
(906, 6, 3, 90),
(907, 7, 4, 110),
(908, 8, 9, 180),
(909, 9, 4, 130),
(910, 10, 8, 100);
 
select * from rating;

drop table movie_cast
-- movie_cast table
create table movie_cast (
	act_id int foreign key references actor(act_id),
	mov_id int foreign key references movie(mov_id),
	role varchar(50)
);

insert into movie_cast (act_id, mov_id, role) values
(1, 901, 'Action Hero'),
(2, 902, 'Comedy Star'),
(3, 903, 'Drama Lead'),
(4, 904, 'Sci-Fi Protagonist'),
(5, 905, 'Romantic Lead'),
(6, 906, 'Thriller'),
(7, 907, 'Lead Actor'),
(8, 908, 'Supporting Actor'),
(9, 909, 'Main Character'),
(10, 910, 'Lead Role');

select * from movie_cast;


--1 From the following table, write a SQL query to find the name and year of the movies. Return movie title, movie release year
select mov_title, mov_year from movie;

--2. From the following table, write a SQL query to find when the movie specific released. Return movie release year
select mov_dt_rel as 'Movie Release Year' from movie
where mov_title = 'The Action Hero';


--3. From the following table, write a SQL query to find the movie that was released in 1999. Return movie title.
select mov_title,mov_year from movie where mov_year = 1999;

--4. From the following table, write a SQL query to find those movies, which were released before 1998. Return movie title.
select mov_title, mov_year from movie where mov_year < 1998;

--5. From the following tables, write a SQL query to find the name of all reviewers and movies together in a single list.
select rev_name from reviewer 
union
select mov_title from movie;

--6. From the following table, write a SQL query to find all reviewers who have rated seven or more stars to their rating. Return reviewer name.
select distinct reviewer.rev_name 
from reviewer 
inner join rating on reviewer.rev_id = rating.rev_id
where rating.rev_stars >= 7;

--7. From the following tables, write a SQL query to find the movies without any rating. Return movie title.

select movie.mov_title
from  movie 
left join rating  on movie.mov_id = rating.mov_id
where rating.mov_id is null or rating.rev_stars is null;
--or
select mov_title
from movie
where mov_id not in (select mov_id from rating);


--8. From the following table, write a SQL query to find the movies with ID 905 or 907 or 917. Return movie title.
select mov_title
from movie
where mov_id in (905, 907, 917);

--9. From the following table, write a SQL query to find the movie titles that contain the specific word. 
--Sort the result-set in ascending order by movie year. Return movie ID, movie title and movie release year. 
select mov_id, mov_title, mov_year
from movie
where mov_title like '%The%'
order by mov_year asc;

--10. From the following table, write a SQL query to find those actors with the first name 'Woody' and the last name 'Allen'. Return actor ID
select act_id from actor where act_fname = 'Woody' and act_lname  = 'Allen';

--11. get directors who have directed movies with avrage rating higher then 5
select d.dir_id, d.dir_fname, d.dir_lname
from director d
inner join movie_direction md on d.dir_id = md.dir_id
inner join rating r on md.mov_id = r.mov_id
group by d.dir_id, d.dir_fname, d.dir_lname
having avg(r.rev_stars) > 5;

--12. get all actors who have worked for movies that were directed by specific director
select a.act_id, a.act_fname, a.act_lname
from actor a
inner join movie_cast mc on a.act_id = mc.act_id
inner join movie_direction md on mc.mov_id = md.mov_id
where md.dir_id = 3;

--13. create a stored proc to get list of movies which is 3 years old and having rating greater than 5

select GETDATE();
select  DATEDIFF(year, mov_dt_rel, GETDATE()) from movie;
select  DATEDIFF(month, mov_dt_rel, GETDATE()) from movie;
select  DATEDIFF(day, mov_dt_rel, GETDATE()) from movie;

select m.mov_title,  m.mov_year, r.rev_stars 
from movie m
inner join rating r on m.mov_id = r.mov_id
where DATEDIFF(YEAR, m.mov_dt_rel, GETDATE()) >= 3 and r.rev_stars > 5;

--sp
create procedure GetRecentHighRatedMovie
as
begin
	--variable
    DECLARE @CurrentYear INT
    DECLARE @ThreeYearsAgo INT
	--assign value
	set @CurrentYear = YEAR(GETDATE())
	SET @ThreeYearsAgo = @CurrentYear  - 3

	select m.mov_title,  m.mov_year, r.rev_stars 
	from movie m
	inner join rating r on m.mov_id = r.mov_id
	where YEAR(m.mov_dt_rel) >= @ThreeYearsAgo 
end;
--execute sp
EXEC GetRecentHighRatedMovie;



--14. create a stored proc to get list of all directors who have directed more then 2 movies
select d.dir_id, d.dir_fname
from director d
inner join movie_direction md on d.dir_id = md.dir_id
group by d.dir_id, d.dir_fname
having count(md.mov_id) > 2;

--sp
create procedure directormovies
as
begin 
	select d.dir_id, d.dir_fname
	from director d
	inner join movie_direction md on d.dir_id = md.dir_id
	group by d.dir_id, d.dir_fname
	having count(md.mov_id) > 0;
end;

exec directormovies;




--15. create a stored proc to get list of all directors which have directed a movie which have rating greater than 3.
select distinct d.dir_fname, d.dir_lname from director d 
inner join movie_direction md on d.dir_id = md.dir_id
inner join rating r on md.mov_id = r.mov_id
where r.rev_stars > 3;

--16. create a function to get worst director according to movie rating
select top 1 d.dir_id, d.dir_fname,  d.dir_lname, avg(r.rev_stars) as avg_rating
from  director d
inner join movie_direction md on d.dir_id = md.dir_id
inner join rating r on md.mov_id = r.mov_id
group by  d.dir_id, d.dir_fname,  d.dir_lname
order by avg_rating ;


--17.  create a function to get worst actor according to movie rating
select top 1 a.act_id, a.act_fname, a.act_lname, avg(r.rev_stars) as avg_rating
from actor a 
inner join movie_cast mc on a.act_id = mc.act_id
inner join rating r on mc.mov_id = r.mov_id
group by a.act_id, a.act_fname, a.act_lname
order by avg_rating

--18. create a parameterized stored procedure which accept genre and give movie accordingly 
select m.mov_title, m.mov_year, m.mov_lang, m.mov_dt_rel, m.mov_release_country
from movie m
inner join movie_genres mg on m.mov_id = mg.mov_id
inner join genre g on mg.gen_id = g.gen_id
where g.gen_title = 'Horror';


--sp
create procedure GetMoviesByGenre
	@genre varchar(50)
as
begin
	select m.mov_title, m.mov_year, m.mov_lang, m.mov_dt_rel, m.mov_release_country
	from movie m
	inner join movie_genres mg on m.mov_id = mg.mov_id
	inner join genre g on mg.gen_id = g.gen_id
	where g.gen_title = @genre;
end

--declare @genrepara varchar(50) = 'Action';
exec GetMoviesByGenre @genre = 'Action';


--19. get list of movies that start with 'a' and end with letter 'e' and movie released before 2015
select * from movie where mov_title like 'a%e' and mov_dt_rel < '2015-01-01';

--20. get a movie with highest movie cast
select top 1 m.mov_id, m.mov_title, count(mc.act_id) as CastCount
from movie m
inner join movie_cast mc on m.mov_id = mc.mov_id
group by m.mov_id, m.mov_title
order by CastCount desc;

--21. create a function to get reviewer that has rated highest number of movies
select top 1  rev.rev_id, rev.rev_name as top_reviewer, count(r.mov_id) as total_ratings
from reviewer rev
inner join rating r on rev.rev_id = r.rev_id
group by rev.rev_id, rev.rev_name
order by  total_ratings desc;

--22. From the following tables, write a query in SQL to generate a report, which contain the fields movie title, name of the female actor, year of the movie, role, movie genres, the director, date of release, and rating of that movie.
select
    m.mov_title,
    a.act_fname + ' ' + a.act_lname as female_actor_name,
    m.mov_year,
    mc.role,
    g.gen_title as movie_genre,
    d.dir_fname + ' ' + d.dir_lname as director_name,
    m.mov_dt_rel as release_date,
    r.rev_stars as rating
from movie m
inner join movie_cast mc on m.mov_id = mc.mov_id
inner join actor a on mc.act_id = a.act_id
inner join movie_genres mg on m.mov_id = mg.mov_id
inner join genre g on mg.gen_id = g.gen_id
inner join movie_direction md on m.mov_id = md.mov_id
inner join director d on md.dir_id = d.dir_id
left join  rating r on m.mov_id = r.mov_id
where a.act_gender = 'female';

--23. From the following tables, write a SQL query to find the years when most of the ‘Mystery Movies’ produced. Count the number of generic title and compute their average rating. Group the result set on movie release year, generic title. Return movie year, generic title, number of generic title and average rating.
select	m.mov_year, g.gen_title, count(m.mov_id) as number_of_generic_title, avg(r.rev_stars) as average_rating
from  movie m
inner join movie_genres mg on m.mov_id = mg.mov_id
inner join genre g on g.gen_id = mg.gen_id
inner join rating r on m.mov_id = r.mov_id
where g.gen_title = 'Mystery'
group by m.mov_year, g.gen_title;


--24.  From the following tables, write a SQL query to find the highest-rated ‘Mystery Movies’. Return the title, year, and rating
select top 1  m.mov_title,  m.mov_year,  r.rev_stars as rating
from movie m
inner join movie_genres mg on m.mov_id = mg.mov_id
inner join genre g on mg.gen_id = g.gen_id
inner join rating r on m.mov_id = r.mov_id
where g.gen_title = 'Mystery'
order by  r.rev_stars desc;

--25. create a function which accepts genre and suggests best movie according to ratings 
select top 1 m.mov_title
from  movie m 
join  movie_genres mg on m.mov_id = mg.mov_id
join genre g on mg.gen_id = g.gen_id
join rating r  on r.mov_id = m.mov_id
where g.gen_title =  'Mystery'
order by r.rev_stars desc;

--26. create a function which accepts genre and suggests best director according to ratings. 
select top 1 d.dir_fname 
from  director d
inner join movie_direction md on d.dir_id = md.dir_id
inner join movie m on m.mov_id = md.mov_id
inner join movie_genres mg on mg.mov_id = m.mov_id
inner join genre g on g.gen_id = mg.gen_id
inner join rating r on r.mov_id = m.mov_id
where  g.gen_title = 'Drama'
order by r.rev_stars desc;

--27. create a function that accepts a genre and give random movie according to genre
select  top 1  m.mov_title
from  movie m
inner join   movie_genres mg on m.mov_id = mg.mov_id
inner join  genre g on mg.gen_id = g.gen_id
where  g.gen_title = 'Drama';












--sp

CREATE TABLE Movies2 (
    MovieID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100),
    Genre NVARCHAR(50),
    ReleaseDate DATE,
    Rating DECIMAL(3, 1)
);

--insert 
create procedure insertmovi
	@title varchar(50),
	@genre varchar(50),
	@rdate date,
	@rating decimal(3,1)
as
begin
	insert into Movies2 (Title, Genre, ReleaseDate, Rating) values 
	(@title, @genre, @rdate, @rating)
end;

exec insertmovi @title = 'aaa', @genre = 'action', @rdate = '12-12-2002', @rating = 5.4;
exec insertmovi @title = 'bbb', @genre = 'drama', @rdate = '12-12-2323', @rating = 5;
exec insertmovi @title = 'ccc', @genre = 'comedy', @rdate = '11-12-4545', @rating = 9;

--update
create procedure UpdateMovieRating 
	@newTitle varchar(50)
as
begin
	UPDATE  Movies2
	set Title = @newTitle where MovieID = 1
end;

exec UpdateMovieRating @newTitle = 'xyz';



--delete 
create procedure deletemovie 
	@newmid int
as
begin
	delete from Movies2 where MovieID = @newmid
end;

exec deletemovie  @newmid = 2;

--top 
create procedure getTopm
	@topn int 
as
begin
	select top (@topn)  MovieID, Title, ReleaseDate, Rating
	from movies2 
end;

exec getTopm @topn = 2;

select * from Movies2


-- function 

create function dbo.addnum 
(
	@num1 int,
	@num2 int
)
as


create view v1 as
select * from movie;

select * from v1


