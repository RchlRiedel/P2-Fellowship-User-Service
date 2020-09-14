--set database 'LOTR_Mirco';
create schema project_2_user_service;
set schema 'project_2_user_service';

drop table users cascade;

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
	values ('Mithrandir', 'YouShallNotPass', 'Gandalf', null, 'Fellowship', null, 'shadofaxTheFast@email.com', 'Admin', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/gandalf.jpg'),
		   ('RingBearer', 'myPrecious', 'Frodo', 'Baggins', 'Fellowship', 'The Shire', 'frodoUnderhill@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/frodo.jpg'),
		   ('SamIAm', 'password', 'Samwise', 'Gamgee', 'Fellowship', 'The Shire', 'potatoes4life@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/samwise.jpg'),
           ('Strider', 'Actually87', 'Aragron II', 'Elessar Telcontar', 'Fellowship', 'Gondor', 'Heir2Isildur@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/aragorn.jpg'),
           ('GoldenGimli','ThatStillOnlyCountsAs1', 'Gimli', null, 'Fellowship', 'Erebor', 'lockBearer@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/gimli.jpg'),
           ('CaptainOfTheWhiteTower', 'NearamirFaramir', 'Boromir', null, 'Fellowship', 'Gondor', 'sterwardPrince@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/boromir.jpg'),
           ('LorealLegolas', 'BecauseYouAreWorthIt', 'Legolas', 'Greenleaf', 'Fellowship', 'Mirkwood', 'EndlessQuiver@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/legolas.jfif'),
           ('Evenstar', 'Queen2Be', 'Arwen', null, 'Fellowship', 'Riverdell', 'comeANDclaimHIM@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/arwen.jpg'),
           ('Galadrielf', 'LadyofLight', 'Galadriel', null, 'Fellowship', 'Lothlorien', 'greatAndTerrible@email.com', 'Admin', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/galadriel.jpg'),
		   ('Dernhelm', 'IAmNoMan', 'Eowyn', null, 'Rohirrim', 'Rohan', 'shieldMaiden@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/eowyn.jpg'),
		   ('NotCountDooku', 'WiseWhiteWizard', 'Saruman', null, 'Sauron', 'Isengard', 'sharkley@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/saruman.jpg'),
           ('MerryMerry', 'BrandybuckBoi', 'Meriadoc', 'Brandybuck', 'Fellowship', 'The Shire','tallerThanPippin@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/merry.jfif'),
           ('FoolOfATook', '00psMyBad', 'Peregrin', 'Took', 'Fellowship', 'The Shire', 'tallerThanMerry@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/pippin.jfif'),
           ('WitchKing', 'ThisKing', 'Forgotten', null, 'Sauron', 'Angmar', 'noManCanBeatMe@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/witchking.jpg'),
           ('SnakeySnake', 'notASpy', 'Grima', 'Wormtongue', 'Saruman', 'Rohan', 'everyoneHatesMe@email.com', 'User', 'https://storage.googleapis.com/p2-fellowship/LOTR_Profiles/grima.jpg');

update project_2_user_service.users u 
	set "places_visited" = 
		(select COUNT(ul."location_id") 
		from project_2_location_service.users_locations ul
		where ul."user_id" = u."user_id")
	where "user_id">0;--for all users
	
select * from users;
