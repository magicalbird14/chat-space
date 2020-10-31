# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|email|text|null: false, unique: true|
|password|text|null: false|
|groups_users_id|integer|null: false, foreign_key: ture|

### Association
- has_many :messeages
- has_many :groups,  through:  :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|groupname|text|
|groups_users_id|integer|null: false, foreign_key: ture|

### Association
- has_many :groups,  through:  :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|

### Association
- belongs_to :users