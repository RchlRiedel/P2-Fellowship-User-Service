set database "LOTR-mirco";
create schema project_2_user_service;
set schema 'project_2_user_service';

--drop table users;
--drop table users_locations;


create table users(
	"user_id" serial primary key,
	"username" text not null unique,
	"password" text not null,
	"first_name" text not null,
	"last_name" text,
	"affiliation" text not null,
	"places_visited" int, -- = COUNT(location_id) FROM user_locations WHERE users.user_id = user_locations.user_id,
	"address" text,
	"email" text not null,
	"role" text not null,
	"image" text
);


insert into users ("username", "password", "first_name", "last_name", "affiliation", "places_visited", "address", "email", "role", "image")
	values ('Mithrandir', 'YouShallNotPass', 'Gandalf', null, 'Fellowship', 1233, null, 'shadofaxTheFast@email.com', 'Admin', null),
		   ('RingBearer', 'myPrecious', 'Frodo', 'Baggins', 'Fellowship', 15, 'The Shire', 'frodoUnderhill@email.com', 'User', null),
		   ('SamIAm', 'password', 'Samwise', 'Gamgee', 'Fellowship', 15, 'The Shire', 'potatoes4life@email.com', 'User', null),
		   ('Strider', 'Actually87', 'Aragron II', 'Elessar Telcontar', 'Fellowship', 207, 'Gondor', 'Heir2Isildur@email.com', 'User', null),
		   ('Dernhelm', 'IAmNoMan', 'Eowyn', null, 'Rohan', 27, 'Rohan', 'shieldMaiden@email.com', 'User', null),
		   ('NotCountDooku', 'WiseWhiteWizard', 'Saruman', null, 'Sauron', 897, 'Isengard', 'sharkley@email.com', 'User', null);
		   

	

