--set database 'LOTR-mirco';
create schema project_2_user_service;
set schema 'project_2_user_service';

--drop table users;
--drop table users_locations; this tale is moved to locations schema 


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

insert into users ("username", "password", "first_name", "last_name", "affiliation", "address", "email", "role", "image")
	values ('Mithrandir', 'YouShallNotPass', 'Gandalf', null, 'Fellowship', null, 'shadofaxTheFast@email.com', 'Admin', null),
		   ('RingBearer', 'myPrecious', 'Frodo', 'Baggins', 'Fellowship', 'The Shire', 'frodoUnderhill@email.com', 'User', null),
		   ('SamIAm', 'password', 'Samwise', 'Gamgee', 'Fellowship', 'The Shire', 'potatoes4life@email.com', 'User', null),
           ('Strider', 'Actually87', 'Aragron II', 'Elessar Telcontar', 'Fellowship', 'Gondor', 'Heir2Isildur@email.com', 'User', null),
           ('GoldenGimli','ThatStillOnlyCountsAs1', 'Gimli', null, 'Fellowship', 'Erebor', 'lockBearer@email.com', 'User', null),
           ('CaptainOfTheWhiteTower', 'NearamirFaramir', 'Boromir', null, 'Fellowship', 'Gondor', 'sterwardPrince@email.com', 'User', null),
           ('LorealLegolas', 'BecauseYouAreWorthIt', 'Legolas', 'Greenleaf', 'Fellowship', 'Mirkwood', 'EndlessQuiver@email.com', 'User', null),
           ('Evenstar', 'Queen2Be', 'Arwen', null, 'Fellowship', 'Riverdell', 'comeANDclaimHIM@email.com', 'User', null),
           ('Galadrielf', 'LadyofLight', 'Galadriel', null, 'Fellowship', 'Lothlorien', 'greatAndTerrible@email.com', 'Admin', null),
		   ('Dernhelm', 'IAmNoMan', 'Eowyn', null, 'Rohirrim', 'Rohan', 'shieldMaiden@email.com', 'User', null),
		   ('NotCountDooku', 'WiseWhiteWizard', 'Saruman', null, 'Sauron', 'Isengard', 'sharkley@email.com', 'User', null),
           ('MerryMerry', 'BrandybuckBoi', 'Meriadoc', 'Brandybuck', 'Fellowship', 'The Shire','tallerThanPippin@email.com', 'User', null),
           ('FoolOfATook', '00psMyBad', 'Peregrin', 'Took', 'Fellowship', 'The Shire', 'tallerThanMerry@email.com', 'User', null),
           ('WitchKing', 'ThisKing', 'Forgotten', null, 'Sauron', 'Angmar', 'noManCanBeatMe@email.com', 'User', null),
           ('SnakeySnake', 'notASpy', 'Grima', 'Wormtongue', 'Saruman', 'Rohan', 'everyoneHatesMe@emai.com', 'User', null);
--select * from users;