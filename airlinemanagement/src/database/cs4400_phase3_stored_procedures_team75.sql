-- CS4400: Introduction to Database Systems: Monday, March 3, 2025
-- Simple Airline Management System Course Project Mechanics [TEMPLATE] (v0)
-- Views, Functions & Stored Procedures

/* This is a standard preamble for most of our scripts.  The intent is to establish
a consistent environment for the database behavior. */
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

set @thisDatabase = 'flight_tracking';
use flight_tracking;
-- -----------------------------------------------------------------------------
-- stored procedures and views
-- -----------------------------------------------------------------------------
/* Standard Procedure: If one or more of the necessary conditions for a procedure to
be executed is false, then simply have the procedure halt execution without changing
the database state. Do NOT display any error messages, etc. */

-- [_] supporting functions, views and stored procedures
-- -----------------------------------------------------------------------------
/* Helpful library capabilities to simplify the implementation of the required
views and procedures. */
-- -----------------------------------------------------------------------------
drop function if exists leg_time;
delimiter //
create function leg_time (ip_distance integer, ip_speed integer)
	returns time reads sql data
begin
	declare total_time decimal(10,2);
    declare hours, minutes integer default 0;
    set total_time = ip_distance / ip_speed;
    set hours = truncate(total_time, 0);
    set minutes = truncate((total_time - hours) * 60, 0);
    return maketime(hours, minutes, 0);
end //
delimiter ;

-- [1] add_airplane()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new airplane.  A new airplane must be sponsored
by an existing airline, and must have a unique tail number for that airline.
username.  An airplane must also have a non-zero seat capacity and speed. An airplane
might also have other factors depending on it's type, like the model and the engine.  
Finally, an airplane must have a new and database-wide unique location
since it will be used to carry passengers. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_airplane;
delimiter //
create procedure add_airplane (in ip_airlineID varchar(50), in ip_tail_num varchar(50),
	in ip_seat_capacity integer, in ip_speed integer, in ip_locationID varchar(50),
    in ip_plane_type varchar(100), in ip_maintenanced boolean, in ip_model varchar(50),
    in ip_neo boolean)
sp_main: begin
	-- check existing airline 
    if (select count(*) from airline where airlineID = ip_airlineID) < 1 then
		leave sp_main;
	end if;
		
    -- check tail number uniqueness
    if ((select count(*) from airplane as a where a.tail_num = ip_tail_num) >= 1) then
		leave sp_main;
	end if;
    
    -- check if seat capacity or speed is 0
    if (ip_speed = 0 or ip_seat_capacity = 0) then
		leave sp_main;
	end if;
    
    if (ip_locationID is null or ((select count(*) from location where locationID = ip_locationID) >= 1)) then
		leave sp_main;
    end if;
    
	if (ip_plane_type = 'Boeing' and (ip_model is null or ip_maintenanced is null)) then
		leave sp_main;
	end if;

	if (ip_plane_type = 'Airbus' and (ip_neo is null)) then
		leave sp_main;
	end if;

	insert into location Values(ip_locationID);

	-- Then simplify your insert logic since validations are already done
	if (ip_plane_type is not null) then
		insert into airplane Values (ip_airlineID, ip_tail_num, ip_seat_capacity, ip_speed, ip_locationID, ip_plane_type, ip_maintenanced, ip_model, ip_neo);
	else 
		leave sp_main;
	end if;
    
	-- Ensure that the plane type is valid: Boeing, Airbus, or neither
    -- Ensure that the type-specific attributes are accurate for the type
    -- Ensure that the airplane and location values are new and unique
    -- Add airplane and location into respective tables

end //
delimiter ;

-- [2] add_airport()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new airport.  A new airport must have a unique
identifier along with a new and database-wide unique location if it will be used
to support airplane takeoffs and landings.  An airport may have a longer, more
descriptive name.  An airport must also have a city, state, and country designation. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_airport;
delimiter //
create procedure add_airport (in ip_airportID char(3), in ip_airport_name varchar(200),
    in ip_city varchar(100), in ip_state varchar(100), in ip_country char(3), in ip_locationID varchar(50))
sp_main: begin
	if exists (select airportID from airport where ip_airportID = airportID) then
		leave sp_main;
	elseif exists (select locationID from airport where ip_locationID = locationID) 
    or exists (select locationID from location where ip_locationID = locationID) then
		leave sp_main;
	else
		insert into location (locationID) values (ip_locationID);
		insert into airport (airportID, airport_name, city, state, country, locationID)
        values (ip_airportID, ip_airport_name, ip_city, ip_state, ip_country, ip_locationID);
	end if;
	-- Ensure that the airport and location values are new and unique
    -- Add airport and location into respective tables

end //
delimiter ;

-- [3] add_person()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new person.  A new person must reference a unique
identifier along with a database-wide unique location used to determine where the
person is currently located: either at an airport, or on an airplane, at any given
time.  A person must have a first name, and might also have a last name.

A person can hold a pilot role or a passenger role (exclusively).  As a pilot,
a person must have a tax identifier to receive pay, and an experience level.  As a
passenger, a person will have some amount of frequent flyer miles, along with a
certain amount of funds needed to purchase tickets for flights. */
-- -----------------------------------------------------------------------------
drop procedure if exists add_person;
delimiter //
create procedure add_person (in ip_personID varchar(50), in ip_first_name varchar(100),
    in ip_last_name varchar(100), in ip_locationID varchar(50), in ip_taxID varchar(50),
    in ip_experience integer, in ip_miles integer, in ip_funds integer)
sp_main: begin
	if not exists (select locationID from location where locationID = ip_locationID) then
		leave sp_main;
	elseif exists (select personID from passenger where personID = ip_personID) or 
    exists (select personID from passenger_vacations where personID = ip_personID) or 
    exists (select personID from pilot where personID = ip_personID) then
		leave sp_main;
	elseif ip_first_name is NULL then
		leave sp_main;
	else
		if (ip_miles is not NULL) and (ip_funds is not NULL) and (ip_experience is NULL) and (ip_taxID is NULL) then
			insert into person (personID, first_name, last_name, locationID)
			values (ip_personID, ip_first_name, ip_last_name, ip_locationID);
			insert into passenger (personID, miles, funds) 
            values (ip_personID, ip_miles, ip_funds);

		elseif (ip_experience is not NULL) and (ip_taxID is not NULL) and (ip_miles is NULL) and (ip_funds is NULL) then
			insert into person (personID, first_name, last_name, locationID)
			values (ip_personID, ip_first_name, ip_last_name, ip_locationID);
			insert into pilot (personID, taxID, experience, commanding_flight)
            values (ip_personID, ip_taxID, ip_experience, NULL);

		end if;
	end if;
	-- Ensure that the location is valid
    -- Ensure that the persion ID is unique
    -- Ensure that the person is a pilot or passenger
    -- Add them to the person table as well as the table of their respective role

end //
delimiter ;

-- [4] grant_or_revoke_pilot_license()
-- -----------------------------------------------------------------------------
/* This stored procedure inverts the status of a pilot license.  If the license
doesn't exist, it must be created; and, if it aready exists, then it must be removed. */
-- -----------------------------------------------------------------------------
drop procedure if exists grant_or_revoke_pilot_license;
delimiter //
create procedure grant_or_revoke_pilot_license (in ip_personID varchar(50), in ip_license varchar(100))
sp_main: begin
	if not exists (select 1 from pilot where personID = ip_personID) then
        leave sp_main;
    end if;
    -- If license exists, delete it, otherwise add the license
	if exists (select 1 from pilot_licenses where ip_personID = personID and ip_license = license) then
		delete from pilot_licenses where ip_personID = personID and ip_license = license;
    else
		insert into pilot_licenses (personID, license)
        values (ip_personID, ip_license);
    end if;
	-- Ensure that the person is a valid pilot
    -- If license exists, delete it, otherwise add the license

end //
delimiter ;

-- [5] offer_flight()
-- -----------------------------------------------------------------------------
/* This stored procedure creates a new flight.  The flight can be defined before
an airplane has been assigned for support, but it must have a valid route.  And
the airplane, if designated, must not be in use by another flight.  The flight
can be started at any valid location along the route except for the final stop,
and it will begin on the ground.  You must also include when the flight will
takeoff along with its cost. */
-- -----------------------------------------------------------------------------
drop procedure if exists offer_flight;
delimiter //
create procedure offer_flight (in ip_flightID varchar(50), in ip_routeID varchar(50),
    in ip_support_airline varchar(50), in ip_support_tail varchar(50), in ip_progress integer,
    in ip_next_time time, in ip_cost integer)
sp_main: begin
	declare route_length int;
    -- Ensure flight is not null
    if ip_flightID is null then
		leave sp_main;
	end if;
    -- Ensure that the route exists
    if not exists (select 1 from route where routeID = ip_routeID) then
		leave sp_main;
    end if;
    -- Ensure that the progress is less than the length of the route
	select count(*) into route_length
    from route_path where routeID = ip_routeID;
    if (route_length = 0 or ip_progress >= route_length) then
		leave sp_main;
    end if;
-- Ensure that the airplane exists
    if ip_support_airline is not null and ip_support_tail is not null then
		if not exists (select 1 from airplane where airlineID = ip_support_airline and
         tail_num = ip_support_tail) then
			leave sp_main;
		end if;
        -- Ensure that the airplane is not used by another flight
		if exists (select 1 from flight where support_airline = ip_support_airline and
         support_tail = ip_support_tail) then
			leave sp_main;
		end if;
    end if;
	-- select "create flight now";
    -- Create the flight with the airplane starting in on the ground
	insert into flight (flightID, routeID, support_airline, support_tail, progress,
        airplane_status, next_time, cost)
        values (ip_flightID, ip_routeID, ip_support_airline, ip_support_tail, ip_progress,
        'on_ground', ip_next_time, ip_cost);
	-- Ensure that the airplane exists
    -- Ensure that the route exists
    -- Ensure that the progress is less than the length of the route
    -- Create the flight with the airplane starting in on the ground

end //
delimiter ;

-- [6] flight_landing()
-- -----------------------------------------------------------------------------
/* This stored procedure updates the state for a flight landing at the next airport
along it's route.  The time for the flight should be moved one hour into the future
to allow for the flight to be checked, refueled, restocked, etc. for the next leg
of travel.  Also, the pilots of the flight should receive increased experience, and
the passengers should have their frequent flyer miles updated. */
-- -----------------------------------------------------------------------------
drop procedure if exists flight_landing;
delimiter //
create procedure flight_landing (in ip_flightID varchar(50))
sp_main: begin
	declare v_routeID varchar(50);
    declare v_progress int;
    declare v_legID varchar(50);
    declare v_distance int;
    declare v_support_airline varchar(50);
    declare v_support_tail varchar(50);
	-- Ensure that the flight exists
    if not exists (select 1 from flight where ip_flightID = flightID) then
		leave sp_main;
	end if;
    -- Ensure that the flight is in the air
    if not exists (
        select 1 from flight where flightID = ip_flightID and airplane_status = 'in_flight'
    ) then
        leave sp_main;
    end if;
    
    -- Increment the pilot's experience by 1
    update pilot
    set experience = experience + 1
    where commanding_flight = ip_flightID;
    
    -- vars
    select routeID, progress, support_airline, support_tail
    into v_routeID, v_progress, v_support_airline, v_support_tail
    from flight 
    where flightID = ip_flightID;
    
    select legID 
    into v_legID 
    from route_path 
    where routeID = v_routeID and sequence = v_progress;
    
    select distance 
    into v_distance 
    from leg 
    where legID = v_legID;
    
    -- Increment the frequent flyer miles of all passengers on the plane
    update passenger
    set miles = miles + v_distance
    where personID in (
        select p.personID
        from person p
        join airplane a on a.airlineID = v_support_airline and a.tail_num = v_support_tail
        where p.locationID = a.locationID
    );
    -- Update the status of the flight and increment the next time to 1 hour later
		-- Hint: use addtime()
	update flight
    set 
        airplane_status = 'on_ground',
        next_time = addtime(next_time, '01:00:00')
    where flightID = ip_flightID;
    -- select 1;
	-- Ensure that the flight exists
    -- Ensure that the flight is in the air
    
    -- Increment the pilot's experience by 1
    -- Increment the frequent flyer miles of all passengers on the plane
    -- Update the status of the flight and increment the next time to 1 hour later
		-- Hint: use addtime()

end //
delimiter ;

-- [7] flight_takeoff()
-- -----------------------------------------------------------------------------
/* This stored procedure updates the state for a flight taking off from its current
airport towards the next airport along it's route.  The time for the next leg of
the flight must be calculated based on the distance and the speed of the airplane.
And we must also ensure that Airbus and general planes have at least one pilot
assigned, while Boeing must have a minimum of two pilots. If the flight cannot take
off because of a pilot shortage, then the flight must be delayed for 30 minutes. */
-- -----------------------------------------------------------------------------
drop procedure if exists flight_takeoff;
delimiter //
create procedure flight_takeoff (in ip_flightID varchar(50))
sp_main: begin
	DECLARE nextleg VARCHAR(50);
	DECLARE currentLeg INT;
	DECLARE numPilots INT;
	DECLARE currflightID VARCHAR(50);
	DECLARE nextTime TIME;
	DECLARE planeStatus VARCHAR(100);
	DECLARE routeID1 VARCHAR(50); 
    declare airline varchar(50);
    declare tailNum varchar(50);
    
    declare speed int;
    declare distance int;
	
    declare planeType varchar(50);
	-- Find corresponding flightID
	SELECT 
		airplane_status, flightID, next_time, progress, routeID, support_airline, support_tail
	INTO 
		planeStatus, currflightID, nextTime, currentLeg, routeID1, airline, tailNum
	FROM flight 
	WHERE flightID = ip_flightID;

    
    -- ensure flight exists
    if (planeStatus is null) then
		leave sp_main;
	end if;
    
    if (planeStatus <> 'on_ground') then
		leave sp_main;
	end if;
    
    
    select legID into nextleg from route_path as r where r.routeID = routeID1
		order by r.sequence asc limit 1 offset currentLeg;
        
	if(nextLeg is null) then
		leave sp_main;
	end if;
    
    select count(*) into numPilots from pilot where commanding_flight = ip_flightID;
    
    select plane_type into planeType from airplane where tail_num = tailNum;
    
    if ((planeType = 'Boeing' and numPilots < 2) or (planeType = 'Airbus' and numPilots < 1)) then
		set nextTime = date_add(nextTime, interval 30 minute);
		update flight as f set next_time = nextTime where f.flightID = currflightID;
	else 
		select s.speed into speed from airplane as s where s.tail_num = tailNum;
        select l.distance into distance from leg as l where l.legID = nextLeg;
        update flight as f set 
			f.progress = f.progress+1,
			f.next_time = date_add(nextTime, interval (distance*60/speed) minute),
            f.airplane_status = 'in_flight'
		where f.flightID = currflightID;
	end if;
		
	-- Ensure that the flight exists
    -- Ensure that the flight is on the ground
    -- Ensure that the flight has another leg to fly
    -- Ensure that there are enough pilots (1 for Airbus and general, 2 for Boeing)
		-- If there are not enough, move next time to 30 minutes later
        
	-- Increment the progress and set the status to in flight
    -- Calculate the flight time using the speed of airplane and distance of leg
    -- Update the next time using the flight time

end //
delimiter ;

-- [8] passengers_board()
-- -----------------------------------------------------------------------------
/* This stored procedure updates the state for passengers getting on a flight at
its current airport.  The passengers must be at the same airport as the flight,
and the flight must be heading towards that passenger's desired destination.
Also, each passenger must have enough funds to cover the flight.  Finally, there
must be enough seats to accommodate all boarding passengers. */
-- -----------------------------------------------------------------------------
drop procedure if exists passengers_board;
delimiter //
create procedure passengers_board (in ip_flightID varchar(50))
sp_main: begin
	DECLARE currFlight VARCHAR(50);
    DECLARE currFunds INT;
    
    DECLARE nextleg VARCHAR(50);
    DECLARE currentLeg INT;
    
    DECLARE currLegID VARCHAR(50); 
    
    DECLARE numPilots INT;
    DECLARE currflightID VARCHAR(50);
    DECLARE nextTime TIME;
    DECLARE planeStatus VARCHAR(100);
    DECLARE routeID1 VARCHAR(50); 
    DECLARE airline VARCHAR(50);
    DECLARE tailNum VARCHAR(50);
    
    DECLARE speed INT;
    DECLARE distance INT;
    
    DECLARE seats INT;
    DECLARE currAirport VARCHAR(50);
    DECLARE nextAirport VARCHAR(50);
    
    DECLARE planeLocation VARCHAR(50);
    
    DECLARE planeType VARCHAR(50);
    
    DECLARE planeCost INT;
    
    
    -- Find corresponding flightID
    SELECT 
        airplane_status, flightID, next_time, progress, routeID, support_airline, support_tail, cost
    INTO 
        planeStatus, currflightID, nextTime, currentLeg, routeID1, airline, tailNum, planeCost
    FROM flight AS f
    WHERE f.flightID = ip_flightID;
    
    -- Ensure the flight exists
    IF (planeStatus IS NULL) THEN
        LEAVE sp_main;
    END IF;
    
    -- Ensure that the flight is on the ground
    IF (planeStatus <> 'on_ground') THEN
        LEAVE sp_main;
    END IF;
    
    -- Ensure that the flight has further legs to be flown
    SELECT legID INTO nextleg FROM route_path AS r 
    WHERE r.routeID = routeID1
    ORDER BY r.sequence ASC LIMIT 1 OFFSET currentLeg;
        
    IF (nextLeg IS NULL) THEN
        LEAVE sp_main;
    END IF;
    
    -- Set seat capacity for the flight
    SELECT seat_capacity INTO seats FROM airplane AS a WHERE a.tail_num = tailNum;
    
    -- Log the current leg ID into currLegID
    SELECT legID INTO currLegID FROM route_path AS r 
    WHERE r.routeID = routeID1 AND r.sequence = currentLeg+1 limit 1;
    
    -- Get info from curr legID about curr airport and next airport
    SELECT departure, arrival INTO currAirport, nextAirport 
    FROM leg AS l WHERE l.legID = currLegID LIMIT 1;
    
    -- Create temporary table to store passenger info
    DROP TEMPORARY TABLE IF EXISTS passengers123;
    CREATE TEMPORARY TABLE passengers123 (
        ppersonID VARCHAR(50) PRIMARY KEY,
        pfunds INT
    );
    
    -- Insert passengers who:
    -- 1. Are at the current airport
    -- 2. Have enough funds for the flight
    -- 3. Have the next airport as their next destination
	INSERT INTO passengers123
	SELECT p.personID, ps.funds 
	FROM passenger AS ps
	JOIN person AS p ON ps.personID = p.personID
	JOIN airport AS a ON p.locationID = a.locationID  -- Make sure they're at this airport
	JOIN passenger_vacations AS pv ON ps.personID = pv.personID
	WHERE a.airportID = currAirport  -- They must be at current airport
	AND ps.funds >= planeCost  -- They must have enough funds
	AND pv.airportID = nextAirport  -- They must have next airport in their vacation plan
	AND pv.sequence = (  -- Ensure it's their next vacation destination in sequence
		SELECT MIN(sequence) 
		FROM passenger_vacations
		WHERE personID = ps.personID
		AND sequence > 0  -- If they're already on vacation, this should be the next one
	);
        
    -- Check if there are enough seats for all the passengers
    -- If not, do not board any passengers
    IF ((SELECT COUNT(*) FROM passengers123) > seats) THEN
        LEAVE sp_main;
    END IF;
        
    -- Find out which plane they are boarding
    SELECT locationID INTO planeLocation FROM airplane AS a WHERE a.tail_num = tailNum LIMIT 1;
        
    -- Update person location to the plane
    UPDATE person AS p
    JOIN passengers123 AS g ON g.ppersonID = p.personID
    SET p.locationID = planeLocation;
    
    -- Deduct the cost of the flight from passenger funds
    UPDATE passenger AS p
    JOIN passengers123 AS g ON g.ppersonID = p.personID
    SET p.funds = p.funds - planeCost;
		
	-- Ensure the flight exists
    -- Ensure that the flight is on the ground
    -- Ensure that the flight has further legs to be flown
    
    -- Determine the number of passengers attempting to board the flight
    -- Use the following to check:
		-- The airport the airplane is currently located at
        -- The passengers are located at that airport
        -- The passenger's immediate next destination matches that of the flight
        -- The passenger has enough funds to afford the flight
        
	-- Check if there enough seats for all the passengers
		-- If not, do not add board any passengers
        -- If there are, board them and deduct their funds

end //
delimiter ;

-- [9] passengers_disembark()
-- -----------------------------------------------------------------------------
/* This stored procedure updates the state for passengers getting off of a flight
at its current airport.  The passengers must be on that flight, and the flight must
be located at the destination airport as referenced by the ticket. */
-- -----------------------------------------------------------------------------
drop procedure if exists passengers_disembark;
delimiter //
create procedure passengers_disembark (in ip_flightID varchar(50))
sp_main: begin
	Declare plane_status varchar(100);
    Declare airport_id VARCHAR(100);
    Declare airport_loc VARCHAR(100);
	Declare curr_leg INT;
	select progress into curr_leg from flight where flightID = ip_flightID;
    
    select airplane_status into plane_status from flight where flightID = ip_flightID;

	If curr_leg = 0 THEN
	SELECT airportID, locationID INTO airport_id, airport_loc from airport where airportID = (select departure from leg where legID = (select legID from route_path where routeID = (select routeID from flight where flightID = ip_flightID) and sequence = 1));
	else
	SELECT airportID, locationID INTO airport_id, airport_loc from airport where airportID = (select arrival from leg where legID = (select legID from route_path where routeID = (select routeID from flight where flightID = ip_flightID) and sequence = curr_leg));
    END IF;
	-- Ensure the flight exists
    if not exists (select flightID from flight where flightID = ip_flightID) then
		leave sp_main;
	end if;
    -- Ensure that the flight is in the ground
    if not (select airplane_status from flight where flightID = ip_flightID) = 'on_ground' then
		leave sp_main;
	end if;
    -- Determine the list of passengers who are disembarking
	-- Use the following to check:
		-- Passengers must be on the plane supporting the flight
        -- Passenger has reached their immediate next destionation airport
	CREATE TEMPORARY TABLE disembarking_passengers AS
	select personID from passenger_vacations where personID in  
	(select a.personID from person a right join passenger b on a.personID = b.personID where locationID = 
    (select locationID from airplane a RIGHT JOIN flight f ON a.airlineID = f.support_airline AND a.tail_num = f.support_tail where flightID = ip_flightID))
    and airportID = airport_id and sequence = 1;

    -- Move the appropriate passengers to the airport
    UPDATE person set locationID = airport_loc where personID IN (SELECT personID FROM disembarking_passengers);
    -- Update the vacation plans of the passengers
    UPDATE passenger_vacations set sequence = sequence - 1 where personID IN (SELECT personID FROM disembarking_passengers) and sequence > 1;
    DELETE FROM passenger_vacations WHERE personID IN (SELECT personID FROM disembarking_passengers) AND sequence = 1;
    DROP TEMPORARY TABLE IF EXISTS disembarking_passengers;

end //
delimiter ;

-- [10] assign_pilot()
-- -----------------------------------------------------------------------------
/* This stored procedure assigns a pilot as part of the flight crew for a given
flight.  The pilot being assigned must have a license for that type of airplane,
and must be at the same location as the flight.  Also, a pilot can only support
one flight (i.e. one airplane) at a time.  The pilot must be assigned to the flight
and have their location updated for the appropriate airplane. */
-- -----------------------------------------------------------------------------
drop procedure if exists assign_pilot;
delimiter //
create procedure assign_pilot (in ip_flightID varchar(50), ip_personID varchar(50))
sp_main: begin
	Declare plane_status varchar(100);
    Declare curr_leg INT;
    Declare leg_number INT;
    Declare flight_num VARCHAR(100);
    Declare found_id varchar(100);
    Declare lic_num int;
    Declare airport_loc VARCHAR(100);
    Declare pilot_loc VARCHAR(100);
    Declare airplane_loc VARCHAR(100);
    
    select airplane_status into plane_status from flight where flightID = ip_flightID;
    select count(*) into leg_number from route_path where routeID = (select routeID from flight where flightID = ip_flightID);
    select progress into curr_leg from flight where flightID = ip_flightID;
    select personID into found_id from pilot where personID = ip_personID;
    select commanding_flight into flight_num from pilot where personID = ip_personID;
    
    select count(*) into lic_num from (select plane_type from airplane a RIGHT JOIN flight f ON a.airlineID = f.support_airline AND a.tail_num = f.support_tail where flightID = ip_flightID) a left join (select license from pilot_licenses where personID = ip_personID) b on a.plane_type = b.license;
	
  
    
    -- Ensure the flight exists
    if not exists (select 1 from flight where flightID = ip_flightID) then
		leave sp_main;
	end if;
    -- Ensure that the flight is on the ground
    -- Ensure that the flight has further legs to be flown
    IF plane_status = 'on_ground' and curr_leg != leg_number THEN
    
    -- Ensure that the pilot exists and is not already assigned
    IF found_id is not null and flight_num is null THEN
	-- Ensure that the pilot has the appropriate license
    IF lic_num = 1 THEN
    -- Ensure the pilot is located at the airport of the plane that is supporting the flight
    select locationID into pilot_loc from person where personID = ip_personID; 
    If curr_leg = 0 THEN
	select locationID into airport_loc from airport where airportID = (select departure from leg where legID = (select legID from route_path where routeID = (select routeID from flight where flightID = ip_flightID) and sequence = 1));
	else
	select locationID into airport_loc from airport where airportID = (select arrival from leg where legID = (select legID from route_path where routeID = (select routeID from flight where flightID = ip_flightID) and sequence = curr_leg));
    END IF;
    IF pilot_loc = airport_loc THEN
    -- Assign the pilot to the flight and update their location to be on the plane
    select locationID into airplane_loc from airplane a RIGHT JOIN flight f ON a.airlineID = f.support_airline AND a.tail_num = f.support_tail where flightID = ip_flightID;
	UPDATE pilot set commanding_flight = ip_flightID where personID = ip_personID;
    UPDATE person set locationID = airplane_loc where personID = ip_personID;
    DROP TEMPORARY TABLE IF EXISTS disembarking_passengers;
    END IF;
    END IF;
    END IF;
    END IF;
end //
delimiter ;

-- [11] recycle_crew()
-- -----------------------------------------------------------------------------
/* This stored procedure releases the assignments for a given flight crew.  The
flight must have ended, and all passengers must have disembarked. */
-- -----------------------------------------------------------------------------
drop procedure if exists recycle_crew;
delimiter //
create procedure recycle_crew (in ip_flightID varchar(50))
sp_main: begin
	Declare plane_status varchar(100);
    Declare curr_leg INT;
    Declare leg_number INT;
    Declare people INT;
    Declare location varchar(100);
    select airplane_status into plane_status from flight where flightID = ip_flightID;
    select count(*) into leg_number from route_path where routeID = (select routeID from flight where flightID = ip_flightID);
    select progress into curr_leg from flight where flightID = ip_flightID;
    select count(*) into people from passenger a left join person b on a.personID = b.personID where locationID = (select locationID from airplane a RIGHT JOIN flight f ON a.airlineID = f.support_airline AND a.tail_num = f.support_tail where flightID = ip_flightID);    
	
    -- Ensure the flight exists 
    if not exists (select 1 from flight where flightID = ip_flightID) then
		leave sp_main;
	end if;
	-- Ensure that the flight is on the ground
	IF plane_status = 'on_ground' THEN
    -- Ensure that the flight does not have any more legs
    IF curr_leg = leg_number THEN
    -- Ensure that the flight is empty of passengers
    IF people = 0 THEN
    -- Update assignements of all pilots
    -- Move all pilots to the airport the plane of the flight is located at
    select locationID into location from airport where airportID = (select arrival from leg where legID = (select legID from route_path where (routeID = (select routeID from flight where flightID = ip_flightID) and sequence = leg_number)));
	UPDATE person set locationID = location where personID in (select personID from pilot where commanding_flight = ip_flightID);
    UPDATE pilot set commanding_flight = NULL where commanding_flight = ip_flightID;
    END IF;
    END IF;
    END IF;
end //
delimiter ;

-- [12] retire_flight()
-- -----------------------------------------------------------------------------
/* This stored procedure removes a flight that has ended from the system.  The
flight must be on the ground, and either be at the start its route, or at the
end of its route.  And the flight must be empty - no pilots or passengers. */
-- -----------------------------------------------------------------------------
drop procedure if exists retire_flight;
delimiter //
create procedure retire_flight (in ip_flightID varchar(50))
sp_main: begin
	Declare plane_status varchar(100);
    Declare curr_leg INT;
    Declare leg_number INT;
    Declare people INT;
    select airplane_status into plane_status from flight where flightID = ip_flightID;
    select count(*) into leg_number from route_path where routeID = (select routeID from flight where flightID = ip_flightID);
    select progress into curr_leg from flight where flightID = ip_flightID;
    select count(*) into people from person where locationID = (select locationID from airplane a RIGHT JOIN flight f ON a.airlineID = f.support_airline AND a.tail_num = f.support_tail where flightID = ip_flightID);
	
    -- Ensure the flight exists
    if not exists (select 1 from flight where flightID = ip_flightID) then
		leave sp_main;
	end if;
	-- Ensure that the flight is on the ground
    IF plane_status = 'on_ground' THEN
    -- Ensure that the flight does not have any more legs
    IF curr_leg = leg_number or curr_leg = 0 THEN
    -- Ensure that there are no more people on the plane supporting the flight
    IF people = 0 THEN
    -- Remove the flight from the system
	Delete from flight where flightID = ip_flightID;
    END IF;
    END IF;
    END IF;
end //
delimiter ;

-- [13] simulation_cycle()
-- -----------------------------------------------------------------------------
/* This stored procedure executes the next step in the simulation cycle.  The flight
with the smallest next time in chronological order must be identified and selected.
If multiple flights have the same time, then flights that are landing should be
preferred over flights that are taking off.  Similarly, flights with the lowest
identifier in alphabetical order should also be preferred.

If an airplane is in flight and waiting to land, then the flight should be allowed
to land, passengers allowed to disembark, and the time advanced by one hour until
the next takeoff to allow for preparations.

If an airplane is on the ground and waiting to takeoff, then the passengers should
be allowed to board, and the time should be advanced to represent when the airplane
will land at its next location based on the leg distance and airplane speed.

If an airplane is on the ground and has reached the end of its route, then the
flight crew should be recycled to allow rest, and the flight itself should be
retired from the system. */
-- -----------------------------------------------------------------------------
drop procedure if exists simulation_cycle;
delimiter //
create procedure simulation_cycle ()
sp_main: begin
	Declare num int;
    Declare flight_id VARCHAR(50);
    Declare plane_status VARCHAR(50);
	-- Identify the next flight to be processed
     select flightID into flight_id from flight where next_time = 
	(select next_time from flight ORDER BY TIME(next_time) limit 1) ORDER BY airplane_status, flightID limit 1;

   select airplane_status into plane_status from flight where flightID = flight_id;
    -- If the flight is in the air:
		-- Land the flight and disembark passengers
        -- If it has reached the end:
			-- Recycle crew and retire flight
	if plane_status = 'in_flight' THEN
    call flight_landing(flight_id);
    call passengers_disembark(flight_id);
    call recycle_crew(flight_id);
    call retire_flight(flight_id);
    
    
	-- If the flight is on the ground:
		-- Board passengers and have the plane takeoff
	ELSE
    call passengers_board(flight_id);
    call flight_takeoff(flight_id);
    END IF;
	-- Hint: use the previously created procedures

end //
delimiter ;

-- [14] flights_in_the_air()
-- -----------------------------------------------------------------------------
/* This view describes where flights that are currently airborne are located. 
We need to display what airports these flights are departing from, what airports 
they are arriving at, the number of flights that are flying between the 
departure and arrival airport, the list of those flights (ordered by their 
flight IDs), the earliest and latest arrival times for the destinations and the 
list of planes (by their respective flight IDs) flying these flights. */
-- -----------------------------------------------------------------------------
create or replace view flights_in_the_air (departing_from, arriving_at, num_flights,
	flight_list, earliest_arrival, latest_arrival, airplane_list) as
select l.departure as departing_from, 
l.arrival as arriving_at, 
count(*) as num_flights,
group_concat(distinct f.flightID order by f.flightID separator ',') as flight_list,
min(f.next_time) as earliest_arrival,
max(f.next_time) as latest_arrival,
group_concat(distinct a.locationID order by f.flightID separator ',') as airplane_list
from flight f left join airplane a on f.support_tail = a.tail_num
join route_path r on f.routeID = r.routeID and f.progress = r.sequence
join leg l on r.legID = l.legID
where f.airplane_status = 'in_flight'
group by l.departure, l.arrival;

-- [15] flights_on_the_ground()
-- ------------------------------------------------------------------------------
/* This view describes where flights that are currently on the ground are 
located. We need to display what airports these flights are departing from, how 
many flights are departing from each airport, the list of flights departing from 
each airport (ordered by their flight IDs), the earliest and latest arrival time 
amongst all of these flights at each airport, and the list of planes (by their 
respective flight IDs) that are departing from each airport.*/
-- ------------------------------------------------------------------------------
create or replace view flights_on_the_ground (departing_from, num_flights,
	flight_list, earliest_arrival, latest_arrival, airplane_list) as 
select l.arrival as departing_from, 
count(*) as num_flights,
group_concat(distinct f.flightID order by f.flightID separator ',') as flight_list,
min(f.next_time) as earliest_arrival,
max(f.next_time) as latest_arrival,
group_concat(distinct a.locationID order by f.flightID separator ',') as airplane_list
from flight f left join airplane a on f.support_tail = a.tail_num
join route_path r on f.routeID = r.routeID and f.progress = r.sequence
join leg l on r.legID = l.legID
where f.airplane_status = 'on_ground' and 
f.progress = (select max(r2.sequence) from route_path r2 where r2.routeID = f.routeID)
group by departing_from
union
select l.departure as departing_from, 
count(*) as num_flights,
group_concat(distinct f.flightID order by f.flightID separator ',') as flight_list,
min(f.next_time) as earliest_arrival,
max(f.next_time) as latest_arrival,
group_concat(distinct a.locationID order by f.flightID separator ',') as airplane_list
from flight f left join airplane a on f.support_tail = a.tail_num
join route_path r on f.routeID = r.routeID and f.progress+1 = r.sequence
join leg l on r.legID = l.legID
where f.airplane_status = 'on_ground' 
and f.progress < (select max(r3.sequence) from route_path r3 where r3.routeID = f.routeID)
group by l.departure;

-- [16] people_in_the_air()
-- -----------------------------------------------------------------------------
/* This view describes where people who are currently airborne are located. We 
need to display what airports these people are departing from, what airports 
they are arriving at, the list of planes (by the location id) flying these 
people, the list of flights these people are on (by flight ID), the earliest 
and latest arrival times of these people, the number of these people that are 
pilots, the number of these people that are passengers, the total number of 
people on the airplane, and the list of these people by their person id. */
-- -----------------------------------------------------------------------------
create or replace view people_in_the_air (departing_from, arriving_at, num_airplanes,
	airplane_list, flight_list, earliest_arrival, latest_arrival, num_pilots,
	num_passengers, joint_pilots_passengers, person_list) as
select l.departure as departing_from, 
l.arrival as arriving_at, 
count(distinct f.flightID) as num_airplanes,
group_concat(distinct a.locationID order by a.locationID separator ',') as airplane_list,
group_concat(distinct f.flightID order by f.flightID separator ',') as flight_list,
min(f.next_time) as earliest_arrival,
max(f.next_time) as latest_arrival,
count(distinct pl.personID) as num_pilots,
count(distinct pa.personID) as num_passengers,
count(distinct p.personID) as joint_pilots_passengers,
group_concat(distinct p.personID order by p.personID separator ',') as person_list
from flight f left join airplane a on f.support_tail = a.tail_num
join route_path r on f.routeID = r.routeID and f.progress = r.sequence
join leg l on r.legID = l.legID
join person p on p.locationID = a.locationID
left join pilot pl on pl.commanding_flight = f.flightID and pl.personID = p.personID
left join passenger pa on pa.personID = p.personID
where f.airplane_status = 'in_flight'
group by l.departure, l.arrival;

-- [17] people_on_the_ground()
-- -----------------------------------------------------------------------------
/* This view describes where people who are currently on the ground and in an 
airport are located. We need to display what airports these people are departing 
from by airport id, location id, and airport name, the city and state of these 
airports, the number of these people that are pilots, the number of these people 
that are passengers, the total number people at the airport, and the list of 
these people by their person id. */
-- -----------------------------------------------------------------------------
create or replace view people_on_the_ground (departing_from, airport, airport_name,
	city, state, country, num_pilots, num_passengers, joint_pilots_passengers, person_list) as
select a.airportID as departing_from,
a.locationID as airport,
a.airport_name, a.city, a.state, a.country,
count(distinct p1.personID) as num_pilots,
count(distinct p2.personID) as num_passengers,
count(distinct p.personID) as joint_pilots_passengers,
group_concat(distinct p.personID order by p.personID separator ', ') as person_list
from airport a join person p on p.locationID = a.locationID
left join pilot p1 on p1.personID = p.personID
left join passenger p2 on p2.personID = p.personID
group by
    a.airportID, a.locationID, a.airport_name, a.city, a.state, a.country;


-- [18] route_summary()
-- -----------------------------------------------------------------------------
/* This view will give a summary of every route. This will include the routeID, 
the number of legs per route, the legs of the route in sequence, the total 
distance of the route, the number of flights on this route, the flightIDs of 
those flights by flight ID, and the sequence of airports visited by the route. */
-- -----------------------------------------------------------------------------
create or replace view route_summary (route, num_legs, leg_sequence, route_length,
	num_flights, flight_list, airport_sequence) as
select r.routeID as route, count(rp.legID) as num_legs, 
 group_concat(rp.legID separator ', ') as leg_sequence,
coalesce(sum(l.distance), 0) as route_length, 
(select count(*) from flight f where f.routeID = r.routeID) as num_flights,
(select group_concat(f.flightID order by f.flightID separator ', ')
     from flight f where f.routeID = r.routeID) as flight_list,
group_concat(concat(l.departure, '->', l.arrival) order by rp.sequence separator ', ') as airport_sequence 
from route r
left join route_path rp on r.routeID = rp.routeID
left join leg l on rp.legID = l.legID
group by r.routeID;


-- [19] alternative_airports()
-- --------------------------------------------------------------------------
/* This view displays airports that share the same city and state. It should 
specify the city, state, the number of airports shared, and the lists of the 
airport codes and airport names that are shared both by airport ID. */
 -----------------------------------------------------------------------------	
create or replace view alternative_airports (city, state, country, num_airports,
    airport_code_list, airport_name_list) as
select a.city, a.state, a.country, count(*) as num_airports, 
group_concat(a.airportID separator ', ') as airport_code_list, 
group_concat(a.airport_name separator ', ') as airport_name_list
from airport a
group by a.city, a.state, a.country 
having count(*) > 1
;


