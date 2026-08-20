CREATE TABLE `checkins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`place_id` integer NOT NULL,
	`user_email` text NOT NULL,
	`user_name` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `friendships` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`requester` text NOT NULL,
	`addressee` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `places` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`access` text DEFAULT 'Gratuito' NOT NULL,
	`hours` text DEFAULT 'Não informado' NOT NULL,
	`accessible` integer DEFAULT false NOT NULL,
	`family` integer DEFAULT false NOT NULL,
	`changing_table` integer DEFAULT false NOT NULL,
	`shower` integer DEFAULT false NOT NULL,
	`gender_neutral` integer DEFAULT false NOT NULL,
	`wifi` integer DEFAULT false NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`place_id` integer NOT NULL,
	`user_email` text NOT NULL,
	`user_name` text NOT NULL,
	`rating` real NOT NULL,
	`cleanliness` integer NOT NULL,
	`privacy` integer NOT NULL,
	`supplies` integer NOT NULL,
	`accessibility` integer NOT NULL,
	`comfort` integer NOT NULL,
	`comment` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`handle` text NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`city` text DEFAULT '' NOT NULL,
	`xp` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_handle_unique` ON `users` (`handle`);