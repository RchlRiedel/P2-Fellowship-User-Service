create schema project_2;
set schema 'project_2';

--drop table users;
--drop table locations;
--drop table users_locations;
--drop table location_images;
--drop table locations_location_images;

create table users(
	"user_id" serial primary key,
	"username" text not null unique,
	"password" text not null,
	"first_name" text not null,
	"last_name" text,
	"affiliation" text not null,
	"places_visited" int, 
	"address" text,
	"email" text not null,
	"role" text not null,
	"image" text
);


	

