ALTER TABLE `subscription` ADD `start_at` text NOT NULL;--> statement-breakpoint
ALTER TABLE `subscription` ADD `finish_at` text NOT NULL;--> statement-breakpoint
ALTER TABLE `subscription` ADD `notify_when_close_to_finish` integer DEFAULT false;